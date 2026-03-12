import { useState } from "react";
import { X, Lock, Eye, EyeOff, Save, Loader, CheckCircle } from "lucide-react";
import { api } from "../lib/api";
import { toast } from "sonner";

interface ChangePasswordModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function ChangePasswordModal({ isOpen, onClose }: ChangePasswordModalProps) {
    const [formData, setFormData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [showPasswords, setShowPasswords] = useState({
        current: false,
        new: false,
        confirm: false,
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<{ currentPassword?: string; newPassword?: string; confirmPassword?: string }>({});

    if (!isOpen) return null;

    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (!formData.currentPassword) {
            newErrors.currentPassword = "Current password is required";
        }

        if (!formData.newPassword) {
            newErrors.newPassword = "New password is required";
        } else if (formData.newPassword.length < 6) {
            newErrors.newPassword = "Password must be at least 6 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your new password";
        } else if (formData.newPassword !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        if (formData.currentPassword && formData.newPassword && formData.currentPassword === formData.newPassword) {
            newErrors.newPassword = "New password must be different from current password";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setLoading(true);
        try {
            await api.changePassword(formData.currentPassword, formData.newPassword);
            toast.success("Password changed successfully!");
            setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
            onClose();
        } catch (error) {
            console.error("Failed to change password:", error);
            const message = error instanceof Error ? error.message : "Failed to change password";
            toast.error(message);
            if (message.toLowerCase().includes("current password")) {
                setErrors(prev => ({ ...prev, currentPassword: message }));
            }
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    const toggleShowPassword = (field: 'current' | 'new' | 'confirm') => {
        setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
    };

    const getPasswordStrength = (password: string) => {
        if (!password) return { level: 0, label: "", color: "" };
        let score = 0;
        if (password.length >= 6) score++;
        if (password.length >= 8) score++;
        if (/[A-Z]/.test(password)) score++;
        if (/[0-9]/.test(password)) score++;
        if (/[^A-Za-z0-9]/.test(password)) score++;

        if (score <= 1) return { level: 1, label: "Weak", color: "bg-red-500" };
        if (score <= 2) return { level: 2, label: "Fair", color: "bg-orange-500" };
        if (score <= 3) return { level: 3, label: "Good", color: "bg-yellow-500" };
        if (score <= 4) return { level: 4, label: "Strong", color: "bg-green-400" };
        return { level: 5, label: "Very Strong", color: "bg-emerald-400" };
    };

    const strength = getPasswordStrength(formData.newPassword);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative premium-glass rounded-3xl p-8 max-w-md w-full animate-scale-in">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold font-display">
                        <span className="apple-text-gradient">Change Password</span>
                    </h2>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-white/10 rounded-xl transition-colors"
                        disabled={loading}
                    >
                        <X className="w-5 h-5 text-white/60" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Current Password */}
                    <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                            Current Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type={showPasswords.current ? "text" : "password"}
                                name="currentPassword"
                                value={formData.currentPassword}
                                onChange={handleChange}
                                className={`w-full bg-white/5 border ${errors.currentPassword ? 'border-red-400' : 'border-white/10'
                                    } rounded-xl px-12 py-3 text-white placeholder-white/40 focus:outline-none focus:border-apple-blue transition-colors pr-12`}
                                placeholder="Enter current password"
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => toggleShowPassword('current')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                            >
                                {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.currentPassword && (
                            <p className="text-red-400 text-sm mt-1">{errors.currentPassword}</p>
                        )}
                    </div>

                    {/* New Password */}
                    <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                            New Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type={showPasswords.new ? "text" : "password"}
                                name="newPassword"
                                value={formData.newPassword}
                                onChange={handleChange}
                                className={`w-full bg-white/5 border ${errors.newPassword ? 'border-red-400' : 'border-white/10'
                                    } rounded-xl px-12 py-3 text-white placeholder-white/40 focus:outline-none focus:border-apple-blue transition-colors pr-12`}
                                placeholder="Enter new password (min 6 characters)"
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => toggleShowPassword('new')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                            >
                                {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.newPassword && (
                            <p className="text-red-400 text-sm mt-1">{errors.newPassword}</p>
                        )}
                        {/* Password Strength Indicator */}
                        {formData.newPassword && (
                            <div className="mt-2">
                                <div className="flex gap-1 mb-1">
                                    {[1, 2, 3, 4, 5].map((level) => (
                                        <div
                                            key={level}
                                            className={`h-1 flex-1 rounded-full transition-colors ${level <= strength.level ? strength.color : 'bg-white/10'
                                                }`}
                                        />
                                    ))}
                                </div>
                                <p className={`text-xs ${strength.level <= 2 ? 'text-red-400' : 'text-green-400'}`}>
                                    {strength.label}
                                </p>
                            </div>
                        )}
                    </div>

                    {/* Confirm Password */}
                    <div>
                        <label className="block text-white/80 text-sm font-medium mb-2">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                            <input
                                type={showPasswords.confirm ? "text" : "password"}
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`w-full bg-white/5 border ${errors.confirmPassword ? 'border-red-400' :
                                    formData.confirmPassword && formData.newPassword === formData.confirmPassword ? 'border-green-400' :
                                        'border-white/10'
                                    } rounded-xl px-12 py-3 text-white placeholder-white/40 focus:outline-none focus:border-apple-blue transition-colors pr-12`}
                                placeholder="Confirm new password"
                                disabled={loading}
                            />
                            <button
                                type="button"
                                onClick={() => toggleShowPassword('confirm')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                            >
                                {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                            </button>
                            {formData.confirmPassword && formData.newPassword === formData.confirmPassword && (
                                <CheckCircle className="absolute right-12 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
                            )}
                        </div>
                        {errors.confirmPassword && (
                            <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                        )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3 pt-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl font-medium transition-colors"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 apple-button px-6 py-3 rounded-xl font-medium flex items-center justify-center gap-2"
                            disabled={loading}
                        >
                            {loading ? (
                                <>
                                    <Loader className="w-4 h-4 animate-spin" />
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    Change Password
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
