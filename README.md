# ⚙️ Pro Task Manager – Backend API

Secure REST API for the Task Management Application built with **Node.js, Express, and MongoDB**.

---

## 🚀 Features

* JWT authentication with HTTP-only cookies
* Task CRUD APIs
* AES-256-CBC payload security (Professional Standard with IV)
* API Hardening (Helmet, Mongo-Sanitize, Rate-Limit, HPP)
* XSS-Clean input sanitization
* Structured global error handling

---

## 🏗 Architecture

* **MVC Pattern**

  * Models → Database schema
  * Controllers → Business logic
  * Routes → API endpoints
  * Middleware → Authentication, validation, security
* **Global Error Handler** for consistent API responses

---

## ⚙ Setup

```bash
cd server
npm install
```

Create `.env`

```env
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
JWT_EXPIRE=30d
CLIENT_URL=http://localhost:5173
ENCRYPTION_KEY=your_encryption_key
```

Run server

```bash
npm run dev
```

---

## 🌐 API Base URL

Local

```
http://localhost:5000/api
```

Production

```
https://task-manager-assessment-server.onrender.com/api
```



Task Manager API Documentation
This document provides sample requests and responses for the Task Manager API.

Base URL
${API_URL}/api (default: http://localhost:5000/api)

Authentication
1. Register User
POST /auth/register

Request Body:

json
{
  "name": "Jane Doe",
  "email": "jane@example.com",
  "password": "password123"
}
Success Response (201 Created):

json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "_id": "60d5ecfd0f3b4c1234567890",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "createdAt": "2026-03-15T12:00:00.000Z"
  }
}
2. Login User
POST /auth/login

Request Body:

json
{
  "email": "jane@example.com",
  "password": "password123"
}
Success Response (200 OK):

json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "_id": "60d5ecfd0f3b4c1234567890",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "createdAt": "2026-03-15T12:00:00.000Z"
  }
}
3. Get Current User
GET /auth/me Requires Authentication (Header or Cookie)

Success Response (200 OK):

json
{
  "success": true,
  "data": {
    "_id": "60d5ecfd0f3b4c1234567890",
    "name": "Jane Doe",
    "email": "jane@example.com",
    "createdAt": "2026-03-15T12:00:00.000Z"
  }
}
Tasks (Protected)
All routes below require headers: Authorization: Bearer <token>

1. Get All Tasks
GET /tasks

Query Parameters (Optional):

search: Filter by title (case-insensitive)
status: Filter by TODO, IN_PROGRESS, COMPLETED
priority: Filter by HIGH, MEDIUM, LOW
sort: newest (default) or oldest
page: Page number (default: 1)
limit: Items per page (default: 10)
Success Response (200 OK):

json
{
  "success": true,
  "count": 1,
  "total": 5,
  "pagination": {
    "next": { "page": 2, "limit": 10 }
  },
  "data": [
    {
      "_id": "60d5ed120f3b4c0987654321",
      "title": "Complete API Docs",
      "description": "Provide sample request/response documentation",
      "status": "IN_PROGRESS",
      "priority": "HIGH",
      "user": "60d5ecfd0f3b4c1234567890",
      "createdAt": "2026-03-15T12:30:00.000Z"
    }
  ]
}
2. Create Task
POST /tasks

Request Body:

json
{
  "title": "Buy groceries",
  "description": "Milk, eggs, and bread",
  "priority": "MEDIUM"
}
Success Response (201 Created):

json
{
  "success": true,
  "data": {
    "_id": "60d5ed2a0f3b4c1122334455",
    "title": "Buy groceries",
    "description": "Milk, eggs, and bread",
    "status": "TODO",
    "priority": "MEDIUM",
    "user": "60d5ecfd0f3b4c1234567890",
    "createdAt": "2026-03-15T13:00:00.000Z"
  }
}
3. Update Task
PUT /tasks/:id

Request Body (Partial update allowed):

json
{
  "status": "COMPLETED"
}
Success Response (200 OK):

json
{
  "success": true,
  "data": {
    "_id": "60d5ed2a0f3b4c1122334455",
    "title": "Buy groceries",
    "description": "Milk, eggs, and bread",
    "status": "COMPLETED",
    "priority": "MEDIUM",
    "user": "60d5ecfd0f3b4c1234567890",
    "createdAt": "2026-03-15T13:00:00.000Z"
  }
}
4. Delete Task
DELETE /tasks/:id

Success Response (200 OK):

json
{
  "success": true,
  "data": {}
}