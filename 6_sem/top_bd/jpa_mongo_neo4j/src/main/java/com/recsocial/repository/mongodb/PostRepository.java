package com.recsocial.repository.mongodb;

import com.recsocial.model.mongodb.Post;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepository extends MongoRepository<Post, String> {
    List<Post> findByHashtagsContaining(String hashtag);
}