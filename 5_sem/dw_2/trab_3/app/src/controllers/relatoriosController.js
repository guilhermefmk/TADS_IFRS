export const getRelatorios = (req, res) => {
    res.render('relatorios', { user: req.session.user });
};
