// backend/src/routes/portariaRoutes.js
import { Router } from 'express';
import { criarPortaria } from '../controllers/portariaController.js';
import { verificarToken } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/', verificarToken, criarPortaria);

router.get('/veiculos/:veiculoId/ultimo-registro', authMiddleware, portariaController.getUltimoRegistro);


export default router;