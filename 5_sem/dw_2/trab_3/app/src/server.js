import express from 'express';
import session from 'express-session';
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import homeRoutes from './routes/homeRoutes.js';
import perfilRoutes from './routes/perfilRoutes.js';
import financeiroRoutes from './routes/financeiroRoutes.js';
import relatoriosRoutes from './routes/relatoriosRoutes.js';
import produtosRoutes from './routes/produtosRoutes.js';
import { prisma } from './models/prismaClient.js';
import path from 'path'; 

import dotenv from 'dotenv';
import { logAccess } from './middlewares/logAccess.js';
const NODE_ENV = process.env.NODE_ENV;

if (NODE_ENV === 'development') {
    console.log("Running in development mode");
    dotenv.config({ path: '.env.development' });
} else if (NODE_ENV === 'production') {
    console.log("Running in production mode");
    dotenv.config({ path: '.env.production' });
}

console.log({
    ENV: process.env.NODE_ENV,
    PORT: process.env.PORT,
    DATABASE_URL: process.env.DATABASE_URL,
    APP_SECRET: process.env.APP_SECRET,
    HASH_SECRET: process.env.HASH_SECRET,
    AWS_ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
    AWS_SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
})

const app = express();

// Usar import.meta.url para obter o diretório atual
const __dirname = path.dirname(new URL(import.meta.url).pathname);


// Configuração da engine de visualização
app.set('view engine', 'ejs');  // Define EJS como a engine de template
app.set('views', path.join(__dirname, 'views'));  // Define a pasta onde as views estão localizadas


// Configurações globais
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: process.env.APP_SECRET,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
}));

// Função para garantir que o superusuário existe
const createSuperUserIfNeeded = async () => {
    const superUser = await prisma.user.findUnique({
        where: {
            email: 'super@email.com',
        },
    });

    // Se o superusuário não existir, cria ele
    if (!superUser) {
        await prisma.user.create({
            data: {
                email: 'super@email.com',
                password: 'super',
                name: 'Super User',
                role: 'SUPERUSER'
            },
        });
        console.log('Superusuário criado!');
    } else {
        console.log('Superusuário já existe.');
    }
};

createSuperUserIfNeeded();

// Middlewares globais (podem ser extraídos para arquivo separado)
app.use((req, res, next) => {
    req.session.routes = req.session.routes ?? [];
    req.session.routes.push(req.url);
    next();
});
app.use(logAccess); 


// Configuração das rotas
app.use('/', homeRoutes);
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/perfil', perfilRoutes);
app.use('/financeiro', financeiroRoutes);
app.use('/relatorios', relatoriosRoutes);
app.use('/produtos', produtosRoutes);
app.use('/uploads', express.static(path.resolve('uploads'))); // Para servir arquivos estáticos, como imagens
console.log(path.resolve('uploads'));
// Inicializar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server rodando na porta ${PORT}`));