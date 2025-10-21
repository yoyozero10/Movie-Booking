import express from 'express';
import {
  getUserBookings,
  createBooking,
  cancelBooking
} from '../controllers/bookingController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All booking routes require authentication
router.use(authenticateToken);

router.get('/', getUserBookings);
router.post('/', createBooking);
router.put('/:id/cancel', cancelBooking);

export default router;
