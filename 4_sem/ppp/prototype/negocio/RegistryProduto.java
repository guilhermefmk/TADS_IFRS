package negocio;

import java.util.HashMap;
import java.util.Map;

public class RegistryProduto {
    private static RegistryProduto INSTANCE = new RegistryProduto();
    private Map<String, Produto> vetTipoProduto;

    private RegistryProduto() {
        this.vetTipoProduto = new HashMap<>();

        Produto eletronicoBase = new Produto();
        eletronicoBase.setCategoria("Eletrônico");
        eletronicoBase.setPreco(999.99);
        this.vetTipoProduto.put("eletronico", eletronicoBase);

        Produto livroBase = new Produto();
        livroBase.setCategoria("Livro");
        livroBase.setPreco(59.90);
        this.vetTipoProduto.put("livro", livroBase);
    }

    public Produto criaProduto(String tipo) {
        try {
            return this.vetTipoProduto.get(tipo).clone();
        } catch (Exception e) {
            System.out.println("Tipo inexistente!");
        }
        return null;
    }

    public void adicionaModeloProduto(Produto produto) {
        this.vetTipoProduto.put(produto.getCategoria(), produto);
    }

    public static synchronized RegistryProduto getInstance() {
        return RegistryProduto.INSTANCE;
    }
}
