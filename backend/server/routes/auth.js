import express from 'express';
import {
    register,
    login,
    getProfile,
    updateProfile,
    getUserById,
    changePassword,
    forgotPassword,
    resetPassword
} from '../controllers/authController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password/:token', resetPassword);

// Protected routes
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, updateProfile);
router.put('/change-password', authenticateToken, changePassword);

// Public routes
router.get('/:id', getUserById);

export default router;
