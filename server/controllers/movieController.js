import Movie from '../models/Movie.js';

// Get all movies
export const getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find().sort({ createdAt: -1 });
    res.json(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
    res.status(500).json({ error: 'Failed to fetch movies' });
  }
};

// Get movie by ID
export const getMovieById = async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie);
  } catch (error) {
    console.error('Error fetching movie:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid movie ID' });
    }
    res.status(500).json({ error: 'Failed to fetch movie' });
  }
};

// Create new movie (admin only)
export const createMovie = async (req, res) => {
  try {
    const movieData = {
      title: req.body.title,
      description: req.body.description,
      genre: req.body.genre,
      duration: req.body.duration,
      rating: req.body.rating,
      posterUrl: req.body.posterUrl,
      releaseDate: req.body.releaseDate
    };

    const movie = new Movie(movieData);
    const savedMovie = await movie.save();
    res.status(201).json(savedMovie);
  } catch (error) {
    console.error('Error creating movie:', error);
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to create movie' });
  }
};

// Update movie (admin only)
export const updateMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.json(movie);
  } catch (error) {
    console.error('Error updating movie:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid movie ID' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Failed to update movie' });
  }
};

// Delete movie (admin only)
export const deleteMovie = async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params.id);
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.json({ message: 'Movie deleted successfully' });
  } catch (error) {
    console.error('Error deleting movie:', error);
    if (error.name === 'CastError') {
      return res.status(400).json({ error: 'Invalid movie ID' });
    }
    res.status(500).json({ error: 'Failed to delete movie' });
  }
};
