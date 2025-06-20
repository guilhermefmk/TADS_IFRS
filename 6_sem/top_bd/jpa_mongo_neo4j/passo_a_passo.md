1- 

docker compose up -d

2 - 
# MongoDB
docker cp src/main/resources/db/seed/mongodb_seed.js mongodb:/mongodb_seed.js
docker exec -it mongodb mongosh recsocial /mongodb_seed.js

# Neo4j
docker exec -i neo4j cypher-shell -u neo4j -p test1234 < src/main/resources/db/seed/neo4j_seed.cypher

3 - mvn clean package

4 - java -jar target/social-recommendation-system-1.0-SNAPSHOT.jar

5- mvn spring-boot:run

6- http://localhost:8080/swagger-ui.html

7-
docker compose down -v



LIMPA
docker exec -it mongodb mongosh recsocial --eval "db.users.deleteMany({}); db.posts.deleteMany({})"
docker exec -it neo4j cypher-shell -u neo4j -p test1234 "MATCH (n) DETACH DELETE n"
