import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { api } from '../lib/api';
import { Calendar, Clock, MapPin, Ticket, CheckCircle, XCircle, Trash2 } from 'lucide-react';

interface Booking {
  _id: string;
  showtimeId: {
    _id: string;
    movieId: {
      _id: string;
      title: string;
      posterUrl: string;
      duration: number;
    };
    theaterId: {
      name: string;
      location: string;
    };
    startTime: string;
    date: string;
    price: number;
  };
  seats: string[];
  totalPrice: number;
  status: string;
  bookingReference: string;
}

export function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await api.getBookings();
      setBookings(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings. Please try again.');
      toast.error('Failed to load bookings');
    } finally {
      setLoading(false);
    }
  };

  const handleCancelBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to cancel this booking?')) {
      return;
    }

    try {
      await api.cancelBooking(bookingId);
      toast.success('Booking cancelled successfully');
      await fetchBookings();
    } catch (err) {
      console.error('Error cancelling booking:', err);
      toast.error('Failed to cancel booking');
    }
  };

  const handleDeleteBooking = async (bookingId: string) => {
    if (!confirm('Are you sure you want to delete this booking? This action cannot be undone.')) {
      return;
    }

    try {
      await api.deleteBooking(bookingId);
      toast.success('Booking deleted successfully');
      await fetchBookings();
    } catch (err) {
      console.error('Error deleting booking:', err);
      toast.error('Failed to delete booking');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-apple-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-red-500 mb-4">{error}</p>
        <button
          onClick={fetchBookings}
          className="apple-button px-6 py-3 rounded-lg"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-20 animate-fade-in">
        <div className="apple-glass rounded-3xl p-12 max-w-md mx-auto">
          <Ticket className="w-16 h-16 text-white/40 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-white mb-2 font-display">No Bookings Yet</h3>
          <p className="text-white/70">
            Start booking your favorite movies to see them here!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-white mb-8 font-display animate-fade-in">My Bookings</h2>

      <div className="space-y-6">
        {bookings.map((booking, index) => {
          // Safely access nested properties with fallbacks
          const showtime = booking.showtimeId;
          const movie = showtime?.movieId;
          const theater = showtime?.theaterId;

          // Skip rendering if critical data is missing
          if (!showtime || !movie || !theater) {
            return null;
          }

          return (
            <div
              key={booking._id}
              className="movie-card rounded-2xl p-6 hover:border-apple-blue/50 transition-all duration-300 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex flex-col lg:flex-row gap-6">
                {/* Movie Poster */}
                <div className="flex-shrink-0">
                  <img
                    src={movie.posterUrl || 'https://via.placeholder.com/300x450?text=No+Poster'}
                    alt={movie.title || 'Movie'}
                    className="w-full lg:w-32 h-48 lg:h-48 object-cover rounded-xl"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://via.placeholder.com/300x450?text=No+Poster';
                    }}
                  />
                </div>

                {/* Booking Details */}
                <div className="flex-1 space-y-4">
                  {/* Header */}
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2 font-display">
                        {movie.title || 'Unknown Movie'}
                      </h3>
                      <div className="flex items-center gap-2">
                        <span
                          className={`px-3 py-1 rounded-lg text-sm font-medium border ${booking.status === 'confirmed'
                              ? 'bg-green-500/20 text-green-400 border-green-500/30'
                              : 'bg-red-500/20 text-red-400 border-red-500/30'
                            }`}
                        >
                          {booking.status === 'confirmed' ? (
                            <span className="flex items-center gap-1">
                              <CheckCircle className="w-4 h-4" />
                              Confirmed
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <XCircle className="w-4 h-4" />
                              Cancelled
                            </span>
                          )}
                        </span>
                        {booking.bookingReference && (
                          <span className="px-3 py-1 bg-apple-blue/20 text-apple-blue rounded-lg text-sm font-medium border border-apple-blue/30">
                            {booking.bookingReference}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-3xl font-bold text-apple-blue font-display">
                        ${booking.totalPrice?.toFixed(2) || '0.00'}
                      </div>
                      <div className="text-sm text-white/60">
                        {booking.seats?.length || 0} seat{(booking.seats?.length || 0) > 1 ? 's' : ''}
                      </div>
                    </div>
                  </div>

                  {/* Info Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex items-start gap-3">
                      <Calendar className="w-5 h-5 text-apple-blue flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm text-white/60">Date & Time</div>
                        <div className="text-white font-medium">
                          {showtime.date || 'N/A'} at {showtime.startTime || 'N/A'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-apple-blue flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm text-white/60">Theater</div>
                        <div className="text-white font-medium">
                          {theater.name || 'Unknown Theater'}
                        </div>
                        <div className="text-sm text-white/50">
                          {theater.location || 'Unknown Location'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Ticket className="w-5 h-5 text-apple-blue flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm text-white/60">Seats</div>
                        <div className="text-white font-medium">
                          {booking.seats?.join(', ') || 'N/A'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <Clock className="w-5 h-5 text-apple-blue flex-shrink-0 mt-0.5" />
                      <div>
                        <div className="text-sm text-white/60">Duration</div>
                        <div className="text-white font-medium">
                          {movie.duration || 0} minutes
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-3 pt-4 border-t border-white/10">
                    {booking.status === 'confirmed' && (
                      <button
                        onClick={() => handleCancelBooking(booking._id)}
                        className="apple-glass hover:bg-red-500/20 hover:border-red-500/30 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 text-white flex items-center gap-2"
                      >
                        <XCircle className="w-4 h-4" />
                        Cancel Booking
                      </button>
                    )}
                    {booking.status === 'cancelled' && (
                      <button
                        onClick={() => handleDeleteBooking(booking._id)}
                        className="apple-glass hover:bg-red-500/20 hover:border-red-500/30 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-300 text-white flex items-center gap-2"
                      >
                        <Trash2 className="w-4 h-4" />
                        Delete Booking
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
