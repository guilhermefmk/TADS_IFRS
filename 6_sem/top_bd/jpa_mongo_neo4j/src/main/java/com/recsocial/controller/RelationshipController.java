package com.recsocial.controller;

import com.recsocial.dto.RelationshipDTO;
import com.recsocial.model.neo4j.UserNode;
import com.recsocial.service.RelationshipService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/relationships")
public class RelationshipController {

    private final RelationshipService relationshipService;

    @Autowired
    public RelationshipController(RelationshipService relationshipService) {
        this.relationshipService = relationshipService;
    }

    @PostMapping("/follow")
    public void followUser(@RequestBody RelationshipDTO dto) {
        relationshipService.followUser(dto);
    }

    @PostMapping("/like")
    public void likePost(@RequestBody RelationshipDTO dto) {
        relationshipService.likePost(dto);
    }

    @PostMapping("/comment")
    public void commentOnPost(@RequestBody RelationshipDTO dto) {
        relationshipService.commentOnPost(dto);
    }

    @GetMapping("/followers/{userId}")
    public List<UserNode> getFollowers(@PathVariable String userId) {
        return relationshipService.getFollowers(userId);
    }

    @GetMapping("/following/{userId}")
    public List<UserNode> getFollowing(@PathVariable String userId) {
        return relationshipService.getFollowing(userId);
    }
}