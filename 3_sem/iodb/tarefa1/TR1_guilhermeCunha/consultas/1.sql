SELECT 
	bu.name,
	bu.email ,
	bu."password",
	bu.type,
	a.district,
	a.street,
	a."number",
	a.complement,
	a.zip_code
FROM 
	blog_user bu 
LEFT JOIN 
	address a ON bu.id = a.reader_id;