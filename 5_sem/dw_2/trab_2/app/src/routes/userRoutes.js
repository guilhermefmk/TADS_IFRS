import express from 'express';
import { createUser, getAllUsers, getCreateUserForm, getUserById, getUserEditForm, updateUser} from '../controllers/userController.js';
import { isAuth } from '../middlewares/is-auth.js';
import { isAdmin } from '../middlewares/is-admin.js';
import { renderErrorPage } from '../controllers/errorController.js';

const router = express.Router();

router.get('/error', renderErrorPage);
router.get('/', isAuth, isAdmin("users"), getAllUsers);

// Rota para editar usuário (formulário)
router.get('/:id/edit', isAuth, isAdmin('users'), getUserEditForm);

// Rota para atualizar usuário (enviar o formulário)
router.post('/:id/edit', isAuth, isAdmin('users'), updateUser);

router.get('/new', isAuth, isAdmin('users'), getCreateUserForm);
router.post('/new', isAuth, isAdmin('users'), createUser);

router.get('/:id', getUserById);

export default router;





