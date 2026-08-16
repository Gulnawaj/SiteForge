import express from 'express';

import {
    login,
    register,
    resendRegister,
    verifyRegister,
    me,
    contributions,
    updateProfile,
    changePassword,
    deleteAccount
} from '../controllers/authController.js';

import { requireAuth } from '../middleware/auth.js';
import forgotRoutes from './authForgot.js';

const authRouter = express.Router();

authRouter.post('/register', register);
authRouter.post('/register/verify', verifyRegister);
authRouter.post('/register/resend', resendRegister);
authRouter.post('/login', login);

// To access these routes user must be logged in
authRouter.get('/me', requireAuth, me);
authRouter.get('/me/contributions', requireAuth, contributions);

authRouter.patch('/me', requireAuth, updateProfile);
authRouter.patch('/me/password', requireAuth, changePassword);
authRouter.delete('/me', requireAuth, deleteAccount);

// Forgot password and reset password
authRouter.use('/forgot', forgotRoutes);

export default authRouter;