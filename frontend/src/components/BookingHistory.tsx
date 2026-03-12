import { useState } from "react";
import { Calendar, MapPin, Clock, Ticket, Film, Trash2, X } from "lucide-react";
import { api } from "../lib/api";
import { toast } from "sonner";
import { formatCurrencyFull } from "../lib/currency";
import { formatDate, formatTime } from "../lib/dateUtils";

interface BookingHistoryProps {
    bookings: any[];
    onBookingDeleted: (bookingId: string) => void;
}

export function BookingHistory({ bookings, onBookingDeleted }: BookingHistoryProps) {
    const [selectedBooking, setSelectedBooking] = useState<any>(null);
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDeleteBooking = async (bookingId: string) => {
        if (!confirm("Are you sure you want to delete this booking?")) {
            return;
        }

        setDeletingId(bookingId);
        try {
            await api.deleteBooking(bookingId);
            toast.success("Booking deleted successfully");
            onBookingDeleted(bookingId);
            if (selectedBooking?._id === bookingId) {
                setSelectedBooking(null);
            }
        } catch (error) {
            console.error("Failed to delete booking:", error);
            toast.error(error instanceof Error ? error.message : "Failed to delete booking");
        } finally {
            setDeletingId(null);
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'confirmed':
                return 'text-green-400 bg-green-400/10 border-green-400/30';
            case 'pending':
                return 'text-yellow-400 bg-yellow-400/10 border-yellow-400/30';
            case 'cancelled':
                return 'text-red-400 bg-red-400/10 border-red-400/30';
            default:
                return 'text-white/60 bg-white/5 border-white/10';
        }
    };

    if (bookings.length === 0) {
        return (
            <div className="apple-glass rounded-2xl p-12 text-center">
                <Ticket className="w-16 h-16 text-white/20 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-white mb-2">No Bookings Yet</h3>
                <p className="text-white/60">Your booking history will appear here</p>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-4">
                {bookings.map((booking) => {
                    const movie = booking.showtimeId?.movieId;
                    const theater = booking.showtimeId?.theaterId;
                    const showtime = booking.showtimeId;

                    return (
                        <div
                            key={booking._id}
                            className="apple-glass rounded-2xl p-6 hover:bg-white/10 transition-all cursor-pointer group"
                            onClick={() => setSelectedBooking(booking)}
                        >
                            <div className="flex items-start gap-4">
                                {/* Movie Poster */}
                                {movie?.posterUrl && (
                                    <div className="w-20 h-28 rounded-xl overflow-hidden flex-shrink-0">
                                        <img
                                            src={movie.posterUrl}
                                            alt={movie.title}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                )}

                                {/* Booking Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-start justify-between gap-4 mb-3">
                                        <div>
                                            <h3 className="text-lg font-bold text-white mb-1 line-clamp-1">
                                                {movie?.title || 'Movie'}
                                            </h3>
                                            <div className="flex items-center gap-2 text-sm text-white/60">
                                                <Calendar className="w-4 h-4" />
                                                <span>{formatDate(showtime?.startTime || booking.createdAt)}</span>
                                                <Clock className="w-4 h-4 ml-2" />
                                                <span>{formatTime(showtime?.startTime || booking.createdAt)}</span>
                                            </div>
                                        </div>

                                        <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(booking.status)}`}>
                                            {booking.status}
                                        </span>
                                    </div>

                                    <div className="space-y-2 text-sm">
                                        {theater && (
                                            <div className="flex items-center gap-2 text-white/60">
                                                <MapPin className="w-4 h-4" />
                                                <span>{theater.name}</span>
                                            </div>
                                        )}

                                        <div className="flex items-center gap-2 text-white/60">
                                            <Ticket className="w-4 h-4" />
                                            <span>Seats: {booking.seats?.join(', ') || 'N/A'}</span>
                                        </div>

                                        <div className="flex items-center justify-between pt-2 border-t border-white/10">
                                            <span className="text-white/60">Total Amount:</span>
                                            <span className="text-lg font-bold text-apple-blue">
                                                {formatCurrencyFull(booking.totalPrice || 0)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Delete Button */}
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDeleteBooking(booking._id);
                                    }}
                                    disabled={deletingId === booking._id}
                                    className="p-2 hover:bg-red-500/20 rounded-xl transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    {deletingId === booking._id ? (
                                        <div className="w-5 h-5 border-2 border-red-400 border-t-transparent rounded-full animate-spin" />
                                    ) : (
                                        <Trash2 className="w-5 h-5 text-red-400" />
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Booking Detail Modal */}
            {selectedBooking && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={() => setSelectedBooking(null)}
                    />

                    {/* Modal */}
                    <div className="relative premium-glass rounded-3xl p-8 max-w-2xl w-full animate-scale-in max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-2xl font-bold font-display">
                                <span className="apple-text-gradient">Booking Details</span>
                            </h2>
                            <button
                                onClick={() => setSelectedBooking(null)}
                                className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                            >
                                <X className="w-5 h-5 text-white/60" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="space-y-6">
                            {/* Movie Info */}
                            {selectedBooking.showtimeId?.movieId && (
                                <div className="flex gap-4">
                                    {selectedBooking.showtimeId.movieId.posterUrl && (
                                        <img
                                            src={selectedBooking.showtimeId.movieId.posterUrl}
                                            alt={selectedBooking.showtimeId.movieId.title}
                                            className="w-32 h-48 rounded-xl object-cover"
                                        />
                                    )}
                                    <div className="flex-1">
                                        <h3 className="text-2xl font-bold text-white mb-2">
                                            {selectedBooking.showtimeId.movieId.title}
                                        </h3>
                                        <div className="space-y-2 text-white/60">
                                            <div className="flex items-center gap-2">
                                                <Film className="w-4 h-4" />
                                                <span>{selectedBooking.showtimeId.movieId.genre?.join(', ')}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Clock className="w-4 h-4" />
                                                <span>{selectedBooking.showtimeId.movieId.duration} minutes</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* Booking Info */}
                            <div className="apple-glass rounded-2xl p-6 space-y-4">
                                <h4 className="font-bold text-white mb-4">Booking Information</h4>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-white/60 text-sm mb-1">Booking ID</p>
                                        <p className="text-white font-mono text-sm">{selectedBooking._id}</p>
                                    </div>

                                    <div>
                                        <p className="text-white/60 text-sm mb-1">Status</p>
                                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(selectedBooking.status)}`}>
                                            {selectedBooking.status}
                                        </span>
                                    </div>

                                    <div>
                                        <p className="text-white/60 text-sm mb-1">Date</p>
                                        <p className="text-white">{formatDate(selectedBooking.showtimeId?.startTime || selectedBooking.createdAt)}</p>
                                    </div>

                                    <div>
                                        <p className="text-white/60 text-sm mb-1">Time</p>
                                        <p className="text-white">{formatTime(selectedBooking.showtimeId?.startTime || selectedBooking.createdAt)}</p>
                                    </div>

                                    {selectedBooking.showtimeId?.theaterId && (
                                        <div className="col-span-2">
                                            <p className="text-white/60 text-sm mb-1">Theater</p>
                                            <p className="text-white">{selectedBooking.showtimeId.theaterId.name}</p>
                                            {selectedBooking.showtimeId.theaterId.location && (
                                                <p className="text-white/60 text-sm">{selectedBooking.showtimeId.theaterId.location}</p>
                                            )}
                                        </div>
                                    )}

                                    <div className="col-span-2">
                                        <p className="text-white/60 text-sm mb-1">Seats</p>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedBooking.seats?.map((seat: string) => (
                                                <span key={seat} className="px-3 py-1 bg-apple-blue/20 border border-apple-blue/30 rounded-lg text-apple-blue font-semibold">
                                                    {seat}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="col-span-2 pt-4 border-t border-white/10">
                                        <div className="flex items-center justify-between">
                                            <span className="text-white/60">Total Amount</span>
                                            <span className="text-2xl font-bold text-apple-blue">
                                                {formatCurrencyFull(selectedBooking.totalPrice || 0)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Booked At */}
                            <div className="text-center text-white/40 text-sm">
                                Booked on {formatDate(selectedBooking.createdAt)} at {formatTime(selectedBooking.createdAt)}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
