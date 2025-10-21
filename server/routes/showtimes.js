import express from 'express';
import Showtime from '../models/Showtime.js';
import { authenticateToken } from '../middleware/auth.js';

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

// Get all showtimes (admin)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const showtimes = await Showtime.find()
      .populate('movieId', 'title')
      .populate('theaterId', 'name')
      .sort({ date: 1, startTime: 1 });

    res.json(showtimes);
  } catch (error) {
    console.error('Error fetching showtimes:', error);
    res.status(500).json({ error: 'Failed to fetch showtimes' });
  }
});

export default router;
