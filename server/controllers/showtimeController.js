import Showtime from '../models/Showtime.js';

// Get all showtimes
export const getAllShowtimes = async (req, res) => {
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
};

// Get showtime by ID
export const getShowtimeById = async (req, res) => {
  try {
    const showtime = await Showtime.findById(req.params.id)
      .populate('movieId', 'title posterUrl')
      .populate('theaterId', 'name location totalSeats');

    if (!showtime) {
      return res.status(404).json({ error: 'Showtime not found' });
    }

    res.json(showtime);
  } catch (error) {
    console.error('Error fetching showtime by id:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid showtime ID' });
    }
    res.status(500).json({ error: 'Failed to fetch showtime' });
  }
};

// Get showtimes by movie
export const getShowtimesByMovie = async (req, res) => {
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
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid movie ID' });
    }
    res.status(500).json({ error: 'Failed to fetch showtimes' });
  }
};
