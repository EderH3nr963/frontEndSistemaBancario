import type React from "react";
import { sendCodeService } from "../../services/auth/authServices";

interface IFormStep4Props {
  codigoVerificacao: string;
  setCodigoVerificacao: React.Dispatch<React.SetStateAction<string>>;
  email: string;
}

export default function FormStep4({
  codigoVerificacao,
  setCodigoVerificacao,
  email,
}: IFormStep4Props) {
  return (
    <>
      <h1 className="text-white text-4xl font-bold">Código de verificação</h1>
      <h2 className="text-gray-400 text-2xl font-bold">
        Enviamos um código de verificação para seu email
      </h2>

      <section className="flex flex-col gap-4 mt-4">
        {/* Código de verificação */}
        <div className="relative w-full">
          <input
            type="text"
            id="codigo"
            placeholder=" "
            className="peer w-full border-b-2 border-gray-400 bg-transparent px-2 pt-6 pb-2 text-white outline-none"
            value={codigoVerificacao}
            onChange={(e) => setCodigoVerificacao(e.target.value)}
            maxLength={6}
          />
          <label
            htmlFor="codigo"
            className="absolute left-2 top-1 text-gray-400 text-sm transition-all 
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white 
              peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-400 cursor-text"
          >
            Código de verificação (6 dígitos)
          </label>
        </div>
      </section>

      <button
        className="text-lg text-blue-500"
        onClick={async () => {
          try {
            await sendCodeService(email);
          } catch {
            // pass
          }
        }}
      >
        Reenviar o email
      </button>
    </>
  );
}
