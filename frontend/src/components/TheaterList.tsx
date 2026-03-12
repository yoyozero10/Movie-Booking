import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { toast } from 'sonner';
import { MapPin, Armchair, ChevronRight, ChevronLeft, Building2 } from 'lucide-react';

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
            toast.error('Failed to load theaters');
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apple-blue"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
            {/* Header */}
            <div className="mb-8">
                <button
                    onClick={onBack}
                    className="flex items-center gap-2 text-white/70 hover:text-apple-blue transition-colors mb-6 font-medium"
                >
                    <ChevronLeft className="w-5 h-5" />
                    Back to Regions
                </button>

                <div className="flex items-center gap-4 mb-2">
                    <div className="w-14 h-14 bg-gradient-to-br from-apple-blue to-blue-600 rounded-full flex items-center justify-center">
                        <MapPin className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-white font-display">{region}</h1>
                        <p className="text-white/70">{theaters.length} theaters available</p>
                    </div>
                </div>
            </div>

            {/* Theater List */}
            <div className="space-y-4">
                {theaters.map((theater, index) => (
                    <button
                        key={theater._id}
                        onClick={() => handleTheaterClick(theater)}
                        className={`group w-full text-left movie-card rounded-2xl p-6 transition-all duration-300 animate-slide-up ${selectedTheaterId === theater._id
                                ? 'border-apple-blue/50'
                                : ''
                            }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className="flex items-start justify-between">
                            <div className="flex-1">
                                {/* Theater Name */}
                                <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${selectedTheaterId === theater._id
                                        ? 'text-apple-blue'
                                        : 'text-white group-hover:text-apple-blue'
                                    }`}>
                                    {theater.name}
                                </h3>

                                {/* Location */}
                                <div className="flex items-start gap-2 text-white/70 mb-4">
                                    <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                    <span className="text-sm">{theater.location}</span>
                                </div>

                                {/* Info */}
                                <div className="flex items-center gap-4 text-sm">
                                    <div className="flex items-center gap-1.5 text-white/60">
                                        <Armchair className="w-4 h-4" />
                                        <span>{theater.totalSeats} seats</span>
                                    </div>
                                    <div className="flex items-center gap-1.5 text-white/60">
                                        <Building2 className="w-4 h-4" />
                                        <span>{theater.city}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Arrow Icon */}
                            <div className={`flex-shrink-0 ml-4 transition-transform duration-300 ${selectedTheaterId === theater._id ? 'translate-x-1' : ''
                                }`}>
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${selectedTheaterId === theater._id
                                        ? 'bg-apple-blue text-white'
                                        : 'bg-white/5 text-white/40 group-hover:bg-apple-blue/20 group-hover:text-apple-blue'
                                    }`}>
                                    <ChevronRight className="w-5 h-5" />
                                </div>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {theaters.length === 0 && !loading && (
                <div className="text-center py-20 apple-glass rounded-3xl">
                    <Building2 className="w-16 h-16 mx-auto text-white/40 mb-4" />
                    <p className="text-white/70 text-lg mb-4">No theaters in this region</p>
                    <button
                        onClick={onBack}
                        className="apple-button px-6 py-3 rounded-lg"
                    >
                        Choose Another Region
                    </button>
                </div>
            )}
        </div>
    );
}
