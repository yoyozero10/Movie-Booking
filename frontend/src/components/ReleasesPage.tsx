import { Calendar, Clock, Star } from 'lucide-react';
import { useEffect, useState } from 'react';
import { api } from '../lib/api';

interface Movie {
    _id: string;
    title: string;
    description: string;
    genre: string;
    duration: number;
    rating: number;
    posterUrl: string;
    releaseDate: string;
}

export function ReleasesPage() {
    const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const movies = await api.getMovies();
                // Sort by release date (newest first)
                const sorted = movies.sort((a: Movie, b: Movie) =>
                    new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime()
                );
                setUpcomingMovies(sorted);
            } catch (error) {
                console.error('Error fetching movies:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMovies();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apple-blue"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-16">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-16 animate-fade-in">
                    <h1 className="text-5xl md:text-6xl font-bold mb-6">
                        <span className="apple-text-gradient font-display">Latest Releases</span>
                    </h1>
                    <p className="text-xl text-white/70 max-w-2xl mx-auto">
                        Discover the newest blockbusters and indie gems coming to CinemaVision Pro
                    </p>
                </div>

                {/* Movies Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {upcomingMovies.map((movie, index) => (
                        <div
                            key={movie._id}
                            className="movie-card rounded-2xl overflow-hidden group animate-scale-in"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Poster */}
                            <div className="relative aspect-[2/3] overflow-hidden">
                                <img
                                    src={movie.posterUrl}
                                    alt={movie.title}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />

                                {/* Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <div className="absolute bottom-0 left-0 right-0 p-6">
                                        <p className="text-white/90 text-sm line-clamp-3 mb-4">
                                            {movie.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Rating Badge */}
                                <div className="absolute top-4 right-4 apple-glass px-3 py-1.5 rounded-full flex items-center gap-1.5">
                                    <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                                    <span className="text-white font-semibold text-sm">{movie.rating}</span>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-3 font-display line-clamp-1">
                                    {movie.title}
                                </h3>

                                <div className="space-y-2 mb-4">
                                    <div className="flex items-center gap-2 text-white/60 text-sm">
                                        <Calendar className="w-4 h-4 text-apple-blue" />
                                        <span>{new Date(movie.releaseDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-white/60 text-sm">
                                        <Clock className="w-4 h-4 text-apple-blue" />
                                        <span>{movie.duration} minutes</span>
                                    </div>
                                </div>

                                <div className="flex flex-wrap gap-2">
                                    {movie.genre.split(',').slice(0, 2).map((g, i) => (
                                        <span
                                            key={i}
                                            className="px-3 py-1 bg-apple-blue/20 text-apple-blue rounded-lg text-xs font-medium border border-apple-blue/30"
                                        >
                                            {g.trim()}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {upcomingMovies.length === 0 && (
                    <div className="text-center py-20">
                        <div className="apple-glass rounded-3xl p-12 max-w-md mx-auto">
                            <Calendar className="w-16 h-16 text-white/30 mx-auto mb-4" />
                            <h3 className="text-2xl font-bold text-white mb-2">No Releases Yet</h3>
                            <p className="text-white/60">Check back soon for upcoming movies!</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
