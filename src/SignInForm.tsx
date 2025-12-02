import { useState } from "react";
import { toast } from "sonner";
import { useAuth } from "./lib/auth";
import { SignInFormProps } from "./lib/types";

export function SignInForm({ onSignIn }: SignInFormProps) {
  const { login, register } = useAuth();
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    void (async () => {
      try {
        const formData = new FormData(e.target as HTMLFormElement);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        if (flow === "signIn") {
          const user = await login(email, password);
          toast.success("Signed in successfully!");
          onSignIn(user);
        } else {
          const user = await register(email, password, email.split("@")[0]);
          toast.success("Account created successfully!");
          onSignIn(user);
        }
      } catch (error: unknown) {
        let toastMessage = "";
        const errorMsg = error instanceof Error ? error.message : "Unknown error";

        if (errorMsg.includes("Invalid email or password")) {
          toastMessage = "Invalid email or password. Please try again.";
        } else if (errorMsg.includes("already exists")) {
          toastMessage = "User already exists with this email.";
        } else if (flow === "signIn") {
          toastMessage = "Could not sign in. Please check your credentials.";
        } else {
          toastMessage = "Could not create account. Please try again.";
        }
        toast.error(toastMessage);
      } finally {
        setSubmitting(false);
      }
    })();
  };

  return (
    <div className="w-full">
      <form className="flex flex-col gap-form-field" onSubmit={handleSubmit}>
        <input
          className="auth-input-field"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <input
          className="auth-input-field"
          type="password"
          name="password"
          placeholder="Password"
          required
          minLength={6}
        />
        <button className="auth-button" type="submit" disabled={submitting}>
          {submitting ? "Please wait..." : (flow === "signIn" ? "Sign in" : "Sign up")}
        </button>
        <div className="text-center text-sm text-gray-600">
          <span>
            {flow === "signIn"
              ? "Don't have an account? "
              : "Already have an account? "}
          </span>
          <button
            type="button"
            className="text-blue-600 hover:text-blue-700 hover:underline font-medium cursor-pointer"
            onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
          >
            {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
          </button>
        </div>
      </form>
    </div>
  );
}
