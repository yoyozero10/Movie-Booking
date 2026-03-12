import { ReactNode, useState } from 'react';
import { LayoutDashboard, Film, Building2, Calendar, Users, Ticket, LogOut, Home } from 'lucide-react';
import { useAuth } from '../../lib/auth';
import { useNavigate } from 'react-router-dom';

interface AdminLayoutProps {
    children: ReactNode;
    activeTab: string;
    onTabChange: (tab: string) => void;
}

export function AdminLayout({ children, activeTab, onTabChange }: AdminLayoutProps) {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const tabs = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
        { id: 'movies', label: 'Movies', icon: Film },
        { id: 'theaters', label: 'Theaters', icon: Building2 },
        { id: 'showtimes', label: 'Showtimes', icon: Calendar },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'bookings', label: 'Bookings', icon: Ticket },
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <div className="min-h-screen flex bg-black text-white font-sans">
            {/* Sidebar */}
            <aside className="w-64 fixed h-full apple-glass border-r border-white/10 z-20 hidden md:flex flex-col">
                <div className="p-6 border-b border-white/10">
                    <div className="flex items-center gap-3 mb-1">
                        <div className="w-8 h-8 bg-gradient-to-br from-apple-blue to-purple-600 rounded-lg flex items-center justify-center">
                            <Film className="w-5 h-5 text-white" />
                        </div>
                        <h1 className="text-xl font-bold font-display tracking-tight">CinemaVision</h1>
                    </div>
                    <div className="text-xs text-apple-blue font-medium ml-11 uppercase tracking-wider">Admin Panel</div>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${activeTab === tab.id
                                    ? 'bg-apple-blue text-white shadow-lg shadow-apple-blue/20'
                                    : 'text-white/60 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            <tab.icon className={`w-5 h-5 transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110'}`} />
                            <span className="font-medium">{tab.label}</span>
                            {activeTab === tab.id && (
                                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-4 border-t border-white/10 space-y-2">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-white/60 hover:bg-white/5 hover:text-white transition-all duration-300"
                    >
                        <Home className="w-5 h-5" />
                        <span className="font-medium">Back to Site</span>
                    </button>

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all duration-300"
                    >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 min-h-screen relative">
                {/* Background Gradients */}
                <div className="fixed inset-0 pointer-events-none z-0">
                    <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] rounded-full bg-apple-blue/10 blur-[120px]" />
                    <div className="absolute bottom-[-20%] left-[-10%] w-[500px] h-[500px] rounded-full bg-purple-600/10 blur-[100px]" />
                </div>

                <div className="relative z-10 p-8">
                    {/* Header */}
                    <header className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-3xl font-bold font-display mb-1">
                                {tabs.find(t => t.id === activeTab)?.label || 'Dashboard'}
                            </h2>
                            <p className="text-white/50 text-sm">Welcome back, {user?.name}</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 border border-white/10 flex items-center justify-center">
                                <span className="font-bold text-sm">{user?.name?.charAt(0).toUpperCase()}</span>
                            </div>
                        </div>
                    </header>

                    {/* Content Area */}
                    <div className="animate-fade-in">
                        {children}
                    </div>
                </div>
            </main>
        </div>
    );
}
