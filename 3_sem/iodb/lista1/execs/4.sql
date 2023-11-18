create or replace view telespectador_random as
select 
	t.id,
	t.cpf,
	t.nome
from
	externo.telespectador t
inner join
	externo.ingresso i 
on	
	i.telespectador_id = t.id 
inner join
	externo.sessao s
on
	s.id = i.sessao_id
where
	s.data = current_date 
order by 
	random()
limit 1