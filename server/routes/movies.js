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
import { requireAdmin } from '../middleware/adminAuth.js';

const router = express.Router();

// Public routes
router.get('/search', searchAndFilterMovies); // Must be before /:id route
router.get('/', getAllMovies);
router.get('/:id', getMovieById);

// Protected routes (admin only)
router.post('/', authenticateToken, requireAdmin, createMovie);
router.put('/:id', authenticateToken, requireAdmin, updateMovie);
router.delete('/:id', authenticateToken, requireAdmin, deleteMovie);

export default router;
