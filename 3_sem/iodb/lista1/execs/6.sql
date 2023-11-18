create or replace view telespectadores_sala as
select 
	sala.nome as nome_sala,
	f.titulo as titulo_filme,
	t.nome as nome_telespectador,
	to_char(sessao.data, 'DD/MM/YYYY') as data_sessao,
	sessao.hora as hora_sessao,
	i.corredor,
	i.poltrona
from
	externo.ingresso i 
inner join
	externo.telespectador t 
on
	i.telespectador_id = t.id 
inner join 
	externo.sessao sessao
on
	i.sessao_id = sessao.id 
inner join 
	externo.filme f 
on
	sessao.filme_id = f.id 
inner join 
	sala
on
	sessao.sala_id = sala.id