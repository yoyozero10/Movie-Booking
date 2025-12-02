import { useState } from 'react';
import { AdminLayout } from './AdminLayout';
import { AdminDashboard } from './AdminDashboard';
import { MovieManagement } from './MovieManagement';
import { TheaterManagement } from './TheaterManagement';
import { ShowtimeManagement } from './ShowtimeManagement';
// Import other components as they are created
// import { UserManagement } from './UserManagement';
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
                return <div className="text-white">User Management (Coming Soon)</div>;
            case 'bookings':
                return <div className="text-white">Booking Management (Coming Soon)</div>;
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
