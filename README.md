# Backend - Task Management API

A robust Express/Node.js backend powering the Task Management Suite with a focus on security and data integrity.

## 🏗 Architecture
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Patterns**: Controller-based architecture with separate Routes and Middleware layers.

## 🚀 Key Features & Additional Implementations

### Security
- **JWT & Cookies**: Implements secure cookie-based authentication (HttpOnly, Secure).
- **Hardening**: Uses `helmet`, `xss-clean`, and `express-mongo-sanitize` to defend against common web attacks.
- **Rate Limiting**: Throttles requests to prevent brute-force attacks.
- **Payload Encryption**: Implements AES-256 encryption for sensitive task descriptions.

### Task Logic
- **Advanced Filtering**: Support for status, priority, and date-based queries.
- **Pagination**: Server-side pagination for optimized performance.
- **Due Dates**: Custom logic to handle task deadlines.

---

## ⚙️ Setup Instructions

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Environment Variables**:
   Create a `.env` file in the `server` root with the following:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_key
   JWT_EXPIRE=30d
   ENCRYPTION_KEY=32_character_long_secret_key_here
   ```

3. **Run the Server**:
   ```bash
   # Development (with nodemon)
   npm run dev

   # Production
   npm start
   ```

---

## 📂 API Endpoints

### Auth
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `GET /api/auth/me` - Get current user info
- `PUT /api/auth/updatedetails` - Update user display name
- `PUT /api/auth/updatepassword` - Change password

### Tasks
- `GET /api/tasks` - Get all tasks (supports filters & pagination)
- `POST /api/tasks` - Create a new task
- `GET /api/tasks/:id` - Get single task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
