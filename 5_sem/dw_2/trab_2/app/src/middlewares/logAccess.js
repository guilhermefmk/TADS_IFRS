import { prisma } from '../models/prismaClient.js';

export const logAccess = async (req, res, next) => {
    const user = req.session.user; // Acessa o usuário logado
    if (user) {
        // O usuário está logado
        const url = req.originalUrl; // URL acessada
        const status = res.statusCode === 200 ? 'allowed' : 'denied'; // Se o código de status for 200 = 'allowed', caso contrário 'denied'
        console.log(res.statusCode, status);
        try {
            // Registra o acesso no banco de dados
            await prisma.accessLog.create({
                data: {
                    userId: user.id,  // ID do usuário
                    url: url,              // URL acessada
                    status: status,        // Status de acesso
                },
            });
        } catch (error) {
            console.error('Erro ao registrar o acesso:', error);
        }
    }

    next(); // Passa para o próximo middleware ou rota
};
