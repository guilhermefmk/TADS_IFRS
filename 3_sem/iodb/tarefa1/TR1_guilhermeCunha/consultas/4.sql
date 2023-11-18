SELECT
	bu.name,
	JSON_AGG(
		CASE 
			WHEN a.street IS NULL THEN 'Sem endereço cadastrado'
			ELSE CONCAT(a.street, ', ', a.district, ', ', a."number", ', ', a.complement, ', ', a.zip_code)
	END) AS endereco
FROM 
	blog_user bu
LEFT JOIN address a 
ON
	bu.id = a.reader_id 
WHERE 
	bu."type" = 'reader'
GROUP BY 1
;