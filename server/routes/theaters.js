import express from 'express';
import Theater from '../models/Theater.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all theaters
router.get('/', async (req, res) => {
  try {
    const theaters = await Theater.find().sort({ name: 1 });
    res.json(theaters);
  } catch (error) {
    console.error('Error fetching theaters:', error);
    res.status(500).json({ error: 'Failed to fetch theaters' });
  }
});

// Get theater by ID
router.get('/:id', async (req, res) => {
  try {
    const theater = await Theater.findById(req.params.id);
    if (!theater) {
      return res.status(404).json({ error: 'Theater not found' });
    }
    res.json(theater);
  } catch (error) {
    console.error('Error fetching theater:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid theater ID' });
    }
    res.status(500).json({ error: 'Failed to fetch theater' });
  }
});

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
