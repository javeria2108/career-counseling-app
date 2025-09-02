import { ReactNode } from "react";
import { InputHTMLAttributes, forwardRef } from "react";

export interface AuthLayoutProps {
  children: ReactNode;
}

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}
export interface SignupFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  age: string;
  educationLevel: string;
}

export interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  age?: string;
  educationLevel?: string;
  general?: string;
}
