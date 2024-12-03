import express from 'express';
import { isAuth } from '../middlewares/is-auth.js';  // Garantir que o usuário esteja autenticado
import { getRelatorios } from '../controllers/relatoriosController.js';
import { renderErrorPage } from '../controllers/errorController.js';
import { checkPermission } from '../middlewares/checkPermission.js';  // Middleware de permissão

const router = express.Router();

/// Página de erro
router.get('/error', renderErrorPage);

// Rota para o módulo financeiro
router.get('/', isAuth, checkPermission('Relatorios'), getRelatorios);

export default router;
