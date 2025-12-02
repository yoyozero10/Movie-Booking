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
import { requireAdmin } from '../middleware/adminAuth.js';

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
router.post('/', authenticateToken, requireAdmin, async (req, res) => {
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

// Update theater (admin)
router.put('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const updatedTheater = await Theater.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedTheater) {
      return res.status(404).json({ error: 'Theater not found' });
    }

    res.json(updatedTheater);
  } catch (error) {
    console.error('Error updating theater:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to update theater' });
  }
});

// Delete theater (admin)
router.delete('/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const deletedTheater = await Theater.findByIdAndDelete(id);

    if (!deletedTheater) {
      return res.status(404).json({ error: 'Theater not found' });
    }

    res.json({ message: 'Theater deleted successfully', theater: deletedTheater });
  } catch (error) {
    console.error('Error deleting theater:', error);
    res.status(500).json({ error: 'Failed to delete theater' });
  }
});

export default router;
