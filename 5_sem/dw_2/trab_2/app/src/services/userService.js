import { prisma } from '../models/prismaClient.js';
import bcrypt from 'bcrypt';

export const findAllUsers = async () => {
    const users = await prisma.user.findMany({
        select: {
            id: true,
            email: true,
            name: true,
            role: true,
            modules: true,
            imageUrl: true,
        },
    });

    // Converte os módulos de string JSON para array
    users.forEach(user => {
        if (user.modules) {
            user.modules = JSON.parse(user.modules);
        }
    });

    return users;
};

export const findUserById = async (id) => {
    return await prisma.user.findUnique({
        where: { id: parseInt(id) },
        include: { endereco: true },
    });
};

export const updateUserById = async (id, userData) => {
    const { name, email, role, password, modules } = userData;

    // Processar os módulos selecionados
    let processedModules = [];
    if (modules) {
        const modulesArray = Array.isArray(modules) ? modules : [modules];
        processedModules = modulesArray.map(module =>
            module.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
        );
    }

    const modulesJson = JSON.stringify(processedModules);

    // Criptografar a senha, se fornecida
    const updatedUserData = {
        name,
        email,
        role,
        modules: modulesJson,
    };

    if (password) {
        updatedUserData.password = bcrypt.hashSync(process.env.HASH_SECRET + password, 10);
    }

    // Atualizar no banco
    return await prisma.user.update({
        where: { id: parseInt(id) },
        data: updatedUserData,
    });
};

export const createUser = async (userData) => {
    const { name, email, role, password, modules } = userData;

    // Processar os módulos selecionados
    let processedModules = [];
    if (modules) {
        const modulesArray = Array.isArray(modules) ? modules : [modules];
        processedModules = modulesArray.map(module =>
            module.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toUpperCase()
        );
    }

    const hashedPassword = bcrypt.hashSync(process.env.HASH_SECRET + password, 10);

    return await prisma.user.create({
        data: {
            name,
            email,
            role,
            password: hashedPassword,
            modules: JSON.stringify(processedModules),
        },
    });
};
