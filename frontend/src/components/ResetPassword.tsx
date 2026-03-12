import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { api } from "../lib/api";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";
import { FloatingOrbs } from "./FloatingOrbs";

export function ResetPassword() {
    const { token } = useParams<{ token: string }>();
    const navigate = useNavigate();

    const [submitting, setSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        password: "",
        confirmPassword: ""
    });
    const [errors, setErrors] = useState<{ password?: string; confirmPassword?: string }>({});

    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (!formData.password) {
            newErrors.password = "New password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }

        if (!formData.confirmPassword) {
            newErrors.confirmPassword = "Please confirm your new password";
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm() || !token) {
            if (!token) toast.error("Invalid reset token.");
            return;
        }

        setSubmitting(true);
        try {
            await api.resetPassword(token, formData.password);
            toast.success("Password has been reset successfully!");
            // Navigate to homepage so they can login
            navigate("/", { replace: true });
        } catch (error: any) {
            toast.error(error.message || "Failed to reset password. The link might be expired.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-black">
            <FloatingOrbs />

            <div className="relative z-10 w-full max-w-md">
                <div className="apple-glass rounded-3xl p-8 shadow-2xl animate-fade-in border border-white/10">
                    <div className="text-center mb-8">
                        <h2 className="text-3xl font-bold font-display apple-text-gradient mb-2">
                            Set New Password
                        </h2>
                        <p className="text-white/60">
                            Please enter your new password below.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* New Password */}
                        <div>
                            <label className="block text-white/80 text-sm font-medium mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full bg-white/5 border ${errors.password ? 'border-red-400' : 'border-white/10'
                                        } rounded-xl px-12 py-3 text-white placeholder-white/40 focus:outline-none focus:border-apple-blue transition-colors pr-12`}
                                    placeholder="Enter new password (min 6 chars)"
                                    disabled={submitting}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-red-400 text-sm mt-1">{errors.password}</p>
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
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    className={`w-full bg-white/5 border ${errors.confirmPassword ? 'border-red-400' :
                                            formData.confirmPassword && formData.password === formData.confirmPassword ? 'border-green-400' :
                                                'border-white/10'
                                        } rounded-xl px-12 py-3 text-white placeholder-white/40 focus:outline-none focus:border-apple-blue transition-colors pr-12`}
                                    placeholder="Confirm new password"
                                    disabled={submitting}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                                {formData.confirmPassword && formData.password === formData.confirmPassword && (
                                    <CheckCircle className="absolute right-12 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
                                )}
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full apple-button py-3 px-4 rounded-xl font-medium transition-all duration-300 transform active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                            disabled={submitting}
                        >
                            {submitting ? "Resetting..." : "Reset Password"}
                        </button>
                        <div className="text-center">
                            <button
                                type="button"
                                onClick={() => navigate('/')}
                                className="text-white/60 hover:text-white text-sm transition-colors"
                            >
                                Return to home
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
