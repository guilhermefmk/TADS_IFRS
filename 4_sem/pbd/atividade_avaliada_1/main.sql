
\c postgres;
DROP DATABASE IF EXISTS ponto_empresa;
CREATE DATABASE ponto_empresa;
\c ponto_empresa;


CREATE TABLE funcionario (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    senha VARCHAR(100) NOT NULL
);

CREATE TABLE registro (
    id SERIAL PRIMARY KEY,
    data_hora_entrada TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    data_hora_saida TIMESTAMP,
    funcionario_id INTEGER REFERENCES funcionario (id)
);


CREATE OR REPLACE FUNCTION registraEntrada(funcionario_id_recebido INTEGER) RETURNS BOOLEAN AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM registro WHERE funcionario_id = funcionario_id_recebido AND 
						extract(day from data_hora_entrada) = extract(day from current_date) and 
						extract(month from data_hora_entrada) = extract(month from current_date) and
						extract(year from data_hora_entrada) = extract(year from current_date)) 
	THEN
        RAISE NOTICE 'Já existe registro de entrada para o dia de hoje!!';
        RETURN FALSE;
    END IF;
    INSERT INTO registro (funcionario_id)
    VALUES
        (funcionario_id_recebido);
    RETURN TRUE;
END;
$$ LANGUAGE plpgsql;

INSERT INTO funcionario (nome, senha)
VALUES
    ('Alice Silva', MD5('senhaAlice2024')),
    ('Bruno Costa', MD5('senhaBruno2024')),
    ('Carla Oliveira', MD5('senhaCarla2024'));
   
 select registraEntrada(3);


CREATE OR REPLACE FUNCTION registraSaida(funcionario_id_recebido INTEGER) RETURNS BOOLEAN AS $$
BEGIN
    IF EXISTS (SELECT 1 FROM registro WHERE funcionario_id = funcionario_id_recebido AND 
						extract(day from data_hora_entrada) = extract(day from current_date) and 
						extract(month from data_hora_entrada) = extract(month from current_date) and
						extract(year from data_hora_entrada) = extract(year from current_date)) 
    THEN
        UPDATE registro set data_hora_saida = CURRENT_TIMESTAMP where funcionario_id = funcionario_id_recebido AND 
						extract(day from data_hora_entrada) = extract(day from current_date) and 
						extract(month from data_hora_entrada) = extract(month from current_date) and
						extract(year from data_hora_entrada) = extract(year from current_date);
        RETURN TRUE;
    END IF;
    RAISE NOTICE 'Não existe registro de entrada para esse funcionário no dia de hoje!';
    RETURN FALSE;
END;
$$ LANGUAGE plpgsql;


select registraSaida(3);

CREATE FUNCTION transforma_para_horas(interval) RETURNS real
    LANGUAGE plpgsql
    AS $_$
DECLARE
	horas integer;
	minutos REAL;
BEGIN
-- 	raise notice '%', $1;
	horas := EXTRACT(HOUR FROM $1);
	minutos := CASt(EXTRACT(MINUTE from $1) AS REAL);
	minutos := minutos/60.0;
	return horas + minutos;
-- 	return 0.0;
END;
$_$;

CREATE OR REPLACE FUNCTION funcionarioComMaisHoras()
RETURNS TABLE (
    id integer,
    nome VARCHAR,
    horas integer
) AS $$
declare 
	max_horas integer;
BEGIN
	SELECT sum(transforma_para_horas(r.data_hora_saida - r.data_hora_entrada))::integer as horas 
		into max_horas from registro r     
		LEFT JOIN
        	funcionario f ON f.id = r.funcionario_id
	    GROUP BY
	        f.id
		ORDER BY horas DESC LIMIT 1;
    RETURN QUERY
    SELECT
        f.id,
        f.nome,
        sum(transforma_para_horas(r.data_hora_saida - r.data_hora_entrada))::integer as horas
    FROM
        registro r
    LEFT JOIN
        funcionario f ON f.id = r.funcionario_id
    GROUP BY
        f.id
	HAVING sum(transforma_para_horas(r.data_hora_saida - r.data_hora_entrada))::integer = max_horas;
END;
$$ LANGUAGE plpgsql;

select * from funcionarioComMaisHoras();



CREATE OR REPLACE FUNCTION registroSemSaida()
RETURNS TABLE (
    id integer,
    nome VARCHAR,
    data_hora_entrada timestamp
) AS $$
BEGIN
    RETURN QUERY
    SELECT
        f.id,
        f.nome,
        r.data_hora_entrada as horas
    FROM
        registro r
    LEFT JOIN
        funcionario f ON f.id = r.funcionario_id
	WHERE
		r.data_hora_saida is null;
END;
$$ LANGUAGE plpgsql;

select * from registroSemSaida();
