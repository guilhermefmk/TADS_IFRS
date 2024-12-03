const isAdmin = (moduleName) => {
    return (req, res, next) => {
        const { user } = req.session;

        // Verifica se o usuário é SUPERUSER ou ADMIN
        if (
            user.role === 'SUPERUSER' ||
            user.role === 'ADMIN'
        ) {
            return next(); // Permite o acesso
        }

        // Caso contrário, redireciona para a página de erro com o nome do módulo
        res.status(403).redirect(`/${moduleName}/error?module=${moduleName}`);
    };
};

export { isAdmin };
