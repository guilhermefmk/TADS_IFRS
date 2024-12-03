export const renderErrorPage = (req, res) => {
    const moduleName = req.query.module || 'DESCONHECIDO'; // Define um nome padrão se não houver módulo
    res.render('error', { moduleName: moduleName.toUpperCase() }); // Passa o nome do módulo em maiúsculas
};
