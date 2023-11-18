DROP DATABASE IF EXISTS anotacoes_db;

CREATE DATABASE anotacoes_db;

\c anotacoes_db;

CREATE TABLE anotacoes(
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(30), 
    dt_hora TIMESTAMP WITHOUT TIME ZONE DEFAULT CURRENT_TIMESTAMP, 
    descricao TEXT, 
    cor VARCHAR(50) DEFAULT 'yellow',
    trash BOOLEAN DEFAULT false
);

INSERT INTO anotacoes(titulo,descricao,trash) VALUES ('primeira anotacao', 'minha primeira descricao',true);