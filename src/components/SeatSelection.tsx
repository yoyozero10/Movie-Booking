import { useState, useEffect } from "react";
import { toast } from "sonner";
import { api } from "../lib/api";

// Define types for MongoDB documents
interface Showtime {
  _id: string;
  movieId: string;
  theaterId: string;
  startTime: string;
  date: string;
  price: number;
  availableSeats: number;
  movieId_details?: {
    title: string;
  };
  theaterId_details?: {
    name: string;
    totalSeats: number;
  };
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

  useEffect(() => {
    const fetchShowtimeAndBookings = async () => {
      try {
        // Fetch showtime details from dedicated endpoint
        try {
          const showtimeData = await api.getShowtime(showtimeId);
          setShowtime(showtimeData);
        } catch (err) {
          // If showtime endpoint 404s, we'll fallback to bookings-based heuristic
          console.warn('Showtime endpoint unavailable, falling back to bookings heuristic', err);
          const bookings = await api.getBookings();
          const currentBooking = bookings.find((b: any) => b.showtimeId === showtimeId);

          if (currentBooking) {
            setShowtime({
              _id: showtimeId,
              movieId: currentBooking.movieId || '',
              theaterId: '',
              startTime: '',
              date: '',
              price: currentBooking.totalPrice / currentBooking.seats.length,
              availableSeats: 100,
            });
          }

          const showtimeBookings = bookings.filter((b: any) => b.showtimeId === showtimeId && b.status === 'confirmed');
          const seats = showtimeBookings.flatMap((b: any) => b.seats);
          setBookedSeats(seats);
        }
      } catch (error) {
        console.error('Error fetching showtime data:', error);
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

  const handleBooking = async () => {
    if (selectedSeats.length === 0) {
      toast.error('Please select at least one seat');
      return;
    }

    try {
      await api.createBooking({
        showtimeId,
        seats: selectedSeats,
        totalPrice: selectedSeats.length * (showtime?.price || 0)
      });

      toast.success('Booking successful!');
      onBack();
    } catch (error) {
      console.error('Booking error:', error);
      toast.error('Failed to create booking');
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

  return (
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
              <span className="w-6 text-sm font-semibold text-gray-600">{row}</span>
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
                          : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
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
              onClick={() => void handleBooking()}
              className="w-full py-3 bg-primary text-white rounded-lg hover:bg-primary-hover font-semibold"
            >
              Confirm Booking
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
