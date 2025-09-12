"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { FormErrors, LoginFormData } from "@/types/auth";
import { loginFormSchema } from "@/validations/authValidations";
import { SocialLoginButton } from "@/components/ui/SocialLoginButton";
import { FormInput } from "@/components/ui/FormInput";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { ErrorAlert } from "@/components/ui/ErrorAlert";

const SOCIAL_PROVIDERS = [
  { name: "google", icon: "google" },
  { name: "facebook", icon: "facebook" },
  { name: "twitter", icon: "twitter" },
] as const;

const LoginPage = () => {
  // State management with proper initialization
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Memoized handlers for better performance
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value, type, checked } = e.target;
      const fieldValue = type === "checkbox" ? checked : value;

      setFormData((prev) => ({ ...prev, [name]: fieldValue }));

      // Clear error for the field being edited
      if (errors[name as keyof FormErrors]) {
        setErrors((prev) => ({ ...prev, [name]: undefined }));
      }
    },
    [errors]
  );

  const validateForm = useCallback((data: LoginFormData): boolean => {
    const result = loginFormSchema.safeParse(data);

    if (!result.success) {
      const newErrors: FormErrors = {};
      result.error.issues.forEach((issue) => {
        const fieldName = issue.path[0] as keyof FormErrors;
        newErrors[fieldName] = issue.message;
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      // API call would go here
      // const result = await loginUser(formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Login successful:", { ...formData, password: "[REDACTED]" });
      // Handle successful login (redirect, store tokens, etc.)
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Login failed. Please check your credentials and try again.";

      setErrors({ general: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = useCallback((provider: string) => {
    console.log(`Social login with ${provider}`);
    // Implement social login logic
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full">
        {/* Header Section */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-heading mb-2">Welcome Back</h1>
          <p className="text-subtle">Sign in to continue your career journey</p>
        </header>

        {/* Main Form Card */}
        <main className="bg-overlay backdrop-blur-xl rounded-2xl p-8 border border-border shadow-2xl">
          {/* Social Login Section */}
          <section className="mb-6">
            <div className="grid grid-cols-3 gap-3 mb-6">
              {SOCIAL_PROVIDERS.map((provider) => (
                <SocialLoginButton
                  key={provider.name}
                  provider={provider.name}
                  icon={provider.icon}
                  onClick={() => handleSocialLogin(provider.name)}
                  disabled={isLoading}
                />
              ))}
            </div>

            <div className="flex items-center mb-6">
              <div className="flex-1 border-t border-border" />
              <span className="px-4 text-muted text-sm">
                Or sign in with email
              </span>
              <div className="flex-1 border-t border-border" />
            </div>
          </section>

          {/* Error Display */}
          {errors.general && (
            <ErrorAlert message={errors.general} className="mb-6" />
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <FormInput
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              error={errors.email}
              disabled={isLoading}
              autoComplete="email"
              required
            />

            <FormInput
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              error={errors.password}
              disabled={isLoading}
              autoComplete="current-password"
              required
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  className="sr-only"
                />
                <div
                  className={`
                  w-5 h-5 rounded border-2 flex items-center justify-center mr-3 transition-all duration-200
                  ${
                    formData.rememberMe
                      ? "bg-accent border-accent"
                      : "bg-transparent border-border hover:border-accent/50"
                  }
                `}
                >
                  {formData.rememberMe && (
                    <svg
                      className="w-3 h-3 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
                <span className="text-subtle text-sm select-none">
                  Remember me
                </span>
              </label>

              <Link
                href="/forgot-password"
                className="text-accent hover:text-accent-light text-sm font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            <SubmitButton
              isLoading={isLoading}
              loadingText="Signing In..."
              text="SIGN IN"
            />
          </form>

          {/* Signup Link */}
          <footer className="mt-6 text-center">
            <p className="text-subtle">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="text-accent hover:text-accent-light transition-colors font-medium"
              >
                Create one here
              </Link>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default LoginPage;
