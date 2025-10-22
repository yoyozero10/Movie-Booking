import { useState, useEffect } from "react";
import { SeatSelection } from "./SeatSelection";
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

interface Showtime {
  _id: string;
  movieId: string;
  theaterId: string;
  startTime: string;
  date: string;
  price: number;
  availableSeats: number;
  movieId_details?: Movie;
  theaterId_details?: {
    name: string;
    location: string;
  };
}

export function MovieDetails({
  movieId,
  onBack,
}: {
  movieId: string;
  onBack: () => void;
}) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovieAndShowtimes = async () => {
      try {
        // Fetch movie details
        const movieData = await api.getMovie(movieId);
        setMovie(movieData);

        // Fetch showtimes for this movie
        const showtimesData = await api.getShowtimesByMovie(movieId, undefined);
        setShowtimes(showtimesData);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    if (movieId) {
      void fetchMovieAndShowtimes();
    }
  }, [movieId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-red-600 mb-4">Movie not found</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover"
                    >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto">
      <button
        onClick={onBack}
        className="mb-6 px-4 py-2 text-primary hover:text-primary-hover font-medium"
      >
        ← Back to Movies
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Movie Info */}
        <div className="lg:col-span-1">
          <img
            src={movie.posterUrl}
            alt={movie.title}
            className="w-full rounded-lg shadow-lg mb-4"
          />
          <div className="space-y-2">
            <h1 className="text-3xl font-bold">{movie.title}</h1>
            <div className="flex items-center gap-4 text-sm text-gray-300">
              <span>{movie.genre}</span>
              <span>{movie.duration} min</span>
              <span>{movie.rating}</span>
            </div>
            <p className="text-gray-300">{movie.description}</p>
          </div>
        </div>

        {/* Showtimes and Seat Selection */}
        <div className="lg:col-span-2">
          {selectedShowtimeId ? (
            <SeatSelection
              showtimeId={selectedShowtimeId}
              onBack={() => setSelectedShowtimeId(null)}
            />
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-6 text-white">Select Showtime</h2>

              {showtimes.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No showtimes available for this movie.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {showtimes.map((showtime) => (
                      <button
                        key={showtime._id}
                        type="button"
                        className="w-full text-left border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                        onClick={() => {
                          console.debug('showtime clicked', showtime._id);
                          setSelectedShowtimeId(showtime._id);
                        }}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            console.debug('showtime activated via keyboard', showtime._id);
                            setSelectedShowtimeId(showtime._id);
                          }
                        }}
                        aria-pressed={selectedShowtimeId === showtime._id}
                      >
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="font-semibold">
                            {showtime.theaterId_details?.name || 'Theater'}
                          </p>
                          <p className="text-sm text-gray-300">
                            {showtime.theaterId_details?.location || 'Location'}
                          </p>
                        </div>
                        <span className="text-lg font-bold text-primary">
                          ${showtime.price}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          {showtime.date} at {showtime.startTime}
                        </span>
                        <span className="text-sm text-green-600">
                          {showtime.availableSeats} seats left
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
