import { Filter, X } from 'lucide-react';
import { useState } from 'react';

interface FilterPanelProps {
    onFilterChange: (filters: FilterOptions) => void;
    initialFilters?: FilterOptions;
}

export interface FilterOptions {
    genre?: string;
    rating?: string;
    minDuration?: number;
    maxDuration?: number;
    sortBy?: string;
    order?: 'asc' | 'desc';
}

const GENRES = ['Action', 'Drama', 'Comedy', 'Sci-Fi', 'Thriller', 'Animation', 'Romance', 'Adventure', 'Musical'];
const RATINGS = ['G', 'PG', 'PG-13', 'R'];
const SORT_OPTIONS = [
    { value: 'releaseDate', label: 'Release Date' },
    { value: 'title', label: 'Title' },
    { value: 'duration', label: 'Duration' }
];

export function FilterPanel({ onFilterChange, initialFilters = {} }: FilterPanelProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [filters, setFilters] = useState<FilterOptions>(initialFilters);

    const handleFilterChange = (key: keyof FilterOptions, value: any) => {
        const newFilters = { ...filters, [key]: value };
        setFilters(newFilters);
        onFilterChange(newFilters);
    };

    const clearFilters = () => {
        const emptyFilters: FilterOptions = {};
        setFilters(emptyFilters);
        onFilterChange(emptyFilters);
    };

    const hasActiveFilters = Object.values(filters).some(v => v !== undefined && v !== '');

    return (
        <div className="relative">
            {/* Filter Toggle Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg border transition-colors ${hasActiveFilters
                        ? 'bg-pink-600 border-pink-600 text-white'
                        : 'bg-gray-800 border-gray-700 text-gray-300 hover:border-pink-500'
                    }`}
            >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
                {hasActiveFilters && (
                    <span className="ml-1 px-2 py-0.5 bg-white text-pink-600 rounded-full text-xs font-semibold">
                        {Object.values(filters).filter(v => v !== undefined && v !== '').length}
                    </span>
                )}
            </button>

            {/* Filter Panel */}
            {isOpen && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-gray-800 border border-gray-700 rounded-lg shadow-xl z-50 p-4">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-white">Filters</h3>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-gray-400 hover:text-white transition-colors"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="space-y-4">
                        {/* Genre Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Genre</label>
                            <select
                                value={filters.genre || ''}
                                onChange={(e) => handleFilterChange('genre', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                            >
                                <option value="">All Genres</option>
                                {GENRES.map(genre => (
                                    <option key={genre} value={genre}>{genre}</option>
                                ))}
                            </select>
                        </div>

                        {/* Rating Filter */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Rating</label>
                            <select
                                value={filters.rating || ''}
                                onChange={(e) => handleFilterChange('rating', e.target.value)}
                                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                            >
                                <option value="">All Ratings</option>
                                {RATINGS.map(rating => (
                                    <option key={rating} value={rating}>{rating}</option>
                                ))}
                            </select>
                        </div>

                        {/* Duration Range */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Duration (minutes)</label>
                            <div className="grid grid-cols-2 gap-2">
                                <input
                                    type="number"
                                    placeholder="Min"
                                    value={filters.minDuration || ''}
                                    onChange={(e) => handleFilterChange('minDuration', e.target.value ? parseInt(e.target.value) : undefined)}
                                    className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                                />
                                <input
                                    type="number"
                                    placeholder="Max"
                                    value={filters.maxDuration || ''}
                                    onChange={(e) => handleFilterChange('maxDuration', e.target.value ? parseInt(e.target.value) : undefined)}
                                    className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                                />
                            </div>
                        </div>

                        {/* Sort By */}
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
                            <div className="grid grid-cols-2 gap-2">
                                <select
                                    value={filters.sortBy || 'releaseDate'}
                                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                    className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                                >
                                    {SORT_OPTIONS.map(option => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))}
                                </select>
                                <select
                                    value={filters.order || 'desc'}
                                    onChange={(e) => handleFilterChange('order', e.target.value as 'asc' | 'desc')}
                                    className="px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white focus:outline-none focus:border-pink-500"
                                >
                                    <option value="desc">Descending</option>
                                    <option value="asc">Ascending</option>
                                </select>
                            </div>
                        </div>

                        {/* Clear Filters Button */}
                        {hasActiveFilters && (
                            <button
                                onClick={clearFilters}
                                className="w-full px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition-colors"
                            >
                                Clear All Filters
                            </button>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
