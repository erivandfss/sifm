import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

export const getUsuarios = async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: { 
        id: true, 
        nome: true, 
        email: true, 
        role: true, 
        status: true,
        createdAt: true 
      },
      orderBy: { nome: 'asc' }
    });
    res.json(usuarios);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuários" });
  }
};

export const getUsuario = async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({
      where: { id: Number(req.params.id) },
      select: { 
        id: true, 
        nome: true, 
        email: true, 
        role: true, 
        status: true 
      }
    });

    if (!usuario) {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao buscar usuário" });
  }
};

export const createUsuario = async (req, res) => {
  try {
    const { nome, email, senha, role } = req.body;

    if (!nome || !email || !senha || !role) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }

    // Verifica se email já existe
    const emailExistente = await prisma.usuario.findUnique({
      where: { email }
    });

    if (emailExistente) {
      return res.status(400).json({ error: "E-mail já cadastrado" });
    }

    const usuario = await prisma.usuario.create({
      data: { 
        nome, 
        email, 
        senha: bcrypt.hashSync(senha, 10),
        role,
        status: 'ATIVO'
      },
      select: { 
        id: true, 
        nome: true, 
        email: true, 
        role: true, 
        status: true 
      }
    });

    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Erro ao criar usuário" });
  }
};

export const updateUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, role, status } = req.body;

    const usuario = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { nome, email, role, status },
      select: { 
        id: true, 
        nome: true, 
        email: true, 
        role: true, 
        status: true 
      }
    });

    res.json(usuario);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.status(500).json({ error: "Erro ao atualizar usuário" });
  }
};

export const deleteUsuario = async (req, res) => {
  try {
    await prisma.usuario.delete({ 
      where: { id: Number(req.params.id) } 
    });
    res.json({ message: "Usuário excluído com sucesso" });
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.status(500).json({ error: "Erro ao excluir usuário" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const usuario = await prisma.usuario.update({
      where: { id: Number(id) },
      data: { status },
      select: { 
        id: true, 
        nome: true, 
        email: true, 
        role: true, 
        status: true 
      }
    });

    res.json(usuario);
  } catch (error) {
    if (error.code === 'P2025') {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.status(500).json({ error: "Erro ao atualizar status" });
  }
};