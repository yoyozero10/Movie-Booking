import { useState, useEffect } from "react";
import { toast } from "sonner";
import { api } from "../lib/api";
import { useAuth } from "../lib/auth";
import { Calendar, Clock, Armchair, Ticket, Trash2, XCircle } from "lucide-react";

// Define types for MongoDB documents
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
  const [authError, setAuthError] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!user) {
        setAuthError(true);
        setLoading(false);
        return;
      }

      try {
        const bookingsData = await api.getBookings();
        setBookings(bookingsData);
        setAuthError(false);
      } catch (error: any) {
        console.error('Error fetching bookings:', error);
        if (error.message?.includes('Access token required') || error.message?.includes('401')) {
          setAuthError(true);
          toast.error('Please sign in to view your bookings');
        } else {
          toast.error('Failed to load bookings');
        }
      } finally {
        setLoading(false);
      }
    };

    void fetchBookings();
  }, [user]);

  const handleCancel = async (bookingId: string) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      await api.cancelBooking(bookingId);
      toast.success('Booking cancelled successfully');

      // Refresh bookings list
      const updatedBookings = await api.getBookings();
      setBookings(updatedBookings);
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast.error('Failed to cancel booking');
    }
  };

  const handleDelete = async (bookingId: string) => {
    if (!confirm("Are you sure you want to permanently delete this booking? This action cannot be undone.")) return;

    try {
      await api.deleteBooking(bookingId);
      toast.success('Booking deleted successfully');

      // Refresh bookings list
      const updatedBookings = await api.getBookings();
      setBookings(updatedBookings);
    } catch (error) {
      console.error('Error deleting booking:', error);
      toast.error('Failed to delete booking');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (authError || !user) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🔒</div>
        <p className="text-xl text-gray-300 mb-2">Sign in required</p>
        <p className="text-gray-400 mb-6">
          Please sign in to view your bookings
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
        >
          Sign In
        </button>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🎫</div>
        <p className="text-xl text-gray-300 mb-2">No bookings yet</p>
        <p className="text-gray-400">
          Book your first movie to see your bookings here!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold text-white mb-6">My Bookings</h3>

      <div className="grid gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-lg hover:border-pink-500/50 transition-all duration-300"
          >
            <div className="flex flex-col md:flex-row">
              {/* Movie Poster */}
              <div className="w-full md:w-48 h-64 md:h-auto bg-gray-900 flex-shrink-0 relative">
                <img
                  src={booking.showtimeId?.movieId?.posterUrl}
                  alt={booking.showtimeId?.movieId?.title}
                  className="w-full h-full object-cover"
                  onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/placeholder/500/750'; }}
                />
                <div className="absolute top-2 right-2 md:hidden">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm ${booking.status === 'confirmed'
                        ? 'bg-green-500 text-white'
                        : booking.status === 'cancelled'
                          ? 'bg-red-500 text-white'
                          : 'bg-gray-500 text-white'
                      }`}
                  >
                    {booking.status}
                  </span>
                </div>
              </div>

              {/* Booking Details */}
              <div className="flex-1 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h4 className="text-2xl font-bold text-white mb-1">
                        {booking.showtimeId?.movieId?.title || 'Movie Title'}
                      </h4>
                      <p className="text-pink-400 font-medium text-sm">
                        Booking Ref: {booking.bookingReference}
                      </p>
                    </div>
                    <div className="hidden md:block">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${booking.status === 'confirmed'
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : booking.status === 'cancelled'
                              ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                              : 'bg-gray-500/20 text-gray-400 border border-gray-500/30'
                          }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center space-x-3 text-gray-300">
                      <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Calendar className="w-5 h-5 text-pink-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Date</p>
                        <p className="font-medium">{booking.showtimeId?.date || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-300">
                      <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Clock className="w-5 h-5 text-pink-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Time</p>
                        <p className="font-medium">{booking.showtimeId?.startTime || 'N/A'}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-300">
                      <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Armchair className="w-5 h-5 text-pink-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Seats</p>
                        <p className="font-medium">{booking.seats.join(', ')}</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-3 text-gray-300">
                      <div className="p-2 bg-gray-700/50 rounded-lg">
                        <Ticket className="w-5 h-5 text-pink-400" />
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Total Price</p>
                        <p className="font-bold text-white text-lg">${booking.totalPrice.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-700">
                  {booking.status === 'confirmed' && (
                    <button
                      onClick={() => void handleCancel(booking._id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-lg transition-colors border border-red-500/30"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Cancel Booking</span>
                    </button>
                  )}
                  {booking.status === 'cancelled' && (
                    <button
                      onClick={() => void handleDelete(booking._id)}
                      className="flex items-center space-x-2 px-4 py-2 bg-gray-700 text-gray-300 hover:bg-gray-600 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                      <span>Delete Booking</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
