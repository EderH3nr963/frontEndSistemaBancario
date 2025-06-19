import type { InputHTMLAttributes } from "react";

/**
 * Props interface for the FormInput component
 * Extends HTML input attributes and adds custom props
 */
interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string; // Label text for the input
  error?: string; // Optional error message
}

/**
 * FormInput component - A reusable form input with floating label
 * Features:
 * - Floating label animation
 * - Error state handling
 * - Custom styling
 */
export default function FormInput({
  label,
  error,
  className = "",
  ...props
}: FormInputProps) {
  return (
    <div className="relative w-full">
      {/* Input field with dynamic styling based on error state */}
      <input
        {...props}
        placeholder=" "
        className={`peer w-full border-b-2 ${
          error ? "border-red-500" : "border-gray-400"
        } bg-transparent px-2 pt-6 pb-2 text-white outline-none ${className}`}
      />
      {/* Floating label that animates on focus/blur */}
      <label
        htmlFor={props.id}
        className="absolute left-2 top-1 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-400"
      >
        {label}
      </label>
      {/* Error message display */}
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
