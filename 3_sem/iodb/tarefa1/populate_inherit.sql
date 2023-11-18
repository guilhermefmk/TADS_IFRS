\c blog;
-- Inserir autores
INSERT INTO author (name, email, password)
VALUES
    ('Alice Johnson', 'alice.johnson@email.com', 'senha123'),
    ('Bob Smith', 'bob.smith@email.com', 'senha456'),
    ('Carla Silva', 'carla.silva@email.com', 'senha789'),
    ('David Brown', 'david.brown@email.com', 'senhaabc'),
    ('Eva Martinez', 'eva.martinez@email.com', 'senhaxyz'),
    ('Frank Wilson', 'frank.wilson@email.com', 'senha789'),
    ('Gina Lee', 'gina.lee@email.com', 'senha456'),
    ('Hugo Garcia', 'hugo.garcia@email.com', 'senha123'),
    ('Ivy Chen', 'ivy.chen@email.com', 'senhaabc'),
    ('John Davis', 'john.davis@email.com', 'senhaxyz');

-- Inserir leitores
INSERT INTO reader (name, email, password)
VALUES
    ('Laura Jones', 'laura.jones@email.com', 'senhalaura'),
    ('Michael Brown', 'michael.brown@email.com', 'senhamichael'),
    ('Nina Kim', 'nina.kim@email.com', 'senhanina'),
    ('Oliver Garcia', 'oliver.garcia@email.com', 'senhaoliver'),
    ('Patricia Smith', 'patricia.smith@email.com', 'senhapatricia'),
    ('Quincy Miller', 'quincy.miller@email.com', 'senhaquincy'),
    ('Rita Chen', 'rita.chen@email.com', 'senharita'),
    ('Samuel Wilson', 'samuel.wilson@email.com', 'senhasamuel'),
    ('Tina Martinez', 'tina.martinez@email.com', 'senhatina'),
    ('Ursula Davis', 'ursula.davis@email.com', 'senhaursula'),
    ('Vince Silva', 'vince.silva@email.com', 'senhavince'),
    ('Wendy Lee', 'wendy.lee@email.com', 'senhawendy'),
    ('Xander Johnson', 'xander.johnson@email.com', 'senhaxander'),
    ('Yara Smith', 'yara.smith@email.com', 'senhayara'),
    ('Zane Brown', 'zane.brown@email.com', 'senhazane'),
    ('Zara Johnson', 'zara.johnson@email.com', 'senhazara'),
    ('Yuri Kim', 'yuri.kim@email.com', 'senhayuri'),
    ('Xander Smith', 'xander.smith@email.com', 'senhaxander'),
    ('Wendy Davis', 'wendy.davis@email.com', 'senhawendy'),
    ('Vince Wilson', 'vince.wilson@email.com', 'senhavince'),
    ('Ursula Garcia', 'ursula.garcia@email.com', 'senhaursula'),
    ('Tina Lee', 'tina.lee@email.com', 'senhatina'),
    ('Samuel Brown', 'samuel.brown@email.com', 'senhasamuel'),
    ('Rita Martinez', 'rita.martinez@email.com', 'senharita'),
    ('Quincy Silva', 'quincy.silva@email.com', 'senhaquincy'),
    ('Patricia Chen', 'patricia.chen@email.com', 'senhapatricia'),
    ('Oliver Miller', 'oliver.miller@email.com', 'senhaoliver'),
    ('Nina Davis', 'nina.davis@email.com', 'senhanina'),
    ('Michael Lee', 'michael.lee@email.com', 'senhamichael'),
    ('Laura Wilson', 'laura.wilson@email.com', 'senhalaura');

-- Inserir endereços para leitores
INSERT INTO address (district, street, number, complement, zip_code, reader_id)
VALUES
    ('Bairro A', 'Rua das Flores', 123, 'Apto 101', '12345-678', 1),
    ('Bairro B', 'Avenida Principal', 456, 'Apto 202', '23456-789', 2),
    ('Bairro C', 'Rua do Parque', 789, 'Apto 303', '34567-890', 3),
    ('Bairro D', 'Rua dos Coqueiros', 101, 'Apto 404', '45678-901', 4),
    ('Bairro E', 'Avenida Central', 234, 'Apto 505', '56789-012', 5),
    ('Bairro F', 'Rua da Praca', 567, 'Apto 606', '67890-123', 6),
    ('Bairro G', 'Avenida das Arvores', 890, 'Apto 707', '78901-234', 7),
    ('Bairro H', 'Rua do Lago', 123, 'Apto 808', '89012-345', 8),
    ('Bairro I', 'Avenida das Flores', 456, 'Apto 909', '90123-456', 9),
    ('Bairro F', 'Rua das Palmeiras', 789, 'Apto 1010', '01234-567', 10),
    ('Bairro K', 'Avenida dos Passaros', 101, 'Apto 1111', '12345-678', 10),
    ('Bairro L', 'Rua da Serra', 234, 'Apto 1212', '23456-789', 10),
    ('Bairro M', 'Avenida dos Lagos', 567, 'Apto 1313', '34567-890', 11),
    ('Bairro N', 'Rua dos Bosques', 890, 'Apto 1414', '45678-901', 11),
    ('Bairro O', 'Avenida dos Rios', 123, 'Apto 1515', '56789-012', 12),
    ('Bairro K', 'Rua das Montanhas', 456, 'Apto 1616', '67890-123', 13),
    ('Bairro Q', 'Avenida das Praias', 789, 'Apto 1717', '78901-234', 14),
    ('Bairro R', 'Rua dos Campos', 123, 'Apto 1818', '89012-345', 15),
    ('Bairro S', 'Avenida dos Ventos', 456, 'Apto 1919', '90123-456', 16),
    ('Bairro V', 'Rua dos Oceanos', 789, 'Apto 2020', '01234-567', 17),
    ('Bairro V', 'Avenida dos Rios', 987, 'Apto 2121', '12345-678', 18),
    ('Bairro V', 'Rua dos Bosques', 567, 'Apto 2222', '23456-789', 19),
    ('Bairro W', 'Avenida das Arvores', 345, 'Apto 2323', '34567-890', 20),
    ('Bairro X', 'Rua da Praca', 654, 'Apto 2424', '45678-901', 21),
    ('Bairro Y', 'Avenida Central', 789, 'Apto 2525', '56789-012', 22),
    ('Bairro Z', 'Rua do Parque', 123, 'Apto 2626', '67890-123', 23),
    ('Bairro A', 'Rua das Flores', 456, 'Apto 2727', '78901-234', 24),
    ('Bairro B', 'Avenida Principal', 987, 'Apto 2828', '89012-345', 25),
    ('Bairro C', 'Avenida das Praias', 123, 'Apto 2929', '90123-456', 26),
    ('Bairro A', 'Rua dos Oceanos', 234, 'Apto 3030', '01234-567', 27),
    ('Bairro F', 'Avenida dos Pássaros', 567, 'Apto 3131', '12345-678', 28),
    ('Bairro B', 'Rua dos Bosques', 890, 'Apto 3232', '23456-789', 29),
    ('Bairro A', 'Avenida dos Rios', 101, 'Apto 3333', '34567-890', 30);

INSERT INTO post (title, text, date_time, is_sharable)
VALUES
    ('Como cozinhar um bolo delicioso', 'Hoje vou compartilhar minha receita de bolo favorita.', '2023-09-01 10:00:00', true),
    ('Dicas para uma viagem econômica', 'Descubra como economizar em sua próxima viagem.', '2023-09-02 12:30:00', true),
    ('Receita de um prato típico da Itália', 'Aprenda a fazer uma autêntica lasanha italiana.', '2023-09-03 15:45:00', false),
    ('Os melhores destinos para um mochilão', 'Explore lugares incríveis com pouco dinheiro.', '2023-09-04 08:20:00', true),
    ('Como criar um jardim em casa', 'Dicas para ter um jardim deslumbrante no seu quintal.', '2023-09-05 14:15:00', false),
    ('Tecnicas de meditação para iniciantes', 'Aprenda a meditar e reduza o estresse.', '2023-09-06 11:10:00', true),
    ('História da arte moderna', 'Conheça os movimentos artísticos do século XX.', '2023-09-07 09:05:00', false),
    ('O impacto das mudanças climáticas', 'Saiba como as mudanças climáticas afetam o planeta.', '2023-09-08 17:00:00', true),
    ('Receita de um coquetel tropical', 'Prepare um delicioso coquetel de frutas para suas festas.', '2023-09-09 16:30:00', false),
    ('Dicas de organização para sua casa', 'Mantenha sua casa arrumada com essas dicas simples.', '2023-09-10 13:55:00', true),
    ('Os beneficios da alimentacao saudavel', 'Descubra como uma dieta balanceada pode melhorar sua saúde.', '2023-09-21 09:30:00', true),
    ('Dicas para melhorar a qualidade do sono', 'Tenha noites de sono tranquilas com essas dicas.', '2023-09-22 19:15:00', true),
    ('Receita de um prato vegano delicioso', 'Aprenda a fazer um prato vegano incrível.', '2023-09-23 12:45:00', false),
    ('Viagem pela história da música', 'Explore os principais momentos da história da música.', '2023-09-24 16:20:00', true),
    ('Dicas de decoração para o seu lar', 'Transforme sua casa com essas ideias de decoração.', '2023-09-25 14:10:00', false),
    ('Como manter o foco no trabalho', 'Aumente sua produtividade com dicas de concentração.', '2023-09-26 10:50:00', true),
    ('História das civilizações antigas', 'Conheça as antigas civilizações que moldaram o mundo.', '2023-09-27 08:40:00', false),
    ('Sustentabilidade no dia a dia', 'Saiba como adotar práticas sustentáveis em sua rotina.', '2023-09-28 17:55:00', true),
    ('Receita de um coquetel clássico', 'Prepare um coquetel clássico para suas festas.', '2023-09-29 15:25:00', false),
    ('Dicas para o planejamento financeiro', 'Aprenda a gerenciar suas finanças de forma eficaz.', '2023-09-30 11:35:00', true);

-- Relacionar autores aos posts
INSERT INTO author_posts (author_id, post_id)
VALUES
    (1, 1), (2, 2), (3, 3), (4, 4), (5, 5),
    (6, 6), (7, 7), (8, 8), (9, 9), (10, 10),
    (1, 11), (2, 11), (3, 12), (4, 13), (5, 13),
    (6, 14), (7, 15), (8, 16), (9, 17), (10, 18);
