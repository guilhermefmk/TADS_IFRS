package com.recsocial.model.neo4j;

import org.springframework.data.annotation.Id;
import org.springframework.data.neo4j.core.schema.Node;
import org.springframework.data.neo4j.core.schema.Relationship;

import java.util.List;

@Node("User")
public class UserNode {

    @Id
    private String id;
    private String name;
    private String bio;
    private List<String> interesses;

    @Relationship(type = "SEGUE", direction = Relationship.Direction.OUTGOING)
    private List<UserNode> seguindo;

    @Relationship(type = "CURTIU", direction = Relationship.Direction.OUTGOING)
    private List<PostNode> curtidos;

    @Relationship(type = "COMENTOU", direction = Relationship.Direction.OUTGOING)
    private List<PostNode> comentarios;

    public UserNode() {
    }

    public UserNode(String id, String name, String bio, List<String> interesses) {
        this.id = id;
        this.name = name;
        this.bio = bio;
        this.interesses = interesses;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getname() {
        return name;
    }

    public void setname(String name) {
        this.name = name;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public List<String> getInteresses() {
        return interesses;
    }

    public void setInteresses(List<String> interesses) {
        this.interesses = interesses;
    }

    public List<UserNode> getSeguindo() {
        return seguindo;
    }

    public void setSeguindo(List<UserNode> seguindo) {
        this.seguindo = seguindo;
    }

    public List<PostNode> getCurtidos() {
        return curtidos;
    }

    public void setCurtidos(List<PostNode> curtidos) {
        this.curtidos = curtidos;
    }

    public List<PostNode> getComentarios() {
        return comentarios;
    }

    public void setComentarios(List<PostNode> comentarios) {
        this.comentarios = comentarios;
    }
}