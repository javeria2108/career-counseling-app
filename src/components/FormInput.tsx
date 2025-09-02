import { FormInputProps } from "@/types/auth";
import { forwardRef } from "react";

// Using forwardRef for proper ref forwarding (needed for form libraries)
const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, icon, className = "", ...props }, ref) => {
    return (
      <div className="space-y-2">
        {/* Label (optional) */}
        {label && (
          <label className="block text-sm font-medium text-subtle">
            {label}
          </label>
        )}

        {/* Input container with icon support */}
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted">
              {icon}
            </div>
          )}

          <input
            ref={ref}
            className={`
              w-full bg-btn-bg border border-border text-heading placeholder-muted 
              px-4 py-3 rounded-lg transition-all duration-200
              focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
              hover:border-accent/50
              ${icon ? "pl-12" : "pl-4"}
              ${error ? "border-red-500 focus:ring-red-500" : ""}
              ${className}
            `}
            {...props}
          />
        </div>

        {/* Error message */}
        {error && (
          <p className="text-sm text-red-400 flex items-center space-x-1">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </p>
        )}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export default FormInput;
