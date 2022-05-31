
# Todo app

A simple todo fullstack application made in Java with Spring boot framework and Javascript using Angular framework.

## Front end

A simple SPA made with Angular and has the functionality to:

- View a todo
- Create a todo
- Modify a todo
- Remove a todo





## Running locally

Make sure to run the backend app first

```bash
  cd todo-frontend // change directory to the frontend app
  npm install // install all dependencies
  ng serve // start the app
```
## Back end

A simple backend application to support todo functionalities and has the services to:

- Create a todo
- Get a single todo by id
- Get all todos
- Update a todo
- Remove a todo


## API Reference

#### Create a todo

```http
  POST /api/todo/
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `body` | `Todo` | **Required**. Todo object |

#### Get a todo by id

```http
  GET /api/{id}/todos/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of todo to fetch |

#### Get all todos

```http
  GET /api/todos/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `maxResult`      | `int` | **Required**. Number of records per page |
| `page`      | `int` | **Required**. Page to retrieve |

#### Modify a todo

```http
  PUT /api/todo/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `todo`      | `Todo` | **Required**. Todo object |
| `id`      | `string` | **Required**. Id of todo to modify |

#### Remove a todo

```http
  DELETE /api/{id}todos/
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `id`      | `string` | **Required**. Id of todo to remove |


## Tech Stack

**Client:** Angular

**Server:** Spring boot

