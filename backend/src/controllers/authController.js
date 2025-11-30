import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { setCorsHeaders, handleOptions } from '../utils/corsUtils.js';

// Create a single PrismaClient instance for the entire application
const prisma = new PrismaClient();

export const login = async (req, res) => {
  try {
    console.log('Login attempt with:', { email: req.body.email });
    const { email, senha } = req.body;

    if (!email || !senha) {
      console.log('Missing email or password');
      return setCorsHeaders(res)
        .status(400)
        .json({ error: "E-mail e senha são obrigatórios" });
    }

    console.log('Looking up user in database...');
    const usuario = await prisma.usuario.findUnique({ 
      where: { email } 
    }).catch(error => {
      console.error('Database error:', error);
      throw new Error('Erro ao buscar usuário no banco de dados');
    });

    if (!usuario) {
      console.log('User not found');
      return setCorsHeaders(res)
        .status(401)
        .json({ error: "Credenciais inválidas" });
    }

    console.log('User found, checking password...');
    const senhaValida = await bcrypt.compare(senha, usuario.senha).catch(error => {
      console.error('Password comparison error:', error);
      throw new Error('Erro ao validar senha');
    });

    if (!senhaValida) {
      console.log('Invalid password');
      return setCorsHeaders(res)
        .status(401)
        .json({ error: "Credenciais inválidas" });
    }

    console.log('Generating JWT token...');
    const token = jwt.sign(
      { userId: usuario.id, role: usuario.role },
      process.env.JWT_SECRET || 'fallback_secret',
      { expiresIn: "8h" }
    );

    console.log('Login successful');
    return setCorsHeaders(res).json({
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        role: usuario.role
      }
    });
  } catch (error) {
    console.error('Error in login controller:', error);
    return setCorsHeaders(res)
      .status(500)
      .json({ 
        error: "Erro interno do servidor",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
  }
};

export const getProfile = async (req, res) => {
  try {
    if (!req.userId) {
      return setCorsHeaders(res)
        .status(401)
        .json({ error: "Não autorizado" });
    }

    const usuario = await prisma.usuario.findUnique({
      where: { id: req.userId },
      select: { 
        id: true, 
        nome: true, 
        email: true, 
        role: true 
      }
    }).catch(error => {
      console.error('Database error in getProfile:', error);
      throw new Error('Erro ao buscar perfil do usuário');
    });

    if (!usuario) {
      console.log('User profile not found');
      return setCorsHeaders(res)
        .status(404)
        .json({ error: "Usuário não encontrado" });
    }

    console.log('Profile retrieved successfully');
    return setCorsHeaders(res).json(usuario);
  } catch (error) {
    console.error('Error in getProfile:', error);
    return setCorsHeaders(res)
      .status(500)
      .json({ 
        error: "Erro interno do servidor",
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
  }
};

// Handle Prisma disconnects on server shutdown
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});