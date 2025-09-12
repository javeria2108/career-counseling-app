// components/ui/FormInput.tsx
import React from "react";

interface FormInputProps {
  type: "text" | "email" | "password" | "number";
  name: string;
  placeholder: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  disabled?: boolean;
  autoComplete?: string;
  required?: boolean;
  min?: string;
  max?: string;
  className?: string;
}

export const FormInput: React.FC<FormInputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  autoComplete,
  required = false,
  min,
  max,
  className = "",
}) => {
  return (
    <div className={className}>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        autoComplete={autoComplete}
        required={required}
        min={min}
        max={max}
        className={`
          w-full bg-btn-bg border text-heading placeholder-muted 
          px-4 py-3 rounded-lg transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
          hover:border-accent/50 disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? "border-red-500 focus:ring-red-500" : "border-border"}
        `}
      />
      {error && (
        <p className="text-red-400 text-xs mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
