-- RESPOSTAS A PARTIR DA LINHA 216

\c postgres;
DROP DATABASE IF EXISTS pbd_posts;
CREATE DATABASE pbd_posts;
\c pbd_posts;

CREATE OR REPLACE FUNCTION verificaAutorPost(pessoa_id INTEGER, post_id_recebido INTEGER) RETURNS BOOLEAN AS $$
DECLARE
    tipo_pessoa CHAR(1);
    ehcompartilhado BOOLEAN;
BEGIN
    -- Verifica se a pessoa é um autor
    SELECT tipo INTO tipo_pessoa FROM pessoa WHERE id = pessoa_id;
    IF tipo_pessoa != 'A' THEN
        RETURN FALSE;
    END IF;

    -- Verifica se o post permite múltiplos autores
    SELECT compartilhado INTO ehcompartilhado FROM post WHERE id = post_id_recebido;
    IF ehcompartilhado = FALSE THEN
        -- Se o post não permite múltiplos autores, verifica se já existe um autor associado ao post
        IF EXISTS (SELECT 1 FROM pessoa_post WHERE post_id = post_id_recebido) THEN
            RETURN FALSE;
        END IF;
    END IF;

    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION mostraInformacoesPessoas() RETURNS TABLE (
    id INTEGER,
    nome VARCHAR,
    tipo CHAR,
    email VARCHAR,
    enderecos TEXT
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.id,
        p.nome,
        p.tipo,
        p.email,
        CASE
            WHEN p.tipo = 'L' THEN
                COALESCE(
                    (SELECT STRING_AGG(e.bairro || ', ' || e.rua || ', ' || e.nro || ', ' || e.cep, '; ')
                     FROM endereco e WHERE e.pessoa_id = p.id),
                    'LEITOR - SEM ENDEREÇO CADASTRADO'
                )
            ELSE
                'AUTOR - SEM ENDEREÇO CADASTRADO'
        END AS enderecos
    FROM pessoa p;
END;
$$ LANGUAGE plpgsql;


CREATE OR REPLACE FUNCTION ehLeitor(pessoa_id INTEGER)
RETURNS BOOLEAN AS $$
DECLARE
    tipo_pessoa CHAR(1);
BEGIN
    -- Obtém o tipo da pessoa
    SELECT tipo INTO tipo_pessoa
    FROM pessoa
    WHERE id = pessoa_id;

    -- Retorna TRUE se a pessoa for um leitor, FALSE caso contrário
    RETURN tipo_pessoa = 'L';
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        -- Caso não encontre o id, retorna FALSE
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION quantidadeAutoresPorPost()
RETURNS TABLE (
    titulo VARCHAR,
    data_publicacao VARCHAR,
    quantidade_autores INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.titulo,
        TO_CHAR(p.data_hora, 'DD/MM/YYYY HH24:MI:SS')::VARCHAR AS data_publicacao,
        COUNT(pp.pessoa_id)::INTEGER AS quantidade_autores
    FROM post p
    LEFT JOIN pessoa_post pp ON p.id = pp.post_id
    GROUP BY p.id;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION mostraAutoresPorPost()
RETURNS TABLE (
    titulo VARCHAR,
    autores VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.titulo,
        STRING_AGG(pe.nome, ', ')::VARCHAR AS autores
    FROM
        post p
    LEFT JOIN
        pessoa_post pp ON p.id = pp.post_id
    LEFT JOIN
        pessoa pe ON pp.pessoa_id = pe.id
    WHERE
        pe.tipo = 'A'
    GROUP BY
        p.titulo;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION autenticaPessoa(email_recebido VARCHAR, senha_recebida TEXT)
RETURNS BOOLEAN AS $$
DECLARE
    senha_armazenada TEXT;
BEGIN
    SELECT senha INTO senha_armazenada
    FROM pessoa
    WHERE email = email_recebido;

    RETURN senha_armazenada = MD5(senha_recebida);
EXCEPTION
    WHEN NO_DATA_FOUND THEN
        RETURN FALSE;
END;
$$ LANGUAGE plpgsql;


CREATE TABLE pessoa (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL,
    tipo CHAR(1) CHECK (tipo = 'L' OR tipo = 'A'),
    email VARCHAR(100) UNIQUE
);

CREATE TABLE endereco (
    id SERIAL PRIMARY KEY,
    bairro VARCHAR(100),
    rua VARCHAR(100),
    nro VARCHAR(5),
    cep VARCHAR(10),
    pessoa_id INTEGER REFERENCES pessoa (id) CHECK (ehLeitor(pessoa_id) IS TRUE)
);

CREATE TABLE post (
    id SERIAL PRIMARY KEY,
    data_hora TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    titulo VARCHAR(100) NOT NULL,
    texto TEXT,
    compartilhado BOOLEAN DEFAULT FALSE
);

CREATE TABLE pessoa_post (
    pessoa_id INTEGER REFERENCES pessoa(id),
    post_id INTEGER REFERENCES post (id),
    PRIMARY KEY (pessoa_id, post_id),
    CHECK (verificaAutorPost(pessoa_id, post_id) IS TRUE)
);


-- Inserção de autores
INSERT INTO pessoa (nome, senha, tipo, email)
VALUES
    ('Alice Silva', MD5('senhaAlice2024'), 'A', 'alice.silva@example.com'),
    ('Bruno Costa', MD5('senhaBruno2024'), 'A', 'bruno.costa@example.com'),
    ('Carla Oliveira', MD5('senhaCarla2024'), 'A', 'carla.oliveira@example.com');

-- Inserção de leitores
INSERT INTO pessoa (nome, senha, tipo, email)
VALUES
    ('Daniela Pereira', MD5('senhaDaniela2024'), 'L', 'daniela.pereira@example.com'),
    ('Eduardo Martins', MD5('senhaEduardo2024'), 'L', 'eduardo.martins@example.com');

-- Inserção de endereços para leitores
INSERT INTO endereco (bairro, rua, nro, cep, pessoa_id)
VALUES
    ('Jardim das Flores', 'Rua A', '101', '12345-000', (SELECT id FROM pessoa WHERE email = 'daniela.pereira@example.com')),
    ('Vila Nova', 'Avenida B', '202', '23456-000', (SELECT id FROM pessoa WHERE email = 'eduardo.martins@example.com'));

-- Inserção de posts
INSERT INTO post (titulo, texto, compartilhado)
VALUES
    ('O Impacto da Tecnologia na Educação', 'Este post explora como a tecnologia está transformando o sistema educacional.', TRUE),
    ('Tendências de Mercado em 2024', 'Análise das principais tendências de mercado para o ano de 2024.', FALSE),
    ('Guia Completo de Programação em Python', 'Um guia detalhado para iniciantes aprenderem Python de forma eficaz.', TRUE);

-- Inserção de autoria para o Post1 com múltiplos autores
INSERT INTO pessoa_post (pessoa_id, post_id)
VALUES
    ((SELECT id FROM pessoa WHERE email = 'alice.silva@example.com'), (SELECT id FROM post WHERE titulo = 'O Impacto da Tecnologia na Educação')),
    ((SELECT id FROM pessoa WHERE email = 'bruno.costa@example.com'), (SELECT id FROM post WHERE titulo = 'O Impacto da Tecnologia na Educação'));

-- Inserção de autoria para o Post2 com um único autor
INSERT INTO pessoa_post (pessoa_id, post_id)
VALUES
    ((SELECT id FROM pessoa WHERE email = 'carla.oliveira@example.com'), (SELECT id FROM post WHERE titulo = 'Tendências de Mercado em 2024'));

-- Inserção de autoria para o Post3 com múltiplos autores
INSERT INTO pessoa_post (pessoa_id, post_id)
VALUES
    ((SELECT id FROM pessoa WHERE email = 'alice.silva@example.com'), (SELECT id FROM post WHERE titulo = 'Guia Completo de Programação em Python')),
    ((SELECT id FROM pessoa WHERE email = 'bruno.costa@example.com'), (SELECT id FROM post WHERE titulo = 'Guia Completo de Programação em Python')),
    ((SELECT id FROM pessoa WHERE email = 'carla.oliveira@example.com'), (SELECT id FROM post WHERE titulo = 'Guia Completo de Programação em Python'));



--  1) A implementação física (script.sql) (1,0)

-- RESPOSTA: O script.sql foi implementado no arquivo main.sql.



-- 2) Um Stored Procedured para ser usado na cláusula check que permita que somente autores (pessoa do tipo = 'A') escrevam posts (1,0)

--          Em outras palavras: que somente pessoas do tipo = 'A' (autor) estejam envolvidos em tuplas da tabela em pessoa_post.

--          Além disso, deve verificar se o Post permite - ou não - que mais de um autor esteja relacionado (possa editá-lo), permitindo que um post tenha n tuplas em pessoa_post (com ligação com diversos autores).

-- RESPOSTA: O Stored Procedured foi implementado de forma única sendo chamada de verificaAutorPost(pessoa_id INTEGER, post_id_recebido INTEGER) que retorna um booleano, 
--           presente na linha 6 do arquivo main.sql.

-- Testa a função verificaAutorPost para verificar se uma pessoa pode ser associada a um post
SELECT verificaAutorPost(1, 1);

-- 3) Um Stored Procedured que mostre as informações de todos as pessoas (leitores e autores) (1,0)

--          Caso seja leitor e tenha endereços cadastrados, estes endereços devem aparecer ao lado do nome e separados por vírgula. Se não tiver endereço cadastrado, coloque "LEITOR - SEM ENDEREÇO CADASTRADO".

--          Caso seja autor, coloque "AUTOR - SEM ENDEREÇO CADASTRADO".

-- RESPOSTA: O Stored Procedured foi implementado de forma única sendo chamada de mostraInformacoesPessoas() que retorna uma tabela com as informações solicitadas,
--           presente na linha 31 do arquivo main.sql.

-- Testa a função mostraInformacoesPessoas para exibir informações sobre todas as pessoas
SELECT * FROM mostraInformacoesPessoas();

-- 4) Um Stored Procedured para ser usado na cláusula check que permita verificar que somente Leitores (tipo = 'L') tenham endereço cadastrado (0,5)

-- RESPOSTA: A stored procedure ehLeitor(pessoa_id INTEGER) foi implementada na linha 60 do arquivo main.sql e adicionada como cláusula CHECK na tabela endereco.

-- Testa a função ehLeitor para verificar se uma pessoa é um leitor
SELECT ehLeitor(1); 

-- 5) Um Stored Procedured que mostre a quantidade de autores envolvidos na escrita de cada Post (0,5)

--      Mostre o título de cada Post, sua data de publicação (formatada) e a quantidade correspondente de autores.

-- RESPOSTA: O Stored Procedured foi implementado de forma única sendo chamada de quantidadeAutoresPorPost() que retorna uma tabela com as informações solicitadas,
--           presente na linha 79 do arquivo main.sql.

-- Testa a função quantidadeAutoresPorPost
SELECT * FROM quantidadeAutoresPorPost();

-- 6) Um Stored Procedured que mostre o título de cada Post e o nome de cada autor envolvido em sua escrita (0,5)
--          Caso tenha mais de um autor envolvido na escrita, estes nomes devem aparecer em uma mesma coluna separados por vírgula (Use String_Agg)

-- RESPOSTA: O Stored Procedured foi implementado de forma única sendo chamada de mostraAutoresPorPost() que retorna uma tabela com as informações solicitadas,
--           presente na linha 96 do arquivo main.sql.

-- Testa a função mostraAutoresPorPost para exibir os títulos dos posts e os nomes dos autores
SELECT * FROM mostraAutoresPorPost();


-- 7) Um Stored Procedured que autentique (login) Pessoas (Leitores e Autores) (0,5)
--          As senhas devem ser armazenadas em md5

-- RESPOSTA: O Stored Procedured foi implementado de forma única sendo chamada de autenticaPessoa(email_recebido VARCHAR, senha_recebida TEXT) que retorna um booleano,
--           presente na linha 119 do arquivo main.sql.

-- Testa a função autenticaPessoa para verificar a autenticação de um usuário
SELECT autenticaPessoa('alice.silva@example.com', 'senhaAlice2024'); -- Substitua pelos valores do email e senha que você deseja testar
