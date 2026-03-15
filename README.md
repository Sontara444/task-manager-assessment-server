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
