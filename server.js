import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import workoutRoutes from './routes/workouts.js';
import userRoute from './routes/user.js';

dotenv.config();

const app = express();

// ✅ Safe CORS Setup (Does not crash on unauthorized origins)
const allowedOrigins = [
  'http://localhost:3000',
  'https://merns-frontend.onrender.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn('❌ Blocked by CORS:', origin);
      callback(null, false); // Do NOT throw error
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ Handle preflight requests
app.options('*', cors());

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/user', userRoute);
app.use('/api/workouts', workoutRoutes);

// Connect to DB
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('✅ Connected to DB & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
  });
