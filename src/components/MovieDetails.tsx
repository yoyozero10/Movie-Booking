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

interface Theater {
  _id: string;
  name: string;
  location: string;
  totalSeats: number;
}

interface Showtime {
  _id: string;
  movieId: string | Movie;
  theaterId: string | Theater;
  startTime: string;
  date: string;
  price: number;
  availableSeats: number;
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
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <p className="font-semibold text-white text-lg mb-1">
                            {typeof showtime.theaterId === 'object' ? showtime.theaterId.name : 'Theater'}
                          </p>
                          <p className="text-sm text-gray-400 flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            {typeof showtime.theaterId === 'object' ? showtime.theaterId.location : 'Location'}
                          </p>
                        </div>
                        <span className="text-xl font-bold text-primary">
                          ${showtime.price}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 bg-primary/20 px-3 py-1.5 rounded-lg">
                            <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span className="text-sm font-semibold text-primary">{showtime.startTime}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-gray-300">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm">{showtime.date}</span>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-green-500 flex items-center gap-1">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                            <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
                          </svg>
                          {showtime.availableSeats} seats
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
