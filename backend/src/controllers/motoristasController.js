import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getMotoristas = async (req, res) => {
  try {
    const motoristas = await prisma.motorista.findMany({
      orderBy: { nome: 'asc' }
    });
    res.json(motoristas);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar motoristas" });
  }
};

export const getMotorista = async (req, res) => {
  try {
    const motorista = await prisma.motorista.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!motorista) {
      return res.status(404).json({ error: "Motorista não encontrado" });
    }

    res.json(motorista);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar motorista" });
  }
};

export const createMotorista = async (req, res) => {
  try {
    const { nome, cnh, validadeCnh, telefone } = req.body;

    if (!nome || !cnh || !validadeCnh) {
      return res.status(400).json({ error: "Nome, CNH e validade são obrigatórios" });
    }

    // Verifica se CNH já existe
    const cnhExistente = await prisma.motorista.findUnique({
      where: { cnh }
    });

    if (cnhExistente) {
      return res.status(400).json({ error: "CNH já cadastrada" });
    }

    const motorista = await prisma.motorista.create({
      data: { 
        nome, 
        cnh, 
        validadeCnh: new Date(validadeCnh), 
        telefone 
      }
    });

    res.status(201).json(motorista);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar motorista" });
  }
};

export const updateMotorista = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, cnh, validadeCnh, telefone } = req.body;

    const motorista = await prisma.motorista.update({
      where: { id: Number(id) },
      data: { 
        nome, 
        cnh, 
        validadeCnh: validadeCnh ? new Date(validadeCnh) : undefined, 
        telefone 
      }
    });

    res.json(motorista);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Motorista não encontrado" });
    }
    res.status(500).json({ error: "Erro ao atualizar motorista" });
  }
};

export const deleteMotorista = async (req, res) => {
  try {
    await prisma.motorista.delete({ 
      where: { id: Number(req.params.id) } 
    });
    res.json({ message: "Motorista excluído com sucesso" });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Motorista não encontrado" });
    }
    res.status(500).json({ error: "Erro ao excluir motorista" });
  }
};