import { useState, useEffect } from 'react';
import { api } from '../lib/api';
import { toast } from 'sonner';

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
            toast.error('Không thể tải danh sách khu vực');
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
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
                    Chọn Khu Vực
                </h1>
                <p className="text-gray-600">Tìm rạp chiếu phim gần bạn</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {regions.map((region) => (
                    <button
                        key={region}
                        onClick={() => handleRegionClick(region)}
                        className={`group relative p-6 rounded-xl border-2 transition-all duration-300 ${selectedRegion === region
                                ? 'border-primary bg-gradient-to-br from-primary/10 to-purple-600/10 shadow-lg shadow-primary/20'
                                : 'border-gray-200 hover:border-primary hover:shadow-md bg-white'
                            }`}
                    >
                        {/* Icon */}
                        <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center transition-all ${selectedRegion === region
                                ? 'bg-gradient-to-br from-primary to-purple-600'
                                : 'bg-gray-100 group-hover:bg-primary/10'
                            }`}>
                            <svg
                                className={`w-8 h-8 ${selectedRegion === region ? 'text-white' : 'text-gray-600 group-hover:text-primary'}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        </div>

                        {/* Region Name */}
                        <h3 className={`text-lg font-bold text-center transition-colors ${selectedRegion === region
                                ? 'text-primary'
                                : 'text-gray-900 group-hover:text-primary'
                            }`}>
                            {region}
                        </h3>

                        {/* Selected Indicator */}
                        {selectedRegion === region && (
                            <div className="absolute top-3 right-3">
                                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                                    <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                </div>
                            </div>
                        )}
                    </button>
                ))}
            </div>

            {regions.length === 0 && !loading && (
                <div className="text-center py-20">
                    <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    </svg>
                    <p className="text-gray-500">Không có khu vực nào</p>
                </div>
            )}
        </div>
    );
}
