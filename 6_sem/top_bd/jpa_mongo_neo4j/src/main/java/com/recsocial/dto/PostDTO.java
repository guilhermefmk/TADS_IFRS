package com.recsocial.dto;

import java.time.LocalDateTime;
import java.util.List;

public class PostDTO {
    private String id;
    private String usuarioId;
    private String conteudo;
    private List<String> hashtags;
    private LocalDateTime dataCriacao;
    private List<CommentDTO> comentarios;

    // Getters and Setters

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

    public LocalDateTime getDataCriacao() {
        return dataCriacao;
    }

    public void setDataCriacao(LocalDateTime dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public List<CommentDTO> getComentarios() {
        return comentarios;
    }

    public void setComentarios(List<CommentDTO> comentarios) {
        this.comentarios = comentarios;
    }
}