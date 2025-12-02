import { ReactNode } from 'react';

interface GlassCardProps {
    children: ReactNode;
    className?: string;
    premium?: boolean;
    onClick?: () => void;
}

/**
 * GlassCard Component
 * Reusable glassmorphism card for CinemaVision Pro design
 */
export function GlassCard({ children, className = '', premium = false, onClick }: GlassCardProps) {
    const baseClass = premium ? 'premium-glass' : 'apple-glass';

    return (
        <div
            className={`${baseClass} ${className}`}
            onClick={onClick}
        >
            {children}
        </div>
    );
}
