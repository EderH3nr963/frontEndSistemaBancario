import type React from "react";

interface IFormConta {
  tipo_conta: "corrente" | "poupanca" | "";
  password: string;
}

interface IFormUsuario {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  cpf: string;
  telefone: string;
}

interface IFormStep3Props {
  formConta: IFormConta;
  setFormConta: React.Dispatch<React.SetStateAction<IFormConta>>;
  formUsuario: IFormUsuario;
  setFormUsuario: React.Dispatch<React.SetStateAction<IFormUsuario>>;
}

// Função para formatar CPF
function formatarCPF(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

// Função para formatar telefone
function formatarTelefone(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/^(\d{2})(\d)/, "$1 $2")
    .replace(/(\d{4,5})(\d{4})$/, "$1-$2");
}

export default function FormStep3({
  formConta,
  setFormConta,
  formUsuario,
  setFormUsuario,
}: IFormStep3Props) {
  return (
    <>
      <h1 className="text-white text-4xl font-bold">Informações bancárias</h1>

      <section className="flex flex-col gap-4 mt-4">
        {/* Telefone */}
        <div className="relative w-full">
          <input
            type="tel"
            id="telefone"
            placeholder=" "
            className="peer w-full border-b-2 border-gray-400 bg-transparent px-2 pt-6 pb-2 text-white outline-none"
            value={formUsuario.telefone}
            onChange={(e) =>
              setFormUsuario({
                ...formUsuario,
                telefone: formatarTelefone(e.target.value),
              })
            }
            maxLength={13}
          />
          <label
            htmlFor="telefone"
            className="absolute left-2 top-1 text-gray-400 text-sm transition-all 
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white 
              peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-400 cursor-text"
          >
            Telefone
          </label>
        </div>

        {/* CPF */}
        <div className="relative w-full">
          <input
            type="text"
            id="cpf"
            placeholder=" "
            className="peer w-full border-b-2 border-gray-400 bg-transparent px-2 pt-6 pb-2 text-white outline-none"
            value={formUsuario.cpf}
            onChange={(e) =>
              setFormUsuario({
                ...formUsuario,
                cpf: formatarCPF(e.target.value),
              })
            }
            maxLength={14}
          />
          <label
            htmlFor="cpf"
            className="absolute left-2 top-1 text-gray-400 text-sm transition-all 
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white 
              peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-400 cursor-text"
          >
            CPF
          </label>
        </div>

        <section className="flex flex-row gap-x-4">
          {/* Tipo de Conta */}
          <div className="relative w-full">
            <select
              id="tipoConta"
              className="peer w-full border-b-2 border-gray-400 bg-transparent px-2 pt-6 pb-2 text-white outline-none appearance-none"
              value={formConta.tipo_conta}
              onChange={(e) =>
                setFormConta({
                  ...formConta,
                  tipo_conta: e.target.value as "corrente" | "poupanca",
                })
              }
            >
              <option value="" disabled hidden>
                Selecione o tipo de conta
              </option>
              <option value="corrente" className="bg-black text-white">
                Corrente
              </option>
              <option value="poupanca" className="bg-black text-white">
                Poupança
              </option>
            </select>
            <label
              htmlFor="tipoConta"
              className="absolute left-2 top-1 text-gray-400 text-sm transition-all 
              peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-400 
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white cursor-text"
            >
              Tipo de conta
            </label>
          </div>

          {/* Senha da Conta */}
          <div className="relative w-full">
            <input
              type="password"
              id="passwordConta"
              placeholder=" "
              className="peer w-full border-b-2 border-gray-400 bg-transparent px-2 pt-6 pb-2 text-white outline-none"
              value={formConta.password}
              onChange={(e) =>
                setFormConta({ ...formConta, password: e.target.value })
              }
              maxLength={6}
            />
            <label
              htmlFor="passwordConta"
              className="absolute left-2 top-1 text-gray-400 text-sm transition-all 
              peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white 
              peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-400 cursor-text"
            >
              Senha da conta (6 Dígitos)
            </label>
          </div>
        </section>
      </section>
    </>
  );
}
