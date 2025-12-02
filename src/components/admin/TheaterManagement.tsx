import { useEffect, useState } from 'react';
import { Building2, Plus, Edit, Trash2, X, Save, MapPin, Users } from 'lucide-react';
import { api } from '../../lib/api';
import { toast } from 'sonner';

interface Theater {
    _id: string;
    name: string;
    location: string;
    region: string;
    city: string;
    totalSeats: number;
}

interface TheaterFormData {
    name: string;
    location: string;
    region: string;
    city: string;
    totalSeats: number;
}

export function TheaterManagement() {
    const [theaters, setTheaters] = useState<Theater[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingTheater, setEditingTheater] = useState<Theater | null>(null);
    const [formData, setFormData] = useState<TheaterFormData>({
        name: '',
        location: '',
        region: '',
        city: 'TP. Hồ Chí Minh',
        totalSeats: 200,
    });

    useEffect(() => {
        fetchTheaters();
    }, []);

    const fetchTheaters = async () => {
        try {
            const data = await api.getTheaters();
            setTheaters(data);
        } catch (error) {
            console.error('Error fetching theaters:', error);
            toast.error('Failed to load theaters');
        } finally {
            setLoading(false);
        }
    };

    const handleOpenModal = (theater?: Theater) => {
        if (theater) {
            setEditingTheater(theater);
            setFormData({
                name: theater.name,
                location: theater.location,
                region: theater.region,
                city: theater.city,
                totalSeats: theater.totalSeats,
            });
        } else {
            setEditingTheater(null);
            setFormData({
                name: '',
                location: '',
                region: '',
                city: 'TP. Hồ Chí Minh',
                totalSeats: 200,
            });
        }
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditingTheater(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!formData.name || !formData.location || !formData.region) {
            toast.error('Please fill in all required fields');
            return;
        }

        if (formData.totalSeats < 50 || formData.totalSeats > 1000) {
            toast.error('Total seats must be between 50 and 1000');
            return;
        }

        try {
            if (editingTheater) {
                await api.updateTheater(editingTheater._id, formData);
                toast.success('Theater updated successfully');
            } else {
                await api.createTheater(formData);
                toast.success('Theater created successfully');
            }

            handleCloseModal();
            fetchTheaters();
        } catch (error: any) {
            console.error('Error saving theater:', error);
            toast.error(error.message || 'Failed to save theater');
        }
    };

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`Are you sure you want to delete "${name}"? This will also delete all associated showtimes.`)) {
            return;
        }

        try {
            await api.deleteTheater(id);
            toast.success('Theater deleted successfully');
            fetchTheaters();
        } catch (error: any) {
            console.error('Error deleting theater:', error);
            toast.error(error.message || 'Failed to delete theater');
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-apple-blue"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold text-white font-display">Theater Management</h1>
                    <p className="text-white/60 mt-1">{theaters.length} theaters in system</p>
                </div>
                <button
                    onClick={() => handleOpenModal()}
                    className="apple-button px-6 py-3 rounded-xl flex items-center gap-2 font-medium"
                >
                    <Plus className="w-5 h-5" />
                    Add Theater
                </button>
            </div>

            {/* Theaters Table */}
            <div className="apple-glass rounded-3xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-white/5">
                            <tr className="text-left">
                                <th className="px-6 py-4 text-white/80 font-semibold">Theater Name</th>
                                <th className="px-6 py-4 text-white/80 font-semibold">Location</th>
                                <th className="px-6 py-4 text-white/80 font-semibold">Region</th>
                                <th className="px-6 py-4 text-white/80 font-semibold">City</th>
                                <th className="px-6 py-4 text-white/80 font-semibold">Seats</th>
                                <th className="px-6 py-4 text-white/80 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {theaters.map((theater) => (
                                <tr
                                    key={theater._id}
                                    className="border-t border-white/10 hover:bg-white/5 transition-colors"
                                >
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-apple-blue/20 flex items-center justify-center">
                                                <Building2 className="w-5 h-5 text-apple-blue" />
                                            </div>
                                            <span className="font-semibold text-white">{theater.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-white/70">
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4 text-white/50" />
                                            {theater.location}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-lg bg-white/10 text-white text-sm">
                                            {theater.region}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-white/70">{theater.city}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 text-white">
                                            <Users className="w-4 h-4 text-white/50" />
                                            <span className="font-semibold">{theater.totalSeats}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleOpenModal(theater)}
                                                className="p-2 hover:bg-apple-blue/20 rounded-lg transition-colors group"
                                            >
                                                <Edit className="w-4 h-4 text-apple-blue group-hover:scale-110 transition-transform" />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(theater._id, theater.name)}
                                                className="p-2 hover:bg-red-500/20 rounded-lg transition-colors group"
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

            {/* Empty State */}
            {theaters.length === 0 && (
                <div className="apple-glass rounded-3xl p-12 text-center">
                    <Building2 className="w-16 h-16 text-white/30 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">No Theaters Yet</h3>
                    <p className="text-white/60 mb-6">Start by adding your first theater location</p>
                    <button
                        onClick={() => handleOpenModal()}
                        className="apple-button px-6 py-3 rounded-xl inline-flex items-center gap-2"
                    >
                        <Plus className="w-5 h-5" />
                        Add Theater
                    </button>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
                    <div className="premium-glass rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                        {/* Modal Header */}
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-white font-display">
                                {editingTheater ? 'Edit Theater' : 'Add New Theater'}
                            </h2>
                            <button
                                onClick={handleCloseModal}
                                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                            >
                                <X className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        {/* Form */}
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Name */}
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Theater Name <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="auth-input-field"
                                    placeholder="CinemaVision IMAX Downtown"
                                    required
                                />
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Location Address <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.location}
                                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                    className="auth-input-field"
                                    placeholder="123 Nguyễn Huệ, Quận 1"
                                    required
                                />
                            </div>

                            {/* Region & City */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        Region/District <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.region}
                                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                                        className="auth-input-field"
                                        placeholder="Quận 1"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-white/80 text-sm font-medium mb-2">
                                        City <span className="text-red-400">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                                        className="auth-input-field"
                                        placeholder="TP. Hồ Chí Minh"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Total Seats */}
                            <div>
                                <label className="block text-white/80 text-sm font-medium mb-2">
                                    Total Seats <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={formData.totalSeats}
                                    onChange={(e) => setFormData({ ...formData, totalSeats: parseInt(e.target.value) })}
                                    className="auth-input-field"
                                    placeholder="200"
                                    required
                                    min="50"
                                    max="1000"
                                />
                                <p className="text-white/50 text-xs mt-1">Range: 50-1000 seats</p>
                            </div>

                            {/* Buttons */}
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={handleCloseModal}
                                    className="flex-1 px-6 py-3 rounded-xl font-medium text-white bg-white/10 hover:bg-white/20 transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 apple-button px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                                >
                                    <Save className="w-5 h-5" />
                                    {editingTheater ? 'Update Theater' : 'Create Theater'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
