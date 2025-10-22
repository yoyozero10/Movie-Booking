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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
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
        <p className="text-xl text-gray-300 mb-2">
          No movies available yet
        </p>
        <p className="text-gray-400 mb-6">
          Movies have been seeded to your MongoDB Atlas database!
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold text-white">Browse Movies</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-pink-500/50"
            onClick={() => setSelectedMovieId(movie._id)}
          >
            <div className="w-full h-80 bg-gray-900 flex items-center justify-center overflow-hidden">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/placeholder/500/750'; }}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-4">
              <h4 className="text-lg font-semibold mb-2 text-white">{movie.title}</h4>
              <p className="text-gray-300 text-sm mb-2 line-clamp-2">
                {movie.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">{movie.genre}</span>
                <span className="text-sm text-gray-400">{movie.duration} min</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
