select 
	t.cpf, 
	t.nome, 
	count(i.telespectador_id) 
from 
	externo.telespectador t
inner join 
	externo.ingresso i
on
	t.id = i.telespectador_id
inner join
	externo.sessao s 
on
	i.sessao_id = s.id
where 
	extract(month from s.data) = extract(month from current_timestamp)
group by 1, 2