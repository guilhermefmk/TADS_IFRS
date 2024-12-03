import express from 'express';
import { isAuth } from '../middlewares/is-auth.js';  // Verifica se o usuário está autenticado
import { checkPermission } from '../middlewares/checkPermission.js';  // Middleware de permissão
import { getFinanceiro } from '../controllers/financeiroController.js';
import { renderErrorPage } from '../controllers/errorController.js';

const router = express.Router();

// Página de erro
router.get('/error', renderErrorPage);

// Rota para o módulo financeiro
router.get('/', isAuth, checkPermission('Financeiro'), getFinanceiro);

export default router;
