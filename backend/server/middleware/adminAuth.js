/**
 * Admin Middleware
 * Verifies that the authenticated user has admin role
 */

export const requireAdmin = (req, res, next) => {
    try {
        // Check if user is authenticated (should be set by auth middleware)
        if (!req.user) {
            return res.status(401).json({
                success: false,
                message: 'Authentication required'
            });
        }

        // Check if user has admin role
        if (req.user.role !== 'admin') {
            return res.status(403).json({
                success: false,
                message: 'Admin access required. You do not have permission to perform this action.'
            });
        }

        // User is admin, proceed
        next();
    } catch (error) {
        console.error('Admin middleware error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error in admin verification'
        });
    }
};

/**
 * Optional: Check if user is admin or owner of resource
 * Usage: requireAdminOrOwner('userId')
 */
export const requireAdminOrOwner = (userIdField = 'userId') => {
    return (req, res, next) => {
        try {
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    message: 'Authentication required'
                });
            }

            // Allow if admin
            if (req.user.role === 'admin') {
                return next();
            }

            // Allow if owner
            const resourceUserId = req.params[userIdField] || req.body[userIdField];
            if (req.user._id.toString() === resourceUserId) {
                return next();
            }

            return res.status(403).json({
                success: false,
                message: 'Access denied. Admin or owner access required.'
            });
        } catch (error) {
            console.error('Admin/Owner middleware error:', error);
            res.status(500).json({
                success: false,
                message: 'Server error in authorization'
            });
        }
    };
};
