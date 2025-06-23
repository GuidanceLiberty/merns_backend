import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

import workoutRoutes from './routes/workouts.js';
import userRoute from './routes/user.js';

dotenv.config();

const app = express();

// Allow requests from your frontend
app.use(cors({
  origin: "http://localhost:3000", // ⚠️ Change this to your frontend live URL when deployed
  credentials: false
}));

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoute);

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
