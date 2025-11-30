// backend/src/routes/motoristas.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const { verifyToken, checkRole } = require('../middleware/auth');

const prisma = new PrismaClient();

// GET /api/motoristas - Lista todos os motoristas
router.get('/', verifyToken, async (req, res) => {
  try {
    const motoristas = await prisma.motorista.findMany({
      where: {
        status: 'Ativo' // Mostra apenas motoristas ativos por padrão
      },
      select: {
        id: true,
        nome: true,
        cpf: true,
        cnh: true,
        categoriaCnh: true,
        dataNascimento: true,
        telefone: true,
        email: true,
        endereco: true,
        status: true
      },
      orderBy: {
        nome: 'asc'
      }
    });
    res.json(motoristas);
  } catch (error) {
    console.error('Erro ao buscar motoristas:', error);
    res.status(500).json({ error: 'Erro ao buscar motoristas' });
  }
});

// GET /api/motoristas/todos - Lista todos os motoristas (incluindo inativos - apenas admin)
router.get('/todos', verifyToken, checkRole(['ADMIN']), async (req, res) => {
  try {
    const motoristas = await prisma.motorista.findMany({
      select: {
        id: true,
        nome: true,
        cpf: true,
        cnh: true,
        categoriaCnh: true,
        dataNascimento: true,
        telefone: true,
        email: true,
        endereco: true,
        status: true
      },
      orderBy: {
        nome: 'asc'
      }
    });
    res.json(motoristas);
  } catch (error) {
    console.error('Erro ao buscar todos os motoristas:', error);
    res.status(500).json({ error: 'Erro ao buscar motoristas' });
  }
});

// GET /api/motoristas/:id - Busca um motorista específico
router.get('/:id', verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const motorista = await prisma.motorista.findUnique({
      where: { id: parseInt(id) }
    });

    if (!motorista) {
      return res.status(404).json({ error: 'Motorista não encontrado' });
    }

    res.json(motorista);
  } catch (error) {
    console.error('Erro ao buscar motorista:', error);
    res.status(500).json({ error: 'Erro ao buscar motorista' });
  }
});

// POST /api/motoristas - Cria um novo motorista
router.post('/', verifyToken, checkRole(['ADMIN', 'PORTARIA']), async (req, res) => {
  try {
    const {
      nome,
      cpf,
      cnh,
      categoriaCnh,
      dataNascimento,
      telefone,
      email,
      endereco
    } = req.body;

    // Validação básica
    if (!nome || !cpf || !cnh || !categoriaCnh || !dataNascimento) {
      return res.status(400).json({ error: 'Campos obrigatórios não preenchidos' });
    }

    // Verifica se o CPF já existe
    const motoristaExistente = await prisma.motorista.findFirst({
      where: { cpf }
    });

    if (motoristaExistente) {
      return res.status(400).json({ error: 'Já existe um motorista com este CPF' });
    }

    const novoMotorista = await prisma.motorista.create({
      data: {
        nome,
        cpf,
        cnh,
        categoriaCnh,
        dataNascimento: new Date(dataNascimento),
        telefone,
        email,
        endereco,
        status: 'Ativo'
      }
    });

    res.status(201).json(novoMotorista);
  } catch (error) {
    console.error('Erro ao criar motorista:', error);
    res.status(500).json({ error: 'Erro ao criar motorista' });
  }
});

// PUT /api/motoristas/:id - Atualiza um motorista
router.put('/:id', verifyToken, checkRole(['ADMIN', 'PORTARIA']), async (req, res) => {
  try {
    const { id } = req.params;
    const {
      nome,
      cpf,
      cnh,
      categoriaCnh,
      dataNascimento,
      telefone,
      email,
      endereco,
      status
    } = req.body;

    // Verifica se o motorista existe
    const motorista = await prisma.motorista.findUnique({
      where: { id: parseInt(id) }
    });

    if (!motorista) {
      return res.status(404).json({ error: 'Motorista não encontrado' });
    }

    // Verifica se o novo CPF já está em uso por outro motorista
    if (cpf && cpf !== motorista.cpf) {
      const cpfExistente = await prisma.motorista.findFirst({
        where: {
          cpf,
          NOT: { id: parseInt(id) }
        }
      });

      if (cpfExistente) {
        return res.status(400).json({ error: 'Já existe outro motorista com este CPF' });
      }
    }

    const motoristaAtualizado = await prisma.motorista.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        cpf,
        cnh,
        categoriaCnh,
        dataNascimento: dataNascimento ? new Date(dataNascimento) : undefined,
        telefone,
        email,
        endereco,
        status
      }
    });

    res.json(motoristaAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar motorista:', error);
    res.status(500).json({ error: 'Erro ao atualizar motorista' });
  }
});

// DELETE /api/motoristas/:id - Remove um motorista (inativa)
router.delete('/:id', verifyToken, checkRole(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o motorista existe
    const motorista = await prisma.motorista.findUnique({
      where: { id: parseInt(id) }
    });

    if (!motorista) {
      return res.status(404).json({ error: 'Motorista não encontrado' });
    }

    // Verifica se o motorista está associado a algum registro de portaria
    const portarias = await prisma.portaria.findMany({
      where: { motoristaId: parseInt(id) }
    });

    if (portarias.length > 0) {
      return res.status(400).json({ 
        error: 'Não é possível inativar motorista com registros de portaria ativos' 
      });
    }

    // Inativa o motorista em vez de excluir
    await prisma.motorista.update({
      where: { id: parseInt(id) },
      data: { status: 'Inativo' }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao inativar motorista:', error);
    res.status(500).json({ error: 'Erro ao inativar motorista' });
  }
});

// Rota para buscar motoristas por nome (autocomplete)
router.get('/buscar/:termo', verifyToken, async (req, res) => {
  try {
    const { termo } = req.params;
    
    const motoristas = await prisma.motorista.findMany({
      where: {
        status: 'Ativo',
        OR: [
          { nome: { contains: termo, mode: 'insensitive' } },
          { cpf: { contains: termo } }
        ]
      },
      select: {
        id: true,
        nome: true,
        cpf: true,
        cnh: true,
        categoriaCnh: true
      },
      take: 10 // Limita a 10 resultados
    });

    res.json(motoristas);
  } catch (error) {
    console.error('Erro ao buscar motoristas:', error);
    res.status(500).json({ error: 'Erro ao buscar motoristas' });
  }
});

module.exports = router;