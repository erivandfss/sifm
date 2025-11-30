// backend/src/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');
const { setCorsHeaders, handleOptions } = require('../utils/corsUtils');

const prisma = new PrismaClient();

// Middleware para lidar com CORS
router.use(handleOptions);
router.use(setCorsHeaders);

// POST /api/auth/login - Autenticação de usuário
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    console.log('Tentativa de login para:', email);

    // Validação básica
    if (!email || !senha) {
      return res.status(400).json({ error: 'E-mail e senha são obrigatórios' });
    }

    // Busca o usuário no banco de dados
    const usuario = await prisma.usuario.findUnique({
      where: { email }
    });

    if (!usuario) {
      console.log('Usuário não encontrado para o email:', email);
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verifica a senha
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      console.log('Senha inválida para o usuário:', email);
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Gera o token JWT
    const token = jwt.sign(
      { 
        userId: usuario.id,
        role: usuario.perfil
      }, 
      process.env.JWT_SECRET || 'seu_segredo_secreto',
      { expiresIn: '8h' }
    );

    console.log('Login bem-sucedido para o usuário:', email);
    
    // Retorna os dados do usuário (sem a senha) e o token
    const { senha: _, ...usuarioSemSenha } = usuario;
    res.json({
      token,
      usuario: usuarioSemSenha
    });

  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ 
      error: 'Erro ao realizar login',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// GET /api/auth/me - Retorna os dados do usuário autenticado
router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'seu_segredo_secreto');

    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.userId },
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
    console.error('Erro ao buscar dados do usuário:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }
    
    res.status(500).json({ 
      error: 'Erro ao buscar dados do usuário',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/auth/refresh - Renova o token (opcional)
router.post('/refresh', async (req, res) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({ error: 'Refresh token é obrigatório' });
    }

    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET || 'seu_refresh_secreto');
    
    // Verifica se o usuário ainda existe
    const usuario = await prisma.usuario.findUnique({
      where: { id: decoded.userId }
    });

    if (!usuario) {
      return res.status(401).json({ error: 'Usuário não encontrado' });
    }

    // Gera um novo token
    const newToken = jwt.sign(
      { 
        userId: usuario.id,
        role: usuario.perfil
      }, 
      process.env.JWT_SECRET || 'seu_segredo_secreto',
      { expiresIn: '8h' }
    );

    res.json({ token: newToken });
  } catch (error) {
    console.error('Erro ao renovar token:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Refresh token inválido' });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Refresh token expirado' });
    }
    
    res.status(500).json({ 
      error: 'Erro ao renovar token',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// POST /api/auth/logout - Invalida o token (opcional)
router.post('/logout', (req, res) => {
  // Em uma implementação real, você pode adicionar o token a uma lista negra
  // ou usar um mecanismo de blacklist de tokens
  res.json({ message: 'Logout realizado com sucesso' });
});

module.exports = router;