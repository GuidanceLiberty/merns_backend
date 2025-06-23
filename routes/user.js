import express from 'express';
import { signupUser, loginUser } from '../controllers/userContoller.js';

const router = express.Router();

// LOGIN ROUTE
router.post('/login', loginUser);

// SIGNUP ROUTE
router.post('/signup', signupUser);

export default router;
