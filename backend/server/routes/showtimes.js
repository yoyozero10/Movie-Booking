import express from 'express';
import Showtime from '../models/Showtime.js';
import Theater from '../models/Theater.js';
import { authenticateToken } from '../middleware/auth.js';
import { requireAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

// Get showtimes by movie
router.get('/movie/:movieId', async (req, res) => {
  try {
    const { movieId } = req.params;
    const { date } = req.query;

    let query = { movieId };
    if (date) {
      query.date = date;
    }

    const showtimes = await Showtime.find(query)
      .populate('movieId', 'title')
      .populate('theaterId', 'name location')
      .sort({ date: 1, startTime: 1 });

    res.json(showtimes);
  } catch (error) {
    console.error('Error fetching showtimes:', error);
    res.status(500).json({ error: 'Failed to fetch showtimes' });
  }
});

// Get showtimes by theater
router.get('/theater/:theaterId', async (req, res) => {
  try {
    const { theaterId } = req.params;
    const showtimes = await Showtime.find({ theaterId })
      .populate('movieId', 'title posterUrl')
      .sort({ date: 1, startTime: 1 });

    res.json(showtimes);
  } catch (error) {
    console.error('Error fetching showtimes:', error);
    res.status(500).json({ error: 'Failed to fetch showtimes' });
  }
});

// Get showtime by id (public)
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const showtime = await Showtime.findById(id)
      .populate('movieId', 'title posterUrl')
      .populate('theaterId', 'name location totalSeats');

    if (!showtime) {
      return res.status(404).json({ error: 'Showtime not found' });
    }

    res.json(showtime);
  } catch (error) {
    console.error('Error fetching showtime by id:', error);
    res.status(500).json({ error: 'Failed to fetch showtime' });
  }
});

// Get all showtimes (public - for listing)
router.get('/', async (req, res) => {
  try {
    const { date, movieId, theaterId } = req.query;

    let query = {};
    if (date) query.date = date;
    if (movieId) query.movieId = movieId;
    if (theaterId) query.theaterId = theaterId;

    const showtimes = await Showtime.find(query)
      .populate('movieId', 'title posterUrl')
      .populate('theaterId', 'name location')
      .sort({ date: 1, startTime: 1 });

    res.json(showtimes);
  } catch (error) {
    console.error('Error fetching showtimes:', error);
    res.status(500).json({ error: 'Failed to fetch showtimes' });
  }
});

// Create showtime (admin)
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { theaterId, availableSeats } = req.body;

    // Get theater to validate seats
    const theater = await Theater.findById(theaterId);
    if (!theater) {
      return res.status(404).json({ error: 'Theater not found' });
    }

    // Set availableSeats to theater capacity if not provided
    const showtimeData = {
      ...req.body,
      availableSeats: availableSeats || theater.totalSeats
    };

    const showtime = new Showtime(showtimeData);
    const savedShowtime = await showtime.save();

    // Populate for response
    const populatedShowtime = await Showtime.findById(savedShowtime._id)
      .populate('movieId', 'title posterUrl')
      .populate('theaterId', 'name location');

    res.status(201).json(populatedShowtime);
  } catch (error) {
    console.error('Error creating showtime:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Showtime already exists for this movie, theater, date and time' });
    }
    res.status(500).json({ error: 'Failed to create showtime' });
  }
});

// Update showtime (admin)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedShowtime = await Showtime.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('movieId', 'title posterUrl')
      .populate('theaterId', 'name location');

    if (!updatedShowtime) {
      return res.status(404).json({ error: 'Showtime not found' });
    }

    res.json(updatedShowtime);
  } catch (error) {
    console.error('Error updating showtime:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    if (error.code === 11000) {
      return res.status(409).json({ error: 'Showtime already exists for this movie, theater, date and time' });
    }
    res.status(500).json({ error: 'Failed to update showtime' });
  }
});

// Delete showtime (admin)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedShowtime = await Showtime.findByIdAndDelete(id);

    if (!deletedShowtime) {
      return res.status(404).json({ error: 'Showtime not found' });
    }

    res.json({ message: 'Showtime deleted successfully', showtime: deletedShowtime });
  } catch (error) {
    console.error('Error deleting showtime:', error);
    res.status(500).json({ error: 'Failed to delete showtime' });
  }
});

export default router;
