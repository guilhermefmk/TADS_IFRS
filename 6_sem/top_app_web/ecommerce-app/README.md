# Ecommerce App

Este é um aplicativo de e-commerce desenvolvido em React Native, inspirado na Renner. O aplicativo simula o processo de adição de itens em um carrinho de compras e possui três telas principais: Tela de Produtos, Tela de Detalhes do Produto e Tela do Carrinho.

## Estrutura do Projeto

```
ecommerce-app
├── App.js
├── app.json
├── babel.config.js
├── assets
│   ├── fonts
│   └── images
│       └── placeholder.png
├── src
│   ├── components
│   │   ├── Button
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   ├── CartItem
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   ├── Header
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   └── ProductCard
│   │       ├── index.js
│   │       └── styles.js
│   ├── context
│   │   └── CartContext.js
│   ├── data
│   │   └── products.js
│   ├── hooks
│   │   └── useCart.js
│   ├── navigation
│   │   └── index.js
│   ├── screens
│   │   ├── CartScreen
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   ├── ProductDetailScreen
│   │   │   ├── index.js
│   │   │   └── styles.js
│   │   └── ProductsScreen
│   │       ├── index.js
│   │       └── styles.js
│   └── utils
│       └── formatCurrency.js
├── index.js
├── package.json
└── README.md
```

## Instalação

1. Clone o repositório:
   ```
   git clone <URL_DO_REPOSITORIO>
   ```

2. Navegue até o diretório do projeto:
   ```
   cd ecommerce-app
   ```

3. Instale as dependências:
   ```
   npm install
   ```

## Uso

Para iniciar o aplicativo, utilize o seguinte comando:

```
npm start
```

Isso abrirá o Expo Developer Tools no seu navegador, onde você pode escolher iniciar o aplicativo em um emulador Android, iOS ou na web.

## Funcionalidades

- **Tela de Produtos**: Exibe uma lista de produtos disponíveis para compra.
- **Tela de Detalhes do Produto**: Mostra informações detalhadas sobre um produto selecionado e permite adicioná-lo ao carrinho.
- **Tela do Carrinho**: Exibe todos os itens adicionados ao carrinho, suas quantidades e o valor total.

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a MIT License. Veja o arquivo LICENSE para mais detalhes.