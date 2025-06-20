package com.recsocial.repository.neo4j;

import com.recsocial.model.neo4j.PostNode;
import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface Neo4jPostRepository extends Neo4jRepository<PostNode, String> {

    @Query("MATCH (u:User {id: $userId})-[:SEGUE]->(amigo:User)-[:CURTIU]->(p:Post) " +
       "WITH p, COUNT { (curtidor:User)-[:CURTIU]->(p) } AS likes " +
       "RETURN p ORDER BY likes DESC LIMIT 10")
    List<PostNode> findRecommendedPosts(String userId);

    @Query("MATCH (u:User)-[:CURTIU]->(p:Post {id: $postId}) RETURN COUNT(u)")
    int countLikes(String postId);

    @Query("MATCH (u:User)-[:COMENTOU]->(p:Post {id: $postId}) RETURN COUNT(u)")
    int countComments(String postId);
}