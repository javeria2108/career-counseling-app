import { z } from "zod";

// Reusable validation schemas
const emailSchema = z
  .string()
  .min(1, "Email is required")
  .email("Please enter a valid email address");

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/\d/, "Password must contain at least one number")
  .regex(
    /[!@#$%^&*(),.?":{}|<>]/,
    "Password must contain at least one special character"
  );

const nameSchema = z
  .string()
  .min(1, "This field is required")
  .min(2, "Must be at least 2 characters")
  .max(50, "Must be less than 50 characters")
  .regex(
    /^[a-zA-Z\s'-]+$/,
    "Only letters, spaces, hyphens, and apostrophes allowed"
  );

// Signup form validation schema
export const signupFormSchema = z
  .object({
    firstName: nameSchema,
    lastName: nameSchema,
    email: emailSchema,
    password: passwordSchema,
    confirmPassword: z.string().min(1, "Please confirm your password"),
    age: z
      .string()
      .min(1, "Age is required")
      .refine((val) => {
        const num = parseInt(val);
        return !isNaN(num) && num >= 13 && num <= 100;
      }, "Age must be between 13 and 100"),
    educationLevel: z
      .string()
      .min(1, "Please select your education level")
      .refine(
        (val) =>
          ["high-school", "undergraduate", "graduate", "postgraduate"].includes(
            val
          ),
        "Please select a valid education level"
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Login form validation schema
export const loginFormSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional().default(false),
});

// Export types for form data validation
export type SignupFormSchema = z.infer<typeof signupFormSchema>;
export type LoginFormSchema = z.infer<typeof loginFormSchema>;
