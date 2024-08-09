package apresentacao;

import negocio.Produto;
import negocio.RegistryProduto;

public class Main {
    public static void main(String[] args) {
        RegistryProduto registry = RegistryProduto.getInstance();

        Produto produto1 = registry.criaProduto("eletronico");
        produto1.setNome("Smartphone");

        Produto produto2 = registry.criaProduto("livro");
        produto2.setNome("Design Patterns");

        System.out.println(produto1);
        System.out.println(produto2);

        System.out.println(produto1.hashCode());
        System.out.println(produto2.hashCode());
    }
}