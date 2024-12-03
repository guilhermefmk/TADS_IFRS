import express from 'express';
import { getProfile, updateProfile, uploadImage } from '../controllers/perfilController.js';
import { isAuth } from '../middlewares/is-auth.js';  // Garantir que o usuário esteja autenticado

const router = express.Router();

// Exibir o perfil (somente para usuários autenticados)
router.get('/', isAuth, getProfile);

// Atualizar o perfil (somente para usuários autenticados)
router.post('/', isAuth, uploadImage, updateProfile);

export default router;
