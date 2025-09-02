"use client";
import { FormErrors, SignupFormData } from "@/types/auth";
import { formSchema } from "@/validations/authValidations";
import Link from "next/link";
import { useState } from "react";

const SignupPage = () => {
  // State for form data - using TypeScript generics
  const [formData, setFormData] = useState<SignupFormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    age: "",
    educationLevel: "",
  });

  // State for form errors and loading
  const [errors, setErrors] = useState<FormErrors>({});
  const [isLoading, setIsLoading] = useState(false);

  // Handle input changes with proper TypeScript typing
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (formData: SignupFormData): boolean => {
    const result = formSchema.safeParse(formData);

    if (!result.success) {
      const newErrors: Record<string, string> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as string; // e.g., "firstName"
        newErrors[field] = err.message;
      });
      setErrors(newErrors);
      return false;
    }

    setErrors({});
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm(formData)) {
      return;
    }

    setIsLoading(true);

    try {
      // Here you would typically make an API call
      // await signupUser(formData);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submitted:", formData);
      // Redirect to dashboard or show success message
    } catch (error) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-heading mb-2">
            Create Your Account
          </h1>
          <p className="text-subtle">
            Start your career discovery journey today
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-overlay backdrop-blur-xl rounded-2xl p-8 border border-border shadow-2xl">
          {/* Social Login Options */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            <button className="bg-btn-bg hover:bg-btn-hover text-btn-text py-3 rounded-lg flex items-center justify-center border border-border transition-all duration-200 hover:-translate-y-1">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            </button>
            <button className="bg-btn-bg hover:bg-btn-hover text-btn-text py-3 rounded-lg flex items-center justify-center border border-border transition-all duration-200 hover:-translate-y-1">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </button>
            <button className="bg-btn-bg hover:bg-btn-hover text-btn-text py-3 rounded-lg flex items-center justify-center border border-border transition-all duration-200 hover:-translate-y-1">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
              </svg>
            </button>
          </div>

          <div className="flex items-center mb-6">
            <div className="flex-1 border-t border-border"></div>
            <span className="px-4 text-muted text-sm">
              Or create a new account
            </span>
            <div className="flex-1 border-t border-border"></div>
          </div>

          {/* General Error Message */}
          {errors.general && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-red-400 text-sm">{errors.general}</p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`
                    w-full bg-btn-bg border text-heading placeholder-muted 
                    px-4 py-3 rounded-lg transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
                    hover:border-accent/50
                    ${errors.firstName ? "border-red-500" : "border-border"}
                  `}
                />
                {errors.firstName && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`
                    w-full bg-btn-bg border text-heading placeholder-muted 
                    px-4 py-3 rounded-lg transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
                    hover:border-accent/50
                    ${errors.lastName ? "border-red-500" : "border-border"}
                  `}
                />
                {errors.lastName && (
                  <p className="text-red-400 text-xs mt-1">{errors.lastName}</p>
                )}
              </div>
            </div>

            {/* Email */}
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleInputChange}
                className={`
                  w-full bg-btn-bg border text-heading placeholder-muted 
                  px-4 py-3 rounded-lg transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
                  hover:border-accent/50
                  ${errors.email ? "border-red-500" : "border-border"}
                `}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            {/* Age and Education Level */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <input
                  type="number"
                  name="age"
                  placeholder="Age"
                  min="13"
                  max="100"
                  value={formData.age}
                  onChange={handleInputChange}
                  className={`
                    w-full bg-btn-bg border text-heading placeholder-muted 
                    px-4 py-3 rounded-lg transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
                    hover:border-accent/50
                    ${errors.age ? "border-red-500" : "border-border"}
                  `}
                />
                {errors.age && (
                  <p className="text-red-400 text-xs mt-1">{errors.age}</p>
                )}
              </div>

              <div>
                <select
                  name="educationLevel"
                  value={formData.educationLevel}
                  onChange={handleInputChange}
                  className={`
                    w-full bg-btn-bg border text-heading 
                    px-4 py-3 rounded-lg transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
                    hover:border-accent/50
                    ${
                      errors.educationLevel ? "border-red-500" : "border-border"
                    }
                  `}
                >
                  <option value="" className="text-muted">
                    Education Level
                  </option>
                  <option value="high-school" className="text-heading">
                    High School
                  </option>
                  <option value="undergraduate" className="text-heading">
                    Undergraduate
                  </option>
                  <option value="graduate" className="text-heading">
                    Graduate
                  </option>
                  <option value="postgraduate" className="text-heading">
                    Postgraduate
                  </option>
                </select>
                {errors.educationLevel && (
                  <p className="text-red-400 text-xs mt-1">
                    {errors.educationLevel}
                  </p>
                )}
              </div>
            </div>

            {/* Password Fields */}
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className={`
                  w-full bg-btn-bg border text-heading placeholder-muted 
                  px-4 py-3 rounded-lg transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
                  hover:border-accent/50
                  ${errors.password ? "border-red-500" : "border-border"}
                `}
              />
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div>
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`
                  w-full bg-btn-bg border text-heading placeholder-muted 
                  px-4 py-3 rounded-lg transition-all duration-200
                  focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
                  hover:border-accent/50
                  ${errors.confirmPassword ? "border-red-500" : "border-border"}
                `}
              />
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full py-4 rounded-lg font-semibold text-lg transition-all duration-300
                ${
                  isLoading
                    ? "bg-btn-bg text-muted cursor-not-allowed"
                    : "bg-accent hover:bg-accent-light text-btn-text hover:-translate-y-1 hover:shadow-xl"
                }
              `}
            >
              {isLoading ? "Creating Account..." : "CREATE ACCOUNT"}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <p className="text-subtle">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-accent hover:text-accent-light transition-colors font-medium"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
