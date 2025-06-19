import type { InputHTMLAttributes } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export default function FormInput({
  label,
  error,
  className = "",
  ...props
}: FormInputProps) {
  return (
    <div className="relative w-full">
      <input
        {...props}
        placeholder=" "
        className={`peer w-full border-b-2 ${
          error ? "border-red-500" : "border-gray-400"
        } bg-transparent px-2 pt-6 pb-2 text-white outline-none ${className}`}
      />
      <label
        htmlFor={props.id}
        className="absolute left-2 top-1 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-400"
      >
        {label}
      </label>
      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
}
