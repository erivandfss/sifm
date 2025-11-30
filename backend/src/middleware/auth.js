// backend/src/middleware/auth.js
import jwt from 'jsonwebtoken';

// Middleware de autenticação
export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ 
      error: 'Token de acesso não fornecido',
      code: 'TOKEN_MISSING'
    });
  }

  const parts = authHeader.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ 
      error: 'Formato de token inválido',
      code: 'INVALID_TOKEN_FORMAT'
    });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ 
      error: 'Formato de token inválido',
      code: 'INVALID_TOKEN_SCHEME'
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'seu_segredo_secreto');
    
    // Adiciona informações do usuário à requisição
    req.userId = decoded.userId;
    req.userRole = decoded.role;
    
    next();
  } catch (error) {
    console.error('Erro na verificação do token:', error);
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ 
        error: 'Token expirado',
        code: 'TOKEN_EXPIRED'
      });
    }
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ 
        error: 'Token inválido',
        code: 'INVALID_TOKEN'
      });
    }
    
    return res.status(500).json({ 
      error: 'Erro na autenticação',
      code: 'AUTH_ERROR',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Middleware para verificar se é admin
export const adminMiddleware = (req, res, next) => {
  if (req.userRole !== 'ADMIN') {
    return res.status(403).json({ 
      error: 'Acesso negado. Permissão de administrador necessária.',
      code: 'ADMIN_ACCESS_REQUIRED'
    });
  }
  next();
};

// Middleware para verificar se o usuário tem uma das roles permitidas
export const checkRole = (allowedRoles = []) => {
  return (req, res, next) => {
    if (!req.userRole) {
      return res.status(401).json({ 
        error: 'Não autenticado',
        code: 'NOT_AUTHENTICATED'
      });
    }

    if (!Array.isArray(allowedRoles)) {
      allowedRoles = [allowedRoles];
    }

    if (allowedRoles.length > 0 && !allowedRoles.includes(req.userRole)) {
      return res.status(403).json({ 
        error: 'Acesso negado. Permissões insuficientes.',
        code: 'INSUFFICIENT_PERMISSIONS',
        requiredRoles: allowedRoles,
        userRole: req.userRole
      });
    }

    next();
  };
};

// Middleware para verificar se o usuário está ativo
export const checkUserStatus = async (req, res, next) => {
  try {
    const { PrismaClient } = await import('@prisma/client');
    const prisma = new PrismaClient();
    
    const user = await prisma.usuario.findUnique({
      where: { id: req.userId },
      select: { status: true }
    });

    if (!user || user.status !== 'ATIVO') {
      return res.status(403).json({ 
        error: 'Conta inativa ou suspensa',
        code: 'ACCOUNT_INACTIVE'
      });
    }

    next();
  } catch (error) {
    console.error('Erro ao verificar status do usuário:', error);
    return res.status(500).json({ 
      error: 'Erro ao verificar status do usuário',
      code: 'USER_STATUS_CHECK_FAILED'
    });
  }
};

// Middleware para verificar se o usuário é o dono do recurso ou admin
export const checkOwnership = (modelName, idField = 'id', ownerField = 'userId') => {
  return async (req, res, next) => {
    try {
      const { PrismaClient } = await import('@prisma/client');
      const prisma = new PrismaClient();
      
      const resourceId = req.params[idField];
      
      const resource = await prisma[modelName].findUnique({
        where: { id: resourceId }
      });

      if (!resource) {
        return res.status(404).json({ 
          error: 'Recurso não encontrado',
          code: 'RESOURCE_NOT_FOUND'
        });
      }

      // Se for admin, permite o acesso
      if (req.userRole === 'ADMIN') {
        return next();
      }

      // Verifica se o usuário é o dono do recurso
      if (resource[ownerField] !== req.userId) {
        return res.status(403).json({ 
          error: 'Acesso negado. Você não tem permissão para acessar este recurso.',
          code: 'RESOURCE_OWNERSHIP_REQUIRED'
        });
      }

      next();
    } catch (error) {
      console.error('Erro ao verificar propriedade do recurso:', error);
      return res.status(500).json({ 
        error: 'Erro ao verificar permissões',
        code: 'OWNERSHIP_CHECK_FAILED'
      });
    }
  };
};