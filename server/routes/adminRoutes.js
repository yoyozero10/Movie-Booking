import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/adminAuth.js';
import {
    getAdminStats,
    getAllUsers,
    updateUserRole,
    deleteUser,
    getAllBookings,
    updateBookingStatus
} from '../controllers/adminController.js';

const router = express.Router();

// All admin routes require authentication AND admin role
router.use(authenticateToken);
router.use(requireAdmin);

/**
 * @route   GET /api/admin/stats
 * @desc    Get dashboard statistics
 * @access  Admin
 */
router.get('/stats', getAdminStats);

/**
 * @route   GET /api/admin/users
 * @desc    Get all users
 * @access  Admin
 */
router.get('/users', getAllUsers);

/**
 * @route   PUT /api/admin/users/:userId/role
 * @desc    Update user role
 * @access  Admin
 */
router.put('/users/:userId/role', updateUserRole);

/**
 * @route   DELETE /api/admin/users/:userId
 * @desc    Delete user
 * @access  Admin
 */
router.delete('/users/:userId', deleteUser);

/**
 * @route   GET /api/admin/bookings
 * @desc    Get all bookings
 * @access  Admin
 */
router.get('/bookings', getAllBookings);

/**
 * @route   PUT /api/admin/bookings/:bookingId/status
 * @desc    Update booking status
 * @access  Admin
 */
router.put('/bookings/:bookingId/status', updateBookingStatus);

export default router;
