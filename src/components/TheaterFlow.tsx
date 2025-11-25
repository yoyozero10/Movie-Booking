import { useState } from 'react';
import { RegionSelector } from './RegionSelector';
import { TheaterList } from './TheaterList';
import { TheaterMovies } from './TheaterMovies';
import { MovieDetails } from './MovieDetails';
import { SeatSelection } from './SeatSelection';

type ViewState = 'regions' | 'theaters' | 'movies' | 'movieDetails' | 'seatSelection';

interface Theater {
    _id: string;
    name: string;
    location: string;
    region: string;
    city: string;
    totalSeats: number;
}

interface Movie {
    _id: string;
    title: string;
    posterUrl: string;
    genre: string;
    duration: number;
    rating: number;
}

export function TheaterFlow() {
    const [currentView, setCurrentView] = useState<ViewState>('regions');
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
    const [selectedTheater, setSelectedTheater] = useState<Theater | null>(null);
    const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
    const [selectedShowtimeId, setSelectedShowtimeId] = useState<string | null>(null);
    const [movieDetailsKey, setMovieDetailsKey] = useState(0); // For forcing refresh

    const handleRegionSelect = (region: string) => {
        setSelectedRegion(region);
        setCurrentView('theaters');
    };

    const handleTheaterSelect = (theater: Theater) => {
        setSelectedTheater(theater);
        setCurrentView('movies');
    };

    const handleMovieSelect = (movie: Movie) => {
        setSelectedMovie(movie);
        setMovieDetailsKey(Date.now()); // Refresh movie details
        setCurrentView('movieDetails');
    };

    const handleShowtimeSelect = (showtimeId: string) => {
        setSelectedShowtimeId(showtimeId);
        setCurrentView('seatSelection');
    };

    const handleBackToRegions = () => {
        setSelectedRegion(null);
        setSelectedTheater(null);
        setSelectedMovie(null);
        setSelectedShowtimeId(null);
        setCurrentView('regions');
    };

    const handleBackToTheaters = () => {
        setSelectedTheater(null);
        setSelectedMovie(null);
        setSelectedShowtimeId(null);
        setCurrentView('theaters');
    };

    const handleBackToMovies = () => {
        setSelectedMovie(null);
        setSelectedShowtimeId(null);
        setCurrentView('movies');
    };

    const handleBackToMovieDetails = () => {
        setSelectedShowtimeId(null);
        setMovieDetailsKey(Date.now()); // Refresh to get updated seat counts
        setCurrentView('movieDetails');
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {currentView === 'regions' && (
                <RegionSelector onRegionSelect={handleRegionSelect} />
            )}

            {currentView === 'theaters' && selectedRegion && (
                <TheaterList
                    region={selectedRegion}
                    onTheaterSelect={handleTheaterSelect}
                    onBack={handleBackToRegions}
                />
            )}

            {currentView === 'movies' && selectedTheater && (
                <TheaterMovies
                    theater={selectedTheater}
                    onMovieSelect={handleMovieSelect}
                    onBack={handleBackToTheaters}
                />
            )}

            {currentView === 'movieDetails' && selectedMovie && selectedTheater && (
                <MovieDetails
                    key={movieDetailsKey}
                    movieId={selectedMovie._id}
                    theaterId={selectedTheater._id}
                    onBack={handleBackToMovies}
                />
            )}

            {currentView === 'seatSelection' && selectedShowtimeId && (
                <SeatSelection
                    showtimeId={selectedShowtimeId}
                    onBack={handleBackToMovieDetails}
                />
            )}
        </div>
    );
}
