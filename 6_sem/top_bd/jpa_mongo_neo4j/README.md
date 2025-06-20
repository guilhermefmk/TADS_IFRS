### 💼 **Trabalho 2: Sistema de Recomendação Social com Java, MongoDB e Neo4j**

### 🎯 **Objetivo do Projeto**

Construir um sistema web baseado em **Java** que integra dois bancos de dados NoSQL complementares:

* **MongoDB** para armazenar **conteúdo rico de usuários** (posts, perfis, mensagens).
* **Neo4j** para **modelar relacionamentos sociais e comportamentos** (amizades, curtidas, interações, sugestões).

O sistema deverá:

* Armazenar perfis e conteúdos de usuários.
* Registrar interações sociais como "seguir", "curtir" e "comentar".
* Gerar recomendações de novos amigos e conteúdos.
* Exibir estatísticas de engajamento e conexões.

---

### 🧱 **Tecnologias Desejáveis**

| Tecnologia          | Finalidade                                    |
| ------------------- | --------------------------------------------- |
| Java 17+            | Backend principal                             |
| Spring Boot         | Framework de aplicação                        |
| MongoDB             | Armazenamento de dados de conteúdo            |
| Neo4j               | Armazenamento de relações e análise de grafos |
| Spring Data MongoDB | Integração com MongoDB                        |
| Neo4j Java Driver   | Integração com o banco de grafos Neo4j        |
| Swagger/OpenAPI     | Documentação e teste das APIs                 |

---

### 🧩 **Módulos do Projeto**

#### 1. **Usuários**

* Armazenados em MongoDB (dados de perfil: nome, bio, interesses).
* Representados também como nós no Neo4j para interações sociais.

#### 2. **Posts**

* Criados e armazenados em MongoDB.
* Indexados para busca por hashtag, conteúdo e autor.

#### 3. **Relacionamentos Sociais (Neo4j)**

* `(:Usuario)-[:SEGUE]->(:Usuario)`
* `(:Usuario)-[:CURTIU]->(:Post)`
* `(:Usuario)-[:COMENTOU]->(:Post)`
* `(:Usuario)-[:VISITOU_PERFIL]->(:Usuario)`

---

### 🔁 **Fluxo da Aplicação**

1. **Registro de usuário**

   * Grava dados no MongoDB.
   * Cria nó `Usuario` em Neo4j com mesmo ID.

2. **Criação de post**

   * Grava documento no MongoDB.
   * Cria nó `Post` em Neo4j e relacionamento com o autor.

3. **Interações**

   * Quando um usuário curte/comenta/segue:

     * É registrado como relação em Neo4j.
     * (Opcional) adiciona referência em MongoDB no histórico.

4. **Recomendações**

   * Neo4j analisa conexões e sugere:

     * Amigos em comum.
     * Posts populares entre contatos de 2º grau.

---
<!--
### 🔍 **Exemplo de Consulta em Neo4j (Cypher)**

```cypher
MATCH (u:Usuario {id: 'user123'})-[:SEGUE]->(amigo)-[:CURTIU]->(post:Post)
WHERE NOT (u)-[:CURTIU]->(post)
RETURN post.id, count(*) AS popularidade
ORDER BY popularidade DESC
LIMIT 5;
```

> Retorna os posts mais populares entre amigos que o usuário ainda não curtiu.

---
-->

### 📄 **Sugestão de Documento - MongoDB**

```json
{
  "_id": "post123",
  "usuario_id": "user123",
  "conteudo": "Visitando o Parque Ibirapuera!",
  "hashtags": ["#parque", "#natureza"],
  "data_criacao": "2025-05-25T10:00:00Z",
  "comentarios": [
    { "usuario_id": "user456", "texto": "Que legal!" }
  ]
}
```

---


### 🧪 **Casos de Uso a Implementar**

| Caso de Uso                | MongoDB | Neo4j |
| -------------------------- | ------- | ----- |
| Criar perfil de usuário    | ✅       | ✅     |
| Criar post                 | ✅       | ✅     |
| Seguir outro usuário       | ❌       | ✅     |
| Curtir um post             | ❌       | ✅     |
| Recomendar amigos          | ❌       | ✅     |
| Recomendar posts populares | ❌       | ✅     |
| Buscar posts por hashtag   | ✅       | ❌     |

---


### 🎓 **Entregáveis do Trabalho**

* Aplicação Java funcional
* Banco MongoDB com dados de usuários e posts
* Banco Neo4j com grafo social
* Documentação de API (Swagger ou Postman)
* Scripts de carga inicial (seed)
* Relatório técnico (opcional para fins acadêmicos)

***

<!--
# Trabalho 2 - Neo4j + MongoDB

#### Descrição do Problema
Desenvolver um sistema básico de gerenciamento de eventos que utilize Java para a lógica de negócios, Neo4j para modelagem de conexões sociais e MongoDB para armazenamento de dados de eventos. 

#### Requisitos do Sistema

1. **Cadastro de Usuários**:
   - Cada usuário deve ter: `cpf`, `nome`, `email`, `senha` e `data_nascimento`.
   - Implementar operações CRUD para gerenciar os usuários.

2. **Modelagem de Conexões Sociais**:
   - Utilizar Neo4j para modelar as conexões sociais entre os usuários (amizades).
   - Implementar funcionalidades para adicionar e remover amizades.

-->