# Blogs API

Blogs API made using NodeJS, Express, and Typescript

## Installation

-   Use xampp or any similar tool to create the database.
-   Install the packages thru `npm install`
-   Populate the env file. Copy the example through the following command.

```bash
cp .env.example .env #linux/mac
copy .env.example .env #windows
```

-   Initiate the migration files using this command `npx knex migrate:latest` or its shorthand command `npm run migrate`
-   to run the development server use `npm run server`

## Endpoints and Usage

`/api/postUser` Create User - parameters: first_name, middle_name, last_name, email(unique), password

`/api/loginUser` Login - parameters: email, password. Will return an accessToken that must be used as an Authorization header.

`/api/blog/add` Blog (Add) - To access, An authorization header is required .

```js

//parameters and example data

user_id:1
blog_header:Initial Blog Title
blog_body:Initial Blog Body
blog_tags:developement, engineering
```

`/api/blog/:id` Get Blog - Retrieve a blog data using its id
`/api/blog` Get All Blogs - Retrieve all present blog data
`/api/blog/update` Update Blog - To access, An authorization header is required .

```js
//parameters and example data
user_id: 1
blog_id: 1
blog_tags: tags, update, development
```

`/api/blog/delete` Delete Blog - Remove a blog from the database. To access, An authorization header is required .

```js
//parameters and example data
user_id: 1
blog_id: 1
```

`/api/blog/filter/:filter_key` Filter Blog - Filter all available blogs data through its tags, header or through its associated authors first_name.

`/api/blog/search/:search_key` Search Blog - Search for a blog according to its header and content.

For Reference, Authorization format

```js
Authorization:eyJhbGc...
```
