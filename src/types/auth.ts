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
