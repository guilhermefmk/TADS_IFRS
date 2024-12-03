import {
    findAllUsers,
    findUserById,
    updateUserById,
    createUser as createUserService,
} from '../services/userService.js';

export const getAllUsers = async (req, res) => {
    try {
        const users = await findAllUsers();
        res.render('users-listagem', { users, user: req.session.user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao carregar os usuários' });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await findUserById(id);
        if (!user) return res.status(404).json({ error: 'Usuário não encontrado' });
        res.render('detalhar-usuario', { user });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao carregar o usuário' });
    }
};

export const getUserEditForm = async (req, res) => {
    const { id } = req.params;

    try {
        const userToEdit = await findUserById(id);

        if (!userToEdit) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        const loggedInUser = req.session.user;

        if (
            (loggedInUser.role === 'ADMIN' && userToEdit.role !== 'USER') ||
            (loggedInUser.role === 'SUPERUSER' && userToEdit.role === 'SUPERUSER')
        ) {
            return res.status(403).json({ error: 'Você não tem permissão para editar este usuário.' });
        }

        res.render('edit-user', { user: userToEdit });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao carregar o formulário de edição.' });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, role, password, modules } = req.body;

    try {
        await updateUserById(id, { name, email, role, password, modules });
        res.redirect('/users');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao atualizar o usuário' });
    }
};

export const getCreateUserForm = (req, res) => {
    res.render('create-user', { loggedInUser: req.session.user });
};

export const createUser = async (req, res) => {
    const { name, email, role, password, modules } = req.body;

    try {
        if (req.session.user.role === 'ADMIN' && (role === 'ADMIN' || role === 'SUPERUSER')) {
            return res.status(403).json({ error: 'Administradores não podem criar outros administradores ou superusuários.' });
        }

        await createUserService({ name, email, role, password, modules });
        res.redirect('/users');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao criar o usuário' });
    }
};
