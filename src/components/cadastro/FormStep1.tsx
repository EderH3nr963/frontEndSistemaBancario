import type React from "react";

interface IFormUsuario {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  cpf: string;
  telefone: string;
}

interface IFormStep1 {
  formUsuario: IFormUsuario;
  setFormUsuario: React.Dispatch<React.SetStateAction<IFormUsuario>>;
}

export default function FormStep1({ formUsuario, setFormUsuario }: IFormStep1) {
  return (
    <>
      <h1 className="text-white text-4xl font-bold">Seja bem-vindo!</h1>

      <section className="flex flex-col gap-4">
        {/* full_name */}
        <div className="relative w-full">
          <input
            type="text"
            id="full_name"
            placeholder=" "
            className="peer w-full border-b-2 border-gray-400 bg-transparent px-2 pt-6 pb-2 text-white outline-none"
            value={formUsuario.full_name}
            onChange={(e) =>
              setFormUsuario({ ...formUsuario, full_name: e.target.value })
            }
          />
          <label
            htmlFor="full_name"
            className="cursor-text absolute left-2 top-1 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-400"
          >
            Nome completo
          </label>
        </div>

        {/* E-mail */}
        <div className="relative w-full">
          <input
            type="text"
            id="email"
            placeholder=" "
            className="peer w-full border-b-2 border-gray-400 bg-transparent px-2 pt-6 pb-2 text-white outline-none"
            value={formUsuario.email}
            onChange={(e) =>
              setFormUsuario({ ...formUsuario, email: e.target.value })
            }
          />
          <label
            htmlFor="email"
            className="cursor-text absolute left-2 top-1 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-400"
          >
            E-mail
          </label>
        </div>

        <div className="flex flex-row gap-2">
          {/* Senha */}
          <div className="relative w-full">
            <input
              type="password"
              id="password"
              placeholder=" "
              className="peer w-full border-b-2 border-gray-400 bg-transparent px-2 pt-6 pb-2 text-white outline-none"
              value={formUsuario.password}
              onChange={(e) =>
                setFormUsuario({ ...formUsuario, password: e.target.value })
              }
            />
            <label
              htmlFor="password"
              className="cursor-text absolute left-2 top-1 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-400"
            >
              Senha
            </label>
          </div>

          {/* Confirmar Senha */}
          <div className="relative w-full">
            <input
              type="password"
              id="confirm_password"
              placeholder=" "
              className="peer w-full border-b-2 border-gray-400 bg-transparent px-2 pt-6 pb-2 text-white outline-none"
              value={formUsuario.confirm_password}
              onChange={(e) =>
                setFormUsuario({
                  ...formUsuario,
                  confirm_password: e.target.value,
                })
              }
            />
            <label
              htmlFor="confirm_password"
              className="cursor-text absolute left-2 top-1 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-400"
            >
              Confirmar Senha
            </label>
          </div>
        </div>
      </section>
    </>
  );
}
