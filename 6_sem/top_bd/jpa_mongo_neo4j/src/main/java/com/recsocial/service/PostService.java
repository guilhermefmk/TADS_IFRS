package com.recsocial.service;

import com.recsocial.dto.PostDTO;
import com.recsocial.model.mongodb.Post;
import com.recsocial.repository.mongodb.PostRepository;
import com.recsocial.repository.neo4j.Neo4jPostRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import com.recsocial.model.neo4j.PostNode;
import com.recsocial.repository.neo4j.Neo4jUserRepository;

@Service
public class PostService {

    private final PostRepository postRepository;
    private final Neo4jPostRepository neo4jPostRepository;
    private final Neo4jUserRepository neo4jUserRepository;

    @Autowired
    public PostService(PostRepository postRepository, Neo4jPostRepository neo4jPostRepository, Neo4jUserRepository neo4jUserRepository) {
        this.postRepository = postRepository;
        this.neo4jPostRepository = neo4jPostRepository;
        this.neo4jUserRepository = neo4jUserRepository;
    }

    public Post createPost(PostDTO postDTO) {
        String postId = UUID.randomUUID().toString();
        postDTO.setId(postId);

        Post post = new Post(
            postId, 
            postDTO.getUsuarioId(),
            postDTO.getConteudo(),
            postDTO.getHashtags(),
            postDTO.getDataCriacao(),
            List.of()
        );
        postRepository.save(post);

        PostNode postNode = new PostNode(
            postId,
            postDTO.getUsuarioId(),
            postDTO.getConteudo(),
            postDTO.getHashtags(),
            postDTO.getDataCriacao().toString()
        );
        neo4jPostRepository.save(postNode);

        neo4jUserRepository.createPostRelationship(postDTO.getUsuarioId(), postId);

        return post;
    }

    public Post getPostById(String id) {
        return postRepository.findById(id).orElse(null);
    }

    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    public Post updatePost(String id, PostDTO postDTO) {
        Post post = postRepository.findById(id).orElseThrow();
        post.setConteudo(postDTO.getConteudo());
        post.setHashtags(postDTO.getHashtags());
        post.setDataCriacao(postDTO.getDataCriacao());
        Post updated = postRepository.save(post);
        return updated;
    }

    public void deletePost(String id) {
        postRepository.deleteById(id);
    }
    public List<Post> getPostsByHashtag(String hashtag) {
        return postRepository.findByHashtagsContaining(hashtag);
    }
}