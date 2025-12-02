import User from '../models/User.js';
import Movie from '../models/Movie.js';
import Theater from '../models/Theater.js';
import Showtime from '../models/Showtime.js';
import Booking from '../models/Booking.js';

/**
 * Get admin dashboard statistics
 */
export const getAdminStats = async (req, res) => {
    try {
        // Get counts
        const [
            totalMovies,
            totalTheaters,
            totalShowtimes,
            totalBookings,
            totalUsers,
            confirmedBookings
        ] = await Promise.all([
            Movie.countDocuments(),
            Theater.countDocuments(),
            Showtime.countDocuments(),
            Booking.countDocuments(),
            User.countDocuments(),
            Booking.find({ status: 'confirmed' })
        ]);

        // Calculate total revenue
        const totalRevenue = confirmedBookings.reduce((sum, booking) => {
            return sum + (booking.totalPrice || 0);
        }, 0);

        // Get recent bookings
        const recentBookings = await Booking.find()
            .sort({ createdAt: -1 })
            .limit(10)
            .populate('userId', 'name email')
            .populate({
                path: 'showtimeId',
                populate: [
                    { path: 'movieId', select: 'title posterUrl' },
                    { path: 'theaterId', select: 'name location' }
                ]
            });

        res.json({
            success: true,
            data: {
                stats: {
                    totalMovies,
                    totalTheaters,
                    totalShowtimes,
                    totalBookings,
                    totalUsers,
                    totalRevenue: totalRevenue.toFixed(2),
                    confirmedBookings: confirmedBookings.length
                },
                recentBookings
            }
        });
    } catch (error) {
        console.error('Get admin stats error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch admin statistics',
            error: error.message
        });
    }
};

/**
 * Get all users (admin only)
 */
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find()
            .select('-password') // Exclude password
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: users
        });
    } catch (error) {
        console.error('Get all users error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: error.message
        });
    }
};

/**
 * Update user role (admin only)
 */
export const updateUserRole = async (req, res) => {
    try {
        const { userId } = req.params;
        const { role } = req.body;

        // Validate role
        if (!['user', 'admin'].includes(role)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid role. Must be "user" or "admin"'
            });
        }

        // Prevent admin from demoting themselves
        if (userId === req.user._id.toString() && role === 'user') {
            return res.status(400).json({
                success: false,
                message: 'You cannot demote yourself from admin'
            });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { role },
            { new: true, runValidators: true }
        ).select('-password');

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: `User role updated to ${role}`,
            data: user
        });
    } catch (error) {
        console.error('Update user role error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update user role',
            error: error.message
        });
    }
};

/**
 * Delete user (admin only)
 */
export const deleteUser = async (req, res) => {
    try {
        const { userId } = req.params;

        // Prevent admin from deleting themselves
        if (userId === req.user._id.toString()) {
            return res.status(400).json({
                success: false,
                message: 'You cannot delete your own account'
            });
        }

        const user = await User.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }

        res.json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        console.error('Delete user error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to delete user',
            error: error.message
        });
    }
};

/**
 * Get all bookings (admin only)
 */
export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .sort({ createdAt: -1 })
            .populate('userId', 'name email')
            .populate({
                path: 'showtimeId',
                populate: [
                    { path: 'movieId', select: 'title posterUrl duration rating' },
                    { path: 'theaterId', select: 'name location' }
                ]
            });

        res.json({
            success: true,
            data: bookings
        });
    } catch (error) {
        console.error('Get all bookings error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to fetch bookings',
            error: error.message
        });
    }
};

/**
 * Update booking status (admin only)
 */
export const updateBookingStatus = async (req, res) => {
    try {
        const { bookingId } = req.params;
        const { status } = req.body;

        // Validate status
        if (!['confirmed', 'cancelled'].includes(status)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid status. Must be "confirmed" or "cancelled"'
            });
        }

        const booking = await Booking.findByIdAndUpdate(
            bookingId,
            { status },
            { new: true, runValidators: true }
        ).populate({
            path: 'showtimeId',
            populate: [
                { path: 'movieId' },
                { path: 'theaterId' }
            ]
        });

        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found'
            });
        }

        res.json({
            success: true,
            message: `Booking status updated to ${status}`,
            data: booking
        });
    } catch (error) {
        console.error('Update booking status error:', error);
        res.status(500).json({
            success: false,
            message: 'Failed to update booking status',
            error: error.message
        });
    }
};
