// utils/auth.ts
import { FormErrors } from "@/types/auth";
import { ZodError } from "zod";

export const transformZodErrors = (error: ZodError): FormErrors => {
  const errors: FormErrors = {};

  error.issues.forEach((issue) => {
    const fieldName = issue.path[0] as keyof FormErrors;
    errors[fieldName] = issue.message;
  });

  return errors;
};

export const sanitizeFormData = <T extends Record<string, any>>(
  data: T,
  sensitiveFields: (keyof T)[] = ["password", "confirmPassword"]
): T => {
  const sanitized = { ...data };

  sensitiveFields.forEach((field) => {
    if (field in sanitized) {
      sanitized[field] = "[REDACTED]" as T[keyof T];
    }
  });

  return sanitized;
};

export const getPasswordStrength = (
  password: string
): {
  score: number;
  feedback: string;
  color: string;
} => {
  if (!password) {
    return { score: 0, feedback: "", color: "transparent" };
  }

  let score = 0;
  const checks = {
    length: password.length >= 8,
    lowercase: /[a-z]/.test(password),
    uppercase: /[A-Z]/.test(password),
    numbers: /\d/.test(password),
    special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
  };

  score = Object.values(checks).filter(Boolean).length;

  const strengthMap = {
    0: { feedback: "Very Weak", color: "bg-red-500" },
    1: { feedback: "Very Weak", color: "bg-red-500" },
    2: { feedback: "Weak", color: "bg-orange-500" },
    3: { feedback: "Fair", color: "bg-yellow-500" },
    4: { feedback: "Good", color: "bg-blue-500" },
    5: { feedback: "Strong", color: "bg-green-500" },
  };

  return {
    score,
    ...strengthMap[score as keyof typeof strengthMap],
  };
};
