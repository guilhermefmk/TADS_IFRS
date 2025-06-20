// Remove todos os dados antes de popular
MATCH (n) DETACH DELETE n;

// Criação de constraints
CREATE CONSTRAINT IF NOT EXISTS FOR (u:User) REQUIRE u.id IS UNIQUE;
CREATE CONSTRAINT IF NOT EXISTS FOR (p:Post) REQUIRE p.id IS UNIQUE;

// Criação de usuários
MERGE (u1:User {id: 'b1e1a1e0-1111-4a1a-9a1a-111111111111', name: 'Alice', bio: 'Amo viajar e explorar novos lugares.'});
MERGE (u2:User {id: 'b2e2a2e0-2222-4a2a-9a2a-222222222222', name: 'Bob', bio: 'Entusiasta de tecnologia e programação.'});
MERGE (u3:User {id: 'b3e3a3e0-3333-4a3a-9a3a-333333333333', name: 'Charlie', bio: 'Gosto de esportes e atividades ao ar livre.'});
MERGE (u4:User {id: 'b4e4a4e0-4444-4a4a-9a4a-444444444444', name: 'Diana', bio: 'Apaixonada por leitura e cinema.'});
MERGE (u5:User {id: 'b5e5a5e0-5555-4a5a-9a5a-555555555555', name: 'Eve', bio: 'Cozinheira de mão cheia e gamer nas horas vagas.'});

// Criação de posts e vínculo com usuários (POSTOU)
MERGE (p1:Post {id: 'post-1', conteudo: 'Visitando o Parque Ibirapuera!', hashtags: ['#parque', '#natureza'], dataCriacao: '2025-05-25T10:00:00'});
MERGE (p2:Post {id: 'post-2', conteudo: 'Aprendendo a programar em Java!', hashtags: ['#programming', '#Java'], dataCriacao: '2025-05-26T12:00:00'});
MERGE (p3:Post {id: 'post-3', conteudo: 'Fui correr no parque hoje, foi incrível!', hashtags: ['#esportes', '#saude'], dataCriacao: '2025-05-27T08:00:00'});
MERGE (p4:Post {id: 'post-4', conteudo: 'Acabei de ler um livro maravilhoso!', hashtags: ['#livros', '#leitura'], dataCriacao: '2025-05-28T15:00:00'});
MERGE (p5:Post {id: 'post-5', conteudo: 'Fiz um bolo de chocolate delicioso hoje!', hashtags: ['#culinaria', '#bolo'], dataCriacao: '2025-05-29T18:00:00'});

// Relações de postagem
MATCH (u1:User {id: 'b1e1a1e0-1111-4a1a-9a1a-111111111111'}), (p1:Post {id: 'post-1'}) MERGE (u1)-[:POSTOU]->(p1);
MATCH (u2:User {id: 'b2e2a2e0-2222-4a2a-9a2a-222222222222'}), (p2:Post {id: 'post-2'}) MERGE (u2)-[:POSTOU]->(p2);
MATCH (u3:User {id: 'b3e3a3e0-3333-4a3a-9a3a-333333333333'}), (p3:Post {id: 'post-3'}) MERGE (u3)-[:POSTOU]->(p3);
MATCH (u4:User {id: 'b4e4a4e0-4444-4a4a-9a4a-444444444444'}), (p4:Post {id: 'post-4'}) MERGE (u4)-[:POSTOU]->(p4);
MATCH (u5:User {id: 'b5e5a5e0-5555-4a5a-9a5a-555555555555'}), (p5:Post {id: 'post-5'}) MERGE (u5)-[:POSTOU]->(p5);

// Relações de curtidas
MATCH (u1:User {id: 'b1e1a1e0-1111-4a1a-9a1a-111111111111'}), (p2:Post {id: 'post-2'}) MERGE (u1)-[:CURTIU]->(p2);
MATCH (u2:User {id: 'b2e2a2e0-2222-4a2a-9a2a-222222222222'}), (p1:Post {id: 'post-1'}) MERGE (u2)-[:CURTIU]->(p1);
MATCH (u3:User {id: 'b3e3a3e0-3333-4a3a-9a3a-333333333333'}), (p4:Post {id: 'post-4'}) MERGE (u3)-[:CURTIU]->(p4);
MATCH (u4:User {id: 'b4e4a4e0-4444-4a4a-9a4a-444444444444'}), (p5:Post {id: 'post-5'}) MERGE (u4)-[:CURTIU]->(p5);
MATCH (u5:User {id: 'b5e5a5e0-5555-4a5a-9a5a-555555555555'}), (p3:Post {id: 'post-3'}) MERGE (u5)-[:CURTIU]->(p3);

// Relações de comentários
MATCH (u2:User {id: 'b2e2a2e0-2222-4a2a-9a2a-222222222222'}), (p1:Post {id: 'post-1'}) MERGE (u2)-[:COMENTOU {texto: 'Que legal!'}]->(p1);
MATCH (u1:User {id: 'b1e1a1e0-1111-4a1a-9a1a-111111111111'}), (p2:Post {id: 'post-2'}) MERGE (u1)-[:COMENTOU {texto: 'Boa sorte!'}]->(p2);
MATCH (u5:User {id: 'b5e5a5e0-5555-4a5a-9a5a-555555555555'}), (p4:Post {id: 'post-4'}) MERGE (u5)-[:COMENTOU {texto: 'Qual o nome do livro?'}]->(p4);

// Relações de seguidores (SEGUE)
MATCH (u1:User {id: 'b1e1a1e0-1111-4a1a-9a1a-111111111111'}), (u2:User {id: 'b2e2a2e0-2222-4a2a-9a2a-222222222222'}) MERGE (u1)-[:SEGUE]->(u2);
MATCH (u2:User {id: 'b2e2a2e0-2222-4a2a-9a2a-222222222222'}), (u3:User {id: 'b3e3a3e0-3333-4a3a-9a3a-333333333333'}) MERGE (u2)-[:SEGUE]->(u3);
MATCH (u3:User {id: 'b3e3a3e0-3333-4a3a-9a3a-333333333333'}), (u4:User {id: 'b4e4a4e0-4444-4a4a-9a4a-444444444444'}) MERGE (u3)-[:SEGUE]->(u4);
MATCH (u4:User {id: 'b4e4a4e0-4444-4a4a-9a4a-444444444444'}), (u5:User {id: 'b5e5a5e0-5555-4a5a-9a5a-555555555555'}) MERGE (u4)-[:SEGUE]->(u5);
MATCH (u5:User {id: 'b5e5a5e0-5555-4a5a-9a5a-555555555555'}), (u1:User {id: 'b1e1a1e0-1111-4a1a-9a1a-111111111111'}) MERGE (u5)-[:SEGUE]->(u1);