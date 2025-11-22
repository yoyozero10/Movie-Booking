import express from 'express';
import {
  getUserBookings,
  createBooking,
  cancelBooking,
  deleteBooking
} from '../controllers/bookingController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// All booking routes require authentication
router.use(authenticateToken);

router.get('/', getUserBookings);
router.post('/', createBooking);
router.put('/:id/cancel', cancelBooking);
router.delete('/:id', deleteBooking);

export default router;
