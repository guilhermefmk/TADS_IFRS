DROP DATABASE IF EXISTS cinema;
CREATE DATABASE cinema;
\c cinema;

DROP SCHEMA IF EXISTS externo;
DROP SCHEMA IF EXISTS interno;

CREATE SCHEMA externo;
CREATE SCHEMA interno;

SET search_path TO public, externo, interno;

CREATE TABLE sala(
    id                  serial PRIMARY KEY,
    nome                text NOT NULL,
    capacidade          integer CHECK (capacidade > 0)
);

CREATE TABLE externo.filme(
    id                  serial PRIMARY KEY,
    titulo              text NOT NULL,
    duracao             integer CHECK (duracao > 0)
);

CREATE TABLE externo.sessao(
    id                  serial PRIMARY KEY,
    filme_id            integer,
    sala_id             integer,
    data                date NOT NULL,
    hora                time NOT NULL,
    FOREIGN KEY (filme_id) REFERENCES externo.filme (id),
    FOREIGN KEY (sala_id) REFERENCES sala (id)
);

CREATE TABLE externo.telespectador(
    id                  serial PRIMARY KEY,
    cpf                 character(11) UNIQUE,
    nome                text NOT NULL
);

CREATE TABLE externo.ingresso(
    id                  serial PRIMARY KEY,
    telespectador_id    integer,
    sessao_id           integer,
    valor_ingresso      real,
    corredor            character(1) NOT NULL,
    poltrona            integer CHECK (poltrona > 0),
    valor_pago          real,
    FOREIGN KEY (telespectador_id) REFERENCES externo.telespectador (id),
    FOREIGN KEY (sessao_id) REFERENCES externo.sessao (id)
);

CREATE TABLE interno.setor(
    id                  serial PRIMARY KEY,
    descricao           text,
    valor_por_hora      real
);

CREATE TABLE interno.funcionario(
    id                  serial PRIMARY KEY,
    nome                text NOT NULL,
    setor_id            integer,
    FOREIGN KEY (setor_id) REFERENCES interno.setor (id)
);

CREATE TABLE interno.turno(
    sala_id             integer,
    funcionario_id       integer,
    data_hora_entrada   timestamp DEFAULT CURRENT_TIMESTAMP,
    data_hora_saida     timestamp,
    FOREIGN KEY (sala_id) REFERENCES sala (id),
    FOREIGN KEY (funcionario_id) REFERENCES interno.funcionario (id)
);

