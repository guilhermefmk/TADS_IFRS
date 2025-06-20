package com.recsocial.model.neo4j;

import org.springframework.data.annotation.Id;
import org.springframework.data.neo4j.core.schema.Node;

@Node("Comment")
public class CommentNode {

    @Id
    private String id;
    private String usuarioId;
    private String texto;
    private String dataCriacao;

    public CommentNode() {}

    public CommentNode(String id, String usuarioId, String texto, String dataCriacao) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.texto = texto;
        this.dataCriacao = dataCriacao;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUsuarioId() {
        return usuarioId;
    }

    public void setUsuarioId(String usuarioId) {
        this.usuarioId = usuarioId;
    }

    public String getTexto() {
        return texto;
    }

    public void setTexto(String texto) {
        this.texto = texto;
    }

    public String getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(String dataCriacao) {
        this.dataCriacao = dataCriacao;
    }
}