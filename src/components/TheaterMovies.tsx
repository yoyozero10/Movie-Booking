import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { toast } from 'sonner';

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
            toast.error('Không thể tải danh sách phim');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-4"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Quay lại chọn rạp
                </button>

                <div className="bg-gradient-to-r from-primary/10 to-purple-600/10 rounded-2xl p-6 border border-primary/20">
                    <div className="flex items-start gap-4">
                        <div className="w-14 h-14 bg-gradient-to-br from-primary to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                            </svg>
                        </div>
                        <div className="flex-1">
                            <h1 className="text-2xl font-bold text-gray-900 mb-1">{theater.name}</h1>
                            <p className="text-gray-600 text-sm mb-2">{theater.location}</p>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white rounded-full text-sm">
                                <span className="text-gray-600">{movies.length} phim đang chiếu</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Movies Grid */}
            {movies.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {movies.map((movie) => (
                        <button
                            key={movie._id}
                            onClick={() => onMovieSelect(movie)}
                            className="group text-left transition-transform hover:scale-105 duration-300"
                        >
                            <div className="relative rounded-xl overflow-hidden shadow-lg mb-3">
                                {/* Poster */}
                                <img
                                    src={movie.posterUrl}
                                    alt={movie.title}
                                    className="w-full aspect-[2/3] object-cover"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-4">
                                        <div className="flex items-center gap-2 text-white text-sm mb-2">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                            <span>{movie.rating}/10</span>
                                        </div>
                                        <p className="text-white text-xs">{movie.genre} • {movie.duration} phút</p>
                                    </div>
                                </div>

                                {/* Showtime Count Badge */}
                                {movie.showtimeCount && (
                                    <div className="absolute top-3 right-3 bg-primary text-white px-2 py-1 rounded-full text-xs font-semibold">
                                        {movie.showtimeCount} suất
                                    </div>
                                )}
                            </div>

                            {/* Movie Title */}
                            <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-1">
                                {movie.title}
                            </h3>

                            {/* Genre */}
                            <p className="text-sm text-gray-500">{movie.genre}</p>
                        </button>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                    </svg>
                    <p className="text-gray-500 text-lg mb-2">Rạp này hiện không có phim nào đang chiếu</p>
                    <button
                        onClick={onBack}
                        className="text-primary hover:underline"
                    >
                        Chọn rạp khác
                    </button>
                </div>
            )}
        </div>
    );
}
