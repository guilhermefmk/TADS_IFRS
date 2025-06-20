package com.recsocial.repository.neo4j;

import com.recsocial.model.neo4j.UserNode;

import org.springframework.data.neo4j.repository.Neo4jRepository;
import org.springframework.data.neo4j.repository.query.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.repository.query.Param;

@Repository
public interface Neo4jUserRepository extends Neo4jRepository<UserNode, String> {
       UserNode findByname(String name);
       void deleteByname(String name);

       @Query("MATCH (u:User {id: $userId}) MATCH (p:Post {id: $postId}) CREATE (u)-[:POSTOU]->(p)")
       void createPostRelationship(@Param("userId") String userId, @Param("postId") String postId);
       
       // Cria relacionamento de seguir
       @Query("MATCH (a:User {id: $followerId}), (b:User {id: $followedId}) " +
              "MERGE (a)-[:SEGUE]->(b)")
       void createFollowRelationship(String followerId, String followedId);

       // Cria relacionamento de curtir post
       @Query("MATCH (u:User {id: $userId}), (p:Post {id: $postId}) " +
              "MERGE (u)-[:CURTIU]->(p)")
       void createLikeRelationship(String userId, String postId);

       // Cria relacionamento de comentar post
       @Query("MATCH (u:User {id: $userId}), (p:Post {id: $postId}) " +
              "MERGE (u)-[c:COMENTOU]->(p) SET c.texto = $comment")
       void createCommentRelationship(String userId, String postId, String comment);

       // Busca seguidores de um usuário
       @Query("MATCH (follower:User)-[:SEGUE]->(user:User {id: $userId}) RETURN follower")
       List<UserNode> findFollowers(String userId);

       // Busca quem o usuário está seguindo
       @Query("MATCH (user:User {id: $userId})-[:SEGUE]->(following:User) RETURN following")
       List<UserNode> findFollowing(String userId);

       // Recomenda amigos (exemplo simples: amigos de amigos)
       @Query("MATCH (u:User {id: $userId})-[:SEGUE]->(:User)-[:SEGUE]->(rec:User) " +
              "WHERE NOT (u)-[:SEGUE]->(rec) AND u <> rec RETURN DISTINCT rec LIMIT 10")
       List<UserNode> findRecommendedFriends(String userId);

       @Query("MATCH (u:User)-[:POSTOU]->(p:Post {id: $postId}) RETURN u")
       Optional<UserNode> findAuthorByPostId(String postId);
}