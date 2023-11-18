SELECT
	p.title,
	COUNT(bu.id) as qt_autores
FROM 
	blog_user bu ,author_posts
INNER JOIN post p 
ON
	p.id = author_posts.post_id 
WHERE
	bu.id = author_posts.author_id
GROUP BY 1
ORDER by qt_autores DESC;