/**
 * FloatingOrbs Component
 * Animated background orbs for CinemaVision Pro design
 */

export function FloatingOrbs() {
    return (
        <div className="fixed inset-0 -z-20 overflow-hidden pointer-events-none">
            <div className="floating-orb w-[600px] h-[600px] top-0 -left-64 parallax-slow"></div>
            <div className="floating-orb w-[500px] h-[500px] top-1/2 -right-48 parallax-slow"></div>
            <div className="floating-orb w-[400px] h-[400px] bottom-0 left-1/3 parallax-slow"></div>
        </div>
    );
}
