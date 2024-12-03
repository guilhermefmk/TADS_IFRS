import { getAllUsers } from '../services/homeService.js';

export const getHome = async (req, res) => {
    try {
        const loggedInUser = req.session.user; // Usuário logado
        const users = await getAllUsers(); // Chama o serviço para buscar todos os usuários

        // Módulos disponíveis para o usuário logado
        const userModules = loggedInUser.modules || [];

        res.render('home', { users, loggedInUser, userModules });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erro ao carregar a página inicial' });
    }
};

export const healthCheck = (req, res) => {
    res.send('OK');
};
