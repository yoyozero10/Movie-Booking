import { useNavigate } from 'react-router-dom';
import { Home, Search, Film } from 'lucide-react';

export function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center px-4" style={{ background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #1a1a1a 100%)' }}>
            <div className="text-center max-w-2xl">
                {/* 404 Number */}
                <h1 className="text-9xl font-bold mb-4 bg-gradient-to-r from-apple-blue via-purple-500 to-pink-500 bg-clip-text text-transparent">
                    404
                </h1>

                {/* Error Message */}
                <h2 className="text-3xl font-bold text-white mb-4">
                    Page Not Found
                </h2>
                <p className="text-xl text-white/70 mb-8">
                    Oops! The page you're looking for doesn't exist or has been moved.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <button
                        onClick={() => navigate('/')}
                        className="flex items-center gap-2 px-6 py-3 bg-apple-blue hover:bg-apple-blue/80 text-white rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-apple-blue/50"
                    >
                        <Home size={20} />
                        Go Home
                    </button>

                    <button
                        onClick={() => {
                            navigate('/');
                            // Trigger search after navigation
                            setTimeout(() => {
                                const searchInput = document.querySelector('[data-testid="search-input"]') as HTMLInputElement;
                                if (searchInput) {
                                    searchInput.focus();
                                }
                            }, 100);
                        }}
                        className="flex items-center gap-2 px-6 py-3 apple-glass hover:bg-white/10 text-white rounded-xl font-semibold transition-all duration-300"
                    >
                        <Search size={20} />
                        Search Movies
                    </button>

                    <button
                        onClick={() => {
                            navigate('/');
                            setTimeout(() => {
                                const moviesSection = document.querySelector('[data-section="movies"]') as HTMLElement;
                                if (moviesSection) {
                                    moviesSection.click();
                                }
                            }, 100);
                        }}
                        className="flex items-center gap-2 px-6 py-3 apple-glass hover:bg-white/10 text-white rounded-xl font-semibold transition-all duration-300"
                    >
                        <Film size={20} />
                        Browse Movies
                    </button>
                </div>

                {/* Decorative Element */}
                <div className="mt-12 text-white/40 text-sm">
                    Lost in the cinema? Let us guide you back.
                </div>
            </div>

            {/* Floating Orbs Background */}
            <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-apple-blue/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-float-delayed"></div>
            </div>
        </div>
    );
}
