import { useEffect, useState } from 'react';
import { Film, Plus, Edit, Trash2, X, Save } from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';

interface Movie {
    _id: string;
    title: string;
    description: string;
    genre: string;
    duration: number;
    rating: number;
    releaseDate: string;
    posterUrl: string;
    trailerUrl?: string;
    director?: string;
    cast?: string[];
}

interface MovieFormData {
    title: string;
    description: string;
    genre: string;
    duration: number;
    rating: number;
    releaseDate: string;
    posterUrl: string;
    trailerUrl?: string;
    director?: string;
    cast?: string;
}

export function MovieManagement() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingMovie, setEditingMovie] = useState<Movie | null>(null);
    const [formData, setFormData] = useState<MovieFormData>({
        title: '',
        description: '',
        genre: '',
        duration: 0,
        rating: 0,
        releaseDate: '',
        posterUrl: '',
        trailerUrl: '',
        director: '',
        cast: '',
    });

    useEffect(() => {
        fetchMovies();
    }, []);

    const fetchMovies = async () => {
        try {
            const data = await api.getMovies();
            setMovies(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
            toast.error('Failed to load movies');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (movie?: Movie) => {
        if (movie) {
            setEditingMovie(movie);
            setFormData({
                title: movie.title,
                description: movie.description,
                genre: movie.genre,
                duration: movie.duration,
                rating: movie.rating,
                releaseDate: movie.releaseDate,
                posterUrl: movie.posterUrl,
                trailerUrl: movie.trailerUrl || '',
                director: movie.director || '',
                cast: movie.cast?.join(', ') || '',
            });
        } else {
            setEditingMovie(null);
            setFormData({
                title: '',
                description: '',
                genre: '',
                duration: 0,
                rating: 0,
                releaseDate: '',
                posterUrl: '',
                trailerUrl: '',
                director: '',
                cast: '',
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingMovie(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.title || !formData.description || !formData.genre) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (formData.rating < 0 || formData.rating > 10) {
            toast.error('Rating must be between 0 and 10');
            return;
        }

        try {
            const movieData = {
                ...formData,
                cast: formData.cast ? formData.cast.split(',').map(c => c.trim()) : [],
            };

            if (editingMovie) {
                await api.updateMovie(editingMovie._id, movieData);
                toast.success('Movie updated successfully');
            } else {
                await api.createMovie(movieData);
                toast.success('Movie created successfully');
            }

            handleCloseModal();
            fetchMovies();
        } catch (error: any) {
            console.error('Error saving movie:', error);
            toast.error(error.message || 'Failed to save movie');
        }
    };

    const handleDelete = async (id: string, title: string) => {
        if (!confirm(`Are you sure you want to delete "${title}"?`)) {
            return;
        }

        try {
            await api.deleteMovie(id);
            toast.success('Movie deleted successfully');
            fetchMovies();
        } catch (error: any) {
            console.error('Error deleting movie:', error);
            toast.error(error.message || 'Failed to delete movie');
        }
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
                    <h1 className="text-3xl font-bold text-white font-display">Movie Management</h1>
                    <p className="text-white/60 mt-1">{movies.length} movies in database</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="apple-button px-6 py-3 rounded-xl flex items-center gap-2 font-medium"
                >
                    <Plus className="w-5 h-5" />
                    Add Movie
                </button>
            </div>

            {/* Movies Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {movies.map((movie) => (
                    <div key={movie._id} className="apple-glass rounded-2xl overflow-hidden group hover:scale-105 transition-transform duration-300">
                        {/* Poster */}
                        <div className="relative h-64 overflow-hidden">
                            <img
                                src={movie.posterUrl}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                            {/* Action Buttons */}
                            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <button
                                    onClick={() => handleOpenModal(movie)}
                                    className="p-2 bg-apple-blue rounded-lg hover:bg-apple-blue/80 transition-colors"
                                >
                                    <Edit className="w-4 h-4 text-white" />
                                </button>
                                <button
                                    onClick={() => handleDelete(movie._id, movie.title)}
                                    className="p-2 bg-red-500 rounded-lg hover:bg-red-600 transition-colors"
                                >
                                    <Trash2 className="w-4 h-4 text-white" />
                                </button>
                            </div>
                        </div>

                        {/* Info */}
                        <div className="p-4">
                            <h3 className="text-white font-semibold text-lg mb-2 line-clamp-1">{movie.title}</h3>
                            <div className="space-y-1 text-sm text-white/60">
                                <p className="flex items-center justify-between">
                                    <span>{movie.genre}</span>
                                    <span className="text-apple-blue font-medium">⭐ {movie.rating}</span>
                                </p>
                                <p>{movie.duration} min</p>
                                <p className="line-clamp-2">{movie.description}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Empty State */}
            {movies.length === 0 && (
                <div className="apple-glass rounded-3xl p-12 text-center">
                    <Film className="w-16 h-16 text-white/30 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No Movies Yet</h3>
                    <p className="text-white/60 mb-6">Start by adding your first movie</p>
                    <button
                        onClick={() => handleOpenModal()}
                        className="apple-button px-6 py-3 rounded-xl inline-flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Movie
                    </button>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="premium-glass rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white font-display">
                                {editingMovie ? 'Edit Movie' : 'Add New Movie'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Title */}
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Title <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="auth-input-field"
                                    placeholder="Enter movie title"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Description <span className="text-red-400">*</span>
                                </label>
                                <textarea
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="auth-input-field min-h-[100px] resize-none"
                                    placeholder="Enter movie description"
                                    required
                                />
                            </div>

                            {/* Genre & Duration */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        Genre <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.genre}
                                        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                                        className="auth-input-field"
                                        placeholder="e.g., Action, Drama"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        Duration (min) <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.duration}
                                        onChange={(e) => setFormData({ ...formData, duration: parseInt(e.target.value) })}
                                        className="auth-input-field"
                                        placeholder="120"
                                        required
                                        min="1"
                                    />
                                </div>
                            </div>

                            {/* Rating & Release Date */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        Rating (0-10) <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        step="0.1"
                                        value={formData.rating}
                                        onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
                                        className="auth-input-field"
                                        placeholder="8.5"
                                        required
                                        min="0"
                                        max="10"
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        Release Date <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="date"
                                        value={formData.releaseDate}
                                        onChange={(e) => setFormData({ ...formData, releaseDate: e.target.value })}
                                        className="auth-input-field"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Poster URL */}
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Poster URL <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="url"
                                    value={formData.posterUrl}
                                    onChange={(e) => setFormData({ ...formData, posterUrl: e.target.value })}
                                    className="auth-input-field"
                                    placeholder="https://example.com/poster.jpg"
                                    required
                                />
                            </div>

                            {/* Trailer URL (Optional) */}
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Trailer URL (Optional)
                                </label>
                                <input
                                    type="url"
                                    value={formData.trailerUrl}
                                    onChange={(e) => setFormData({ ...formData, trailerUrl: e.target.value })}
                                    className="auth-input-field"
                                    placeholder="https://youtube.com/..."
                                />
                            </div>

                            {/* Director (Optional) */}
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Director (Optional)
                                </label>
                                <input
                                    type="text"
                                    value={formData.director}
                                    onChange={(e) => setFormData({ ...formData, director: e.target.value })}
                                    className="auth-input-field"
                                    placeholder="Christopher Nolan"
                                />
                            </div>

                            {/* Cast (Optional) */}
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Cast (Optional, comma-separated)
                                </label>
                                <input
                                    type="text"
                                    value={formData.cast}
                                    onChange={(e) => setFormData({ ...formData, cast: e.target.value })}
                                    className="auth-input-field"
                                    placeholder="Tom Hanks, Leonardo DiCaprio"
                                />
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 px-6 py-3 rounded-xl font-medium text-white bg-white/10 hover:bg-white/20 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 apple-button px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                                >
                                    <Save className="w-5 h-5" />
                                    {editingMovie ? 'Update Movie' : 'Create Movie'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
