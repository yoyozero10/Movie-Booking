import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { toast } from 'sonner';
import { MapPin, Check } from 'lucide-react';

interface RegionSelectorProps {
    onRegionSelect: (region: string) => void;
}

export function RegionSelector({ onRegionSelect }: RegionSelectorProps) {
    const [regions, setRegions] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedRegion, setSelectedRegion] = useState<string | null>(null);

    useEffect(() => {
        fetchRegions();
    }, []);

    const fetchRegions = async () => {
        try {
            const data = await api.getRegions();
            setRegions(data);
        } catch (error) {
            console.error('Error fetching regions:', error);
            toast.error('Failed to load regions');
        } finally {
            setLoading(false);
        }
    };

    const handleRegionClick = (region: string) => {
        setSelectedRegion(region);
        onRegionSelect(region);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apple-blue"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 apple-text-gradient font-display">
                    Select Your Region
                </h1>
                <p className="text-xl text-white/70">Find theaters near you</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {regions.map((region, index) => (
                    <button
                        key={region}
                        onClick={() => handleRegionClick(region)}
                        className={`group relative movie-card rounded-2xl p-6 transition-all duration-300 animate-scale-in ${selectedRegion === region
                                ? 'border-apple-blue/50'
                                : ''
                            }`}
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* Icon */}
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all duration-300 ${selectedRegion === region
                                ? 'bg-gradient-to-br from-apple-blue to-blue-600'
                                : 'bg-white/5 group-hover:bg-apple-blue/20'
                            }`}>
                            <MapPin className={`w-8 h-8 ${selectedRegion === region
                                    ? 'text-white'
                                    : 'text-white/60 group-hover:text-apple-blue'
                                }`} />
                        </div>

                        {/* Region Name */}
                        <h3 className={`text-lg font-bold text-center transition-colors duration-300 ${selectedRegion === region
                                ? 'text-apple-blue'
                                : 'text-white group-hover:text-apple-blue'
                            }`}>
                            {region}
                        </h3>

                        {/* Selected Indicator */}
                        {selectedRegion === region && (
                            <div className="absolute top-3 right-3 animate-scale-in">
                                <div className="w-6 h-6 bg-apple-blue rounded-full flex items-center justify-center border border-blue-600">
                                    <Check className="w-4 h-4 text-white" strokeWidth={3} />
                                </div>
                            </div>
                        )}

                        {/* Hover Glow */}
                        <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 ${selectedRegion === region
                                ? 'opacity-100 bg-apple-blue/5'
                                : 'opacity-0 group-hover:opacity-100 bg-apple-blue/5'
                            }`}></div>
                    </button>
                ))}
            </div>

            {regions.length === 0 && !loading && (
                <div className="text-center py-20 apple-glass rounded-3xl max-w-md mx-auto">
                    <MapPin className="w-16 h-16 mx-auto text-white/40 mb-4" />
                    <p className="text-white/70">No regions available</p>
                </div>
            )}
        </div>
    );
}
