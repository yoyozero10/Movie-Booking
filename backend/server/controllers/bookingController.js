import Booking from '../models/Booking.js';
import Showtime from '../models/Showtime.js';
import mongoose from 'mongoose';
import { logger } from '../server.js';

const DEFAULT_CANCEL_CUTOFF_MINUTES = 120;

const parseShowtimeDateTime = (date, startTime) => {
  if (!date || !startTime) return null;
  const showtimeDate = new Date(`${date}T${startTime}:00`);
  return Number.isNaN(showtimeDate.getTime()) ? null : showtimeDate;
};

const getCancelCutoffMinutes = () => {
  const parsed = Number.parseInt(process.env.CANCEL_CUTOFF_MINUTES || '', 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : DEFAULT_CANCEL_CUTOFF_MINUTES;
};

// Get user's bookings
export const getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ userId: req.user.id })
      .populate({
        path: 'showtimeId',
        populate: {
          path: 'movieId theaterId',
          select: 'title posterUrl duration name location'
        }
      })
      .sort({ createdAt: -1 });

    // Debug logging
    if (bookings.length > 0) {
      console.log('DEBUG: First booking showtime:', bookings[0].showtimeId);
      console.log('DEBUG: First booking theater:', bookings[0].showtimeId?.theaterId);
    }

    res.json(bookings);
  } catch (error) {
    logger.error('Error fetching bookings:', error);
    res.status(500).json({ error: 'Failed to fetch bookings' });
  }
};

// Create new booking
export const createBooking = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const { showtimeId, seats, totalPrice } = req.body;
    logger.info('Creating booking with:', { showtimeId, seats, totalPrice, userId: req.user?.id });

    // Validate showtime exists and get details
    const showtime = await Showtime.findById(showtimeId);
    logger.info('Showtime found:', showtime);
    if (!showtime) {
      await session.abortTransaction();
      return res.status(404).json({ error: 'Showtime not found' });
    }

    // Check if showtime has enough available seats
    logger.info('Available seats:', showtime.availableSeats, 'Requested seats:', seats.length);
    if (showtime.availableSeats < seats.length) {
      await session.abortTransaction();
      return res.status(400).json({ error: 'Not enough available seats' });
    }

    // Check if seats are already booked for this showtime
    const existingBooking = await Booking.findOne({
      showtimeId,
      status: 'confirmed',
      seats: { $in: seats }
    });
    logger.info('Existing booking check:', existingBooking);

    if (existingBooking) {
      await session.abortTransaction();
      return res.status(400).json({ error: 'Some seats are already booked' });
    }

    // Calculate total price
    const calculatedTotalPrice = seats.length * showtime.price;
    logger.info('Price calculation:', { requested: totalPrice, calculated: calculatedTotalPrice, showtimePrice: showtime.price });

    // Create booking
    const booking = new Booking({
      userId: req.user.id,
      showtimeId,
      seats,
      totalPrice: calculatedTotalPrice,
      status: 'confirmed'
    });

    let savedBooking;
    try {
      savedBooking = await booking.save({ session });
      logger.info('Booking saved successfully:', savedBooking._id);
    } catch (saveError) {
      await session.abortTransaction();
      console.error('=== DETAILED ERROR INFO ===');
      console.error('Error message:', saveError.message);
      console.error('Error code:', saveError.code);
      console.error('Error name:', saveError.name);
      console.error('Stack trace:', saveError.stack);
      console.error('Booking data:', {
        userId: booking.userId,
        showtimeId: booking.showtimeId,
        seats: booking.seats,
        totalPrice: booking.totalPrice,
        bookingReference: booking.bookingReference
      });

      // Handle duplicate key error for bookingReference
      if (saveError.code === 11000 && saveError.keyPattern && saveError.keyPattern.bookingReference) {
        console.log('Duplicate bookingReference detected, retrying with new reference');
        // Retry with a new booking reference
        booking.bookingReference = 'BK' + Date.now() + Math.random().toString(36).substr(2, 9).toUpperCase();
        try {
          savedBooking = await booking.save({ session });
          console.log('Booking saved after retry:', savedBooking._id);
        } catch (retryError) {
          console.error('Error saving booking after retry:', retryError.message);
          return res.status(500).json({ error: 'Failed to create booking - please try again' });
        }
      } else {
        return res.status(500).json({ error: 'Failed to create booking' });
      }
    }

    // Update available seats in showtime
    showtime.availableSeats -= seats.length;
    await showtime.save({ session });
    logger.info('Showtime updated, new available seats:', showtime.availableSeats);

    await session.commitTransaction();
    logger.info('Transaction committed successfully');

    // Populate the saved booking for response
    const populatedBooking = await Booking.findById(savedBooking._id)
      .populate({
        path: 'showtimeId',
        populate: [
          { path: 'movieId', select: 'title posterUrl' },
          { path: 'theaterId', select: 'name location' }
        ]
      });

    logger.info('Booking populated successfully');
    res.status(201).json(populatedBooking);
  } catch (error) {
    await session.abortTransaction();
    logger.error('Error creating booking:', error);
    res.status(500).json({ error: 'Failed to create booking' });
  } finally {
    session.endSession();
  }
};

// Cancel booking
export const cancelBooking = async (req, res) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      await session.abortTransaction();
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if user owns this booking
    if (booking.userId.toString() !== req.user.id) {
      await session.abortTransaction();
      return res.status(403).json({ error: 'Not authorized to cancel this booking' });
    }

    // Only confirmed bookings can be cancelled
    if (booking.status !== 'confirmed') {
      await session.abortTransaction();
      return res.status(400).json({ error: 'Only confirmed bookings can be cancelled' });
    }

    const showtime = await Showtime.findById(booking.showtimeId);
    if (!showtime) {
      await session.abortTransaction();
      return res.status(400).json({ error: 'Cannot cancel booking: showtime not found' });
    }

    // Simple cancellation policy: allow cancellation only before X minutes to showtime
    const cutoffMinutes = getCancelCutoffMinutes();
    const showtimeDateTime = parseShowtimeDateTime(showtime.date, showtime.startTime);
    if (!showtimeDateTime) {
      await session.abortTransaction();
      return res.status(400).json({ error: 'Cannot cancel booking: invalid showtime date/time' });
    }

    const cancelDeadline = new Date(showtimeDateTime.getTime() - cutoffMinutes * 60 * 1000);
    if (new Date() > cancelDeadline) {
      await session.abortTransaction();
      return res.status(400).json({
        error: `Booking can only be cancelled at least ${cutoffMinutes} minutes before showtime`
      });
    }

    // Update booking status
    booking.status = 'cancelled';
    await booking.save({ session });

    // Return seats to showtime
    showtime.availableSeats += booking.seats.length;
    await showtime.save({ session });

    await session.commitTransaction();

    res.json({ message: 'Booking cancelled successfully' });
  } catch (error) {
    await session.abortTransaction();
    logger.error('Error cancelling booking:', error);
    res.status(500).json({ error: 'Failed to cancel booking' });
  } finally {
    session.endSession();
  }
};

// Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ error: 'Booking not found' });
    }

    // Check if user owns this booking
    if (booking.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: 'Not authorized to delete this booking' });
    }

    // Only allow deletion of cancelled bookings
    if (booking.status !== 'cancelled') {
      return res.status(400).json({ error: 'Only cancelled bookings can be deleted' });
    }

    await Booking.findByIdAndDelete(req.params.id);
    logger.info('Booking deleted successfully:', req.params.id);

    res.json({ message: 'Booking deleted successfully' });
  } catch (error) {
    logger.error('Error deleting booking:', error);
    res.status(500).json({ error: 'Failed to delete booking' });
  }
};

// Get booked seats for a showtime
export const getBookedSeats = async (req, res) => {
  try {
    const { showtimeId } = req.params;

    // Find all confirmed bookings for this showtime
    const bookings = await Booking.find({
      showtimeId,
      status: 'confirmed'
    }).select('seats');

    // Extract all booked seats
    const bookedSeats = bookings.flatMap(booking => booking.seats);

    res.json({ bookedSeats });
  } catch (error) {
    logger.error('Error fetching booked seats:', error);
    res.status(500).json({ error: 'Failed to fetch booked seats' });
  }
};
