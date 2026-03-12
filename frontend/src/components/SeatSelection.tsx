import { useState, useEffect } from "react";
import { toast } from "sonner";
import { api } from "../lib/api";
import { PaymentModal } from "./PaymentModal";
import { Check, CreditCard, Monitor, Tv } from "lucide-react";
import { formatCurrency, formatCurrencyFull } from "../lib/currency";
import { calculateTotalPrice } from "../lib/booking";

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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-apple-blue"></div>
      </div>
    );
  }

  if (!showtime) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-red-500 mb-4">Showtime not found</p>
        <button
          onClick={onBack}
          className="apple-button px-6 py-3 rounded-lg"
        >
          Go Back
        </button>
      </div>
    );
  }


  // Generate dynamic seat layout based on theater capacity
  const totalSeats = typeof showtime.theaterId === 'object' ? showtime.theaterId.totalSeats : 100;

  // Calculate optimal rows and seats per row for realistic cinema layout
  // Most cinemas have 10-16 seats per row for optimal viewing
  const calculateLayout = (total: number): { rows: number; seatsPerRow: number } => {
    // Preferred seats per row range
    const minSeatsPerRow = 10;
    const maxSeatsPerRow = 16;

    // Try to find the best layout
    let bestLayout = { rows: 0, seatsPerRow: 0, waste: total };

    for (let seatsPerRow = minSeatsPerRow; seatsPerRow <= maxSeatsPerRow; seatsPerRow++) {
      const rows = Math.ceil(total / seatsPerRow);
      const totalCapacity = rows * seatsPerRow;
      const waste = totalCapacity - total;

      // Prefer layouts with less waste and reasonable row count
      if (waste < bestLayout.waste || (waste === bestLayout.waste && rows < bestLayout.rows)) {
        bestLayout = { rows, seatsPerRow, waste };
      }
    }

    return bestLayout;
  };

  const layout = calculateLayout(totalSeats);
  const seatsPerRow = layout.seatsPerRow;
  const numRows = layout.rows;

  // Generate row letters (A-Z, then AA-AZ, BA-BZ, etc.)
  const generateRowLetters = (count: number): string[] => {
    const letters = [];
    for (let i = 0; i < count; i++) {
      if (i < 26) {
        letters.push(String.fromCharCode(65 + i)); // A-Z
      } else {
        const firstLetter = String.fromCharCode(65 + Math.floor(i / 26) - 1);
        const secondLetter = String.fromCharCode(65 + (i % 26));
        letters.push(firstLetter + secondLetter);
      }
    }
    return letters;
  };

  const rows = generateRowLetters(numRows);

  // Success Screen
  if (bookingSuccess) {
    return (
      <div className="max-w-2xl mx-auto animate-scale-in">
        <div className="premium-glass rounded-3xl p-12 text-center">
          {/* Success Animation */}
          <div className="mb-6">
            <div className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full mx-auto flex items-center justify-center border-4 border-green-400/30">
              <Check className="w-12 h-12 text-white" strokeWidth={3} />
            </div>
          </div>

          <h2 className="text-3xl font-bold text-white mb-3 font-display">
            Payment Successful! 🎉
          </h2>
          <p className="text-white/70 mb-8">
            Your booking has been confirmed. Enjoy your movie!
          </p>

          {/* Booking Details */}
          <div className="apple-glass rounded-2xl p-6 mb-6 text-left">
            <h3 className="font-bold text-white mb-4">Booking Details</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-white/60">Movie:</span>
                <span className="font-semibold text-white">
                  {typeof showtime.movieId === 'object' ? showtime.movieId.title : 'Movie'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Theater:</span>
                <span className="font-semibold text-white">
                  {typeof showtime.theaterId === 'object' ? showtime.theaterId.name : 'Theater'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Date & Time:</span>
                <span className="font-semibold text-white">
                  {showtime.date} at {showtime.startTime}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-white/60">Seats:</span>
                <span className="font-semibold text-white">
                  {selectedSeats.join(', ')}
                </span>
              </div>
            </div>
          </div>

          <p className="text-sm text-white/50">
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
    totalPrice: calculateTotalPrice(selectedSeats, showtime.price),
  });

  return (
    <>
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="mb-6 px-4 py-2 text-apple-blue hover:text-white font-medium transition-colors duration-200"
        >
          ← Back to Showtimes
        </button>

        {/* Theater Selection */}
        <div className="animate-scale-in delay-200 flex flex-wrap justify-center gap-4 mb-12">
          <button className="apple-glass hover:bg-apple-blue/20 px-6 py-3 rounded-2xl font-medium text-sm flex items-center transition-all duration-300 text-white">
            <Monitor className="w-4 h-4 mr-2" />
            Theater 1 • IMAX Laser
          </button>
          <button className="apple-button px-6 py-3 rounded-2xl font-medium text-sm flex items-center">
            <Tv className="w-4 h-4 mr-2" />
            Theater 2 • Dolby Cinema
          </button>
        </div>

        <div className="premium-glass rounded-3xl p-8 md:p-12">
          <h2 className="text-2xl font-bold mb-6 text-white font-display">Select Your Seats</h2>

          {/* Cinema Screen */}
          <div className="animate-slide-up delay-300 mb-8">
            <div
              className="screen-glow relative h-6 max-w-5xl mx-auto mb-4 cursor-pointer transition-all duration-500 hover:scale-105 rounded-full"
              style={{
                background: 'linear-gradient(135deg, #f0f0f0 0%, #ffffff 30%, #f8f8f8 50%, #ffffff 70%, #f0f0f0 100%)',
                boxShadow: '0 0 30px rgba(255,255,255,0.3), inset 0 2px 0 rgba(255,255,255,0.8), inset 0 -1px 0 rgba(0,0,0,0.2)',
                border: '1px solid rgba(255,255,255,0.4)'
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-apple-blue/20 to-transparent rounded-full opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="text-center text-white/60 text-sm mb-12 font-medium tracking-widest">
              PREMIUM SCREEN • Click to preview
            </div>
          </div>

          {/* Seat Grid */}
          <div className="animate-scale-in delay-400 space-y-4 md:space-y-6 mb-8">
            {rows.map((row, rowIndex) => (
              <div key={row} className="flex justify-center items-center space-x-2 md:space-x-3">
                <span className="text-white/60 w-6 md:w-8 text-center font-medium text-sm md:text-base">{row}</span>
                <div className="flex space-x-1 md:space-x-2">
                  {Array.from({ length: seatsPerRow }, (_, i) => {
                    const seatNumber = rowIndex * seatsPerRow + i + 1;

                    // Skip rendering seats that exceed totalSeats
                    if (seatNumber > totalSeats) {
                      return (
                        <div
                          key={`empty-${row}-${i}`}
                          className="w-6 h-6 md:w-8 md:h-8"
                        />
                      );
                    }

                    const seatId = `${row}${i + 1}`;
                    const isBooked = bookedSeats.includes(seatId);
                    const isSelected = selectedSeats.includes(seatId);
                    const isAvailable = !isBooked;

                    return (
                      <button
                        key={seatId}
                        data-testid={`seat-${seatId}`}
                        data-selected={isSelected}
                        data-booked={isBooked}
                        onClick={() => isAvailable && handleSeatClick(seatId)}
                        disabled={!isAvailable}
                        className={`
                          seat w-6 h-6 md:w-8 md:h-8 rounded-lg text-xs font-semibold
                          ${isBooked
                            ? 'seat-occupied'
                            : isSelected
                              ? 'seat-selected'
                              : 'seat-available'
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
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 pt-6 md:pt-8 border-t border-white/10">
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="seat-available w-5 h-5 md:w-6 md:h-6 rounded-lg"></div>
              <span className="text-white/70 text-xs md:text-sm">Available</span>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="seat-selected w-5 h-5 md:w-6 md:h-6 rounded-lg"></div>
              <span className="text-white/70 text-xs md:text-sm">Selected</span>
            </div>
            <div className="flex items-center space-x-2 md:space-x-3">
              <div className="seat-occupied w-5 h-5 md:w-6 md:h-6 rounded-lg"></div>
              <span className="text-white/70 text-xs md:text-sm">Taken</span>
            </div>
          </div>
        </div>

        {/* Booking Summary */}
        {selectedSeats.length > 0 && (
          <div className="animate-slide-up delay-500 apple-glass rounded-3xl p-6 md:p-8 mt-6">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Left Column: Details */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl apple-text-gradient font-display font-semibold">Booking Summary</h3>
                  <div className="apple-glass px-3 py-1 rounded-full text-sm text-green-400 border border-green-400/30 flex items-center gap-1">
                    <Check className="w-4 h-4" />
                    {selectedSeats.length} selected
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="text-white/70">Movie</span>
                    <span className="font-medium text-white">
                      {typeof showtime.movieId === 'object' ? showtime.movieId.title : 'Movie'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="text-white/70">Date & Time</span>
                    <span className="font-medium text-white">{showtime.date} • {showtime.startTime}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="text-white/70">Seats</span>
                    <span className="font-medium text-white">{selectedSeats.join(', ')}</span>
                  </div>
                  <div className="flex justify-between items-center pb-3 border-b border-white/10">
                    <span className="text-white/70">Theater</span>
                    <span className="font-medium text-white">
                      {typeof showtime.theaterId === 'object' ? showtime.theaterId.name : 'Theater'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column: Pricing */}
              <div>
                <div className="apple-glass p-6 rounded-2xl mb-6">
                  <h4 className="text-lg font-semibold mb-4 text-white">Price Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-white/70">Seats ({selectedSeats.length}x {formatCurrency(showtime.price)})</span>
                      <span className="text-white">{formatCurrencyFull(calculateTotalPrice(selectedSeats, showtime.price))}</span>
                    </div>
                    <div className="pt-3 border-t border-white/20">
                      <div className="flex justify-between">
                        <span className="text-lg font-semibold text-white">Total</span>
                        <span className="text-2xl text-apple-blue font-display font-semibold">
                          {formatCurrencyFull(calculateTotalPrice(selectedSeats, showtime.price))}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleProceedToPayment}
                  className="w-full apple-button py-4 rounded-2xl font-medium text-lg flex items-center justify-center"
                >
                  <CreditCard className="w-5 h-5 mr-3" />
                  Proceed to Payment
                </button>
              </div>
            </div>
          </div>
        )}
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
