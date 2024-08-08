package builder.negocio;
public class Item {
    private int id;
    private Produto produto;
    private int qtde;
    private double preco;

    public Item(Produto produto, int qtde, double preco) {
        this.produto = produto;
        this.qtde = qtde;
        this.preco = preco;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public int getQtde() {
        return qtde;
    }

    public void setQtde(int qtde) {
        this.qtde = qtde;
    }

    public double getPreco() {
        return preco;
    }

    public void setPreco(double preco) {
        this.preco = preco;
    }

    @Override
    public String toString() {
        return "Item [id=" + id + ", produto=" + produto + ", qtde=" + qtde + ", preco=" + preco + "]";
    }
    
}