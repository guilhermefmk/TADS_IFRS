package com.recsocial.model.neo4j;

import org.springframework.data.annotation.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

@Node("Post")
public class PostNode {

    @Id
    private String id;
    private String usuarioId;
    private String conteudo;
    private List<String> hashtags;
    private String dataCriacao;

    @Relationship(type = "COMENTOU", direction = Relationship.Direction.INCOMING)
    private List<CommentNode> comentarios;

    public PostNode() {
    }

    public PostNode(String id, String usuarioId, String conteudo, List<String> hashtags, String dataCriacao) {
        this.id = id;
        this.usuarioId = usuarioId;
        this.conteudo = conteudo;
        this.hashtags = hashtags;
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

    public String getConteudo() {
        return conteudo;
    }

    public void setConteudo(String conteudo) {
        this.conteudo = conteudo;
    }

    public List<String> getHashtags() {
        return hashtags;
    }

    public void setHashtags(List<String> hashtags) {
        this.hashtags = hashtags;
    }

    public String getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(String dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public List<CommentNode> getComentarios() {
        return comentarios;
    }

    public void setComentarios(List<CommentNode> comentarios) {
        this.comentarios = comentarios;
    }
}