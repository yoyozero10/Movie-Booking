import { useState, useEffect } from "react";
import { MovieDetails } from "./MovieDetails";
import { api } from "../lib/api";

// Define types for MongoDB documents
interface Movie {
  _id: string;
  title: string;
  description: string;
  genre: string;
  duration: number;
  rating: string;
  posterUrl: string;
  releaseDate: string;
  createdAt: string;
  updatedAt: string;
}

export function MovieList() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const moviesData = await api.getMovies();
        setMovies(moviesData);
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchMovies();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (selectedMovieId) {
    return (
      <MovieDetails
        movieId={selectedMovieId}
        onBack={() => setSelectedMovieId(null)}
      />
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🎬</div>
        <p className="text-xl text-gray-600 mb-2">
          No movies available yet
        </p>
        <p className="text-gray-500 mb-6">
          Movies have been seeded to your MongoDB Atlas database!
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Browse Movies</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => setSelectedMovieId(movie._id)}
          >
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h4 className="text-lg font-semibold mb-2">{movie.title}</h4>
              <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                {movie.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{movie.genre}</span>
                <span className="text-sm text-gray-500">{movie.duration} min</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
