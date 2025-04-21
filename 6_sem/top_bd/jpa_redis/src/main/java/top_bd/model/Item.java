package top_bd.model;


import javax.persistence.*;
import java.math.BigDecimal;

@Entity
@Table(name = "item")
public class Item {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @ManyToOne
    @JoinColumn(name = "pedido_id", nullable = false)
    private Pedido pedido;
    
    @ManyToOne
    @JoinColumn(name = "produto_id", nullable = false)
    private Produto produto;
    
    @Column(name = "quantidade", nullable = false)
    private Integer quantidade;
    
    @Column(name = "valor", nullable = false)
    private BigDecimal valor;
    
    // Constructors
    public Item() {}
    
    public Item(Produto produto, Integer quantidade) {
        this.produto = produto;
        this.quantidade = quantidade;
        this.valor = produto.getValor().multiply(new BigDecimal(quantidade));
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Pedido getPedido() {
        return pedido;
    }

    public void setPedido(Pedido pedido) {
        this.pedido = pedido;
    }

    public Produto getProduto() {
        return produto;
    }

    public void setProduto(Produto produto) {
        this.produto = produto;
    }

    public Integer getQuantidade() {
        return quantidade;
    }

    public void setQuantidade(Integer quantidade) {
        this.quantidade = quantidade;
        // Update the value when quantity changes
        if (this.produto != null) {
            this.valor = this.produto.getValor().multiply(new BigDecimal(quantidade));
        }
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }
    
    @Override
    public String toString() {
        return "Item [id=" + id + ", produto=" + produto.getDescricao() + ", quantidade=" + quantidade + ", valor=" + valor + "]";
    }
}