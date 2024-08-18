drop database if exists diaristas;

create database diaristas;

\c diaristas;

CREATE TABLE Diarista (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL,
    is_deleted BOOLEAN DEFAULT FALSE
);

CREATE TABLE Responsavel (
    id SERIAL PRIMARY KEY,
    cpf VARCHAR(11) UNIQUE NOT NULL,
    nome VARCHAR(100) NOT NULL
);

CREATE TABLE Residencia (
    id SERIAL PRIMARY KEY,
    id_responsavel INT NOT NULL,
    cidade VARCHAR(100) NOT NULL,
    bairro VARCHAR(100) NOT NULL,
    rua VARCHAR(100) NOT NULL,
    complemento VARCHAR(100),
    numero VARCHAR(10) NOT NULL,
    tamanho VARCHAR(10) CHECK (tamanho IN ('pequena', 'media', 'grande')) NOT NULL,
    FOREIGN KEY (id_responsavel) REFERENCES Responsavel(id)
);

CREATE TABLE PrecoFaxina (
    id SERIAL PRIMARY KEY,
    tamanho_residencia VARCHAR(10) CHECK (tamanho_residencia IN ('pequena', 'media', 'grande')) NOT NULL,
    preco NUMERIC(10, 2) NOT NULL,
    data_vigencia DATE NOT NULL,
    UNIQUE (tamanho_residencia, data_vigencia)
);

CREATE TABLE Faxina (
    id SERIAL PRIMARY KEY,
    id_diarista INT NOT NULL,
    id_residencia INT NOT NULL,
    data_faxina DATE NOT NULL,
    faltou BOOLEAN DEFAULT FALSE,
    valor_pago NUMERIC(10, 2) NOT NULL,
    feedback TEXT,
    id_precofaxina INT NOT NULL,
    FOREIGN KEY (id_diarista) REFERENCES Diarista(id),
    FOREIGN KEY (id_residencia) REFERENCES Residencia(id),
    FOREIGN KEY (id_precofaxina) REFERENCES PrecoFaxina(id),
    UNIQUE (id_diarista, id_residencia, data_faxina)
);

CREATE OR REPLACE FUNCTION agendar_faxinas(
    p_diarista_id INT,
    p_residencia_id INT,
    p_data_inicio DATE,
    p_frequencia VARCHAR(10),
    p_data_limite DATE
)
RETURNS TABLE(id_faxina INT, id_diarista INT, id_residencia INT, data_faxina DATE, valor_pago DECIMAL, id_precofaxina INT) AS $$
DECLARE
    v_data_faxina DATE := p_data_inicio;
    v_preco DECIMAL;
    v_precofaxina_id INT;
    v_id_faxina INT;
BEGIN
    -- Verificar se a frequência é válida
    IF p_frequencia NOT IN ('quinzenal', 'mensal') THEN
        RAISE EXCEPTION 'Frequência inválida: %. Use ''quinzenal'' ou ''mensal''.', p_frequencia;
    END IF;

    -- Loop para agendar faxinas até a data limite
    WHILE v_data_faxina <= p_data_limite LOOP
        -- Verificar se a diarista já tem uma faxina marcada para o dia
        IF EXISTS (
            SELECT 1 FROM Faxina
            WHERE Faxina.id_diarista = p_diarista_id AND Faxina.data_faxina = v_data_faxina
        ) THEN
            RAISE NOTICE 'A diarista já tem uma faxina marcada para o dia %', v_data_faxina;
        ELSE
            -- Obter o preço e o ID do preço para o tamanho da residência
            SELECT preco, id INTO v_preco, v_precofaxina_id FROM PrecoFaxina
            WHERE tamanho_residencia = (SELECT tamanho FROM Residencia WHERE id = p_residencia_id)
            AND data_vigencia <= v_data_faxina
            ORDER BY data_vigencia DESC LIMIT 1;

            -- Inserir a nova faxina
            INSERT INTO Faxina (id_diarista, id_residencia, data_faxina, valor_pago, id_precofaxina)
            VALUES (p_diarista_id, p_residencia_id, v_data_faxina, v_preco, v_precofaxina_id)
            RETURNING id INTO v_id_faxina;

            -- Retornar a faxina agendada
            RETURN QUERY
            SELECT v_id_faxina, p_diarista_id, p_residencia_id, v_data_faxina, v_preco, v_precofaxina_id;
        END IF;

        -- Atualizar a data da próxima faxina de acordo com a frequência
        IF p_frequencia = 'quinzenal' THEN
            v_data_faxina := v_data_faxina + INTERVAL '14 days';
        ELSIF p_frequencia = 'mensal' THEN
            v_data_faxina := v_data_faxina + INTERVAL '1 month';
        END IF;
    END LOOP;
END;
$$ LANGUAGE plpgsql;


-- Inserindo diaristas
INSERT INTO Diarista (cpf, nome) VALUES ('12345678901', 'Maria Silva');
INSERT INTO Diarista (cpf, nome) VALUES ('98765432100', 'Joana Souza');

-- Inserindo responsáveis
INSERT INTO Responsavel (cpf, nome) VALUES ('11223344556', 'Carlos Oliveira');
INSERT INTO Responsavel (cpf, nome) VALUES ('99887766554', 'Ana Santos');

-- Inserindo residências
INSERT INTO Residencia (id_responsavel, cidade, bairro, rua, complemento, numero, tamanho) 
VALUES (1, 'São Paulo', 'Centro', 'Rua A', 'Apto 101', '100', 'pequena');
INSERT INTO Residencia (id_responsavel, cidade, bairro, rua, complemento, numero, tamanho) 
VALUES (2, 'Rio de Janeiro', 'Copacabana', 'Avenida B', NULL, '200', 'media');

-- Inserindo preços de faxina
INSERT INTO PrecoFaxina (tamanho_residencia, preco, data_vigencia)
VALUES ('pequena', 100.00, '2024-01-01');
INSERT INTO PrecoFaxina (tamanho_residencia, preco, data_vigencia)
VALUES ('media', 150.00, '2024-01-01');



-- Agendando faxinas quinzenais para a residência 1 pela diarista 1 a partir de 1º de setembro de 2024 por 3 vezes
SELECT * FROM agendar_faxinas(1, 1, '2024-09-01', 'quinzenal', '2024-12-31');


SELECT * FROM agendar_faxinas(2, 2, '2024-09-01', 'mensal', '2024-12-31');


-- Faxinas para a diarista Maria Silva (id 1)
INSERT INTO Faxina (id_diarista, id_residencia, data_faxina, faltou, valor_pago, feedback, id_precofaxina)
VALUES (1, 1, '2024-06-01', false, 100.00, 'Ótimo trabalho, muito pontual.', 1);

INSERT INTO Faxina (id_diarista, id_residencia, data_faxina, faltou, valor_pago, feedback, id_precofaxina)
VALUES (1, 1, '2024-06-15', false, 100.00, 'Limpeza impecável como sempre.', 1);

INSERT INTO Faxina (id_diarista, id_residencia, data_faxina, faltou, valor_pago, feedback, id_precofaxina)
VALUES (1, 2, '2024-06-20', false, 150.00, 'Muito boa, mas poderia ter sido mais cuidadosa com os detalhes.', 2);

INSERT INTO Faxina (id_diarista, id_residencia, data_faxina, faltou, valor_pago, feedback, id_precofaxina)
VALUES (1, 1, '2024-06-29', true, 0.00, 'Faltou sem aviso prévio.', 1);

INSERT INTO Faxina (id_diarista, id_residencia, data_faxina, faltou, valor_pago, feedback, id_precofaxina)
VALUES (1, 1, '2024-07-13', false, 100.00, 'Melhorou bastante desde a última vez.', 1);

-- Faxinas para a diarista Joana Souza (id 2)
INSERT INTO Faxina (id_diarista, id_residencia, data_faxina, faltou, valor_pago, feedback, id_precofaxina)
VALUES (2, 2, '2024-06-05', false, 150.00, 'Excelente trabalho, muito atenciosa.', 2);

INSERT INTO Faxina (id_diarista, id_residencia, data_faxina, faltou, valor_pago, feedback, id_precofaxina)
VALUES (2, 2, '2024-06-19', false, 150.00, 'Manteve o padrão de qualidade.', 2);

INSERT INTO Faxina (id_diarista, id_residencia, data_faxina, faltou, valor_pago, feedback, id_precofaxina)
VALUES (2, 1, '2024-06-25', false, 100.00, 'Boa limpeza, mas um pouco atrasada.', 1);

INSERT INTO Faxina (id_diarista, id_residencia, data_faxina, faltou, valor_pago, feedback, id_precofaxina)
VALUES (2, 2, '2024-07-03', true, 0.00, 'Faltou, mas avisou com antecedência.', 2);

INSERT INTO Faxina (id_diarista, id_residencia, data_faxina, faltou, valor_pago, feedback, id_precofaxina)
VALUES (2, 2, '2024-07-17', false, 150.00, 'Voltou com toda dedicação após a falta.', 2);

-- Faxinas adicionais para Maria Silva (id 1) em 2024
INSERT INTO Faxina (id_diarista, id_residencia, data_faxina, faltou, valor_pago, feedback, id_precofaxina)
VALUES 
(1, 1, '2024-07-27', true, 0.00, 'Faltou sem aviso.', 1),
(1, 2, '2024-08-03', false, 150.00, 'Bom trabalho, mas chegou um pouco atrasada.', 2),
(1, 1, '2024-08-10', true, 0.00, 'Faltou novamente, preocupante.', 1),
(1, 2, '2024-08-17', false, 150.00, 'Melhorou o desempenho após as faltas.', 2),
(1, 1, '2024-08-24', true, 0.00, 'Terceira falta no mês.', 1),
(1, 2, '2024-08-31', false, 150.00, 'Trabalho satisfatório.', 2),
(1, 1, '2024-09-07', true, 0.00, 'Faltou sem justificativa.', 1),
(1, 2, '2024-09-14', false, 150.00, 'Desempenho regular.', 2),
(1, 1, '2024-09-21', true, 0.00, 'Mais uma falta, situação crítica.', 1),
(1, 2, '2024-09-28', false, 150.00, 'Esforçou-se para compensar as faltas anteriores.', 2);

CREATE OR REPLACE FUNCTION calcular_porcentagem_presenca(
    p_diarista_id INT,
    p_ano INT
)
RETURNS DECIMAL AS $$
DECLARE
    total_faxinas INT;
    faxinas_presentes INT;
    porcentagem_presenca DECIMAL;
    data_atual DATE := CURRENT_DATE;
BEGIN
    -- Contar o total de faxinas no ano que já ocorreram
    SELECT COUNT(*)
    INTO total_faxinas
    FROM Faxina
    WHERE id_diarista = p_diarista_id
    AND EXTRACT(YEAR FROM data_faxina) = p_ano
    AND data_faxina < data_atual;

    -- Contar o total de faxinas em que a diarista esteve presente
    SELECT COUNT(*)
    INTO faxinas_presentes
    FROM Faxina
    WHERE id_diarista = p_diarista_id
    AND EXTRACT(YEAR FROM data_faxina) = p_ano
    AND data_faxina < data_atual
    AND faltou = FALSE;

    -- Calcular a porcentagem de presença
    IF total_faxinas > 0 THEN
        porcentagem_presenca := (faxinas_presentes::DECIMAL / total_faxinas) * 100;
    ELSE
        porcentagem_presenca := 0;
    END IF;

    -- Arredondar para duas casas decimais
    RETURN ROUND(porcentagem_presenca, 2);
END;
$$ LANGUAGE plpgsql;

-- Para a diarista Maria Silva (ID 1) em 2024
SELECT calcular_porcentagem_presenca(1, 2024) AS porcentagem_presenca;

-- Para a diarista Joana Souza (ID 2) em 2024
SELECT calcular_porcentagem_presenca(2, 2024) AS porcentagem_presenca;



CREATE OR REPLACE FUNCTION verificar_presenca_diarista() RETURNS TRIGGER AS $$
DECLARE
    total_faxinas INT;
    faxinas_presentes INT;
    porcentagem_presenca DECIMAL;
    data_atual DATE := CURRENT_DATE;
BEGIN
    -- Contar o total de faxinas passadas para a diarista
    SELECT COUNT(*) INTO total_faxinas
    FROM Faxina
    WHERE id_diarista = NEW.id_diarista
    AND data_faxina < data_atual;

    -- Se a diarista tiver menos de 5 faxinas, não fazemos nada
    IF total_faxinas < 5 THEN
        RETURN NEW;
    END IF;

    -- Contar o total de faxinas em que a diarista esteve presente
    SELECT COUNT(*) INTO faxinas_presentes
    FROM Faxina
    WHERE id_diarista = NEW.id_diarista
    AND data_faxina < data_atual
    AND faltou = FALSE;

    -- Calcular a porcentagem de presença
    porcentagem_presenca := (faxinas_presentes::DECIMAL / total_faxinas) * 100;

    -- Se a porcentagem de presença for menor que 75%, realizar soft delete da diarista
    IF porcentagem_presenca < 75 THEN
        UPDATE Diarista
        SET is_deleted = TRUE
        WHERE id = NEW.id_diarista;
        
        RAISE NOTICE 'Diarista com ID % foi marcada como deletada devido à baixa taxa de presença (%.2f%%)', NEW.id_diarista, porcentagem_presenca;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER trigger_verificar_presenca_diarista
AFTER INSERT OR UPDATE ON Faxina
FOR EACH ROW
EXECUTE FUNCTION verificar_presenca_diarista();

INSERT INTO Faxina (id_diarista, id_residencia, data_faxina, faltou, valor_pago, id_precofaxina)
VALUES 
(1, 2, '2024-08-18', true, 0.00, 2),
(1, 1, '2024-08-19', true, 0.00, 1);