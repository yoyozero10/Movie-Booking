import { useEffect, useState } from 'react';
import { Users, Shield, Trash2, Search, UserCog } from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';

interface User {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    createdAt: string;
}

export function UserManagement() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterRole, setFilterRole] = useState<'all' | 'user' | 'admin'>('all');

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await api.getAllUsers();
            if (response.success) {
                setUsers(response.data);
            }
        } catch (error) {
            console.error('Error fetching users:', error);
            toast.error('Failed to load users');
        } finally {
            setLoading(false);
        }
    };

    const handleRoleChange = async (userId: string, currentRole: string, userName: string) => {
        const newRole = currentRole === 'admin' ? 'user' : 'admin';

        if (!confirm(`Are you sure you want to change ${userName}'s role to ${newRole}?`)) {
            return;
        }

        try {
            const response = await api.updateUserRole(userId, newRole);
            if (response.success) {
                toast.success(`User role updated to ${newRole}`);
                setUsers(prev => prev.map(user =>
                    user._id === userId ? { ...user, role: newRole as 'user' | 'admin' } : user
                ));
            }
        } catch (error: any) {
            console.error('Error updating user role:', error);
            toast.error(error.message || 'Failed to update user role');
        }
    };

    const handleDeleteUser = async (userId: string, userName: string) => {
        if (!confirm(`Are you sure you want to delete user "${userName}"? This action cannot be undone.`)) {
            return;
        }

        try {
            const response = await api.deleteUser(userId);
            if (response.success) {
                toast.success('User deleted successfully');
                setUsers(prev => prev.filter(user => user._id !== userId));
            }
        } catch (error: any) {
            console.error('Error deleting user:', error);
            toast.error(error.message || 'Failed to delete user');
        }
    };

    const filteredUsers = users.filter(user => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = filterRole === 'all' || user.role === filterRole;
        return matchesSearch && matchesRole;
    });

    const userCount = users.filter(u => u.role === 'user').length;
    const adminCount = users.filter(u => u.role === 'admin').length;

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apple-blue"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white font-display">User Management</h1>
                    <p className="text-white/60 mt-1">
                        {users.length} total users ({adminCount} admins, {userCount} regular users)
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="apple-glass rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-purple-400/10 flex items-center justify-center">
                            <Users className="w-6 h-6 text-purple-400" />
                        </div>
                        <div>
                            <p className="text-white/50 text-sm">Total Users</p>
                            <h4 className="text-2xl font-bold text-white font-display">{users.length}</h4>
                        </div>
                    </div>
                </div>
                <div className="apple-glass rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-apple-blue/10 flex items-center justify-center">
                            <UserCog className="w-6 h-6 text-apple-blue" />
                        </div>
                        <div>
                            <p className="text-white/50 text-sm">Regular Users</p>
                            <h4 className="text-2xl font-bold text-white font-display">{userCount}</h4>
                        </div>
                    </div>
                </div>
                <div className="apple-glass rounded-2xl p-6">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-xl bg-green-400/10 flex items-center justify-center">
                            <Shield className="w-6 h-6 text-green-400" />
                        </div>
                        <div>
                            <p className="text-white/50 text-sm">Administrators</p>
                            <h4 className="text-2xl font-bold text-white font-display">{adminCount}</h4>
                        </div>
                    </div>
                </div>
            </div>

            <div className="apple-glass rounded-2xl p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-white/50" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by name or email..."
                            className="auth-input-field pl-10"
                        />
                    </div>
                    <div>
                        <select
                            value={filterRole}
                            onChange={(e) => setFilterRole(e.target.value as 'all' | 'user' | 'admin')}
                            className="auth-input-field"
                        >
                            <option value="all">All Roles</option>
                            <option value="user">Regular Users</option>
                            <option value="admin">Administrators</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="apple-glass rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5">
                            <tr className="text-left">
                                <th className="px-6 py-4 text-white/80 font-semibold">User</th>
                                <th className="px-6 py-4 text-white/80 font-semibold">Email</th>
                                <th className="px-6 py-4 text-white/80 font-semibold">Role</th>
                                <th className="px-6 py-4 text-white/80 font-semibold">Joined</th>
                                <th className="px-6 py-4 text-white/80 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((user) => (
                                <tr
                                    key={user._id}
                                    className="border-t border-white/10 hover:bg-white/5 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-apple-blue to-purple-500 flex items-center justify-center text-white font-bold">
                                                {user.name.charAt(0).toUpperCase()}
                                            </div>
                                            <span className="font-medium text-white">{user.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-white/70">{user.email}</td>
                                    <td className="px-6 py-4">
                                        <span
                                            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium border whitespace-nowrap ${user.role === 'admin'
                                                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                                                    : 'bg-apple-blue/20 text-apple-blue border-apple-blue/30'
                                                }`}
                                        >
                                            {user.role === 'admin' ? (
                                                <>
                                                    <Shield className="w-3.5 h-3.5" />
                                                    Admin
                                                </>
                                            ) : (
                                                'User'
                                            )}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white/60">
                                        {new Date(user.createdAt).toLocaleDateString('vi-VN')}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleRoleChange(user._id, user.role, user.name)}
                                                className="px-3 py-1.5 rounded-lg text-sm font-medium bg-apple-blue/20 text-apple-blue hover:bg-apple-blue/30 transition-colors flex items-center gap-1 whitespace-nowrap"
                                                title={`Change to ${user.role === 'admin' ? 'user' : 'admin'}`}
                                            >
                                                <UserCog className="w-4 h-4" />
                                                {user.role === 'admin' ? 'Demote' : 'Promote'}
                                            </button>
                                            <button
                                                onClick={() => handleDeleteUser(user._id, user.name)}
                                                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
                                                title="Delete user"
                                            >
                                                <Trash2 className="w-4 h-4 text-red-400 group-hover:scale-110 transition-transform" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {filteredUsers.length === 0 && (
                <div className="apple-glass rounded-3xl p-12 text-center">
                    <Users className="w-16 h-16 text-white/30 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No Users Found</h3>
                    <p className="text-white/60">
                        {searchTerm || filterRole !== 'all'
                            ? 'Try adjusting your search or filters'
                            : 'No users in the system yet'}
                    </p>
                </div>
            )}
        </div>
    );
}
