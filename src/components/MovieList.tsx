import { useState, useEffect } from "react";
import { MovieDetails } from "./MovieDetails";
import { SearchBar } from "./SearchBar";
import { FilterPanel, FilterOptions } from "./FilterPanel";
import { api } from "../lib/api";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Define types for MongoDB documents
interface Movie {
  _id: string;
  title: string;
  description: string;
  genre: string;
  duration: number;
  rating: string;
  posterUrl: string;
  releaseDate: string;
  createdAt: string;
  updatedAt: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

interface MovieListProps {
  searchQueryFromNav?: string;
}

export function MovieList({ searchQueryFromNav = "" }: MovieListProps) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedMovieId, setSelectedMovieId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState<FilterOptions>({});
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  // Sync search query from navigation
  useEffect(() => {
    if (searchQueryFromNav) {
      setSearchQuery(searchQueryFromNav);
      setCurrentPage(1);
    }
  }, [searchQueryFromNav]);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const params = {
          q: searchQuery,
          ...filters,
          page: currentPage,
          limit: 12
        };

        const response = await api.searchMovies(params);

        if (response.movies) {
          // Response from search endpoint (with pagination)
          setMovies(response.movies);
          setPagination(response.pagination);
        } else {
          // Fallback to old format
          setMovies(response);
          setPagination(null);
        }
      } catch (error) {
        console.error('Error fetching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    void fetchMovies();
  }, [searchQuery, filters, currentPage]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (selectedMovieId) {
    return (
      <MovieDetails
        movieId={selectedMovieId}
        onBack={() => setSelectedMovieId(null)}
      />
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="text-6xl mb-4">🎬</div>
        <p className="text-xl text-gray-300 mb-2">
          No movies available yet
        </p>
        <p className="text-gray-400 mb-6">
          Movies have been seeded to your MongoDB Atlas database!
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition-colors"
        >
          Refresh Page
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <SearchBar
            onSearch={(query) => {
              setSearchQuery(query);
              setCurrentPage(1); // Reset to first page on new search
            }}
            initialValue={searchQuery}
          />
        </div>
        <FilterPanel
          onFilterChange={(newFilters) => {
            setFilters(newFilters);
            setCurrentPage(1); // Reset to first page on filter change
          }}
          initialFilters={filters}
        />
      </div>

      {/* Header with results count */}
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-2xl font-bold text-white">Browse Movies</h3>
          {pagination && (
            <p className="text-sm text-gray-400 mt-1">
              Showing {movies.length} of {pagination.totalCount} movies
            </p>
          )}
        </div>
      </div>

      {/* Movie Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <div
            key={movie._id}
            className="bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl hover:shadow-pink-500/20 transition-all duration-300 cursor-pointer border border-gray-700 hover:border-pink-500/50"
            onClick={() => setSelectedMovieId(movie._id)}
          >
            <div className="w-full h-96 bg-gray-900 flex items-center justify-center overflow-hidden">
              <img
                src={movie.posterUrl}
                alt={movie.title}
                loading="lazy"
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/placeholder/500/750'; }}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 bg-gray-800">
              <h4 className="text-lg font-semibold mb-2 text-white truncate">{movie.title}</h4>
              <p className="text-gray-300 text-sm mb-2 line-clamp-2">
                {movie.description}
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">{movie.genre}</span>
                <span className="text-sm text-gray-400">{movie.duration} min</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="flex justify-center items-center gap-4 mt-8">
          <button
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={!pagination.hasPrevPage}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 hover:border-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            <span className="text-gray-300">
              Page {pagination.currentPage} of {pagination.totalPages}
            </span>
          </div>

          <button
            onClick={() => setCurrentPage(prev => Math.min(pagination.totalPages, prev + 1))}
            disabled={!pagination.hasNextPage}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 hover:border-pink-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Next
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
}
