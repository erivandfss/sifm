// backend/src/routes/veiculos.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { verifyToken, checkRole } = require('../middleware/auth');

const prisma = new PrismaClient();

// Validação de placa de veículo
function validarPlaca(placa) {
  if (!placa) return false;
  // Formato: AAA-0000 ou AAA0A00
  const placaRegex = /^[A-Z]{3}[-]?[0-9][0-9A-Z][0-9]{2}$/;
  return placaRegex.test(placa.toUpperCase());
}

// GET /api/veiculos - Lista todos os veículos ativos
router.get('/', verifyToken, async (req, res) => {
  try {
    const veiculos = await prisma.veiculo.findMany({
      where: { status: 'DISPONIVEL' }, // Mostra apenas veículos disponíveis por padrão
      select: {
        id: true,
        placa: true,
        modelo: true,
        marca: true,
        ano: true,
        cor: true,
        kmAtual: true,
        status: true,
        tipo: true
      },
      orderBy: {
        placa: 'asc'
      }
    });
    res.json(veiculos);
  } catch (error) {
    console.error('Erro ao buscar veículos:', error);
    res.status(500).json({ error: 'Erro ao buscar veículos' });
  }
});

// GET /api/veiculos/todos - Lista todos os veículos (incluindo indisponíveis - apenas admin)
router.get('/todos', verifyToken, checkRole(['ADMIN']), async (req, res) => {
  try {
    const veiculos = await prisma.veiculo.findMany({
      select: {
        id: true,
        placa: true,
        modelo: true,
        marca: true,
        ano: true,
        cor: true,
        kmAtual: true,
        status: true,
        tipo: true,
        observacoes: true
      },
      orderBy: {
        placa: 'asc'
      }
    });
    res.json(veiculos);
  } catch (error) {
    console.error('Erro ao buscar veículos:', error);
    res.status(500).json({ error: 'Erro ao buscar veículos' });
  }
});

// GET /api/veiculos/:id - Busca um veículo específico
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const veiculo = await prisma.veiculo.findUnique({
      where: { id: parseInt(id) }
    });

    if (!veiculo) {
      return res.status(404).json({ error: 'Veículo não encontrado' });
    }

    res.json(veiculo);
  } catch (error) {
    console.error('Erro ao buscar veículo:', error);
    res.status(500).json({ error: 'Erro ao buscar veículo' });
  }
});

// POST /api/veiculos - Cria um novo veículo
router.post('/', verifyToken, checkRole(['ADMIN', 'MANUTENCAO']), async (req, res) => {
  try {
    const {
      placa,
      modelo,
      marca,
      ano,
      cor,
      kmAtual,
      tipo,
      observacoes
    } = req.body;

    // Validação básica
    if (!placa || !modelo || !marca || !ano || !tipo) {
      return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
    }

    // Valida formato da placa
    if (!validarPlaca(placa)) {
      return res.status(400).json({ error: 'Formato de placa inválido' });
    }

    // Verifica se a placa já existe
    const veiculoExistente = await prisma.veiculo.findFirst({
      where: { 
        placa: {
          equals: placa,
          mode: 'insensitive'
        }
      }
    });

    if (veiculoExistente) {
      return res.status(400).json({ error: 'Já existe um veículo com esta placa' });
    }

    const novoVeiculo = await prisma.veiculo.create({
      data: {
        placa: placa.toUpperCase(),
        modelo,
        marca,
        ano: parseInt(ano),
        cor,
        kmAtual: parseFloat(kmAtual) || 0,
        tipo,
        observacoes,
        status: 'DISPONIVEL'
      }
    });

    res.status(201).json(novoVeiculo);
  } catch (error) {
    console.error('Erro ao criar veículo:', error);
    res.status(500).json({ error: 'Erro ao criar veículo' });
  }
});

// PUT /api/veiculos/:id - Atualiza um veículo
router.put('/:id', verifyToken, checkRole(['ADMIN', 'MANUTENCAO']), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      placa,
      modelo,
      marca,
      ano,
      cor,
      kmAtual,
      tipo,
      observacoes,
      status
    } = req.body;

    // Verifica se o veículo existe
    const veiculo = await prisma.veiculo.findUnique({
      where: { id: parseInt(id) }
    });

    if (!veiculo) {
      return res.status(404).json({ error: 'Veículo não encontrado' });
    }

    // Verifica se a nova placa já está em uso
    if (placa && placa.toUpperCase() !== veiculo.placa) {
      if (!validarPlaca(placa)) {
        return res.status(400).json({ error: 'Formato de placa inválido' });
      }

      const placaExistente = await prisma.veiculo.findFirst({
        where: {
          placa: {
            equals: placa,
            mode: 'insensitive'
          },
          NOT: { id: parseInt(id) }
        }
      });

      if (placaExistente) {
        return res.status(400).json({ error: 'Já existe outro veículo com esta placa' });
      }
    }

    const veiculoAtualizado = await prisma.veiculo.update({
      where: { id: parseInt(id) },
      data: {
        placa: placa ? placa.toUpperCase() : undefined,
        modelo,
        marca,
        ano: ano ? parseInt(ano) : undefined,
        cor,
        kmAtual: kmAtual ? parseFloat(kmAtual) : undefined,
        tipo,
        observacoes,
        status
      }
    });

    res.json(veiculoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar veículo:', error);
    res.status(500).json({ error: 'Erro ao atualizar veículo' });
  }
});

// PATCH /api/veiculos/:id/km - Atualiza a quilometragem do veículo
router.patch('/:id/km', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const { kmAtual } = req.body;

    if (!kmAtual || isNaN(parseFloat(kmAtual))) {
      return res.status(400).json({ error: 'Quilometragem inválida' });
    }

    const veiculo = await prisma.veiculo.findUnique({
      where: { id: parseInt(id) }
    });

    if (!veiculo) {
      return res.status(404).json({ error: 'Veículo não encontrado' });
    }

    // Não permite atualizar para uma quilometragem menor que a atual
    if (parseFloat(kmAtual) < veiculo.kmAtual) {
      return res.status(400).json({ 
        error: 'A quilometragem não pode ser menor que a atual' 
      });
    }

    const veiculoAtualizado = await prisma.veiculo.update({
      where: { id: parseInt(id) },
      data: { kmAtual: parseFloat(kmAtual) }
    });

    res.json(veiculoAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar quilometragem:', error);
    res.status(500).json({ error: 'Erro ao atualizar quilometragem' });
  }
});

// DELETE /api/veiculos/:id - Remove um veículo (marca como inativo)
router.delete('/:id', verifyToken, checkRole(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o veículo existe
    const veiculo = await prisma.veiculo.findUnique({
      where: { id: parseInt(id) }
    });

    if (!veiculo) {
      return res.status(404).json({ error: 'Veículo não encontrado' });
    }

    // Verifica se o veículo está em uso
    if (veiculo.status === 'EM_USO') {
      return res.status(400).json({ 
        error: 'Não é possível remover um veículo em uso' 
      });
    }

    // Marca como INATIVO em vez de excluir
    await prisma.veiculo.update({
      where: { id: parseInt(id) },
      data: { status: 'INATIVO' }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao remover veículo:', error);
    res.status(500).json({ error: 'Erro ao remover veículo' });
  }
});

// GET /api/veiculos/buscar/:termo - Busca veículos por placa ou modelo
router.get('/buscar/:termo', verifyToken, async (req, res) => {
  try {
    const { termo } = req.params;
    
    const veiculos = await prisma.veiculo.findMany({
      where: {
        status: 'DISPONIVEL',
        OR: [
          { placa: { contains: termo.toUpperCase() } },
          { modelo: { contains: termo, mode: 'insensitive' } }
        ]
      },
      select: {
        id: true,
        placa: true,
        modelo: true,
        marca: true,
        tipo: true,
        kmAtual: true
      },
      take: 10 // Limita a 10 resultados
    });

    res.json(veiculos);
  } catch (error) {
    console.error('Erro ao buscar veículos:', error);
    res.status(500).json({ error: 'Erro ao buscar veículos' });
  }
});

// GET /api/veiculos/status/disponiveis - Lista veículos disponíveis
router.get('/status/disponiveis', verifyToken, async (req, res) => {
  try {
    const veiculos = await prisma.veiculo.findMany({
      where: { status: 'DISPONIVEL' },
      select: {
        id: true,
        placa: true,
        modelo: true,
        marca: true,
        tipo: true
      },
      orderBy: {
        placa: 'asc'
      }
    });
    res.json(veiculos);
  } catch (error) {
    console.error('Erro ao buscar veículos disponíveis:', error);
    res.status(500).json({ error: 'Erro ao buscar veículos disponíveis' });
  }
});

module.exports = router;