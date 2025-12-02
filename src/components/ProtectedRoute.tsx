import { ReactNode } from 'react';
import { useAuth } from '../lib/auth';
import { UserRole } from '../lib/types';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
    children: ReactNode;
    requireAdmin?: boolean;
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
    const { user, isAdmin, isLoading } = useAuth();

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apple-blue"></div>
            </div>
        );
    }

    if (!user) {
        // Redirect to home if not logged in, or show a login prompt
        // For now, we'll show an access denied message
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="apple-glass rounded-3xl p-12 text-center max-w-md mx-4">
                    <h2 className="text-2xl font-bold text-white mb-4 font-display">Access Denied</h2>
                    <p className="text-white/70 mb-6">Please sign in to continue.</p>
                </div>
            </div>
        );
    }

    if (requireAdmin && !isAdmin()) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-black">
                <div className="apple-glass rounded-3xl p-12 text-center max-w-md mx-4">
                    <h2 className="text-2xl font-bold text-white mb-4 font-display">Admin Access Required</h2>
                    <p className="text-white/70">You don't have permission to access this page.</p>
                </div>
            </div>
        );
    }

    return <>{children}</>;
}
