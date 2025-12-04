import { Play, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { useLocale } from "../lib/LocaleContext";
import { t } from "../lib/i18n";

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
  const { language } = useLocale();

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
      <div className="relative h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apple-blue"></div>
      </div>
    );
  }

  if (!featuredMovie) {
    return null;
  }

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center hero-gradient">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 -z-10 parallax-bg">
        <img
          src={featuredMovie.posterUrl}
          alt={featuredMovie.title}
          className="w-full h-full object-cover scale-110 blur-sm opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/70 to-black/40"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-24 w-full">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
          <div className="animate-slide-right delay-200 parallax-fast">
            {/* Now Playing Badge */}
            <div className="inline-flex items-center apple-glass text-apple-blue px-4 py-2 rounded-full text-sm mb-8">
              <div className="w-2 h-2 bg-apple-blue rounded-full mr-3 animate-pulse"></div>
              <Sparkles className="w-4 h-4 mr-2" />
              {t('hero.nowPlaying', language)}
            </div>

            {/* Movie Title */}
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-8 leading-none">
              <span className="apple-text-gradient font-display">{featuredMovie.title}</span>
            </h1>

            {/* Description */}
            <p className="text-xl md:text-2xl text-white/70 max-w-2xl mb-12 leading-relaxed">
              {featuredMovie.description}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onExploreClick}
                className="apple-button px-8 py-4 rounded-2xl font-medium text-lg flex items-center justify-center"
              >
                <Play className="w-5 h-5 mr-3" />
                {t('hero.bookTickets', language)}
              </button>
            </div>

            {/* Movie Stats */}
            <div className="animate-slide-up delay-600 flex items-center space-x-8 mt-12 pt-8 border-t border-white/10">
              <div className="text-center">
                <div className="text-2xl font-display font-semibold text-white">{featuredMovie.rating}</div>
                <div className="text-sm text-white/60">{t('hero.rating', language)}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-display font-semibold text-white">{featuredMovie.duration}m</div>
                <div className="text-sm text-white/60">{t('hero.runtime', language)}</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-display font-semibold text-white">{featuredMovie.genre.split(',')[0]}</div>
                <div className="text-sm text-white/60">{t('hero.genre', language)}</div>
              </div>
            </div>
          </div>

          {/* Movie Poster Card */}
          <div className="animate-slide-left delay-400 parallax-fast">
            <div className="movie-card rounded-3xl overflow-hidden relative">
              <img
                src={featuredMovie.posterUrl}
                alt={featuredMovie.title}
                className="w-full h-[600px] object-cover"
              />



              {/* Bottom Overlay */}
              <div className="absolute bottom-0 left-0 right-0 z-20 p-6 bg-gradient-to-t from-black/80 to-transparent">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <div className="flex text-yellow-400 space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-white/80 font-medium text-sm">4.8 (2.4k)</span>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl text-white font-display font-semibold">$12.99</div>
                    <div className="text-xs text-white/60">Standard</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-3 bg-white/50 rounded-full"></div>
        </div>
      </div>
    </section>
  );
}
