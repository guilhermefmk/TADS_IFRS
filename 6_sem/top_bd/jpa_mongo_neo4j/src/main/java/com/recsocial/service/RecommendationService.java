package com.recsocial.service;

import com.recsocial.dto.RecommendationDTO;
import com.recsocial.model.neo4j.UserNode;
import com.recsocial.model.neo4j.PostNode;
import com.recsocial.repository.neo4j.Neo4jUserRepository;
import com.recsocial.repository.neo4j.Neo4jPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RecommendationService {

    private final Neo4jUserRepository neo4jUserRepository;
    private final Neo4jPostRepository neo4jPostRepository;

    @Autowired
    public RecommendationService(Neo4jUserRepository neo4jUserRepository, Neo4jPostRepository neo4jPostRepository) {
        this.neo4jUserRepository = neo4jUserRepository;
        this.neo4jPostRepository = neo4jPostRepository;
    }

    public RecommendationDTO recommendAll(String userId) {
        List<UserNode> recommendedUsers = neo4jUserRepository.findRecommendedFriends(userId);
        List<String> friends = recommendedUsers.stream()
                .map(user -> user.getname() + " (" + user.getBio() + ")")
                .collect(Collectors.toList());

        List<PostNode> recommendedPosts = neo4jPostRepository.findRecommendedPosts(userId);
        List<String> posts = recommendedPosts.stream()
                .map(post -> {
                    // Busca o autor do post pelo relacionamento POSTOU
                    UserNode autor = neo4jUserRepository.findAuthorByPostId(post.getId()).orElse(null);
                    String nomeAutor = (autor != null) ? autor.getname() : "Desconhecido";
                    int curtidas = neo4jPostRepository.countLikes(post.getId());
                    int comentarios = neo4jPostRepository.countComments(post.getId());
                    return post.getConteudo() + " (Autor: " + nomeAutor + ", Curtidas: " + curtidas + ", Comentários: " + comentarios + ")";
                })
                .limit(3)
                .collect(Collectors.toList());

        return new RecommendationDTO(friends, posts);
    }
}
