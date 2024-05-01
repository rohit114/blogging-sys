# Blogging System


### Introduction
* The Blogging System API allows users to create, edit, and delete posts, as well as manage user accounts. Users can sign up for an account, log in to obtain an access token, and use this token to authenticate their requests. Unauthorized access attempts will result in a 403 Forbidden response.

* To access protected endpoints, users must include their access token in the request headers under the Authorization field. Without a valid access token, users will not be able to perform actions on the system.

* The API also includes authorization functionalities, allowing administrators to block users from accessing the system. Only users with the ADMIN role in the request headers will be able to utilize the block functionality.

* The API returns standard HTTP status codes to indicate the success or failure of requests. Error responses include detailed messages to assist developers in troubleshooting issues.

### Tech stck used
* NodeJs V16.0.0+
* TypeScript V5.4.5+
* NestJs V10.3.2+
* MySQL V8.1.0+

### Setting up project
* Clone this repo `https://github.com/rohit114/blogging-sys.git`
    * Change directory to `cd blogging-sys`
        * 1 `cd backend-model && npm  i && npm run build` - build models
        * 2 `cd backend-repository && npm i && npm run build` - build repository 
        * 3 `cd backend-api && npm i && npm run build` - backend-api
* To run the application
    * 1 change directory to backend-api `cd backend-api`
    * 2 run the migration file  `blogging-sys-migration.sql` in mysql to create the required db, tables and indexes
    * 3 rename `sample.env` to `.env`
        .env file has all the required environment variables but you can change the MYSQL_HOST, MYSQL_PORT, MYSQL_USERNAME, MYSQL_PASSWORD, MYSQL_DATABASE, JWT_SECRET_KEY accoding to your sysytem
    * 4 `npm start`  - NestJs will start listening to `PORT 3001` , you can change the port from `src/main.ts`

### API doc
* 1 create a user
    ```curl --location 'localhost:3001/apis/blogging-sys/v1/user/create' \
--header 'Content-Type: application/json' \
--data-raw '{
    "first_name":"Rohit",
    "last_name": "Kumar",
    "mobile": 9876543210,
    "email": "rohit@example.com"
}'```


    


| Header 1 | Header 2 | Header 3 |
|----------|----------|----------|
| Content 1| Content 2| Content 3|
| Content 4| Content 5| Content 6|