package com.recsocial.service;

import com.recsocial.dto.RelationshipDTO;
import com.recsocial.model.neo4j.UserNode;
import com.recsocial.model.neo4j.PostNode;
import com.recsocial.repository.neo4j.Neo4jUserRepository;
import com.recsocial.repository.neo4j.Neo4jPostRepository;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class RelationshipService {

    private final Neo4jUserRepository neo4jUserRepository;
    private final Neo4jPostRepository neo4jPostRepository;

    @Autowired
    public RelationshipService(Neo4jUserRepository neo4jUserRepository, Neo4jPostRepository neo4jPostRepository) {
        this.neo4jUserRepository = neo4jUserRepository;
        this.neo4jPostRepository = neo4jPostRepository;
    }

    /**
     * Cria uma relação de "seguir" entre dois usuários no grafo do Neo4j.
     */
    @Transactional
    public void followUser(RelationshipDTO dto) {
        UserNode follower = neo4jUserRepository.findById(dto.getFollowerId())
                .orElseThrow(() -> new RuntimeException("Usuário seguidor não encontrado"));
        UserNode followed = neo4jUserRepository.findById(dto.getFollowedId())
                .orElseThrow(() -> new RuntimeException("Usuário seguido não encontrado"));
        // Cria a relação no repositório (implemente via @Query ou custom repository se necessário)
        neo4jUserRepository.createFollowRelationship(follower.getId(), followed.getId());
    }

    /**
     * Cria uma relação de "curtir" entre um usuário e um post no grafo do Neo4j.
     */
    @Transactional
    public void likePost(RelationshipDTO dto) {
        UserNode user = neo4jUserRepository.findById(dto.getFollowerId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        PostNode post = neo4jPostRepository.findById(dto.getPostId())
                .orElseThrow(() -> new RuntimeException("Post não encontrado"));
        neo4jUserRepository.createLikeRelationship(user.getId(), post.getId());
    }

    /**
     * Cria uma relação de "comentar" entre um usuário e um post no grafo do Neo4j.
     */
    @Transactional
    public void commentOnPost(RelationshipDTO dto) {
        UserNode user = neo4jUserRepository.findById(dto.getFollowerId())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        PostNode post = neo4jPostRepository.findById(dto.getPostId())
                .orElseThrow(() -> new RuntimeException("Post não encontrado"));
        neo4jUserRepository.createCommentRelationship(user.getId(), post.getId(), dto.getComment());
    }

    public List<UserNode> getFollowers(String userId) {
        return neo4jUserRepository.findFollowers(userId);
    }

    public List<UserNode> getFollowing(String userId) {
        return neo4jUserRepository.findFollowing(userId);
    }
}