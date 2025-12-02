import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { toast } from 'sonner';
import { ChevronLeft, Film, MapPin, Star, Clock } from 'lucide-react';

interface Movie {
    _id: string;
    title: string;
    posterUrl: string;
    genre: string;
    duration: number;
    rating: number;
    releaseDate: string;
    showtimeCount?: number;
}

interface Theater {
    _id: string;
    name: string;
    location: string;
    region: string;
}

interface TheaterMoviesProps {
    theater: Theater;
    onMovieSelect: (movie: Movie) => void;
    onBack: () => void;
}

export function TheaterMovies({ theater, onMovieSelect, onBack }: TheaterMoviesProps) {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMovies();
    }, [theater._id]);

    const fetchMovies = async () => {
        try {
            setLoading(true);
            const data = await api.getMoviesByTheater(theater._id);
            setMovies(data);
        } catch (error) {
            console.error('Error fetching movies:', error);
            toast.error('Failed to load movies');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apple-blue"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8 animate-fade-in">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/70 hover:text-apple-blue transition-colors mb-6 font-medium"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Back to Theaters
                </button>

                <div className="premium-glass rounded-3xl p-6 md:p-8">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-apple-blue to-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
                            <Film className="w-7 h-7 text-white" />
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 font-display">{theater.name}</h1>
                            <div className="flex items-center gap-2 text-white/70 text-sm mb-3">
                                <MapPin className="w-4 h-4" />
                                <span>{theater.location}</span>
                            </div>
                            <div className="inline-flex items-center gap-2 px-3 py-1.5 apple-glass rounded-full text-sm border border-white/10">
                                <span className="text-white/80">{movies.length} movies now showing</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Movies Grid */}
            {movies.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {movies.map((movie, index) => (
                        <button
                            key={movie._id}
                            onClick={() => onMovieSelect(movie)}
                            className="group text-left movie-card rounded-2xl overflow-hidden transition-all duration-300 animate-scale-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Poster */}
                            <div className="relative">
                                <img
                                    src={movie.posterUrl}
                                    alt={movie.title}
                                    className="w-full aspect-[2/3] object-cover transition-transform duration-500 group-hover:scale-110"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <div className="flex items-center gap-2 text-white text-sm mb-2">
                                            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                            <span>{movie.rating}/10</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-white/80 text-xs">
                                            <Clock className="w-3 h-3" />
                                            <span>{movie.duration} min</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Showtime Count Badge */}
                                {movie.showtimeCount && (
                                    <div className="absolute top-3 right-3 bg-apple-blue text-white px-2 py-1 rounded-lg text-xs font-semibold border border-blue-600">
                                        {movie.showtimeCount} shows
                                    </div>
                                )}
                            </div>

                            {/* Movie Info */}
                            <div className="p-3 bg-gradient-to-b from-black/80 to-black/60">
                                <h3 className="font-bold text-white group-hover:text-apple-blue transition-colors line-clamp-2 mb-1 text-sm">
                                    {movie.title}
                                </h3>
                                <p className="text-xs text-white/60 truncate">{movie.genre}</p>
                            </div>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 apple-glass rounded-3xl">
                    <Film className="w-16 h-16 mx-auto text-white/40 mb-4" />
                    <p className="text-white/70 text-lg mb-4">No movies currently showing at this theater</p>
                    <button
                        onClick={onBack}
                        className="apple-button px-6 py-3 rounded-lg"
                    >
                        Choose Another Theater
                    </button>
                </div>
            )}
        </div>
    );
}
