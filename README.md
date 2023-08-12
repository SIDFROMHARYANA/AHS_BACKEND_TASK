  ### Blog Management System

 ## endpoints

POST /api/users: Create a new user.
POST /api/login: Create a login for users
POST /api/posts: Create a new blog post
GET /api/posts: Retrieve a list of all blog posts.
GET /api/posts/:id: Retrieve a specific blog post by its ID.
POST /api/posts: Create a new blog post.
PUT /api/posts/:id: Update a blog post's details.
DELETE /api/posts/:id: Delete a blog post.

## Authentication

Add an authorisation implementation for the JWT token that validates the token before every protected endpoint is called. If the validation fails, return a suitable error message with a corresponding HTTP status code
Protected routes are create a blog, edit a blog, get the list of blogs, delete a blog(s)
Set the token, once validated, in the request - x-api-key
Use a middleware for authentication purpose.

## Request Structure for POST METHOD

{
Request Url: http://localhost:3000/posts
Request Method: POST
Host: localhost:3000
Content-Type: application/json
Status Code: 200
Params: {}
}

## Successful Response structure

{
status: true,
data: {

}
}

```

## Error Response structure

`
{
status: false,
msg: ""
}

## Successful Login Response structure

{
status: true,
data: {
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdXRob3JJZCI6IjYyZmUzYmUzMzY2ZmFkNDZjY2Q1MzI3ZiIsImlhdCI6MTY2MDgzMDA4MywiZXhwIjoxNjYwODY2MDgzfQ.mSo-TLyRlGhMNcy4ftEvvIlCHlyEqpaFZc-iBth4lfg"

}
}

.
