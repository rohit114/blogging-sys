# Blogging System


### Introduction
* The Blogging System API allows users to create, edit, and delete posts, as well as manage user accounts. Users can sign up for an account, log in to obtain an access token, and use this token to authenticate their requests. Unauthorized access attempts will result in a 403 Forbidden response.

* To access protected endpoints, users must include their access token in the request headers under the Authorization field. Without a valid access token, users will not be able to perform actions on the system.

* The API also includes authorization functionalities, allowing administrators to block users from accessing the system. Only users with the ADMIN role in the request headers will be able to utilize the block functionality.

* The API returns standard HTTP status codes to indicate the success or failure of requests. Error responses include detailed messages to assist developers in troubleshooting issues.

## Flow Diagram
    https://drive.google.com/file/d/1odP56piZ6Ver2XCBpK93Jkj7Eil6DC7c/view?usp=sharing

### Tech stck used:
* NodeJs V16.0.0+
* TypeScript V5.4.5+
* NestJs V10.3.2+
* MySQL V8.1.0+

### Setting up project:
* Clone this repo `https://github.com/rohit114/blogging-sys.git`
    * Change directory to `cd blogging-sys`
        1. `cd backend-model && npm  i && npm run build` - build models
        2. `cd backend-repository && npm i && npm run build` - build repository 
        3. `cd backend-api && npm i && npm run build` - backend-api

### To run the application:
* change directory to backend-api `cd backend-api`
    1. run the migration file  `blogging-sys-migration.sql` in mysql to create the required db, tables and indexes
    2. rename `sample.env` to `.env`this env file has all the required environment variables but you can change the MYSQL_HOST     MYSQL_PORT, MYSQL_USERNAME, MYSQL_PASSWORD,MYSQL_DATABASE, JWT_SECRET_KEY accoding to your sysytem
    3. `npm start`  - NestJs will start listening to `PORT 3001` , you can change the port from `src/main.ts`

### To run tests:
    1. change directory to backend-api: `cd backend-api`
    2. npm run test

### API Documentation:
1. create a user:
    * METHOD: `POST`
    * URL: `{{BASE_URL}}/apis/blogging-sys/v1/user/create`
    * BODY: `{"first_name":"Rohit","last_name":"Kumar","mobile":9876543210,"email":"rohit@example.com"}`
    * api will return created user with user_id with status code 201

2. user login to get the access-token:
    * METHOD: `POST`
    * URL: `{{BASE_URL}}/apis/blogging-sys/v1/user/auth/login`
    * BODY: `{"mobile":9876543210,"email":"rohit@example.com"}` either mobile or email can also work
    * api will return the `access_token`, use this token in request header `Authorization` for api calls

3. create a blogging post:
    * METHOD: `POST`
    * URL: `{{BASE_URL}}/apis/blogging-sys/v1/post/create`
    * HEADER: `Authorization` with `Bearer {my-access-token}`
    * BODY: `{"title":"My Blog title","content":"My blog content","user_id":"USR0A44F38E38C"}`
    * api will return the created post with `post_id` and `author_id`

4. get a post by `post_id` :
    * METHOD: `GET`
    * HEADER: `Authorization` with `Bearer {my-access-token}`
    * URL: `{{BASE_URL}}/apis/blogging-sys/v1/post/detail/:post_id`
    * api will return the post of requested post_id

5. update a blogging post:
    * METHOD: `POST`
    * HEADER: `Authorization` with `Bearer {my-access-token}`
    * URL: `{{BASE_URL}}/apis/blogging-sys/v1/post/update`
    * BODY: `{"title":"updated title","content":"updated content","user_id":"USR0A44F38E38C","post_id":"PO5FF6A854705"}`
    * api will return the updated post

6. get all posts:
    * query params `page & limit` defines pagination
    * query params `author_id` filters the posts of the author_id
    * query params `creation_dt` filters the posts >= creation_dt arranged in latest to old
    * METHOD: `GET`
    * HEADER: `Authorization` with `Bearer {my-access-token}`
    * URL: `{{BASE_URL}}/apis/blogging-sys/v1/post/all?page=1&limit=4&author_id=USR0A44F38E38C&creation_dt=2024-04-30`
    * api will returns the posts accoding to the requested query params

7. get a post by `post_id` :
    * METHOD: `GET`
    * HEADER: `Authorization` with `Bearer {my-access-token}`
    * URL: `{{BASE_URL}}/apis/blogging-sys/v1/post/detail/:post_id`
    * api will return a post of `post_id`

8. delete a post
    * METHOD: `DELETE`
    * HEADER: `Authorization` with `Bearer {my-access-token}`
    * URL: `{{BASE_URL}}/apis/blogging-sys/v1/post/delete/:post_id`
    * api return success on deletion of given post_id

9. get user detail by `user_id` :
    * METHOD: `GET`
    * HEADER: `Authorization` with `Bearer {my-access-token}`
    * URL: `{{BASE_URL}}/apis/blogging-sys/v1/user/details/:user_id`
    * api will return user details of `user_id`

10. block a user
    * only admin role user can block users
    * METHOD: `POST`
    * HEADER: `role` with "ADMIN" `Authorization` with `Bearer {my-access-token}`
    * URL: `{{BASE_URL}}/apis/blogging-sys/v1/user/block`


* You can find the all curl of the apis in the postman collection `apis.postman_collection.json` inside the blogging-sys repo

### Contact
* email me at rohitkumardas114@gmail.com for support or reporting any issues