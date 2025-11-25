import Theater from '../models/Theater.js';
import Showtime from '../models/Showtime.js';

// Get all unique regions
export const getRegions = async (req, res) => {
  try {
    const regions = await Theater.distinct('region');
    res.json(regions.sort());
  } catch (error) {
    console.error('Error fetching regions:', error);
    res.status(500).json({ error: 'Failed to fetch regions' });
  }
};

// Get theaters by region
export const getTheatersByRegion = async (req, res) => {
  try {
    const { region } = req.params;
    const theaters = await Theater.find({ region }).sort({ name: 1 });
    res.json(theaters);
  } catch (error) {
    console.error('Error fetching theaters by region:', error);
    res.status(500).json({ error: 'Failed to fetch theaters' });
  }
};

// Get all theaters
export const getAllTheaters = async (req, res) => {
  try {
    const theaters = await Theater.find().sort({ region: 1, name: 1 });
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

// Get movies playing at a specific theater
export const getMoviesByTheater = async (req, res) => {
  try {
    const { theaterId } = req.params;

    // Get all showtimes for this theater
    const showtimes = await Showtime.find({ theaterId })
      .populate('movieId')
      .sort({ date: 1, startTime: 1 });

    // Extract unique movies
    const moviesMap = new Map();
    showtimes.forEach(showtime => {
      if (showtime.movieId && !moviesMap.has(showtime.movieId._id.toString())) {
        moviesMap.set(showtime.movieId._id.toString(), {
          ...showtime.movieId.toObject(),
          showtimeCount: 1
        });
      } else if (showtime.movieId) {
        const movie = moviesMap.get(showtime.movieId._id.toString());
        movie.showtimeCount++;
      }
    });

    const movies = Array.from(moviesMap.values());
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies by theater:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};

// Get showtimes for a specific movie at a specific theater
export const getShowtimesByTheaterAndMovie = async (req, res) => {
  try {
    const { theaterId, movieId } = req.params;
    const { date } = req.query;

    let query = { theaterId, movieId };
    if (date) {
      query.date = date;
    }

    const showtimes = await Showtime.find(query)
      .populate('movieId', 'title posterUrl')
      .populate('theaterId', 'name location')
      .sort({ date: 1, startTime: 1 });

    res.json(showtimes);
  } catch (error) {
    console.error('Error fetching showtimes:', error);
    res.status(500).json({ error: 'Failed to fetch showtimes' });
  }
};
