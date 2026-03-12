import Movie from '../models/Movie.js';

// Search and filter movies
export const searchAndFilterMovies = async (req, res) => {
  try {
    const {
      q,           // search query
      genre,       // filter by genre
      rating,      // filter by rating
      minDuration, // minimum duration
      maxDuration, // maximum duration
      sortBy,      // sort field (releaseDate, title, duration)
      order,       // sort order (asc, desc)
      page,        // page number
      limit        // items per page
    } = req.query;

    // Build query object
    const query = {};

    // Text search (title and description)
    if (q) {
      query.$or = [
        { title: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } }
      ];
    }

    // Filter by genre (case-insensitive, partial match)
    if (genre) {
      query.genre = { $regex: genre, $options: 'i' };
    }

    // Filter by rating
    if (rating) {
      query.rating = rating;
    }

    // Filter by duration range
    if (minDuration || maxDuration) {
      query.duration = {};
      if (minDuration) query.duration.$gte = parseInt(minDuration);
      if (maxDuration) query.duration.$lte = parseInt(maxDuration);
    }

    // Sorting
    let sortOptions = {};
    if (sortBy) {
      const sortOrder = order === 'asc' ? 1 : -1;
      sortOptions[sortBy] = sortOrder;
    } else {
      // Default sort by release date (newest first)
      sortOptions.releaseDate = -1;
    }

    // Pagination
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 20;
    const skip = (pageNum - 1) * limitNum;

    // Execute query with pagination
    const [movies, totalCount] = await Promise.all([
      Movie.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNum),
      Movie.countDocuments(query)
    ]);

    // Calculate pagination info
    const totalPages = Math.ceil(totalCount / limitNum);
    const hasNextPage = pageNum < totalPages;
    const hasPrevPage = pageNum > 1;

    res.json({
      movies,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalCount,
        limit: limitNum,
        hasNextPage,
        hasPrevPage
      }
    });
  } catch (error) {
    console.error('Error searching/filtering movies:', error);
    res.status(500).json({ error: 'Failed to search movies' });
  }
};

// Get all movies (backward compatibility)
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
