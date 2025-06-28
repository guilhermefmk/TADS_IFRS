GET
/healthcheck
Check if the API is running

Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
API is running

No links

POST
/users
Create a new user

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "name": "string",
  "email": "user@example.com",
  "password": "string"
}
Responses
Code	Description	Links
201	
User created successfully

No links
400	
Validation error

No links

GET
/users
Get all users


Parameters
Try it out
Name	Description
page
integer
(query)
Page number

page
limit
integer
(query)
Number of items per page

limit
Responses
Code	Description	Links
200	
List of users

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "count": 0,
  "users": [
    {
      "name": "string",
      "email": "string"
    }
  ]
}
No links
401	
Unauthorized

No links

GET
/my-posts
Get current user's posts


Parameters
Try it out
No parameters

Responses
Code	Description	Links
200	
List of user's posts

No links
401	
Unauthorized

No links

GET
/posts
Get all posts


Parameters
Try it out
Name	Description
page
integer
(query)
Page number

page
limit
integer
(query)
Number of items per page

limit
Responses
Code	Description	Links
200	
List of posts

No links
401	
Unauthorized

No links

POST
/posts
Create a new post


Parameters
Try it out
No parameters

Request body

multipart/form-data
title *
string
content *
string
foto *
string($binary)
Responses
Code	Description	Links
201	
Post created successfully

No links
400	
Validation error or no file uploaded

No links
401	
Unauthorized

No links

POST
/login
Login user

Parameters
Try it out
No parameters

Request body

application/json
Example Value
Schema
{
  "email": "user@example.com",
  "password": "string"
}
Responses
Code	Description	Links
200	
Login successful

Media type

application/json
Controls Accept header.
Example Value
Schema
{
  "user": {},
  "jwt": "string"
}
No links
400	
Invalid credentials

No links
404	
User not found

No links

DELETE
/posts/{id}
Delete a post


Parameters
Try it out
Name	Description
id *
integer
(path)
Post ID

id
Responses
Code	Description	Links
200	
Post deleted successfully

No links
401	
Unauthorized

No links
404	
Post not found

No links

GET
/users/{id}
Get user by ID

Parameters
Try it out
Name	Description
id *
integer
(path)
User ID

id
Responses
Code	Description	Links
200	
User details

No links
404	
User not found

No links
