import { useState, useEffect } from "react";
import { SeatSelection } from "./SeatSelection";
import { api } from "../lib/api";
import { Clock, Calendar, MapPin, Armchair, Star } from "lucide-react";
import { useLocale } from "../lib/LocaleContext";
import { formatCurrency } from "../lib/currency";

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
  theaterId,
  onBack,
}: {
  movieId: string;
  theaterId?: string;
  onBack: () => void;
}) {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [showtimes, setShowtimes] = useState<Showtime[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedShowtimeId, setSelectedShowtimeId] = useState<string | null>(null);
  const { currency } = useLocale();

  useEffect(() => {
    const fetchMovieAndShowtimes = async () => {
      try {
        // Fetch movie details
        const movieData = await api.getMovie(movieId);
        setMovie(movieData);

        // Fetch showtimes for this movie
        let showtimesData;
        if (theaterId) {
          // If theaterId is provided, get showtimes for this specific theater
          showtimesData = await api.getShowtimesByTheaterAndMovie(theaterId, movieId);
        } else {
          // Otherwise get all showtimes for this movie
          showtimesData = await api.getShowtimesByMovie(movieId, undefined);
        }

        // Filter by theaterId if provided
        if (theaterId && showtimesData) {
          showtimesData = showtimesData.filter((st: Showtime) =>
            typeof st.theaterId === 'object'
              ? st.theaterId._id === theaterId
              : st.theaterId === theaterId
          );
        }

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
  }, [movieId, theaterId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-apple-blue"></div>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-red-500 mb-4">Movie not found</p>
        <button
          onClick={onBack}
          className="apple-button px-6 py-3 rounded-lg"
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
        className="mb-6 px-4 py-2 text-apple-blue hover:text-white font-medium transition-colors duration-200"
      >
        ← Back to Movies
      </button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Movie Info */}
        <div className="lg:col-span-1 animate-fade-in">
          <div className="movie-card rounded-2xl overflow-hidden mb-4">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full aspect-[2/3] object-cover"
            />
          </div>
          <div className="apple-glass p-6 rounded-2xl space-y-4">
            <h1 className="text-3xl font-bold text-white font-display">{movie.title}</h1>
            <div className="flex items-center gap-3 text-sm flex-wrap">
              <span className="px-3 py-1 bg-apple-blue/20 text-apple-blue rounded-lg border border-apple-blue/30">
                {movie.genre}
              </span>
              <span className="px-3 py-1 bg-white/5 text-white/80 rounded-lg border border-white/10">
                {movie.duration} min
              </span>
              <span className="px-3 py-1 bg-green-500/20 text-green-400 rounded-lg border border-green-500/30 flex items-center gap-1">
                <Star className="w-3 h-3 fill-current" />
                {movie.rating}
              </span>
            </div>
            <p className="text-white/70 leading-relaxed">{movie.description}</p>
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
            <div className="animate-slide-up delay-200">
              <h2 className="text-2xl font-bold mb-6 text-white font-display">Select Showtime</h2>

              {showtimes.length === 0 ? (
                <div className="text-center py-12 apple-glass rounded-2xl">
                  <p className="text-white/60">No showtimes available for this movie.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {showtimes.map((showtime) => (
                    <button
                      key={showtime._id}
                      type="button"
                      className="w-full text-left movie-card rounded-2xl p-6 hover:border-apple-blue/50 transition-all duration-300 cursor-pointer group"
                      onClick={() => {
                        console.debug('showtime clicked', showtime._id);
                        setSelectedShowtimeId(showtime._id);
                      }}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <p className="font-semibold text-white text-lg mb-1 group-hover:text-apple-blue transition-colors">
                            {typeof showtime.theaterId === 'object' ? showtime.theaterId.name : 'Theater'}
                          </p>
                          <p className="text-sm text-white/60 flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {typeof showtime.theaterId === 'object' ? showtime.theaterId.location : 'Location'}
                          </p>
                        </div>
                        <span className="text-2xl font-bold text-apple-blue font-display">
                          {formatCurrency(showtime.price, currency)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center pt-4 border-t border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center gap-1.5 bg-apple-blue/20 px-3 py-1.5 rounded-lg border border-apple-blue/30">
                            <Clock className="w-4 h-4 text-apple-blue" />
                            <span className="text-sm font-semibold text-apple-blue">{showtime.startTime}</span>
                          </div>
                          <div className="flex items-center gap-1.5 text-white/70">
                            <Calendar className="w-4 h-4" />
                            <span className="text-sm">{showtime.date}</span>
                          </div>
                        </div>
                        <span className="text-sm font-medium text-green-400 flex items-center gap-1.5">
                          <Armchair className="w-4 h-4" />
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
