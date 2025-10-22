import Theater from '../models/Theater.js';

// Get all theaters
export const getAllTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find().sort({ name: 1 });
    res.json(theaters);
  } catch (error) {
    console.error('Error fetching theaters:', error);
    res.status(500).json({ error: 'Failed to fetch theaters' });
  }
};

// Get theater by ID
export const getTheaterById = async (req, res) => {
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
};
