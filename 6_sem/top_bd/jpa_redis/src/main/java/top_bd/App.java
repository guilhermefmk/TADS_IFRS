package top_bd;

import java.math.BigDecimal;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Scanner;

import top_bd.model.Cliente;
import top_bd.model.Item;
import top_bd.model.Pedido;
import top_bd.model.Produto;
import top_bd.service.CarrinhoService;
import top_bd.service.ClienteService;
import top_bd.service.PedidoService;
import top_bd.service.ProdutoService;

public class App {
    
    private static final Scanner scanner = new Scanner(System.in);
    private static final ClienteService clienteService = new ClienteService();
    private static final ProdutoService produtoService = new ProdutoService();
    private static final PedidoService pedidoService = new PedidoService();
    private static final CarrinhoService carrinhoService = new CarrinhoService();
    
    private static Cliente clienteLogado = null;
    
    public static void main(String[] args) {
        inicializarDados();
        
        boolean sair = false;
        while (!sair) {
            if (clienteLogado == null) {
                exibirMenuInicial();
                int opcao = lerOpcao();
                
                switch (opcao) {
                    case 1:
                        fazerLogin();
                        break;
                    case 2:
                        cadastrarCliente();
                        break;
                    case 0:
                        sair = true;
                        System.out.println("Saindo do sistema...");
                        break;
                    default:
                        System.out.println("Opção inválida!");
                }
            } else {
                exibirMenuPrincipal();
                int opcao = lerOpcao();
                
                switch (opcao) {
                    case 1:
                        listarProdutos();
                        break;
                    case 2:
                        adicionarItemCarrinho();
                        break;
                    case 3:
                        visualizarCarrinho();
                        break;
                    case 4:
                        editarItemCarrinho();
                        break;
                    case 5:
                        removerItemCarrinho();
                        break;
                    case 6:
                        finalizarCompra();
                        break;
                    case 7:
                        visualizarPedidosAnteriores();
                        break;
                    case 8:
                        clienteLogado = null;
                        System.out.println("Logout realizado com sucesso!");
                        break;
                    case 0:
                        sair = true;
                        System.out.println("Saindo do sistema...");
                        break;
                    default:
                        System.out.println("Opção inválida!");
                }
            }
            
            System.out.println("\nPressione ENTER para continuar...");
            scanner.nextLine();
        }
        
        scanner.close();
    }
    
    private static void exibirMenuInicial() {
        System.out.println("\n===== E-COMMERCE =====");
        System.out.println("1. Login");
        System.out.println("2. Cadastrar");
        System.out.println("0. Sair");
        System.out.print("Escolha uma opção: ");
    }
    
    private static void exibirMenuPrincipal() {
        System.out.println("\n===== E-COMMERCE =====");
        System.out.println("Bem-vindo, " + clienteLogado.getNome() + "!");
        System.out.println("1. Listar Produtos");
        System.out.println("2. Adicionar Item ao Carrinho");
        System.out.println("3. Visualizar Carrinho");
        System.out.println("4. Editar Item do Carrinho");
        System.out.println("5. Remover Item do Carrinho");
        System.out.println("6. Finalizar Compra");
        System.out.println("7. Visualizar Pedidos Anteriores");
        System.out.println("8. Logout");
        System.out.println("0. Sair");
        System.out.print("Escolha uma opção: ");
    }
    
    private static int lerOpcao() {
        try {
            int opcao = Integer.parseInt(scanner.nextLine());
            return opcao;
        } catch (NumberFormatException e) {
            return -1;
        }
    }
    
    private static void fazerLogin() {
        System.out.println("\n===== LOGIN =====");
        System.out.print("Email: ");
        String email = scanner.nextLine();
        System.out.print("Senha: ");
        String senha = scanner.nextLine();
        
        Cliente cliente = clienteService.autenticar(email, senha);
        if (cliente != null) {
            clienteLogado = cliente;
            System.out.println("Login realizado com sucesso!");
            carrinhoService.criarCarrinho(clienteLogado);
        } else {
            System.out.println("Email ou senha incorretos!");
        }
    }
    
    private static void cadastrarCliente() {
        System.out.println("\n===== CADASTRO DE CLIENTE =====");
        System.out.print("Nome: ");
        String nome = scanner.nextLine();
        System.out.print("Email: ");
        String email = scanner.nextLine();
        System.out.print("Senha: ");
        String senha = scanner.nextLine();
        
        Cliente cliente = new Cliente(nome, email, senha);
        try {
            clienteService.cadastrar(cliente);
            System.out.println("Cliente cadastrado com sucesso!");
        } catch (Exception e) {
            System.out.println("Erro ao cadastrar cliente: " + e.getMessage());
        }
    }
    
    private static void listarProdutos() {
        System.out.println("\n===== PRODUTOS DISPONÍVEIS =====");
        List<Produto> produtos = produtoService.listarTodos();
        
        if (produtos.isEmpty()) {
            System.out.println("Nenhum produto cadastrado!");
            return;
        }
        
        System.out.println("ID | Descrição | Valor");
        System.out.println("------------------------");
        for (Produto produto : produtos) {
            System.out.printf("%d | %s | R$ %.2f\n", 
                    produto.getId(), produto.getDescricao(), produto.getValor());
        }
    }
    
    private static void adicionarItemCarrinho() {
        System.out.println("\n===== ADICIONAR ITEM AO CARRINHO =====");
        listarProdutos();
        
        System.out.print("\nDigite o ID do produto: ");
        try {
            Long produtoId = Long.parseLong(scanner.nextLine());
            Produto produto = produtoService.buscarPorId(produtoId);
            
            if (produto == null) {
                System.out.println("Produto não encontrado!");
                return;
            }
            
            System.out.print("Digite a quantidade: ");
            int quantidade = Integer.parseInt(scanner.nextLine());
            
            if (quantidade <= 0) {
                System.out.println("Quantidade inválida!");
                return;
            }
            
            carrinhoService.adicionarItem(clienteLogado, produtoId, quantidade);
            System.out.println("Item adicionado ao carrinho com sucesso!");
            
        } catch (NumberFormatException e) {
            System.out.println("Valor inválido!");
        } catch (Exception e) {
            System.out.println("Erro ao adicionar item: " + e.getMessage());
        }
    }
    
    private static void visualizarCarrinho() {
        System.out.println("\n===== CARRINHO DE COMPRAS =====");
        List<Item> itens = carrinhoService.getItensCarrinho(clienteLogado);
        
        if (itens.isEmpty()) {
            System.out.println("Carrinho vazio!");
            return;
        }
        
        System.out.println("Produto | Quantidade | Valor Unitário | Valor Total");
        System.out.println("----------------------------------------------------");
        
        for (Item item : itens) {
            System.out.printf("%s | %d | R$ %.2f | R$ %.2f\n", 
                    item.getProduto().getDescricao(), 
                    item.getQuantidade(), 
                    item.getProduto().getValor(), 
                    item.getValor());
        }
        
        BigDecimal total = carrinhoService.calcularTotal(clienteLogado);
        System.out.println("----------------------------------------------------");
        System.out.printf("Total: R$ %.2f\n", total);
    }
    
    private static void editarItemCarrinho() {
        System.out.println("\n===== EDITAR ITEM DO CARRINHO =====");
        List<Item> itens = carrinhoService.getItensCarrinho(clienteLogado);
        
        if (itens.isEmpty()) {
            System.out.println("Carrinho vazio!");
            return;
        }
        
        System.out.println("ID | Produto | Quantidade | Valor Total");
        System.out.println("---------------------------------------");
        
        for (int i = 0; i < itens.size(); i++) {
            Item item = itens.get(i);
            System.out.printf("%d | %s | %d | R$ %.2f\n", 
                    item.getProduto().getId(), 
                    item.getProduto().getDescricao(), 
                    item.getQuantidade(), 
                    item.getValor());
        }
        
        System.out.print("\nDigite o ID do produto que deseja editar: ");
        try {
            Long produtoId = Long.parseLong(scanner.nextLine());
            
            
            boolean found = false;
            for (Item item : itens) {
                if (item.getProduto().getId().equals(produtoId)) {
                    found = true;
                    break;
                }
            }
            
            if (!found) {
                System.out.println("Produto não encontrado no carrinho!");
                return;
            }
            
            System.out.print("Digite a nova quantidade: ");
            int quantidade = Integer.parseInt(scanner.nextLine());
            
            if (quantidade < 0) {
                System.out.println("Quantidade inválida!");
                return;
            }
            
            if (quantidade == 0) {
                carrinhoService.removerItem(clienteLogado, produtoId);
                System.out.println("Item removido do carrinho!");
            } else {
                carrinhoService.atualizarQuantidade(clienteLogado, produtoId, quantidade);
                System.out.println("Quantidade atualizada com sucesso!");
            }
            
        } catch (NumberFormatException e) {
            System.out.println("Valor inválido!");
        } catch (Exception e) {
            System.out.println("Erro ao editar item: " + e.getMessage());
        }
    }
    
    private static void removerItemCarrinho() {
        System.out.println("\n===== REMOVER ITEM DO CARRINHO =====");
        List<Item> itens = carrinhoService.getItensCarrinho(clienteLogado);
        
        if (itens.isEmpty()) {
            System.out.println("Carrinho vazio!");
            return;
        }
        
        System.out.println("ID | Produto | Quantidade | Valor Total");
        System.out.println("---------------------------------------");
        
        for (int i = 0; i < itens.size(); i++) {
            Item item = itens.get(i);
            System.out.printf("%d | %s | %d | R$ %.2f\n", 
                    item.getProduto().getId(), 
                    item.getProduto().getDescricao(), 
                    item.getQuantidade(), 
                    item.getValor());
        }
        
        System.out.print("\nDigite o ID do produto que deseja remover: ");
        try {
            Long produtoId = Long.parseLong(scanner.nextLine());
            
            
            boolean found = false;
            for (Item item : itens) {
                if (item.getProduto().getId().equals(produtoId)) {
                    found = true;
                    break;
                }
            }
            
            if (!found) {
                System.out.println("Produto não encontrado no carrinho!");
                return;
            }
            
            carrinhoService.removerItem(clienteLogado, produtoId);
            System.out.println("Item removido do carrinho com sucesso!");
            
        } catch (NumberFormatException e) {
            System.out.println("Valor inválido!");
        } catch (Exception e) {
            System.out.println("Erro ao remover item: " + e.getMessage());
        }
    }
    
    private static void finalizarCompra() {
        System.out.println("\n===== FINALIZAR COMPRA =====");
        List<Item> itens = carrinhoService.getItensCarrinho(clienteLogado);
        
        if (itens.isEmpty()) {
            System.out.println("Carrinho vazio!");
            return;
        }
        
        System.out.println("Produto | Quantidade | Valor Unitário | Valor Total");
        System.out.println("----------------------------------------------------");
        
        for (Item item : itens) {
            System.out.printf("%s | %d | R$ %.2f | R$ %.2f\n", 
                    item.getProduto().getDescricao(), 
                    item.getQuantidade(), 
                    item.getProduto().getValor(), 
                    item.getValor());
        }
        
        BigDecimal total = carrinhoService.calcularTotal(clienteLogado);
        System.out.println("----------------------------------------------------");
        System.out.printf("Total: R$ %.2f\n", total);
        
        System.out.print("\nConfirmar compra? (S/N): ");
        String confirmacao = scanner.nextLine();
        
        if (confirmacao.equalsIgnoreCase("S")) {
            try {
                Pedido pedido = carrinhoService.finalizarCarrinho(clienteLogado, pedidoService);
                System.out.println("Compra finalizada com sucesso!");
                System.out.println("Número do pedido: " + pedido.getId());
            } catch (Exception e) {
                System.out.println("Erro ao finalizar compra: " + e.getMessage());
            }
        } else {
            System.out.println("Compra cancelada!");
        }
    }
    
    private static void visualizarPedidosAnteriores() {
        System.out.println("\n===== PEDIDOS ANTERIORES =====");
        List<Pedido> pedidos = pedidoService.listarPorCliente(clienteLogado);
        
        if (pedidos.isEmpty()) {
            System.out.println("Nenhum pedido encontrado!");
            return;
        }
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        
        for (Pedido pedido : pedidos) {
            System.out.println("\nPedido #" + pedido.getId());
            System.out.println("Data: " + pedido.getDataHora().format(formatter));
            System.out.println("Itens:");
            
            BigDecimal total = BigDecimal.ZERO;
            
            for (Item item : pedido.getItens()) {
                System.out.printf("- %s | %d | R$ %.2f | R$ %.2f\n", 
                        item.getProduto().getDescricao(), 
                        item.getQuantidade(), 
                        item.getProduto().getValor(), 
                        item.getValor());
                
                total = total.add(item.getValor());
            }
            
            System.out.println("Total: R$ " + total);
            System.out.println("-----------------------------");
        }
    }
    
    private static void inicializarDados() {
        
        if (clienteService.listarTodos().isEmpty()) {
            Cliente cliente1 = new Cliente("João Silva", "joao@email.com", "123456");
            Cliente cliente2 = new Cliente("Maria Souza", "maria@email.com", "123456");
            
            clienteService.cadastrar(cliente1);
            clienteService.cadastrar(cliente2);
            
            System.out.println("Clientes de exemplo cadastrados!");
        }
        
        if (produtoService.listarTodos().isEmpty()) {
            Produto produto1 = new Produto("Smartphone Galaxy S21", new BigDecimal("3999.99"), 100);
            Produto produto2 = new Produto("Notebook Dell Inspiron", new BigDecimal("4500.00"), 50);
            Produto produto3 = new Produto("Smart TV 55\"", new BigDecimal("2800.00"), 30);
            Produto produto4 = new Produto("Fone de Ouvido Bluetooth", new BigDecimal("199.90"), 200);
            Produto produto5 = new Produto("Mouse sem fio", new BigDecimal("89.90"), 150);
            
            produtoService.cadastrar(produto1);
            produtoService.cadastrar(produto2);
            produtoService.cadastrar(produto3);
            produtoService.cadastrar(produto4);
            produtoService.cadastrar(produto5);
            
            System.out.println("Produtos de exemplo cadastrados!");
        }
    }
}
