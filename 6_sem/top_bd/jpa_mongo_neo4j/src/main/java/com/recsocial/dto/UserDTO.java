package com.recsocial.dto;

import java.util.List;

public class UserDTO {
    private String id;
    private String name;
    private String bio;
    private List<String> interests;

    public UserDTO() {
    }

    public UserDTO(String id, String name, String bio, List<String> interests) {
        this.id = id;
        this.name = name;
        this.bio = bio;
        this.interests = interests;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }

    public List<String> getInterests() {
        return interests;
    }

    public void setInterests(List<String> interests) {
        this.interests = interests;
    }
}