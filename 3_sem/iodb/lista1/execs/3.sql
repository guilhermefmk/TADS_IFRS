select 
	sala.id, 
	count(i.sessao_id) 
from 
	sala
inner join 
	externo.sessao sessao
on
	sala.id = sessao.sala_id
inner join
	externo.ingresso i 
on
	sessao.id = i.sessao_id 
where 
	sessao.data >= (current_date - interval '7 day')::date
and 
	sessao.data <= current_date
group by 1
having 
	count(i.sessao_id) >= 2;