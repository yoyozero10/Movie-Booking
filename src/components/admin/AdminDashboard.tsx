import { useEffect, useState } from 'react';
import { Film, Building2, Ticket, DollarSign, Users } from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';

interface AdminStats {
    totalMovies: number;
    totalTheaters: number;
    totalShowtimes: number;
    totalBookings: number;
    totalUsers: number;
    totalRevenue: string;
    confirmedBookings: number;
}

interface RecentBooking {
    _id: string;
    userId: {
        name: string;
        email: string;
    };
    showtimeId: {
        movieId: {
            title: string;
            posterUrl: string;
        };
        theaterId: {
            name: string;
            location: string;
        };
        date: string;
        startTime: string;
    };
    totalPrice: number;
    status: string;
    createdAt: string;
}

export function AdminDashboard() {
    const [stats, setStats] = useState<AdminStats | null>(null);
    const [recentBookings, setRecentBookings] = useState<RecentBooking[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await api.getAdminStats();

            if (response.success) {
                setStats(response.data.stats);
                setRecentBookings(response.data.recentBookings);
            }
        } catch (error) {
            console.error('Error fetching admin stats:', error);
            toast.error('Failed to load dashboard statistics');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apple-blue"></div>
            </div>
        );
    }

    if (!stats) return null;

    return (
        <div className="space-y-8">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Revenue"
                    value={`$${stats.totalRevenue}`}
                    icon={DollarSign}
                    color="text-green-400"
                    bg="bg-green-400/10"
                />
                <StatCard
                    title="Total Bookings"
                    value={stats.totalBookings.toString()}
                    icon={Ticket}
                    color="text-apple-blue"
                    bg="bg-apple-blue/10"
                />
                <StatCard
                    title="Total Users"
                    value={stats.totalUsers.toString()}
                    icon={Users}
                    color="text-purple-400"
                    bg="bg-purple-400/10"
                />
                <StatCard
                    title="Total Movies"
                    value={stats.totalMovies.toString()}
                    icon={Film}
                    color="text-orange-400"
                    bg="bg-orange-400/10"
                />
            </div>

            {/* Recent Bookings */}
            <div className="apple-glass rounded-3xl p-6">
                <h3 className="text-xl font-bold text-white mb-6 font-display">Recent Bookings</h3>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-white/50 text-sm border-b border-white/10">
                                <th className="pb-4 pl-4">Movie</th>
                                <th className="pb-4">User</th>
                                <th className="pb-4">Theater</th>
                                <th className="pb-4">Amount</th>
                                <th className="pb-4">Status</th>
                                <th className="pb-4">Date</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm">
                            {recentBookings.map((booking) => (
                                <tr key={booking._id} className="border-b border-white/5 last:border-0 hover:bg-white/5 transition-colors">
                                    <td className="py-4 pl-4">
                                        <div className="flex items-center gap-3">
                                            <img
                                                src={booking.showtimeId?.movieId?.posterUrl || 'https://via.placeholder.com/40'}
                                                alt={booking.showtimeId?.movieId?.title}
                                                className="w-10 h-14 object-cover rounded"
                                            />
                                            <span className="font-medium text-white">
                                                {booking.showtimeId?.movieId?.title || 'Unknown Movie'}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="py-4 text-white/80">
                                        {booking.userId?.name || 'Unknown User'}
                                        <div className="text-xs text-white/50">{booking.userId?.email}</div>
                                    </td>
                                    <td className="py-4 text-white/80">
                                        {booking.showtimeId?.theaterId?.name}
                                        <div className="text-xs text-white/50">{booking.showtimeId?.theaterId?.location}</div>
                                    </td>
                                    <td className="py-4 font-medium text-white">
                                        ${booking.totalPrice?.toFixed(2)}
                                    </td>
                                    <td className="py-4">
                                        <span className={`px-2 py-1 rounded-lg text-xs font-medium border ${booking.status === 'confirmed'
                                            ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                            : 'bg-red-500/20 text-red-400 border-red-500/30'
                                            }`}>
                                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="py-4 text-white/60">
                                        {new Date(booking.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

function StatCard({ title, value, icon: Icon, color, bg }: { title: string; value: string; icon: any; color: string; bg: string }) {
    return (
        <div className="apple-glass rounded-2xl p-6 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${bg}`}>
                <Icon className={`w-6 h-6 ${color}`} />
            </div>
            <div>
                <p className="text-white/50 text-sm">{title}</p>
                <h4 className="text-2xl font-bold text-white font-display">{value}</h4>
            </div>
        </div>
    );
}
