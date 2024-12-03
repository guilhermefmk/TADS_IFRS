
export const checkPermission = (moduleName) => {
    return (req, res, next) => {
        const { user } = req.session;
        console.log('user', user);
        // Verifica se o usuário é SUPERUSER ou ADMIN, ou se tem acesso explícito ao módulo
        if (
            user.role === 'SUPERUSER' ||
            user.role === 'ADMIN' ||
            (user.modules && user.modules.includes(moduleName.toUpperCase()))
        ) {
            return next(); // Permite o acesso
        }

                // Se não tiver permissão, registra o acesso como 'denied' no banco
        const status = 'denied';
        const url = req.originalUrl;

        // Registra o acesso negado no banco antes de alterar o status
        prisma.accessLog.create({
            data: {
                userId: user.userId,
                url: url,
                status: status,
            },
        }).catch(error => console.error('Erro ao registrar o acesso negado:', error));

        // Redireciona para a página de erro, passando o nome do módulo na query
        res.status(403);
        res.redirect(`/${moduleName}/error?module=${moduleName}`);
    };
};
