import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const isAuth = (req, res, next) => {
    // Verifica se o usuário não está logado
    if (!req.session.user || !req.session.user.email || !req.session.user.role) {
        // Se não estiver logado, redireciona para a tela de login
        return res.redirect('/auth/login');  // Ou qualquer rota de login ou registro que você tenha
    }

    // Se o usuário estiver logado, permite o acesso à rota
    next();
};

export { isAuth };