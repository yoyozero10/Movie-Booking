import { useState, useEffect } from "react";
import { User, Edit, Calendar, Mail, Shield, CheckCircle, Film, Ticket } from "lucide-react";
import { useAuth } from "../lib/auth";
import { api } from "../lib/api";

interface UserProfileProps {
  userId?: string; // Optional - if not provided, shows current user
}

export function UserProfile({ userId }: UserProfileProps) {
  const [profileUser, setProfileUser] = useState<any>(null);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user: currentUser } = useAuth();
  const isOwnProfile = !userId || userId === currentUser?._id;

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        setLoading(true);
        setError(null);

        let userData;
        if (isOwnProfile) {
          // Get current user's profile
          userData = await api.getProfile();

          // Fetch user's bookings
          try {
            const userBookings = await api.getBookings();
            setBookings(userBookings);
          } catch (bookingError) {
            console.error('Error fetching bookings:', bookingError);
            // Don't fail the whole profile if bookings fail
            setBookings([]);
          }
        } else {
          // Validate userId (simple ObjectId hex string check) before requesting
          const isValidObjectId = typeof userId === 'string' && /^[a-fA-F0-9]{24}$/.test(userId);
          if (!isValidObjectId) {
            throw new Error('Invalid user ID format');
          }

          // Get specific user's profile
          userData = await api.getUserById(userId as string);
          setBookings([]); // Don't show other users' bookings
        }

        setProfileUser(userData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load user profile');
      } finally {
        setLoading(false);
      }
    };

    void fetchUserProfile();
  }, [userId, isOwnProfile]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apple-blue"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="apple-glass rounded-3xl p-12 max-w-md mx-auto text-center">
          <div className="text-red-400 text-2xl font-bold mb-4">Error</div>
          <div className="text-white/70">{error}</div>
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="apple-glass rounded-3xl p-12 max-w-md mx-auto text-center">
          <User className="w-16 h-16 text-white/30 mx-auto mb-4" />
          <div className="text-white/70 text-lg">User not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Header Card */}
        <div className="premium-glass rounded-3xl p-8 md:p-12 mb-8 animate-scale-in">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-apple-blue to-purple-500 flex items-center justify-center border-4 border-white/10">
                <User className="w-16 h-16 text-white" strokeWidth={2} />
              </div>
              {profileUser.role === 'admin' && (
                <div className="absolute -bottom-2 -right-2 apple-glass px-3 py-1 rounded-full border border-apple-orange/30">
                  <Shield className="w-4 h-4 text-apple-orange" />
                </div>
              )}
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold mb-2">
                    <span className="apple-text-gradient font-display">{profileUser.name}</span>
                  </h1>
                  <div className="flex items-center justify-center md:justify-start gap-2 text-white/60">
                    <Mail className="w-4 h-4" />
                    <span>{profileUser.email}</span>
                  </div>
                </div>

                {isOwnProfile && (
                  <button className="apple-button px-6 py-3 rounded-2xl font-medium flex items-center gap-2 mx-auto md:mx-0">
                    <Edit className="w-4 h-4" />
                    Edit Profile
                  </button>
                )}
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-4 justify-center md:justify-start mt-6">
                <div className="apple-glass px-4 py-2 rounded-xl">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-apple-blue" />
                    <span className="text-white/60 text-sm">Joined</span>
                    <span className="text-white font-semibold text-sm">
                      {new Date(profileUser.createdAt).toLocaleDateString('en-US', {
                        month: 'short',
                        year: 'numeric'
                      })}
                    </span>
                  </div>
                </div>

                <div className="apple-glass px-4 py-2 rounded-xl">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 font-semibold text-sm">Active</span>
                  </div>
                </div>

                {profileUser.role === 'admin' && (
                  <div className="apple-glass px-4 py-2 rounded-xl border border-apple-orange/30">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-apple-orange" />
                      <span className="text-apple-orange font-semibold text-sm">Administrator</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details Grid */}
        <div className="grid md:grid-cols-2 gap-6 animate-slide-up delay-200">
          {/* Account Information */}
          <div className="apple-glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 font-display flex items-center gap-2">
              <User className="w-5 h-5 text-apple-blue" />
              Account Information
            </h2>

            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-white/60">Full Name</span>
                <span className="text-white font-medium">{profileUser.name}</span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-white/60">Email</span>
                <span className="text-white font-medium">{profileUser.email}</span>
              </div>

              <div className="flex justify-between items-center pb-3 border-b border-white/10">
                <span className="text-white/60">User ID</span>
                <span className="text-white/40 font-mono text-xs">{profileUser._id}</span>
              </div>

              <div className="flex justify-between items-center">
                <span className="text-white/60">Account Type</span>
                <span className="text-white font-medium capitalize">{profileUser.role || 'user'}</span>
              </div>
            </div>
          </div>

          {/* Activity Stats */}
          <div className="apple-glass rounded-2xl p-6">
            <h2 className="text-xl font-bold text-white mb-6 font-display flex items-center gap-2">
              <Film className="w-5 h-5 text-apple-blue" />
              Activity
            </h2>

            <div className="space-y-4">
              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60 text-sm">Total Bookings</span>
                  <Ticket className="w-4 h-4 text-apple-blue" />
                </div>
                <div className="text-3xl font-bold text-white font-display">{bookings.length}</div>
                <div className="text-xs text-white/40 mt-1">All time</div>
              </div>

              <div className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white/60 text-sm">Movies Watched</span>
                  <Film className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-3xl font-bold text-white font-display">
                  {new Set(bookings.map((b: any) => typeof b.showtimeId?.movieId === 'object' ? b.showtimeId.movieId._id : b.showtimeId?.movieId)).size}
                </div>
                <div className="text-xs text-white/40 mt-1">Unique titles</div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity (Placeholder) */}
        {isOwnProfile && (
          <div className="mt-8 apple-glass rounded-2xl p-6 animate-slide-up delay-400">
            <h2 className="text-xl font-bold text-white mb-6 font-display">Recent Activity</h2>

            <div className="text-center py-12">
              <Ticket className="w-16 h-16 text-white/20 mx-auto mb-4" />
              <p className="text-white/60">No recent activity</p>
              <p className="text-white/40 text-sm mt-2">Your booking history will appear here</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
