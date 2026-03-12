import express from 'express';
import {
  getUserBookings,
  createBooking,
  cancelBooking,
  deleteBooking,
  getBookedSeats
} from '../controllers/bookingController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public route to get booked seats for a showtime (no auth required)
router.get('/showtime/:showtimeId/booked-seats', getBookedSeats);

// All other booking routes require authentication
router.use(authenticateToken);

router.get('/', getUserBookings);
router.post('/', createBooking);
router.put('/:id/cancel', cancelBooking);
router.delete('/:id', deleteBooking);

export default router;
