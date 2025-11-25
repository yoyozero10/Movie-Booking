import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { toast } from 'sonner';

interface Theater {
    _id: string;
    name: string;
    location: string;
    region: string;
    city: string;
    totalSeats: number;
}

interface TheaterListProps {
    region: string;
    onTheaterSelect: (theater: Theater) => void;
    onBack: () => void;
}

export function TheaterList({ region, onTheaterSelect, onBack }: TheaterListProps) {
    const [theaters, setTheaters] = useState<Theater[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTheaterId, setSelectedTheaterId] = useState<string | null>(null);

    useEffect(() => {
        fetchTheaters();
    }, [region]);

    const fetchTheaters = async () => {
        try {
            setLoading(true);
            const data = await api.getTheatersByRegion(region);
            setTheaters(data);
        } catch (error) {
            console.error('Error fetching theaters:', error);
            toast.error('Không thể tải danh sách rạp');
        } finally {
            setLoading(false);
        }
    };

    const handleTheaterClick = (theater: Theater) => {
        setSelectedTheaterId(theater._id);
        onTheaterSelect(theater);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors mb-4"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    Quay lại chọn khu vực
                </button>

                <div className="flex items-center gap-3 mb-2">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-purple-600 rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">{region}</h1>
                        <p className="text-gray-600">{theaters.length} rạp chiếu phim</p>
                    </div>
                </div>
            </div>

            {/* Theater List */}
            <div className="space-y-4">
                {theaters.map((theater) => (
                    <button
                        key={theater._id}
                        onClick={() => handleTheaterClick(theater)}
                        className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-300 ${selectedTheaterId === theater._id
                                ? 'border-primary bg-gradient-to-br from-primary/5 to-purple-600/5 shadow-lg shadow-primary/10'
                                : 'border-gray-200 hover:border-primary hover:shadow-md bg-white'
                            }`}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                {/* Theater Name */}
                                <h3 className={`text-xl font-bold mb-2 transition-colors ${selectedTheaterId === theater._id ? 'text-primary' : 'text-gray-900'
                                    }`}>
                                    {theater.name}
                                </h3>

                                {/* Location */}
                                <div className="flex items-start gap-2 text-gray-600 mb-3">
                                    <svg className="w-5 h-5 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="text-sm">{theater.location}</span>
                                </div>

                                {/* Info */}
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1.5 text-gray-500">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                        </svg>
                                        <span>{theater.totalSeats} ghế</span>
                                    </div>
                                </div>
                            </div>

                            {/* Arrow Icon */}
                            <div className={`flex-shrink-0 ml-4 transition-transform ${selectedTheaterId === theater._id ? 'translate-x-1' : ''
                                }`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${selectedTheaterId === theater._id
                                        ? 'bg-primary text-white'
                                        : 'bg-gray-100 text-gray-400'
                                    }`}>
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {theaters.length === 0 && !loading && (
                <div className="text-center py-20">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <p className="text-gray-500 text-lg mb-2">Không có rạp nào trong khu vực này</p>
                    <button
                        onClick={onBack}
                        className="text-primary hover:underline"
                    >
                        Chọn khu vực khác
                    </button>
                </div>
            )}
        </div>
    );
}
