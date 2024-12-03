import { prisma } from '../models/prismaClient.js';

export const getAllUsers = async () => {
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
            user.modules = JSON.parse(user.modules); // Converte a string JSON para um array
        }
    });

    return users;
};
