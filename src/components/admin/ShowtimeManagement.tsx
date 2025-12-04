import { useEffect, useState } from 'react';
import { Calendar, Plus, Edit, Trash2, X, Save, Film, Building2, Clock, DollarSign } from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';

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
    movieId: Movie | string;
    theaterId: Theater | string;
    startTime: string;
    date: string;
    price: number;
    availableSeats: number;
}

interface ShowtimeFormData {
    movieId: string;
    theaterId: string;
    startTime: string;
    date: string;
    price: number;
    availableSeats?: number;
}

export function ShowtimeManagement() {
    const [showtimes, setShowtimes] = useState<Showtime[]>([]);
    const [movies, setMovies] = useState<Movie[]>([]);
    const [theaters, setTheaters] = useState<Theater[]>([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingShowtime, setEditingShowtime] = useState<Showtime | null>(null);
    const [filterDate, setFilterDate] = useState('');
    const [filterMovie, setFilterMovie] = useState('');
    const [filterTheater, setFilterTheater] = useState('');

    const [formData, setFormData] = useState<ShowtimeFormData>({
        movieId: '',
        theaterId: '',
        startTime: '',
        date: '',
        price: 100000,
        availableSeats: undefined,
    });

    // Initial load - fetch everything once
    useEffect(() => {
        fetchInitialData();
    }, []);

    // Filter changes - only fetch showtimes
    useEffect(() => {
        if (!loading) {
            fetchShowtimes();
        }
    }, [filterDate, filterMovie, filterTheater]);

    const fetchInitialData = async () => {
        try {
            const [showtimesData, moviesData, theatersData] = await Promise.all([
                api.getAllShowtimes({}),
                api.getMovies(),
                api.getTheaters(),
            ]);

            setShowtimes(showtimesData);
            setMovies(moviesData);
            setTheaters(theatersData);
        } catch (error) {
            console.error('Error fetching data:', error);
            toast.error('Failed to load data');
        } finally {
            setLoading(false);
        }
    };

    const fetchShowtimes = async () => {
        try {
            const filters: any = {};
            if (filterDate) filters.date = filterDate;
            if (filterMovie) filters.movieId = filterMovie;
            if (filterTheater) filters.theaterId = filterTheater;

            const showtimesData = await api.getAllShowtimes(filters);
            setShowtimes(showtimesData);
        } catch (error) {
            console.error('Error fetching showtimes:', error);
            toast.error('Failed to load showtimes');
        }
    };

    const handleOpenModal = (showtime?: Showtime) => {
        if (showtime) {
            setEditingShowtime(showtime);
            setFormData({
                movieId: typeof showtime.movieId === 'object' ? showtime.movieId._id : showtime.movieId,
                theaterId: typeof showtime.theaterId === 'object' ? showtime.theaterId._id : showtime.theaterId,
                startTime: showtime.startTime,
                date: showtime.date,
                price: showtime.price,
                availableSeats: showtime.availableSeats,
            });
        } else {
            setEditingShowtime(null);
            const tomorrow = new Date();
            tomorrow.setDate(tomorrow.getDate() + 1);
            setFormData({
                movieId: '',
                theaterId: '',
                startTime: '19:00',
                date: tomorrow.toISOString().split('T')[0],
                price: 100000,
                availableSeats: undefined,
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingShowtime(null);
    };

    const handleTheaterChange = (theaterId: string) => {
        const theater = theaters.find(t => t._id === theaterId);
        setFormData({
            ...formData,
            theaterId,
            availableSeats: theater?.totalSeats || undefined,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.movieId || !formData.theaterId || !formData.date || !formData.startTime) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (formData.price < 1000) {
            toast.error('Price must be at least 1,000 VND');
            return;
        }

        setSubmitting(true);
        try {
            if (editingShowtime) {
                const updated = await api.updateShowtime(editingShowtime._id, formData);
                toast.success('Showtime updated successfully');

                // Optimistic update
                setShowtimes(prev => prev.map(st =>
                    st._id === editingShowtime._id ? updated : st
                ));
            } else {
                const created = await api.createShowtime(formData);
                toast.success('Showtime created successfully');

                // Optimistic update - add to list
                setShowtimes(prev => [created, ...prev]);
            }

            handleCloseModal();
        } catch (error: any) {
            console.error('Error saving showtime:', error);
            toast.error(error.message || 'Failed to save showtime');
        } finally {
            setSubmitting(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this showtime? This cannot be undone.')) {
            return;
        }

        try {
            await api.deleteShowtime(id);
            toast.success('Showtime deleted successfully');

            // Optimistic update - remove from list
            setShowtimes(prev => prev.filter(st => st._id !== id));
        } catch (error: any) {
            console.error('Error deleting showtime:', error);
            toast.error(error.message || 'Failed to delete showtime');
        }
    };

    const getMovieTitle = (movieId: Movie | string) => {
        if (typeof movieId === 'object') return movieId.title;
        const movie = movies.find(m => m._id === movieId);
        return movie?.title || 'Unknown';
    };

    const getTheaterName = (theaterId: Theater | string) => {
        if (typeof theaterId === 'object') return theaterId.name;
        const theater = theaters.find(t => t._id === theaterId);
        return theater?.name || 'Unknown';
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apple-blue"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white font-display">Showtime Management</h1>
                    <p className="text-white/60 mt-1">{showtimes.length} showtimes scheduled</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="apple-button px-6 py-3 rounded-xl flex items-center gap-2 font-medium"
                >
                    <Plus className="w-5 h-5" />
                    Add Showtime
                </button>
            </div>

            {/* Filters */}
            <div className="apple-glass rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">Filter by Date</label>
                        <input
                            type="date"
                            value={filterDate}
                            onChange={(e) => setFilterDate(e.target.value)}
                            className="auth-input-field"
                        />
                    </div>
                    <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">Filter by Movie</label>
                        <select
                            value={filterMovie}
                            onChange={(e) => setFilterMovie(e.target.value)}
                            className="auth-input-field"
                        >
                            <option value="">All Movies</option>
                            {movies.map(movie => (
                                <option key={movie._id} value={movie._id}>{movie.title}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">Filter by Theater</label>
                        <select
                            value={filterTheater}
                            onChange={(e) => setFilterTheater(e.target.value)}
                            className="auth-input-field"
                        >
                            <option value="">All Theaters</option>
                            {theaters.map(theater => (
                                <option key={theater._id} value={theater._id}>{theater.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Showtimes Table */}
            <div className="apple-glass rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5">
                            <tr className="text-left">
                                <th className="px-6 py-4 text-white/80 font-semibold">Movie</th>
                                <th className="px-6 py-4 text-white/80 font-semibold">Theater</th>
                                <th className="px-6 py-4 text-white/80 font-semibold">Date</th>
                                <th className="px-6 py-4 text-white/80 font-semibold">Time</th>
                                <th className="px-6 py-4 text-white/80 font-semibold">Price</th>
                                <th className="px-6 py-4 text-white/80 font-semibold">Available</th>
                                <th className="px-6 py-4 text-white/80 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {showtimes.map((showtime) => (
                                <tr
                                    key={showtime._id}
                                    className="border-t border-white/10 hover:bg-white/5 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <Film className="w-5 h-5 text-apple-blue" />
                                            <span className="font-medium text-white">{getMovieTitle(showtime.movieId)}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-white/70">
                                            <Building2 className="w-4 h-4 text-white/50" />
                                            {getTheaterName(showtime.theaterId)}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-white">
                                            <Calendar className="w-4 h-4 text-white/50" />
                                            {new Date(showtime.date).toLocaleDateString('vi-VN')}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-white">
                                            <Clock className="w-4 h-4 text-white/50" />
                                            {showtime.startTime}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 font-semibold text-green-400">
                                            <DollarSign className="w-4 h-4" />
                                            {(showtime.price / 1000).toFixed(0)}k
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-white">{showtime.availableSeats} seats</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleOpenModal(showtime)}
                                                className="p-2 hover:bg-apple-blue/20 rounded-lg transition-colors group"
                                            >
                                                <Edit className="w-4 h-4 text-apple-blue group-hover:scale-110 transition-transform" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(showtime._id)}
                                                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Empty State */}
            {showtimes.length === 0 && (
                <div className="apple-glass rounded-3xl p-12 text-center">
                    <Calendar className="w-16 h-16 text-white/30 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No Showtimes Found</h3>
                    <p className="text-white/60 mb-6">
                        {filterDate || filterMovie || filterTheater
                            ? 'Try adjusting your filters'
                            : 'Start by adding your first showtime'}
                    </p>
                    <button
                        onClick={() => handleOpenModal()}
                        className="apple-button px-6 py-3 rounded-xl inline-flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Showtime
                    </button>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="premium-glass rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white font-display">
                                {editingShowtime ? 'Edit Showtime' : 'Add New Showtime'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Movie Selection */}
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Movie <span className="text-red-400">*</span>
                                </label>
                                <select
                                    value={formData.movieId}
                                    onChange={(e) => setFormData({ ...formData, movieId: e.target.value })}
                                    className="auth-input-field"
                                    required
                                >
                                    <option value="">Select a movie</option>
                                    {movies.map(movie => (
                                        <option key={movie._id} value={movie._id}>{movie.title}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Theater Selection */}
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Theater <span className="text-red-400">*</span>
                                </label>
                                <select
                                    value={formData.theaterId}
                                    onChange={(e) => handleTheaterChange(e.target.value)}
                                    className="auth-input-field"
                                    required
                                >
                                    <option value="">Select a theater</option>
                                    {theaters.map(theater => (
                                        <option key={theater._id} value={theater._id}>
                                            {theater.name} ({theater.totalSeats} seats)
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Date & Time */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        Date <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.date}
                                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                                        className="auth-input-field"
                                        required
                                        min={new Date().toISOString().split('T')[0]}
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        Time <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="time"
                                        value={formData.startTime}
                                        onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                                        className="auth-input-field"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Price & Available Seats */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        Price (VND) <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                                        className="auth-input-field"
                                        required
                                        min="1000"
                                        step="1000"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        Available Seats
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.availableSeats || ''}
                                        onChange={(e) => setFormData({ ...formData, availableSeats: parseInt(e.target.value) })}
                                        className="auth-input-field"
                                        placeholder="Auto from theater"
                                        min="0"
                                    />
                                    <p className="text-white/50 text-xs mt-1">Leave empty for theater capacity</p>
                                </div>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    disabled={submitting}
                                    className="flex-1 px-6 py-3 rounded-xl font-medium text-white bg-white/10 hover:bg-white/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="flex-1 apple-button px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {submitting ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Saving...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            {editingShowtime ? 'Update Showtime' : 'Create Showtime'}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
