import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../lib/api";

interface Movie {
  _id: string;
  title: string;
  description: string;
  genre: string;
  duration: number;
  rating: string;
  posterUrl: string;
  releaseDate: string;
}

interface HeroSectionProps {
  onExploreClick: () => void;
}

export function HeroSection({ onExploreClick }: HeroSectionProps) {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      try {
        const movies = await api.getMovies();
        if (movies.length > 0) {
          // Pick a random featured movie
          const idx = Math.floor(Math.random() * movies.length);
          setFeaturedMovie(movies[idx]);
        }
      } catch (error) {
        console.error('Error fetching featured movie:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchFeaturedMovie();
  }, []);

  if (loading) {
    return (
      <div className="relative h-screen bg-gray-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
      </div>
    );
  }

  if (!featuredMovie) {
    return null;
  }

  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={featuredMovie.posterUrl}
          alt={featuredMovie.title}
          className="w-full h-full object-cover scale-110 blur-sm"
        />
        {/* Stronger overlays to hide poster text */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/40"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-2xl">
            {/* Featured Badge */}
            <div className="mb-6">
              <span className="inline-block bg-pink-600 text-white px-4 py-2 font-bold text-sm tracking-wider">
                FEATURED
              </span>
            </div>

            {/* Movie Title */}
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
              {featuredMovie.title}
            </h1>

            {/* Genre Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {featuredMovie.genre.split(',').map((genre, index) => (
                <span
                  key={index}
                  className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30"
                >
                  {genre.trim()}
                </span>
              ))}
              <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm rounded-full border border-white/30">
                {featuredMovie.rating}
              </span>
            </div>

            {/* Description */}
            <p className="text-white/90 text-lg mb-8 leading-relaxed max-w-xl">
              {featuredMovie.description}
            </p>

            {/* CTA Button */}
            <button
              onClick={onExploreClick}
              className="group px-8 py-4 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-semibold text-lg transition-all flex items-center space-x-2 shadow-lg hover:shadow-xl"
            >
              <span>Explore Movies</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}
