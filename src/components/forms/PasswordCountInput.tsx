import { useRef } from "react";

interface PasswordInputProps {
  length: number;
  onChange: (value: string) => void;
}

export default function PasswordInput({
  length,
  onChange,
}: PasswordInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;

    if (!/^\d*$/.test(value)) return; // Apenas números (pode remover esta linha se quiser aceitar letras)

    e.target.value = value.slice(-1); // Garante que só tenha 1 caractere por input

    // Monta a senha a partir dos inputs
    const password = inputsRef.current
      .map((input) => input?.value || "")
      .join("");
    onChange(password);

    // Move para o próximo input automaticamente
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }

    // Se apagar, volta o foco para o anterior
    if (!value && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return (
    <div className="flex justify-center gap-2">
      {Array.from({ length }).map((_, index) => (
        <input
          key={index}
          type="password"
          maxLength={1}
          className="w-12 h-12 text-center text-xl border border-gray-400 rounded text-white"
          onChange={(e) => handleChange(e, index)}
          ref={(el) => (inputsRef.current[index] = el)}
        />
      ))}
    </div>
  );
}
