// backend/src/routes/usuarios.js
const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');
const { verifyToken, checkRole } = require('../middleware/auth');

const prisma = new PrismaClient();

// GET /api/usuarios - Lista todos os usuários (apenas admin)
router.get('/', verifyToken, checkRole(['ADMIN']), async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany({
      select: {
        id: true,
        nome: true,
        email: true,
        perfil: true,
        status: true,
        senha: false
      }
    });
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// GET /api/usuarios/:id - Busca um usuário específico
router.get('/:id', verifyToken, checkRole(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;
    const usuario = await prisma.usuario.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        nome: true,
        email: true,
        perfil: true,
        status: true
      }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(500).json({ error: 'Erro ao buscar usuário' });
  }
});

// POST /api/usuarios - Cria um novo usuário
router.post('/', verifyToken, checkRole(['ADMIN']), async (req, res) => {
  try {
    const { nome, email, senha, perfil } = req.body;

    // Validação básica
    if (!nome || !email || !senha || !perfil) {
      return res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    }

    // Verifica se o email já existe
    const usuarioExistente = await prisma.usuario.findUnique({
      where: { email }
    });

    if (usuarioExistente) {
      return res.status(400).json({ error: 'Email já cadastrado' });
    }

    // Criptografa a senha
    const senhaHash = await bcrypt.hash(senha, 10);

    const novoUsuario = await prisma.usuario.create({
      data: {
        nome,
        email,
        senha: senhaHash,
        perfil,
        status: 'Ativo'
      },
      select: {
        id: true,
        nome: true,
        email: true,
        perfil: true,
        status: true
      }
    });

    res.status(201).json(novoUsuario);
  } catch (error) {
    console.error('Erro ao criar usuário:', error);
    res.status(500).json({ error: 'Erro ao criar usuário' });
  }
});

// PUT /api/usuarios/:id - Atualiza um usuário
router.put('/:id', verifyToken, checkRole(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, perfil } = req.body;

    // Verifica se o usuário existe
    const usuario = await prisma.usuario.findUnique({
      where: { id: parseInt(id) }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Atualiza os dados
    const usuarioAtualizado = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: {
        nome,
        email,
        perfil
      },
      select: {
        id: true,
        nome: true,
        email: true,
        perfil: true,
        status: true
      }
    });

    res.json(usuarioAtualizado);
  } catch (error) {
    console.error('Erro ao atualizar usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar usuário' });
  }
});

// PATCH /api/usuarios/:id/status - Atualiza o status do usuário
router.patch('/:id/status', verifyToken, checkRole(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['Ativo', 'Inativo'].includes(status)) {
      return res.status(400).json({ error: 'Status inválido' });
    }

    const usuario = await prisma.usuario.update({
      where: { id: parseInt(id) },
      data: { status },
      select: {
        id: true,
        nome: true,
        email: true,
        perfil: true,
        status: true
      }
    });

    res.json(usuario);
  } catch (error) {
    console.error('Erro ao atualizar status do usuário:', error);
    res.status(500).json({ error: 'Erro ao atualizar status do usuário' });
  }
});

// DELETE /api/usuarios/:id - Remove um usuário
router.delete('/:id', verifyToken, checkRole(['ADMIN']), async (req, res) => {
  try {
    const { id } = req.params;

    // Verifica se o usuário existe
    const usuario = await prisma.usuario.findUnique({
      where: { id: parseInt(id) }
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    // Não permite excluir o próprio usuário
    if (usuario.id === req.userId) {
      return res.status(400).json({ error: 'Você não pode excluir seu próprio usuário' });
    }

    await prisma.usuario.delete({
      where: { id: parseInt(id) }
    });

    res.status(204).send();
  } catch (error) {
    console.error('Erro ao excluir usuário:', error);
    res.status(500).json({ error: 'Erro ao excluir usuário' });
  }
});

module.exports = router;