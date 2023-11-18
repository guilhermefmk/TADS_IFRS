package negocio;

import java.sql.Timestamp;

public class Anotacao {
    private int id;
    private String titulo;
    private String dt_hora;
    private String descricao;
    private String cor;

    public int getId() {
        return id;
    }
    public void setId(int id) {
        this.id = id;
    }
    public String getTitulo() {
        return titulo;
    }
    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }
    public String getDt_hora() {
        return dt_hora;
    }
    public void setDt_hora(String string) {
        this.dt_hora = string;
    }
    public String getDescricao() {
        return descricao;
    }
    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }
    public String getCor() {
        return cor;
    }
    public void setCor(String cor) {
        this.cor = cor;
    }


    }


