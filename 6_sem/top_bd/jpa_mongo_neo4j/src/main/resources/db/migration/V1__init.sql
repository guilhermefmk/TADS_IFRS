-- SQL script to create the necessary collections and indexes for MongoDB and the initial nodes for Neo4j

-- MongoDB Collections
db.createCollection("users")
db.createCollection("posts")
db.createCollection("comments")

-- Create indexes for MongoDB
db.users.createIndex({ "email": 1 }, { unique: true })
db.posts.createIndex({ "usuario_id": 1 })
db.comments.createIndex({ "post_id": 1 })

-- Neo4j Nodes
CREATE CONSTRAINT ON (u:User) ASSERT u.id IS UNIQUE;
CREATE CONSTRAINT ON (p:Post) ASSERT p.id IS UNIQUE;

-- Initial data for MongoDB
db.users.insertMany([
    { "_id": "user123", "name": "John Doe", "bio": "Lover of nature", "interests": ["hiking", "photography"] },
    { "_id": "user456", "name": "Jane Smith", "bio": "Food enthusiast", "interests": ["cooking", "traveling"] }
]);

db.posts.insertMany([
    { "_id": "post123", "usuario_id": "user123", "conteudo": "Visitando o Parque Ibirapuera!", "hashtags": ["#parque", "#natureza"], "data_criacao": new Date() },
    { "_id": "post456", "usuario_id": "user456", "conteudo": "Delicious pasta recipe!", "hashtags": ["#food", "#cooking"], "data_criacao": new Date() }
]);

-- Initial data for Neo4j
CREATE (u1:User {id: 'user123', name: 'John Doe', bio: 'Lover of nature'})
CREATE (u2:User {id: 'user456', name: 'Jane Smith', bio: 'Food enthusiast'})
CREATE (p1:Post {id: 'post123', content: 'Visitando o Parque Ibirapuera!'})
CREATE (p2:Post {id: 'post456', content: 'Delicious pasta recipe!'})

-- Relationships
CREATE (u1)-[:CURTIU]->(p1)
CREATE (u2)-[:CURTIU]->(p2)