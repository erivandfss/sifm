// backend/src/routes/routes.js
import { Router } from 'express';
import { 
  getVeiculos, 
  getVeiculo, 
  createVeiculo, 
  updateVeiculo, 
  deleteVeiculo, 
  updateKmVeiculo, 
  getVeiculosStatus, 
  getEstatisticasVeiculos 
} from '../controllers/veiculosController.js';

import { login, getProfile } from '../controllers/authController.js';

const router = Router();

// Rotas Públicas
router.post('/auth/login', login);

// Middleware de autenticação (protege as rotas abaixo)
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }
    req.user = user;
    next();
  });
};

// Rotas Protegidas
router.get('/auth/me', authenticateToken, getProfile);

// Rotas de Veículos
router.get('/veiculos', authenticateToken, getVeiculos);
router.get('/veiculos/estatisticas', authenticateToken, getEstatisticasVeiculos);
router.get('/veiculos/status/:status', authenticateToken, getVeiculosStatus);
router.get('/veiculos/:id', authenticateToken, getVeiculo);
router.post('/veiculos', authenticateToken, createVeiculo);
router.put('/veiculos/:id', authenticateToken, updateVeiculo);
router.delete('/veiculos/:id', authenticateToken, deleteVeiculo);
router.patch('/veiculos/:id/km', authenticateToken, updateKmVeiculo);

export default router;