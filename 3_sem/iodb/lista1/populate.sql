\c cinema;

-- Inserindo mais dados na tabela sala
INSERT INTO sala (nome, capacidade)
VALUES
    ('Sala 1', 150),
    ('Sala 2', 90),
    ('Sala 3', 110),
    ('Sala 4', 90);

-- Inserindo mais dados na tabela externo.filme
INSERT INTO externo.filme (titulo, duracao)
VALUES
    ('Titanic', 130),
    ('Matrix Revolutions', 95),
    ('O Senhor dos anéis: O retorno do rei', 110);

-- Inserindo mais dados na tabela externo.sessao
INSERT INTO externo.sessao (filme_id, sala_id, data, hora)
VALUES
    (1, 1, '2023-08-04', '14:00:00'),
    (2, 3, '2023-08-05', '15:30:00'),
    (3, 2, '2023-08-06', '17:00:00'),
    (1, 1, '2023-08-04', '19:30:00'),
    (2, 3, '2023-08-05', '21:00:00'),
    (3, 4, '2023-08-06', '22:30:00');

-- Inserindo mais dados na tabela externo.telespectador
INSERT INTO externo.telespectador (cpf, nome)
VALUES
    ('12345678901', 'Joao Silva'),
    ('23456789012', 'Maria Santos'),
    ('34567890123', 'Pedro Almeida'),
    ('45678901234', 'Luisa Oliveira'),
    ('56789012345', 'Carlos Pereira'),
    ('67890123456', 'Ana Rodrigues'),
    ('78901234567', 'Miguel Fernandes'),
    ('89012345678', 'Isabela Silva'),
    ('90123456789', 'Ricardo Costa'),
    ('01234567890', 'Patricia Sousa'),
    ('11223344556', 'Paulo Vieira'),
    ('22334455667', 'Camila Gomes');

-- Inserindo mais dados na tabela externo.ingresso
INSERT INTO externo.ingresso (telespectador_id, sessao_id, valor_ingresso, corredor, poltrona, valor_pago)
VALUES
    (1, 1, 15.00, 'A', 1, 15.00),
    (2, 2, 12.50, 'B', 3, 12.50),
    (3, 3, 18.00, 'C', 2, 18.00),
    (4, 4, 15.00, 'A', 2, 15.00),
    (5, 5, 12.50, 'B', 1, 12.50),
    (6, 6, 18.00, 'C', 3, 18.00),
    (7, 1, 15.00, 'A', 3, 15.00),
    (8, 2, 12.50, 'B', 2, 12.50),
    (9, 3, 18.00, 'C', 1, 18.00),
    (10, 4, 15.00, 'A', 1, 15.00),
    (11, 5, 12.50, 'B', 2, 12.50),
    (11, 6, 18.00, 'C', 3, 18.00);

-- Inserindo mais dados na tabela interno.setor
INSERT INTO interno.setor (descricao, valor_por_hora)
VALUES
    ('Bilheteria', 20.00),
    ('Limpeza', 15.00),
    ('Segurança', 18.00),
    ('Lanchonete', 22.00);

-- Inserindo mais dados na tabela interno.funcionario
INSERT INTO interno.funcionario (nome, setor_id)
VALUES
    ('Ana Pereira', 1),
    ('José Oliveira', 2),
    ('Marta Santos', 3),
    ('Rafael Rodrigues', 1),
    ('Carla Mendes', 2),
    ('Paulo Sousa', 3),
    ('Eduardo Lima', 4),
    ('Sandra Pereira', 4);

-- Inserindo mais dados na tabela interno.turno com funcionários trabalhando em um turno por dia
INSERT INTO interno.turno (sala_id, funcionario_id, data_hora_entrada, data_hora_saida)
VALUES
    -- Turno da manhã
    (1, 1, '2023-09-01 08:00:00', '2023-09-01 12:00:00'),
    (2, 2, '2023-09-02 08:00:00', '2023-09-02 12:00:00'),
    (3, 3, '2023-09-03 08:00:00', '2023-09-03 12:00:00'),
    (4, 4, '2023-09-04 08:00:00', '2023-09-04 12:00:00'),

    -- Turno da tarde
    (1, 5, '2023-09-01 13:30:00', '2023-09-01 17:30:00'),
    (2, 6, '2023-09-02 13:30:00', '2023-09-02 17:30:00'),
    (3, 7, '2023-09-03 13:30:00', '2023-09-03 17:30:00'),
    (4, 8, '2023-09-04 13:30:00', '2023-09-04 17:30:00'),

    -- Turno da noite
    (1, 1, '2023-09-01 19:00:00', '2023-09-01 23:00:00'),
    (2, 2, '2023-09-02 19:00:00', '2023-09-02 23:00:00'),
    (3, 3, '2023-09-03 19:00:00', '2023-09-03 23:00:00'),
    (4, 4, '2023-09-04 19:00:00', '2023-09-04 23:00:00');
