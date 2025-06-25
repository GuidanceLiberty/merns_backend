import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import workoutRoutes from './routes/workouts.js';
import userRoute from './routes/user.js';

dotenv.config();

const app = express();

// ✅ CORS - DO NOT put full URL in app.use or route path
const allowedOrigins = [
  'http://localhost:3000',
  'https://merns-frontend.onrender.com'
];

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false); // Do not throw error
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.options('*', cors());

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path}`);
  next();
});

// ✅ Correct path routes, no full URLs
app.use('/api/user', userRoute);
app.use('/api/workouts', workoutRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('✅ Connected to DB & listening on port', process.env.PORT);
    });
  })
  .catch((error) => {
    console.error('❌ MongoDB connection error:', error.message);
  });
