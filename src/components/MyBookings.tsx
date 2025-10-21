import { useState, useEffect } from "react";
import { toast } from "sonner";
import { api } from "../lib/api";

// Define types for MongoDB documents
interface Booking {
  _id: string;
  showtimeId: string;
  seats: string[];
  totalPrice: number;
  status: string;
  bookingReference: string;
  showtimeId_details?: {
    movieId: string;
    startTime: string;
    date: string;
    price: number;
    movieId_details?: {
      title: string;
      posterUrl: string;
    };
  };
}

export function MyBookings() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingsData = await api.getBookings();
        setBookings(bookingsData);
      } catch (error) {
        console.error('Error fetching bookings:', error);
        toast.error('Failed to load bookings');
      } finally {
        setLoading(false);
      }
    };

    void fetchBookings();
  }, []);

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

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (bookings.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🎫</div>
        <p className="text-xl text-gray-600 mb-2">No bookings yet</p>
        <p className="text-gray-500">
          Book your first movie to see your bookings here!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">My Bookings</h3>

      <div className="grid gap-6">
        {bookings.map((booking) => (
          <div
            key={booking._id}
            className="bg-white rounded-lg shadow-md p-6 border"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex-1">
                <h4 className="text-lg font-semibold mb-2">
                  {booking.showtimeId_details?.movieId_details?.title || 'Movie Title'}
                </h4>
                <div className="space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Date:</span>{' '}
                    {booking.showtimeId_details?.date || 'N/A'}
                  </p>
                  <p>
                    <span className="font-medium">Time:</span>{' '}
                    {booking.showtimeId_details?.startTime || 'N/A'}
                  </p>
                  <p>
                    <span className="font-medium">Seats:</span>{' '}
                    {booking.seats.join(', ')}
                  </p>
                  <p>
                    <span className="font-medium">Reference:</span>{' '}
                    {booking.bookingReference}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <div className="text-2xl font-bold text-primary mb-1">
                  ${booking.totalPrice.toFixed(2)}
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    booking.status === 'confirmed'
                      ? 'bg-green-100 text-green-800'
                      : booking.status === 'cancelled'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {booking.status}
                </span>
              </div>
            </div>

            {booking.status === 'confirmed' && (
              <div className="flex justify-end">
                <button
                  onClick={() => void handleCancel(booking._id)}
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                >
                  Cancel Booking
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
