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
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (movies.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-6 py-12">
      <h3 className="text-2xl font-bold text-white mb-6">Featured Movies</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {movies.map((m) => (
          <div key={m._id} className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 cursor-pointer hover:border-pink-500/60 transition">
            <div className="w-full h-64 bg-gray-900 flex items-center justify-center overflow-hidden">
              <img
                src={m.posterUrl}
                alt={m.title}
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/placeholder/500/750'; }}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-2 bg-gray-800">
              <h4 className="text-sm font-semibold text-white truncate">{m.title}</h4>
              <p className="text-xs text-gray-400">{m.genre}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
