-- QUERY 1
select 
	f.id,
	count(i.sessao_id)
from
	externo.filme f
inner join 
	externo.sessao s
on
	f.id = s.filme_id 
inner join 
	externo.ingresso i 
on
	s.id = i.sessao_id 
where 
	extract(year from s.data) = extract(year from current_date)
group by 1
order by count(i.sessao_id) desc 
limit 3;

-- QUERY 2	
select m.id, m.cont
from (
    select f.id, COUNT(i.sessao_id) as cont
    from externo.filme f
    inner join externo.sessao s on f.id = s.filme_id
    inner join externo.ingresso i on s.id = i.sessao_id
    where EXTRACT(year from s.data) = EXTRACT(year from current_date)
    group by f.id
) as m
inner join (
    select MAX(cont) as max_cont
    from (
        select f.id, COUNT(i.sessao_id) as cont
        from externo.filme f
        inner join externo.sessao s on f.id = s.filme_id
        inner join externo.ingresso i on s.id = i.sessao_id
        where EXTRACT(year from s.data) = EXTRACT(year from current_date)
        group by f.id
    ) as z
) as max_cont_subquery ON m.cont = max_cont_subquery.max_cont;


