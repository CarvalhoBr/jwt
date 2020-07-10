# JWT

## Instalation

```bash
npm install
npm start
```
This also requires a MongoDB database running on 27017 port

## Endpoints

---

`POST http://localhost:3000/auth/register`

This route is used to create a new user in the database

**Request**
```JSON
{
  "name": "King Arthur",
  "email": "someemail@example.com",
  "password": "hireMe"
}
```

**Response**
```JSON
{
  "user": {
    "_id": "5ef50f7f0da4a412815db9d0",
    "name": "King Arthur",
    "email": "someemail@example.com",
    "createdAt": "2020-06-25T20:56:31.261Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZjUwZjdmMGRhNGE0MTI4MTVkYjlkMCIsImlhdCI6MTU5MzExODU5MSwiZXhwIjoxNTkzMjA0OTkxfQ.ILrG5S6_Duk6vXjogZvpFXdBz9iwMf7IgJQqcVFwHZo"
}
``` 
>By default the token expires in two days but it can be changed modifying the authController.js file


---

`POST http://localhost:3000/auth/authenticate`

This route is used to authenticate an already created user

**Request**
```JSON
{
  "email": "someemail@example.com",
  "password": "hireMe"
}
```
**Response**
```JSON
{
  "user": {
    "_id": "5ef50f7f0da4a412815db9d0",
    "name": "King Arthur",
    "email": "somemail@example.com",
    "createdAt": "2020-06-25T20:56:31.261Z",
    "__v": 0
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZjUwZjdmMGRhNGE0MTI4MTVkYjlkMCIsImlhdCI6MTU5MzExODU5NSwiZXhwIjoxNTkzMjA0OTk1fQ.3RI8Zprz4yOOT-MqL_izRI4tC3hrlHgNTFA5dw5Vt3g"
}
```


---

`http://localhost:3000/projects`

This is the route that your application will run.
Anything that passes through this route will require an authorization token to pass the request to the desired endpoint

The authentication header must be sent the following way:
```JSON
{
  "authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlZjUwZjdmMGRhNGE0MTI4MTVkYjlkMCIsImlhdCI6MTU5MzExODU5NSwiZXhwIjoxNTkzMjA0OTk1fQ.3RI8Zprz4yOOT-MqL_izRI4tC3hrlHgNTFA5dw5Vt3g"
}
```

