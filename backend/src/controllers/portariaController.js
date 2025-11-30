// backend/src/controllers/portariaController.js
import { PrismaClient } from "@prisma/client";
import { setCorsHeaders } from '../utils/corsUtils.js';
import fs from 'fs-extra';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const prisma = new PrismaClient();

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, '..', '..', 'uploads', 'assinaturas');
await fs.ensureDir(uploadsDir);

export const getRegistros = async (req, res) => {
  try {
    const { data } = req.query;
    
    let where = {};
    if (data) {
      const startDate = new Date(data);
      const endDate = new Date(data);
      endDate.setDate(endDate.getDate() + 1);
      
      where = {
        dataHora: {
          gte: startDate,
          lt: endDate
        }
      };
    }

    const registros = await prisma.portaria.findMany({
      where,
      include: { 
        veiculo: { select: { nome: true, placa: true } },
        motorista: { select: { nome: true } }
      },
      orderBy: { dataHora: 'desc' }
    });
    
    return setCorsHeaders(res).json(registros);
  } catch (error) {
    console.error('Erro ao buscar registros:', error);
    return setCorsHeaders(res).status(500).json({ 
      error: "Erro ao buscar registros",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const createRegistro = async (req, res) => {
  try {
    const { veiculoId, motoristaId, observacoes, assinatura } = req.body;

    if (!veiculoId || !motoristaId || !assinatura) {
      return setCorsHeaders(res).status(400).json({ 
        error: "Todos os campos são obrigatórios" 
      });
    }

    // Verifica se veículo existe
    const veiculo = await prisma.veiculo.findUnique({
      where: { id: Number(veiculoId) }
    });

    if (!veiculo) {
      return setCorsHeaders(res).status(404).json({ 
        error: "Veículo não encontrado" 
      });
    }

    // Verifica se motorista existe
    const motorista = await prisma.motorista.findUnique({
      where: { id: Number(motoristaId) }
    });

    if (!motorista) {
      return setCorsHeaders(res).status(404).json({ 
        error: "Motorista não encontrado" 
      });
    }

    // Save signature image
    const base64Data = assinatura.replace(/^data:image\/png;base64,/, "");
    const nomeArquivo = `assinatura-${Date.now()}.png`;
    const caminhoArquivo = path.join(uploadsDir, nomeArquivo);
    
    await fs.writeFile(caminhoArquivo, base64Data, 'base64');

    // Cria o registro na portaria
    const registro = await prisma.portaria.create({
      data: { 
        veiculoId: Number(veiculoId), 
        motoristaId: Number(motoristaId), 
        observacoes: observacoes || null,
        assinaturaUrl: `/assinaturas/${nomeArquivo}`,
        dataHora: new Date()
      },
      include: {
        veiculo: { select: { nome: true, placa: true } },
        motorista: { select: { nome: true } }
      }
    });

    return setCorsHeaders(res).status(201).json(registro);
  } catch (error) {
    console.error('Erro ao criar registro:', error);
    return setCorsHeaders(res).status(500).json({ 
      error: "Erro ao criar registro",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};
// No arquivo portariaController.js
export const getUltimoRegistro = async (req, res) => {
  try {
    const { veiculoId } = req.params;

    // Busca o último registro de portaria para o veículo
    const ultimoRegistro = await prisma.portaria.findFirst({
      where: {
        veiculoId,
        OR: [
          { kmSaida: { not: null } },
          { kmRetorno: { not: null } }
        ]
      },
      orderBy: {
        dataHoraSaida: 'desc'
      },
      select: {
        kmSaida: true,
        kmRetorno: true,
        dataHoraSaida: true,
        dataHoraRetorno: true
      }
    });

    if (!ultimoRegistro) {
      return res.status(404).json({ 
        error: 'Nenhum registro encontrado para este veículo',
        code: 'NO_RECORDS_FOUND'
      });
    }

    // Retorna o último KM registrado (seja de saída ou retorno)
    const ultimoKm = ultimoRegistro.kmRetorno || ultimoRegistro.kmSaida;
    const dataUltimoRegistro = ultimoRegistro.dataHoraRetorno || ultimoRegistro.dataHoraSaida;

    res.json({
      ultimoKm,
      dataUltimoRegistro: dataUltimoRegistro.toISOString(),
      tipo: ultimoRegistro.kmRetorno ? 'retorno' : 'saida'
    });

  } catch (error) {
    console.error('Erro ao buscar último registro:', error);
    res.status(500).json({ 
      error: 'Erro ao buscar último registro de KM',
      code: 'LAST_RECORD_FETCH_ERROR',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

export const getEstatisticas = async (req, res) => {
  try {
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    
    const amanha = new Date(hoje);
    amanha.setDate(amanha.getDate() + 1);

    const registrosHoje = await prisma.portaria.count({
      where: {
        dataHora: {
          gte: hoje,
          lt: amanha
        }
      }
    });

    const veiculosAtivos = await prisma.veiculo.count({
      where: { status: 'ATIVO' }
    });

    const motoristasAtivos = await prisma.motorista.count({
      where: { status: 'ATIVO' }
    });

    return setCorsHeaders(res).json({ 
      registrosHoje,
      veiculosAtivos,
      motoristasAtivos
    });
  } catch (error) {
    console.error('Erro ao buscar estatísticas:', error);
    return setCorsHeaders(res).status(500).json({ 
      error: "Erro ao buscar estatísticas",
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};