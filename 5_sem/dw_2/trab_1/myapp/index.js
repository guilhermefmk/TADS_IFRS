const express = require('express');

const app = express();

app.use(express.json());

// 1. Instalação e Configuração do Express.js
// Descrição: Instale o Express.js em um projeto Node.js e configure uma rota GET que responda com uma mensagem de boas-vindas.
// Objetivo: Familiarizar-se com a configuração do Express e rotas básicas.
app.get('/', (req, res) => {
  res.send('Bem-vindo ao meu aplicativo Express!');
});

// 2. Rotas Dinâmicas
// Descrição: Crie uma rota dinâmica em Express que receba um parâmetro na URL, como o nome de um usuário, e retorne uma mensagem de saudação personalizada (e.g., "Olá, [nome]!").
// Objetivo: Praticar rotas dinâmicas e parâmetros de URL.
app.get('/saudacao/:nome', (req, res) => {
    const nome = req.params.nome;
  
    res.send(`Olá, ${nome}!`);
  });

// 3. Middleware de Autenticação Fake
// Descrição: Implemente um middleware que simule a verificação de autenticação. Se um token for enviado no cabeçalho da requisição, a rota deve continuar, caso contrário, deve retornar um erro 401 (Não Autorizado).
// Objetivo: Entender o conceito de middleware no Express.js.
function autenticar(req, res, next) {
    const token = req.header('Authorization');
  
    if (!token) {
      return res.status(401).send('Erro 401: Não Autorizado. Token de autenticação não fornecido.');
    }
  
    next();
}
  
app.get('/protegida', autenticar, (req, res) => {
    res.send('Bem-vindo! Você está autenticado.');
});


// 4. Manipulação de Dados com Query Params
// Descrição: Crie uma rota GET que receba parâmetros de consulta (query params) para filtrar uma lista de itens (ex.: produtos, usuários) e retorne a lista filtrada.
// Objetivo: Praticar o uso de query params para manipulação de dados.
const produtos = [
    { id: 1, nome: 'Notebook', categoria: 'Eletrônicos' },
    { id: 2, nome: 'Smartphone', categoria: 'Eletrônicos' },
    { id: 3, nome: 'Camiseta', categoria: 'Roupas' },
    { id: 4, nome: 'Tênis', categoria: 'Calçados' },
    { id: 5, nome: 'Televisão', categoria: 'Eletrônicos' },
    { id: 6, nome: 'Calça', categoria: 'Roupas' }
  ];
  
app.get('/produtos', (req, res) => {
    const { nome, categoria } = req.query;

    let produtosFiltrados = produtos;

    if (nome) {
        produtosFiltrados = produtosFiltrados.filter(produto =>
        produto.nome.toLowerCase().includes(nome.toLowerCase())
        );
    }

    if (categoria) {
        produtosFiltrados = produtosFiltrados.filter(produto =>
        produto.categoria.toLowerCase() === categoria.toLowerCase()
        );
    }

    res.json(produtosFiltrados);
});


// 5. Receber Dados com POST
// Descrição: Crie uma rota POST que receba um objeto JSON no corpo da requisição (ex.: dados de um novo produto) e o retorne na resposta, adicionando um ID único.
// Objetivo: Entender como lidar com requisições POST e manipulação de dados enviados no corpo.
app.post('/produtos', validarProduto, (req, res) => {
    const novoProduto = req.body;
  
    const novoId = produtos.length + 1;
  
    const produtoComId = { id: novoId, ...novoProduto };
  
    produtos.push(produtoComId);
  
    res.status(201).json(produtoComId);
  });

// 6. Validação de Dados com Middleware
// Descrição: Adicione um middleware de validação de dados para uma rota POST. Valide que certos campos (ex.: nome, email) estejam presentes e sejam válidos, retornando erros adequados se os dados estiverem incorretos.
// Objetivo: Praticar a criação de middlewares para validação de dados.
const categoriasValidas = ['Eletrônicos', 'Roupas', 'Calçados'];

function validarProduto(req, res, next) {
    const { nome, categoria } = req.body;
  
    if (!nome || nome.trim() === '') {
      const erro = new Error('O campo nome é obrigatório.');
      erro.status = 400;
      return next(erro);
    }
  
    if (!categoria || !['Eletrônicos', 'Roupas', 'Calçados'].includes(categoria)) {
      const erro = new Error('Categoria inválida. Permitidas: Eletrônicos, Roupas, Calçados.');
      erro.status = 400;
      return next(erro);
    }
  
    const produtoExistente = produtos.find(produto => 
      produto.nome.toLowerCase() === nome.toLowerCase() &&
      produto.categoria.toLowerCase() === categoria.toLowerCase()
    );
  
    if (produtoExistente) {
      const erro = new Error('Já existe um produto com este nome e categoria.');
      erro.status = 409;
      return next(erro);
    }
  
    next(); 
  }

// 7. Gerenciamento de Erros Globais
// Descrição: Implemente um middleware de tratamento de erros global no Express.js que capture erros lançados em qualquer rota e retorne uma resposta JSON adequada.
// Objetivo: Entender como lidar com erros de forma centralizada em uma aplicação Express.
app.use((err, req, res, next) => {
    const statusCode = err.status || 500;
  
    res.status(statusCode).json({
      erro: {
        mensagem: err.message || 'Ocorreu um erro interno no servidor.',
        status: statusCode
      }
    });
});

const port = 3000;

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
