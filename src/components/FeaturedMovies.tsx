import { useEffect, useState } from "react";
import { api } from "../lib/api";
import { Star, Clock } from "lucide-react";

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

export function FeaturedMovies() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        const all: Movie[] = await api.getMovies();
        // Simple heuristic: take up to 6 movies sorted by releaseDate desc if available
        const sorted = all.sort((a: Movie, b: Movie) => (new Date(b.releaseDate).getTime() || 0) - (new Date(a.releaseDate).getTime() || 0));
        setMovies(sorted.slice(0, 6));
      } catch (err) {
        console.error('Error fetching featured movies', err);
      } finally {
        setLoading(false);
      }
    };

    void fetch();
  }, []);

  if (loading) {
    return (
      <div className="py-12 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-apple-blue"></div>
      </div>
    );
  }

  if (movies.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12 animate-blur-in delay-800">
      <div className="text-center mb-12">
        <h3 className="text-4xl md:text-5xl font-bold apple-text-gradient mb-4 font-display">Featured Movies</h3>
        <p className="text-xl text-white/70 max-w-2xl mx-auto">
          Discover the latest blockbusters and timeless classics
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
        {movies.map((m, index) => (
          <div
            key={m._id}
            className="movie-card rounded-2xl overflow-hidden cursor-pointer group animate-scale-in"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Poster */}
            <div className="relative w-full aspect-[2/3] bg-black/50 overflow-hidden">
              <img
                src={m.posterUrl}
                alt={m.title}
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/placeholder/500/750'; }}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />

              {/* Overlay on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex items-center gap-1 text-yellow-400">
                      <Star className="w-3 h-3 fill-current" />
                      <span className="text-xs font-medium">{m.rating}</span>
                    </div>
                    <div className="flex items-center gap-1 text-white/70">
                      <Clock className="w-3 h-3" />
                      <span className="text-xs">{m.duration}m</span>
                    </div>
                  </div>
                  <button className="w-full apple-button py-2 rounded-lg text-sm font-medium">
                    Book Now
                  </button>
                </div>
              </div>

              {/* Premium Badge */}
              <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="apple-glass px-2 py-1 rounded-lg text-xs font-medium text-apple-orange border border-apple-orange/30">
                  Premium
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="p-3 bg-gradient-to-b from-black/80 to-black/60">
              <h4 className="text-sm font-semibold text-white truncate mb-1 group-hover:text-apple-blue transition-colors">
                {m.title}
              </h4>
              <p className="text-xs text-white/60 truncate">{m.genre}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
