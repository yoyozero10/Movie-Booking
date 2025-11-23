import { useState, useEffect } from "react";
import { toast } from "sonner";
import { api } from "../lib/api";
import { PaymentModal } from "./PaymentModal";

// Define types for MongoDB documents
interface Movie {
  _id: string;
  title: string;
  posterUrl: string;
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

export function SeatSelection({
  showtimeId,
  onBack,
}: {
  showtimeId: string;
  onBack: () => void;
}) {
  const [showtime, setShowtime] = useState<Showtime | null>(null);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchShowtimeAndBookings = async () => {
      try {
        // Fetch showtime details
        const showtimeData = await api.getShowtime(showtimeId);
        setShowtime(showtimeData);

        // Fetch booked seats for this showtime
        const bookedSeatsData = await api.getBookedSeats(showtimeId);
        setBookedSeats(bookedSeatsData.bookedSeats || []);
      } catch (error) {
        console.error('Error fetching showtime data:', error);
        toast.error('Failed to load showtime information');
      } finally {
        setLoading(false);
      }
    };

    if (showtimeId) {
      void fetchShowtimeAndBookings();
    }
  }, [showtimeId]);

  const handleSeatClick = (seatId: string) => {
    setSelectedSeats(prev =>
      prev.includes(seatId)
        ? prev.filter(seat => seat !== seatId)
        : [...prev, seatId]
    );
  };

  const handleProceedToPayment = () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = async () => {
    try {
      await api.createBooking({
        showtimeId,
        seats: selectedSeats,
        totalPrice: selectedSeats.length * (showtime?.price || 0)
      });

      setShowPaymentModal(false);
      setBookingSuccess(true);

      // Show success for 3 seconds then go back
      setTimeout(() => {
        toast.success('Booking confirmed!');
        onBack();
      }, 3000);
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to create booking');
      setShowPaymentModal(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!showtime) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-red-600 mb-4">Showtime not found</p>
        <button
          onClick={onBack}
          className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover"
        >
          Go Back
        </button>
      </div>
    );
  }

  // Generate seat layout (10x10 grid for demo)
  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const seatsPerRow = 10;

  // Success Screen
  if (bookingSuccess) {
    return (
      <div className="max-w-2xl mx-auto">
        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-2xl p-12 text-center">
          {/* Success Animation */}
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto flex items-center justify-center animate-bounce">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          <h2 className="text-3xl font-bold text-gray-900 mb-3">
            Payment Successful! 🎉
          </h2>
          <p className="text-gray-600 mb-8">
            Your booking has been confirmed. Enjoy your movie!
          </p>

          {/* Booking Details */}
          <div className="bg-white rounded-xl p-6 mb-6 text-left">
            <h3 className="font-bold text-gray-900 mb-4">Booking Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Movie:</span>
                <span className="font-semibold text-gray-900">
                  {typeof showtime.movieId === 'object' ? showtime.movieId.title : 'Movie'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Theater:</span>
                <span className="font-semibold text-gray-900">
                  {typeof showtime.theaterId === 'object' ? showtime.theaterId.name : 'Theater'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Date & Time:</span>
                <span className="font-semibold text-gray-900">
                  {showtime.date} at {showtime.startTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Seats:</span>
                <span className="font-semibold text-gray-900">
                  {selectedSeats.join(', ')}
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Redirecting to home page...
          </p>
        </div>
      </div>
    );
  }

  // Get booking details for payment modal
  const getBookingDetails = () => ({
    movieTitle: typeof showtime.movieId === 'object' ? showtime.movieId.title : 'Movie',
    theaterName: typeof showtime.theaterId === 'object' ? showtime.theaterId.name : 'Theater',
    theaterLocation: typeof showtime.theaterId === 'object' ? showtime.theaterId.location : 'Location',
    date: showtime.date,
    time: showtime.startTime,
    seats: selectedSeats,
    totalPrice: selectedSeats.length * showtime.price,
  });

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 text-primary hover:text-primary-hover font-medium"
        >
          ← Back to Showtimes
        </button>

        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">Select Seats</h2>

          {/* Screen */}
          <div className="w-full h-12 bg-gradient-to-b from-gray-300 to-gray-400 rounded-lg mb-8 flex items-center justify-center">
            <span className="text-white font-semibold">SCREEN</span>
          </div>

          {/* Seat Grid */}
          <div className="space-y-2">
            {rows.map((row) => (
              <div key={row} className="flex items-center gap-2">
                <span className="w-6 text-sm font-semibold text-gray-300">{row}</span>
                <div className="flex gap-2 flex-1 justify-center">
                  {Array.from({ length: seatsPerRow }, (_, i) => {
                    const seatId = `${row}${i + 1}`;
                    const isBooked = bookedSeats.includes(seatId);
                    const isSelected = selectedSeats.includes(seatId);
                    const isAvailable = !isBooked;

                    return (
                      <button
                        key={seatId}
                        onClick={() => isAvailable && handleSeatClick(seatId)}
                        disabled={!isAvailable}
                        className={`
                          w-8 h-8 rounded text-xs font-semibold transition-colors
                          ${isBooked
                            ? 'bg-gray-400 text-white cursor-not-allowed'
                            : isSelected
                              ? 'bg-primary text-white'
                              : 'bg-gray-200 hover:bg-gray-300 text-gray-900'
                          }
                        `}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="flex justify-center gap-6 mt-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-200 rounded"></div>
              <span>Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-primary rounded"></div>
              <span>Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
              <span>Booked</span>
            </div>
          </div>

          {/* Booking Summary */}
          {selectedSeats.length > 0 && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">
                  {selectedSeats.length} seat{selectedSeats.length > 1 ? 's' : ''} selected
                </span>
                <span className="text-lg font-bold text-primary">
                  ${(selectedSeats.length * showtime.price).toFixed(2)}
                </span>
              </div>
              <button
                onClick={handleProceedToPayment}
                className="w-full py-3 bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg hover:shadow-lg hover:shadow-primary/50 transition-all font-semibold"
              >
                Proceed to Payment
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Payment Modal */}
      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onPaymentSuccess={() => void handlePaymentSuccess()}
        bookingDetails={getBookingDetails()}
      />
    </>
  );
}
