interface FormSelectProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Array<{ value: string; label: string; disabled?: boolean }>;
  placeholder?: string;
  error?: string;
  disabled?: boolean;
  required?: boolean;
  className?: string;
}

export const FormSelect: React.FC<FormSelectProps> = ({
  name,
  value,
  onChange,
  options,
  placeholder,
  error,
  disabled = false,
  required = false,
  className = "",
}) => {
  return (
    <div className={className}>
      <select
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={`
          w-full bg-btn-bg border text-heading 
          px-4 py-3 rounded-lg transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
          hover:border-accent/50 disabled:opacity-50 disabled:cursor-not-allowed
          ${error ? "border-red-500 focus:ring-red-500" : "border-border"}
        `}
      >
        {placeholder && (
          <option value="" disabled className="text-muted">
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
            className="text-heading"
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="text-red-400 text-xs mt-1" role="alert">
          {error}
        </p>
      )}
    </div>
  );
};
