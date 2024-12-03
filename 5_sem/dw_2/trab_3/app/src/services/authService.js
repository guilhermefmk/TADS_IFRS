import bcrypt from 'bcrypt';
import { prisma } from '../models/prismaClient.js';

export const findUserByEmail = async (email) => {
    try {
        return await prisma.user.findUnique({ where: { email } });
    } catch (error) {
        console.error(error);
        throw new Error('Error finding user by email');
    }
};

export const createUser = async ({ name, email, password }) => {
    try {
        const encryptedPassword = bcrypt.hashSync(process.env.HASH_SECRET + password, 10);
        return await prisma.user.create({
            data: { name, email, password: encryptedPassword },
        });
    } catch (error) {
        console.error(error);
        throw new Error('Error creating user');
    }
};

export const validatePassword = (password, encryptedPassword) => {
    return bcrypt.compareSync(process.env.HASH_SECRET + password, encryptedPassword);
};
