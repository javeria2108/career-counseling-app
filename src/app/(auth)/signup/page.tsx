"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { SignupFormData } from "@/types/auth";
import { signupFormSchema } from "@/validations/authValidations";
import { useFormValidation } from "@/hooks/useFormValidation";
import { useAsync } from "@/hooks/useAsync";
import { AuthService } from "@/services/authService";
import { sanitizeFormData } from "@/utils/auth";
import { FormInput } from "@/components/ui/FormInput";
import { FormSelect } from "@/components/ui/FormSelect";
import { SubmitButton } from "@/components/ui/SubmitButton";
import { ErrorAlert } from "@/components/ui/ErrorAlert";
import { SocialLoginButton } from "@/components/ui/SocialLoginButton";

// Constants
const EDUCATION_OPTIONS = [
  { value: "high-school", label: "High School" },
  { value: "undergraduate", label: "Undergraduate" },
  { value: "graduate", label: "Graduate" },
  { value: "postgraduate", label: "Postgraduate" },
] as const;

const SOCIAL_PROVIDERS = [
  { name: "google", icon: "google" },
  { name: "facebook", icon: "facebook" },
  { name: "twitter", icon: "twitter" },
] as const;

const AGE_CONSTRAINTS = {
  MIN: 13,
  MAX: 100,
} as const;

const INITIAL_FORM_DATA: SignupFormData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  age: "",
  educationLevel: "",
};

const SignupPage = () => {
  // Form state
  const [formData, setFormData] = useState<SignupFormData>(INITIAL_FORM_DATA);

  // Custom hooks
  const { errors, validateForm, clearError, setFieldError } =
    useFormValidation(signupFormSchema);
  const {
    loading: isLoading,
    error: apiError,
    execute: executeSignup,
  } = useAsync();

  // Handlers
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;

      setFormData((prev) => ({ ...prev, [name]: value }));

      // Clear field error when user starts typing
      if (errors[name as keyof typeof errors]) {
        clearError(name as keyof typeof errors);
      }
    },
    [errors, clearError]
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side validation
    if (!validateForm(formData)) {
      return;
    }

    try {
      await executeSignup(() => AuthService.signup(formData));

      // Log success (sanitized)
      console.log("Signup successful:", sanitizeFormData(formData));

      // Handle success (redirect, show message, etc.)
      // router.push('/dashboard');
    } catch (error) {
      console.error("Signup error:", error);

      // Handle specific API errors
      if (error instanceof Error) {
        if (error.message.includes("email")) {
          setFieldError("email", error.message);
        } else {
          setFieldError("general", error.message);
        }
      }
    }
  };

  const handleSocialLogin = useCallback(
    async (provider: string) => {
      try {
        console.log(`Initiating ${provider} login...`);
        // Implement social login logic
        // await AuthService.socialLogin(provider);
      } catch (error) {
        console.error(`${provider} login error:`, error);
        setFieldError("general", `Failed to sign in with ${provider}`);
      }
    },
    [setFieldError]
  );

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-heading mb-2">
            Create Your Account
          </h1>
          <p className="text-subtle">
            Start your career discovery journey today
          </p>
        </header>

        {/* Main Form Card */}
        <main className="bg-overlay backdrop-blur-xl rounded-2xl p-8 border border-border shadow-2xl">
          {/* Social Login Section */}
          <section className="mb-6" aria-labelledby="social-login-heading">
            <h2 id="social-login-heading" className="sr-only">
              Social Login Options
            </h2>

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
                Or create a new account
              </span>
              <div className="flex-1 border-t border-border" />
            </div>
          </section>

          {/* Error Display */}
          {(errors.general || apiError) && (
            <ErrorAlert
              message={errors.general || apiError || "An error occurred"}
              className="mb-6"
            />
          )}

          {/* Signup Form */}
          <form
            onSubmit={handleSubmit}
            className="space-y-4"
            noValidate
            aria-label="Create account form"
          >
            {/* Name Fields */}
            <fieldset className="grid grid-cols-2 gap-3">
              <legend className="sr-only">Personal Information</legend>

              <FormInput
                type="text"
                name="firstName"
                placeholder="First Name"
                value={formData.firstName}
                onChange={handleInputChange}
                error={errors.firstName}
                disabled={isLoading}
                autoComplete="given-name"
                required
              />

              <FormInput
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={formData.lastName}
                onChange={handleInputChange}
                error={errors.lastName}
                disabled={isLoading}
                autoComplete="family-name"
                required
              />
            </fieldset>

            {/* Email Field */}
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

            {/* Age and Education */}
            <fieldset className="grid grid-cols-2 gap-3">
              <legend className="sr-only">Demographics</legend>

              <FormInput
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleInputChange}
                error={errors.age}
                disabled={isLoading}
                min={AGE_CONSTRAINTS.MIN.toString()}
                max={AGE_CONSTRAINTS.MAX.toString()}
                required
              />

              <FormSelect
                name="educationLevel"
                value={formData.educationLevel}
                onChange={handleInputChange}
                options={[...EDUCATION_OPTIONS]}
                placeholder="Education Level"
                error={errors.educationLevel}
                disabled={isLoading}
                required
              />
            </fieldset>

            {/* Password Fields */}
            <fieldset className="space-y-4">
              <legend className="sr-only">Account Security</legend>

              <FormInput
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                error={errors.password}
                disabled={isLoading}
                autoComplete="new-password"
                required
              />

              <FormInput
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                error={errors.confirmPassword}
                disabled={isLoading}
                autoComplete="new-password"
                required
              />
            </fieldset>

            {/* Submit Button */}
            <SubmitButton
              isLoading={isLoading}
              loadingText="Creating Account..."
              text="CREATE ACCOUNT"
            />
          </form>

          {/* Login Link */}
          <footer className="mt-6 text-center">
            <p className="text-subtle">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-accent hover:text-accent-light transition-colors font-medium focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 rounded"
              >
                Sign in here
              </Link>
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default SignupPage;
