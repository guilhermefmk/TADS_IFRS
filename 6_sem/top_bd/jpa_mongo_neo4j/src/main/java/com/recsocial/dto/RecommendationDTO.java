package com.recsocial.dto;

import java.util.List;

public class RecommendationDTO {
    private List<String> friends;
    private List<String> posts;

    public RecommendationDTO() {}

    public RecommendationDTO(List<String> friends, List<String> posts) {
        this.friends = friends;
        this.posts = posts;
    }

    public List<String> getFriends() {
        return friends;
    }

    public void setFriends(List<String> friends) {
        this.friends = friends;
    }

    public List<String> getPosts() {
        return posts;
    }

    public void setPosts(List<String> posts) {
        this.posts = posts;
    }
}