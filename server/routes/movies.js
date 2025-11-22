import express from 'express';
import {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  searchAndFilterMovies
} from '../controllers/movieController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.get('/search', searchAndFilterMovies); // Must be before /:id route
router.get('/', getAllMovies);
router.get('/:id', getMovieById);

// Protected routes (admin only)
router.post('/', authenticateToken, createMovie);
router.put('/:id', authenticateToken, updateMovie);
router.delete('/:id', authenticateToken, deleteMovie);

export default router;
