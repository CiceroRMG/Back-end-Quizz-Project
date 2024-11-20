### Back-End API Introduction

[Link to Frontend repository](https://github.com/CiceroRMG/Front-end-Quizz-Project/)

### Software Objectives

The software is a university platform designed to facilitate academic interaction between students and professors through the centralized management of quizzes and assessments. The platform allows students to view courses, take quizzes, and access their grades and answer keys, while professors can create and manage quizzes. Administrators are responsible for managing students, professors, and courses, ensuring the organization and smooth operation of the platform. The software design aims for future scalability, allowing the addition of new features as needed.

**Technologies Used**  
- Node
- Express  
- MongoDB  
- Mongoose

**Structure**  
Following the MVC model.

```
API/
│
│
├── controllers/      # Controllers handling HTTP requests
│
├── db/               # Files related to the database, including configurations and migration scripts
│
├── middlewares/       # Middlewares for handling requests, such as authentication
│
├── models/           # Models representing the data structure in the database
│
├── routes/           # API route definitions
│
├── utils/            # Utilities and helper functions
│
├── server.js         # Main server file
```

## Error Codes

| Entity            | Error Name              | Status Code | Message                                             |
|-------------------|-------------------------|-------------|-----------------------------------------------------|
| USER_ERROR        | ALREADY_EXIST           | 409         | User already exists                                |
| USER_ERROR        | DOESNT_EXIST            | 404         | User does not exist                                |
| USER_ERROR        | FORBIDDEN_EDIT          | 403         | Action not allowed                                 |
| USER_ERROR        | INVALID_ID              | 400         | Invalid ID                                         |
| USER_ERROR        | MISSING_REQUIRED_FIELDS | 400         | All required fields must be provided              |
| USER_ERROR        | INCORRECT_CURRENT_PASSWORD | 403     | Incorrect current password entered                |
| USER_ERROR        | MISSING_OLD_PASSWORD    | 400         | Old password must be provided                     |
| USER_ERROR        | INVALID_OLD_PASSWORD    | 401         | The old password does not match                   |
| USER_ERROR        | INVALID_LOGIN           | 401         | Invalid credentials                                |
| USER_ERROR        | INVALID_MATRICULA       | 406         | Matricula must contain 8 digits                   |
| USER_ERROR        | INVALID_EMAIL           | 412         | Invalid email                                     |
| USER_ERROR        | INVALID_NAME            | 400         | Invalid credentials                                |
| USER_ERROR        | NOT_ADMIN               | 401         | User is not an admin                              |
| USER_ERROR        | NOT_STUDENT             | 401         | User is not a student                             |
| USER_ERROR        | NOT_PROFESSOR           | 401         | User is not a professor                           |
| DISCIPLINA_ERROR  | ALREADY_EXIST           | 409         | A course with this name already exists            |
| DISCIPLINA_ERROR  | DOESNT_EXIST            | 404         | Course does not exist                             |
| DISCIPLINA_ERROR  | NAME_CONFLICT           | 400         | The name provided differs from the one in the database |
| DISCIPLINA_ERROR  | INVALID_NAME            | 422         | Invalid name. Name must be at least 3 characters  |
| DISCIPLINA_ERROR  | ID_REQUIRED             | 400         | Course ID is required                             |
| DISCIPLINA_ERROR  | MISSING_FIELDS          | 400         | Course name or professor ID must be provided to edit the course |
| DISCIPLINA_ERROR  | NOT_HAVE                | 404         | User does not have any courses                    |
| RELATION_ERROR    | ALREADY_EXIST           | 400         | Relationship already exists                       |
| RELATION_ERROR    | DOESNT_EXIST            | 404         | Course or user does not exist!                    |
| RELATION_ERROR    | DOESNT_EXIST_RELATION   | 404         | Course and user are not related                   |
| TOKEN_ERROR       | DOESNT_EXIST            | 404         | Token is not assigned to any user                 |
| REFRESH_TOKEN_ERROR | DOESNT_EXIST          | 404         | Refresh token not found in the database           |
| QUIZZ_ERROR       | DOESNT_EXIST            | 404         | The QUIZZ was not found                            |
| QUIZZ_ERROR       | CREATE_ERROR            | 500         | Error creating the quiz                           |

# API Routes Documentation

## Public Routes

### Login
- **POST** `/login` - (File: `login.routes.js`)

---

## Private Routes

### Refresh Token
- **POST** `/refreshToken` - Creates a refresh token
- **DELETE** `/refreshToken/delete` - Deletes a refresh token

(File: `refreshToken.routes.js`)

---

### Users
- **GET** `/users` - Returns all users
- **GET** `/users/:id` - Returns a specific user
- **POST** `/users` - Creates a new user
- **DELETE** `/users/:id` - Deletes a specific user
- **PUT** `/users/:id` - Updates a specific user
- **PUT** `/users/adm/:id` - Updates a specific user with administrator privileges
- **GET** `/users/register/getAllProfessor` - Returns all professors
- **GET** `/users/register/getAllStudents` - Returns all students

(File: `users.routes.js`)

---

### Subjects
- **GET** `/disciplinas/prof/:id` - Returns the subjects of a specific professor
- **GET** `/disciplinas/prof` - Returns the subjects of a professor based on the token
- **GET** `/disciplinas/painel/data` - Returns panel data for subjects, professors, and quizzes
- **GET** `/disciplinas` - Returns all subjects
- **GET** `/disciplinas/:id` - Returns a specific subject
- **POST** `/disciplinas` - Creates a new subject
- **PUT** `/disciplinas/:id` - Updates a specific subject
- **PUT** `/disciplinas/null/:id` - Sets the professor ID to null for multiple subjects
- **DELETE** `/disciplinas/:id` - Deletes a specific subject

(File: `disciplina.routes.js`)

---

### Users and Subjects
- **POST** `/usersDisciplinas` - Creates a new relationship between a user and a subject
- **GET** `/usersDisciplinas` - Returns all relationships between users and subjects
- **GET** `/usersDisciplinas/:userId/:subjectId` - Checks if a user is enrolled in a specific subject
- **GET** `/usersDisciplinas/:id` - Returns a specific relationship between a user and a subject
- **DELETE** `/usersDisciplinas/:id` - Deletes a specific relationship between a user and a subject

(File: `usersDisciplinas.routes.js`)

---

### Quizzes
- **GET** `/quizzes` - Returns all quizzes
- **GET** `/quizzes/:id` - Returns a specific quiz
- **POST** `/quizzes` - Creates a new quiz
- **PUT** `/quizzes/:id` - Updates a specific quiz
- **DELETE** `/quizzes/:id` - Deletes a specific quiz

(File: `quizzes.routes.js`)

---

### User Tokens
- **POST** `/userToken` - Creates a new user token
- **GET** `/userToken` - Returns all user tokens
- **GET** `/userToken/:id` - Returns a specific user token

(File: `userToken.routes.js`)

---

### AI
- **POST** `/ia/generateQuiz` - Generates a quiz using AI

(File: `ia.routes.js`)

---

### Answers
- **POST** `/respostas` - Creates a new answer
- **GET** `/respostas/:id` - Returns attempts of a specific user
- **GET** `/respostas/verifyAttempts/:id` - Verifies attempts of a specific user
- **GET** `/respostas/responses/:id` - Returns all answers from students
- **GET** `/respostas/attempt/:id` - Returns the attempt of a specific user

(File: `respostas.routes.js`)

## Entity-Relationship Diagram (ERD)

![Untitled](https://github.com/user-attachments/assets/861bd4e9-9cba-4fb1-95d4-a6bc004e4e0b)
