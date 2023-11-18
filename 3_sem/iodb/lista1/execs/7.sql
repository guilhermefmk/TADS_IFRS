select 
	sub.turno,
	count(sub.turno) as qtde
from (
	select
	case
		when 
			extract(hour from t.data_hora_entrada) >= extract(hour from '08:00:00'::time)
			and
			extract(hour from t.data_hora_entrada) <= extract(hour from '12:00:00'::time)
		then 'manhã'
		when 
			extract(hour from t.data_hora_entrada) >= extract(hour from '13:30:00'::time)
			and
			extract(hour from t.data_hora_entrada) <= extract(hour from '17:30:00'::time)
		then 'tarde'
		when 
			extract(hour from t.data_hora_entrada) >= extract(hour from '19:00:00'::time)
			and
			extract(hour from t.data_hora_entrada) <= extract(hour from '23:00:00'::time)
		then 'noite'	
	end as turno,
	data_hora_entrada,
	data_hora_saida
	from 
		interno.turno t 
	where 
		extract(year from data_hora_entrada) = extract(year from current_date)
		and
		extract(year from data_hora_saida) = extract(year from current_date)
) sub
group by 1


	