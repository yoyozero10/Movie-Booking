import { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { AdminDashboard } from './AdminDashboard';
import { MovieManagement } from './MovieManagement';
import { TheaterManagement } from './TheaterManagement';
import { ShowtimeManagement } from './ShowtimeManagement';
import { UserManagement } from './UserManagement';
// Import other components as they are created
// import { BookingManagement } from './BookingManagement';

export function AdminPage() {
    const [activeTab, setActiveTab] = useState('dashboard');

    const renderContent = () => {
        switch (activeTab) {
            case 'dashboard':
                return <AdminDashboard />;
            case 'movies':
                return <MovieManagement />;
            case 'theaters':
                return <TheaterManagement />;
            case 'showtimes':
                return <ShowtimeManagement />;
            case 'users':
                return <UserManagement />;
            case 'bookings':
                // Show Dashboard with Recent Bookings (no separate Booking Management needed)
                return <AdminDashboard />;
            default:
                return <AdminDashboard />;
        }
    };

    return (
        <AdminLayout activeTab={activeTab} onTabChange={setActiveTab}>
            {renderContent()}
        </AdminLayout>
    );
}
