drop database if exists amigo_secreto;

create database amigo_secreto;

\c amigo_secreto;

CREATE TABLE evento (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_evento TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE participante (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    data_nascimento TIMESTAMP NOT NULL,
    evento_id INTEGER REFERENCES Evento (id),
    amigo_id INTEGER REFERENCES participante (id)
);


CREATE TABLE desejo (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    participante_id INTEGER REFERENCES participante (id)
);


INSERT INTO evento (nome)
VALUES
    ('Amigo secreto da familia Silva'),
    ('Amigo secreto da São João'),
    ('Amigo secreto do Guanabara');

INSERT INTO participante (nome, data_nascimento, evento_id)
VALUES
    ('Alice Silva', '13-07-1997', 1),
    ('Bruno Costa', '13-07-1997', 2),
    ('Carla Oliveira', '13-07-1997', 3),
    ('Mara Silva', '13-07-1997', 1),
    ('Janira Costa', '13-07-1997', 2),
    ('Beto Oliveira', '13-07-1997', 3),
    ('Pardal Silva', '13-07-1997', 1),
    ('Tigre Costa', '13-07-1997', 2),
    ('Dell Oliveira', '13-07-1997', 3),
    ('Microsoft Silva', '13-07-1997', 1),
    ('Siemens Costa', '13-07-1997', 2),
    ('Pedrinho Oliveira', '13-07-1997', 3);


INSERT INTO desejo (descricao, participante_id)
VALUES
    ('Tenis',1),
    ('Bola',1),
    ('Pantufa',2),
    ('Vela',2),
    ('Gorro',3),
    ('Chinelo',3),
    ('Celular',4),
    ('Pandeiro',4),
    ('Galo',5),
    ('Churrasqueira',5),
    ('Palmito',6),
    ('Carrinho de mão',6),
    ('Monitor',7),
    ('Peruca',7),
    ('Pilhas',8),
    ('Controle remoto',8),
    ('Jogo de facas',9),
    ('Caminhonete',9),
    ('Bala de goma',10),
    ('Tatuagem',10),
    ('Guitarra',11),
    ('Skate',11),
    ('Tartaruga',12),
    ('Aparelho de barbear',12);


CREATE OR REPLACE FUNCTION sorteiaAmigo(received_participante_id INTEGER) RETURNS BOOLEAN AS $$
declare 
    evento_selecionado_id integer;
	amigo_sorteado_id integer;
BEGIN
    IF EXISTS (SELECT 1 FROM participante WHERE id = received_participante_id and amigo_id IS NOT NULL)
    THEN 
        RAISE NOTICE 'O participante já tem um amigo definido';
        RETURN FALSE;
    END IF;

    SELECT evento_id INTO evento_selecionado_id from participante where id = received_participante_id;
    
    SELECT id INTO amigo_sorteado_id FROM participante WHERE
    evento_id = evento_selecionado_id
    AND
    id != received_participante_id
    AND
    id NOT IN (
        SELECT amigo_id FROM participante WHERE evento_id = evento_selecionado_id and amigo_id IS NOT NULL
    )
    order by 
        random()
    limit 1;

    IF amigo_sorteado_id IS NOT NULL
    THEN
        UPDATE participante SET amigo_id = amigo_sorteado_id WHERE id = received_participante_id;
        RETURN TRUE;
    ELSE
        RAISE NOTICE 'Todos os participantes já foram sorteados!';
        RETURN FALSE;
    END IF;
END;
$$ LANGUAGE plpgsql;

SELECT sorteiaAmigo(1);
SELECT sorteiaAmigo(1);
SELECT sorteiaAmigo(10);
SELECT sorteiaAmigo(7);
SELECT sorteiaAmigo(4);


CREATE OR REPLACE FUNCTION mostraParticipantes(evento_received_id INTEGER)
RETURNS TABLE (
    participante VARCHAR,
    amigo_secreto VARCHAR
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        p.nome as participante,
        a.nome as amigo
    FROM
        participante p
    JOIN
        participante a ON p.amigo_id = a.id
    WHERE
        p.evento_id = evento_received_id;
END;
$$ LANGUAGE plpgsql;

SELECT * FROM mostraParticipantes(1);