package com.recsocial.dto;

public class RelationshipDTO {
    private String followerId;   // Quem está seguindo, curtindo ou comentando
    private String followedId;   // Quem está sendo seguido (para follow)
    private String postId;       // Post relacionado (para like/comment)
    private String comment;      // Texto do comentário (para comment)

    public RelationshipDTO() {}

    public RelationshipDTO(String followerId, String followedId, String postId, String comment) {
        this.followerId = followerId;
        this.followedId = followedId;
        this.postId = postId;
        this.comment = comment;
    }

    public String getFollowerId() { return followerId; }
    public void setFollowerId(String followerId) { this.followerId = followerId; }

    public String getFollowedId() { return followedId; }
    public void setFollowedId(String followedId) { this.followedId = followedId; }

    public String getPostId() { return postId; }
    public void setPostId(String postId) { this.postId = postId; }

    public String getComment() { return comment; }
    public void setComment(String comment) { this.comment = comment; }
}