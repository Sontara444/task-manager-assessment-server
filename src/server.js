const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const rateLimit = require('express-rate-limit');
const hpp = require('hpp');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorMiddleware');

dotenv.config();

connectDB();

const app = express();

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

const { clean } = require('xss-clean/lib/xss');

app.use(helmet());

const sanitizeObject = (obj) => {
  if (!obj || typeof obj !== 'object') return obj;
  
  // Create a deep copy to sanitize without mutating protected request properties directly
  const newObj = Array.isArray(obj) ? [] : {};
  
  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
        newObj[key] = sanitizeObject(obj[key]);
      } else if (typeof obj[key] === 'string') {
        newObj[key] = clean(obj[key]);
      } else {
        newObj[key] = obj[key];
      }
    }
  }
  
  return newObj;
};

// Use mongoSanitize as middleware instead of manually
app.use(mongoSanitize());

app.use((req, res, next) => {
  if (req.body) req.body = sanitizeObject(req.body);
  if (req.params) req.params = sanitizeObject(req.params);
  if (req.query) req.query = sanitizeObject(req.query);
  next();
});

const limiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 100
});
app.use(limiter);

app.use(hpp());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));

app.get('/', (req, res) => {
  res.send('Task Manager API setup is working...');
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
