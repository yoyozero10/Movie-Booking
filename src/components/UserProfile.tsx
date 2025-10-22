import { useState, useEffect } from "react";
import { User, Edit, Calendar, Mail } from "lucide-react";
import { useAuth } from "../lib/auth";
import { api } from "../lib/api";

interface UserProfileProps {
  userId?: string; // Optional - if not provided, shows current user
}

export function UserProfile({ userId }: UserProfileProps) {
  const [profileUser, setProfileUser] = useState<any>(null);
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
        } else {
          // Validate userId (simple ObjectId hex string check) before requesting
          const isValidObjectId = typeof userId === 'string' && /^[a-fA-F0-9]{24}$/.test(userId);
          if (!isValidObjectId) {
            throw new Error('Invalid user ID format');
          }

          // Get specific user's profile
          userData = await api.getUserById(userId as string);
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
      <div className="min-h-screen bg-gray-900 pt-20 flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-400"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-red-400 text-lg mb-2">Error</div>
          <div className="text-gray-300">{error}</div>
        </div>
      </div>
    );
  }

  if (!profileUser) {
    return (
      <div className="min-h-screen bg-gray-900 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-400 text-lg mb-2">User not found</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 pt-20">
      <div className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center space-x-4">
              <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center">
                <User className="w-10 h-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{profileUser.name}</h1>
                <p className="text-gray-400 flex items-center mt-1">
                  <Mail className="w-4 h-4 mr-2" />
                  {profileUser.email}
                </p>
              </div>
            </div>

            {isOwnProfile && (
              <button className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white rounded-full font-medium transition-colors flex items-center">
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>

          {/* Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center text-gray-300">
                <User className="w-5 h-5 mr-3 text-pink-400" />
                <span className="font-medium">Name:</span>
                <span className="ml-2 text-white">{profileUser.name}</span>
              </div>

              <div className="flex items-center text-gray-300">
                <Mail className="w-5 h-5 mr-3 text-pink-400" />
                <span className="font-medium">Email:</span>
                <span className="ml-2 text-white">{profileUser.email}</span>
              </div>

              <div className="flex items-center text-gray-300">
                <Calendar className="w-5 h-5 mr-3 text-pink-400" />
                <span className="font-medium">Member since:</span>
                <span className="ml-2 text-white">
                  {new Date(profileUser.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Account Status</h3>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-400 rounded-full mr-2"></div>
                  <span className="text-green-400">Active</span>
                </div>
              </div>

              <div className="bg-gray-700 rounded-lg p-4">
                <h3 className="text-white font-semibold mb-2">Role</h3>
                <span className="text-gray-300">Standard User</span>
              </div>
            </div>
          </div>

          {/* Demo: View Other Users Section (only for own profile) */}
          {isOwnProfile && (
            <div className="mt-8 border-t border-gray-700 pt-6">
              <h2 className="text-xl font-semibold text-white mb-4">Browse Other Users</h2>
              <div className="bg-gray-700 rounded-lg p-4">
                <p className="text-gray-300 mb-4">
                  You can view other users' profiles using their user ID:
                </p>
                <div className="space-y-2">
                  <button
                    onClick={() => window.open('/profile', '_blank')}
                    className="block w-full text-left px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded transition-colors"
                  >
                    View Your Profile
                  </button>
                  <p className="text-sm text-gray-400 mt-2">
                    💡 Tip: Replace "demo-user-1" with any actual user ID from your database
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
