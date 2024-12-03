import { findUserByEmail, createUser, validatePassword } from '../services/authService.js';

export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await findUserByEmail(email);
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isValid = validatePassword(password, user.password);
        if (!isValid) return res.status(400).json({ error: 'Invalid credentials' });
        const userModules = JSON.parse(user.modules);

        req.session.user = { id: user.id, name: user.name, email: user.email, role: user.role, modules: userModules,};
        res.redirect('/home');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        await createUser({ name, email, password });
        res.redirect('/auth/login');
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

export const logout = (req, res) => {
    req.session.destroy(() => {
        res.redirect('/');
    });
};

