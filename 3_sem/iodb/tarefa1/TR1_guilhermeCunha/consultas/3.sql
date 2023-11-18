SELECT
	p.title as post_title,
	json_agg(bu.name) as author_names
FROM 
	blog_user bu ,author_posts
INNER JOIN post p 
ON
	p.id = author_posts.post_id 
WHERE
	bu.id = author_posts.author_id
GROUP BY 1
;