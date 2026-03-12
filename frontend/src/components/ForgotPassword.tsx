import { useState } from "react";
import { toast } from "sonner";
import { api } from "../lib/api";

interface ForgotPasswordProps {
    onBack: () => void;
}

export function ForgotPassword({ onBack }: ForgotPasswordProps) {
    const [submitting, setSubmitting] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSubmitting(true);

        try {
            const formData = new FormData(e.target as HTMLFormElement);
            const email = formData.get("email") as string;

            const response = await api.forgotPassword(email);
            setIsSent(true);
            toast.success(response.message || "Reset link sent!");
        } catch (error: any) {
            toast.error(error.message || "Failed to send reset link. Please try again.");
        } finally {
            setSubmitting(false);
        }
    };

    if (isSent) {
        return (
            <div className="w-full text-center">
                <div className="mb-6 text-green-400">
                    <svg className="w-16 h-16 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-lg">Check Your Email</p>
                </div>
                <p className="text-white/70 mb-6">
                    If an account exists with that email, we've sent instructions to reset your password.
                </p>
                <button
                    type="button"
                    className="text-apple-blue hover:text-blue-400 font-medium cursor-pointer"
                    onClick={onBack}
                >
                    Return to Sign In
                </button>
            </div>
        );
    }

    return (
        <div className="w-full">
            <div className="mb-4 text-center">
                <p className="text-white/70 text-sm">
                    Enter your email address and we'll send you a link to reset your password.
                </p>
            </div>
            <form className="flex flex-col gap-form-field" onSubmit={handleSubmit}>
                <input
                    className="auth-input-field"
                    type="email"
                    name="email"
                    placeholder="Email address"
                    required
                />
                <button className="auth-button" type="submit" disabled={submitting}>
                    {submitting ? "Sending..." : "Send Reset Link"}
                </button>
                <div className="text-center mt-2">
                    <button
                        type="button"
                        className="text-white/60 hover:text-white text-sm hover:underline cursor-pointer transition-colors"
                        onClick={onBack}
                    >
                        Back to Sign In
                    </button>
                </div>
            </form>
        </div>
    );
}
