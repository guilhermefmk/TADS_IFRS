import { prisma } from '../models/prismaClient.js';
import bcrypt from 'bcrypt';
import multer from 'multer';
import path from 'path';

// Configuração do multer para upload de imagens
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 }, // Limite de 5MB
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
            return cb(new Error('Somente arquivos JPG, JPEG e PNG são permitidos.'));
        }
        cb(null, true);
    }
});

// Exibe o perfil do usuário
export const getProfile = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: { email: req.session.user.email },
    });
    
    res.render('perfil', { user });
};

// Atualiza o perfil do usuário
export const updateProfile = async (req, res) => {
    const { name, email } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Verificar se a senha foi alterada e fazer a criptografia novamente
    let updatedUserData = { name, email };
    if (req.body.password) {
        updatedUserData.password = bcrypt.hashSync(process.env.HASH_SECRET + req.body.password, 10);
    }
    if (imageUrl) {
        updatedUserData.imageUrl = imageUrl;
    }

    try {
        await prisma.user.update({
            where: { email: req.session.user.email },
            data: updatedUserData,
        });
        res.redirect('/perfil');
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro ao atualizar o perfil.');
    }
};

// Middleware para fazer o upload da imagem de perfil
export const uploadImage = upload.single('image');
