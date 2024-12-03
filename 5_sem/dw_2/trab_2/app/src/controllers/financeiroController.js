export const getFinanceiro = (req, res) => {
    res.render('financeiro', { user: req.session.user });
};
