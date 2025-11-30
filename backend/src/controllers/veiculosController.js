// backend/src/controllers/veiculosController.js
import { PrismaClient } from "@prisma/client";
import { setCorsHeaders } from '../utils/corsUtils.js';


const prisma = new PrismaClient();

// Helper para respostas de erro
const handleError = (res, error, defaultMessage, statusCode = 500) => {
  console.error(`[${new Date().toISOString()}] ${defaultMessage}:`, error);
  return setCorsHeaders(res)
    .status(statusCode)
    .json({ 
      error: defaultMessage,
      ...(process.env.NODE_ENV === 'development' && { details: error.message })
    });
};

// Helper para validação de placa
const validarPlaca = (placa) => {
  const placaRegex = /^[A-Z]{3}-\d{4}$/;
  return placa ? placaRegex.test(placa.toUpperCase()) : false;
};

export const getVeiculos = async (req, res) => {
  try {
    console.log(`[${new Date().toISOString()}] Buscando todos os veículos`);
    const veiculos = await prisma.veiculo.findMany({
      orderBy: { nome: 'asc' }
    });
    console.log(`[${new Date().toISOString()}] ${veiculos.length} veículos encontrados`);
    return setCorsHeaders(res).json(veiculos);
  } catch (error) {
    return handleError(res, error, "Erro ao buscar veículos");
  }
};

export const getVeiculo = async (req, res) => {
  try {
    const veiculoId = parseInt(req.params.id);
    if (isNaN(veiculoId)) {
      return setCorsHeaders(res)
        .status(400)
        .json({ error: "ID do veículo inválido" });
    }

    console.log(`[${new Date().toISOString()}] Buscando veículo ID: ${veiculoId}`);
    
    const veiculo = await prisma.veiculo.findUnique({
      where: { id: veiculoId }
    });

    if (!veiculo) {
      console.log(`[${new Date().toISOString()}] Veículo não encontrado: ${veiculoId}`);
      return setCorsHeaders(res)
        .status(404)
        .json({ error: "Veículo não encontrado" });
    }

    console.log(`[${new Date().toISOString()}] Veículo encontrado: ${veiculoId}`);
    return setCorsHeaders(res).json(veiculo);
  } catch (error) {
    return handleError(res, error, "Erro ao buscar veículo");
  }
};

export const createVeiculo = async (req, res) => {
  try {
    const { nome, placa, tipo, kmAtual, status = "ATIVO" } = req.body;
    console.log(`[${new Date().toISOString()}] Criando novo veículo: ${placa}`);

    // Validação de campos obrigatórios
    if (!nome || !placa || !tipo || kmAtual === undefined) {
      return setCorsHeaders(res)
        .status(400)
        .json({ error: "Nome, placa, tipo e kmAtual são obrigatórios" });
    }

    // Valida formato da placa
    const placaFormatada = placa.toUpperCase();
    if (!validarPlaca(placaFormatada)) {
      return setCorsHeaders(res)
        .status(400)
        .json({ error: "Formato de placa inválido. Use: ABC-1234" });
    }

    // Verifica se placa já existe
    const placaExistente = await prisma.veiculo.findUnique({
      where: { placa: placaFormatada }
    });

    if (placaExistente) {
      return setCorsHeaders(res)
        .status(400)
        .json({ error: "Placa já cadastrada" });
    }

    const veiculo = await prisma.veiculo.create({
      data: { 
        nome, 
        placa: placaFormatada, 
        tipo, 
        kmAtual: Number(kmAtual),
        status 
      }
    });

    console.log(`[${new Date().toISOString()}] Veículo criado: ${veiculo.id}`);
    return setCorsHeaders(res).status(201).json(veiculo);
  } catch (error) {
    return handleError(res, error, "Erro ao criar veículo");
  }
};

export const updateVeiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, placa, tipo, kmAtual, status } = req.body;
    console.log(`[${new Date().toISOString()}] Atualizando veículo ID: ${id}`);

    // Verifica se veículo existe
    const veiculoExistente = await prisma.veiculo.findUnique({
      where: { id: Number(id) }
    });

    if (!veiculoExistente) {
      return setCorsHeaders(res)
        .status(404)
        .json({ error: "Veículo não encontrado" });
    }

    // Se estiver atualizando a placa, valida formato e duplicidade
    if (placa && placa !== veiculoExistente.placa) {
      const placaFormatada = placa.toUpperCase();
      
      if (!validarPlaca(placaFormatada)) {
        return setCorsHeaders(res)
          .status(400)
          .json({ error: "Formato de placa inválido. Use: ABC-1234" });
      }

      const placaExistente = await prisma.veiculo.findUnique({
        where: { placa: placaFormatada }
      });

      if (placaExistente) {
        return setCorsHeaders(res)
          .status(400)
          .json({ error: "Placa já cadastrada" });
      }
    }

    const veiculo = await prisma.veiculo.update({
      where: { id: Number(id) },
      data: { 
        nome, 
        placa: placa ? placa.toUpperCase() : undefined, 
        tipo, 
        kmAtual: kmAtual ? Number(kmAtual) : undefined,
        status 
      }
    });

    console.log(`[${new Date().toISOString()}] Veículo atualizado: ${id}`);
    return setCorsHeaders(res).json(veiculo);
  } catch (error) {
    if (error.code === 'P2025') {
      return setCorsHeaders(res)
        .status(404)
        .json({ error: "Veículo não encontrado" });
    }
    return handleError(res, error, "Erro ao atualizar veículo");
  }
};

export const deleteVeiculo = async (req, res) => {
  try {
    const veiculoId = parseInt(req.params.id);
    if (isNaN(veiculoId)) {
      return setCorsHeaders(res)
        .status(400)
        .json({ error: "ID do veículo inválido" });
    }

    console.log(`[${new Date().toISOString()}] Excluindo veículo ID: ${veiculoId}`);

    // Verifica se existem registros na portaria vinculados a este veículo
    const registrosVinculados = await prisma.registroPortaria.findFirst({
      where: { veiculoId }
    });

    if (registrosVinculados) {
      console.log(`[${new Date().toISOString()}] Falha ao excluir: veículo possui registros vinculados`);
      return setCorsHeaders(res)
        .status(400)
        .json({ 
          error: "Não é possível excluir veículo com registros de portaria vinculados" 
        });
    }

    await prisma.veiculo.delete({ 
      where: { id: veiculoId } 
    });
    
    console.log(`[${new Date().toISOString()}] Veículo excluído: ${veiculoId}`);
    return setCorsHeaders(res).json({ message: "Veículo excluído com sucesso" });
  } catch (error) {
    if (error.code === 'P2025') {
      return setCorsHeaders(res)
        .status(404)
        .json({ error: "Veículo não encontrado" });
    }
    return handleError(res, error, "Erro ao excluir veículo");
  }
};

export const updateKmVeiculo = async (req, res) => {
  try {
    const { id } = req.params;
    const { kmAtual } = req.body;
    console.log(`[${new Date().toISOString()}] Atualizando KM do veículo ID: ${id}`);

    if (!kmAtual || isNaN(kmAtual) || kmAtual < 0) {
      return setCorsHeaders(res)
        .status(400)
        .json({ error: "KM atual deve ser um número positivo" });
    }

    const veiculo = await prisma.veiculo.update({
      where: { id: Number(id) },
      data: { kmAtual: Number(kmAtual) }
    });

    console.log(`[${new Date().toISOString()}] KM atualizado para ${kmAtual} no veículo ${id}`);
    return setCorsHeaders(res).json(veiculo);
  } catch (error) {
    if (error.code === 'P2025') {
      return setCorsHeaders(res)
        .status(404)
        .json({ error: "Veículo não encontrado" });
    }
    return handleError(res, error, "Erro ao atualizar KM do veículo");
  }
};

export const getVeiculosStatus = async (req, res) => {
  try {
    const { status } = req.params;
    if (!status) {
      return setCorsHeaders(res)
        .status(400)
        .json({ error: "Status é obrigatório" });
    }

    console.log(`[${new Date().toISOString()}] Buscando veículos com status: ${status}`);
    
    const veiculos = await prisma.veiculo.findMany({
      where: { status: status.toUpperCase() },
      orderBy: { nome: 'asc' }
    });

    console.log(`[${new Date().toISOString()}] ${veiculos.length} veículos encontrados com status ${status}`);
    return setCorsHeaders(res).json(veiculos);
  } catch (error) {
    return handleError(res, error, "Erro ao buscar veículos por status");
  }
};

export const getEstatisticasVeiculos = async (req, res) => {
  try {
    console.log(`[${new Date().toISOString()}] Gerando estatísticas de veículos`);

    const [
      totalVeiculos,
      veiculosAtivos,
      veiculosManutencao,
      veiculosInativos,
      resultadoKm
    ] = await Promise.all([
      prisma.veiculo.count(),
      prisma.veiculo.count({ where: { status: 'ATIVO' } }),
      prisma.veiculo.count({ where: { status: 'MANUTENCAO' } }),
      prisma.veiculo.count({ where: { status: 'INATIVO' } }),
      prisma.veiculo.aggregate({
        _avg: { kmAtual: true },
        where: { status: 'ATIVO' }
      })
    ]);

    const estatisticas = {
      totalVeiculos,
      veiculosAtivos,
      veiculosManutencao,
      veiculosInativos,
      kmMedio: resultadoKm._avg.kmAtual || 0
    };

    console.log(`[${new Date().toISOString()}] Estatísticas geradas:`, estatisticas);
    return setCorsHeaders(res).json(estatisticas);
  } catch (error) {
    return handleError(res, error, "Erro ao gerar estatísticas de veículos");
  }
};

// Error handling para rejeições não tratadas
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

// Exportação padrão para facilitar a importação
export default {
  getVeiculos,
  getVeiculo,
  createVeiculo,
  updateVeiculo,
  deleteVeiculo,
  updateKmVeiculo,
  getVeiculosStatus,
  getEstatisticasVeiculos
};