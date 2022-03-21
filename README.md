# Back_devjob

This api is part of the jobs board project. It consists of providing false data about technology jobs (GET, POST, PUT, DELETE) to operate on the collections and elements. Version: V1

* [HTTP Verbs](#http-verbs)
* [Error handling](#error-handling)
* [Request & Response Examples](#request--response-examples)


## HTTP Verbs

| HTTP METHOD | POST            | GET       | PUT         | DELETE |
| ----------- | --------------- | --------- | ----------- | ------ |
| CRUD OP     | CREATE          | READ      | UPDATE      | DELETE |
| /jobs       | Create new job  | List jobs | Error | Error |
| /jobs/id  | Error           | Show Job   | If exists, update job; If not, error | Delete Job |


## Error handling

I use this status to indicating (1) success, (2) failure due to client-side problem, (3) conflict with the current state of the target resource, (4) lacks valid authentication credentials, (5) failure due to server-side problem:
* 200 - OK.
* 400 - Bad Request.
* 409 - Conflict response.
* 401 - Unauthorized.
* 500 - Internal Server Error


## Request & Response Examples

### API Resources

  - [GET /api/jobs](#get-apijobs)
  - [GET /api/jobs/[id]](#get-apijobsid)
  - [POST /api/jobs](#post-apijobs)
  - [DELETE /api/jobs/[id]](#delete-apijobsid)
  - [PUT /api/jobs[id]](#put-apijobsid)

### GET /api/jobs

Url: https://url.com/api/jobs

Response body:

    [
      {
      "name_company": "Facebook",
      "url_comp": "facebook.com",
      "hora_post": "2021-11-21T23:10:14.301Z",
      "cuidad": "Chicago",
      "modo": "Remoto",
      "tipo": "Part time",
      "titulo_vacante": "DevOps",
      "descripcion": "blablablablabla",
      "user": {
        "username": "vanessa",
        "name": "vanessa",
        "id": "619ad1773a332e798e6010bd"
        },
      "id": "619ad1d63a332e798e6010c3"
      },
      {
      "name_company": "Facebook",
      "url_comp": "facebook.com",
      "hora_post": "2021-11-22T01:45:58.752Z",
      "cuidad": "Chicago",
      "modo": "Remoto",
      "tipo": "Part time",
      "titulo_vacante": "DevOps",
      "descripcion": "blablablablabla",
        "user": {
        "username": "vanessa",
        "name": "vanessa",
        "id": "619ad1773a332e798e6010bd"
        },
      "id": "619af656f373f674dd2b178f"
      }
      {...}
    ]

### GET /api/jobs/[id]

Example: http://url.com/api/jobs/[id]

Response body:

    {
      "name_company": "Facebook",
      "url_comp": "facebook.com",
      "hora_post": "2021-11-21T23:10:14.301Z",
      "cuidad": "Chicago",
      "modo": "Remoto",
      "tipo": "Part time",
      "titulo_vacante": "DevOps",
      "descripcion": "blablablablabla",
      "user": "619ad1773a332e798e6010bd",
      "id": "619ad1d63a332e798e6010c3"
     }



### POST /api/jobs

Example: Create – POST  http://url.com/api/jobs

Request body:

    [
        {
            "name_company":"Facebook",
            "url_comp": "facebook.com",
            "cuidad": "Chicago",
            "modo": "Remoto",
            "tipo": "Part time",
            "titulo_vacante": "DevOps",
            "descripcion": "blablablablabla"
        }
    ]


### DELETE /api/jobs/[id]

Example: DELETE  http://url.com/api/jobs/[id]

Response:
The HTTP 204 No Content success status response code indicates that a request has succeeded.
Note: For delete request you will need credentials.


### PUT /api/jobs/id

Example: Edit – PUT  http://url.com/api/jobs/[id]

Request body:

    [
        {
            "name_company":"Facebook",
            "url_comp": "facebook.com",
            "cuidad": "Chicago",
            "modo": "Remoto",
            "tipo": "Part time",
            "titulo_vacante": "DevOps",
            "descripcion": "blablablablabla"
        }
    ]
    
    
