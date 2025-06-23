import express from 'express';
import {
  getWorkouts,
  getWorkout,
  createWorkout,
  deleteWorkout,
  updateWorkout
} from '../controllers/workoutController.js';
import requireAuth from '../middleware/requireAuth.js'; // ✅ Add this

const router = express.Router();

// ✅ Apply middleware to protect all workout routes
router.use(requireAuth);

// GET all workouts
router.get('/', getWorkouts);

// GET a single workout
router.get('/:id', getWorkout);

// POST a new workout
router.post('/', createWorkout);

// DELETE a workout
router.delete('/:id', deleteWorkout);

// UPDATE a workout
router.patch('/:id', updateWorkout);

export default router;
