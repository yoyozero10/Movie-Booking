import express from 'express';
import {
  getRegions,
  getTheatersByRegion,
  getAllTheaters,
  getTheaterById,
  getMoviesByTheater,
  getShowtimesByTheaterAndMovie
} from '../controllers/theaterController.js';
import Theater from '../models/Theater.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all unique regions
router.get('/regions', getRegions);

// Get theaters by region
router.get('/region/:region', getTheatersByRegion);

// Get movies playing at a specific theater
router.get('/:theaterId/movies', getMoviesByTheater);

// Get showtimes for a specific movie at a specific theater
router.get('/:theaterId/movies/:movieId/showtimes', getShowtimesByTheaterAndMovie);

// Get all theaters
router.get('/', getAllTheaters);

// Get theater by ID
router.get('/:id', getTheaterById);

// Create theater (admin)
router.post('/', authenticateToken, async (req, res) => {
  try {
    const theater = new Theater(req.body);
    const savedTheater = await theater.save();
    res.status(201).json(savedTheater);
  } catch (error) {
    console.error('Error creating theater:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to create theater' });
  }
});

export default router;
