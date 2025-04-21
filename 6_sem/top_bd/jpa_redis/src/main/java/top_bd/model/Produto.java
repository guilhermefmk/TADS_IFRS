package top_bd.model;


import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "produto")
public class Produto {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "descricao", nullable = false)
    private String descricao;
    
    @Column(name = "valor", nullable = false)
    private BigDecimal valor = BigDecimal.ZERO;
    
    @Column(name = "estoque", nullable = false)
    private Integer estoque = 0;
    
    // Constructors
    public Produto() {}
    
    public Produto(String descricao, BigDecimal valor, Integer estoque) {
        this.descricao = descricao;
        this.valor = valor;
        this.estoque = estoque;
    }
    
    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDescricao() {
        return descricao;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public BigDecimal getValor() {
        return valor;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public Integer getEstoque() {
        return estoque;
    }

    public void setEstoque(Integer estoque) {
        this.estoque = estoque;
    }
    
    @Override
    public String toString() {
        return "Produto [id=" + id + ", descricao=" + descricao + ", valor=" + valor + ", estoque=" + estoque + "]";
    }
}
