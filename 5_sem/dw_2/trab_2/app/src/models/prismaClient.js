import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'], // Configuração para logs no console
});

// Listener para fechar a conexão com o banco de dados ao encerrar o processo
process.on('SIGINT', async () => {
    await prisma.$disconnect();
    console.log('Prisma Client desconectado do banco de dados');
    process.exit(0);
});

export { prisma };
