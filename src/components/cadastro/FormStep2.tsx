import type React from "react";
import { ufs } from "../../constants/ufs";

interface IFormEndereco {
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
}

interface IFormStep2 {
  formEndereco: IFormEndereco;
  setFormEndereco: React.Dispatch<React.SetStateAction<IFormEndereco>>;
}

export default function FormStep2({
  formEndereco,
  setFormEndereco,
}: IFormStep2) {
  return (
    <>
      <h1 className="text-white text-4xl font-bold">Seu endereço</h1>

      <section className="flex flex-col gap-4">
        {/* Logradouro */}
        <div className="relative w-full">
          <input
            type="text"
            id="logradouro"
            placeholder=" "
            className="peer w-full border-b-2 border-gray-400 bg-transparent px-2 pt-6 pb-2 text-white outline-none"
            value={formEndereco.rua}
            onChange={(e) =>
              setFormEndereco({ ...formEndereco, rua: e.target.value })
            }
          />
          <label
            htmlFor="logradouro"
            className="cursor-text absolute left-2 top-1 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-400"
          >
            Rua / Avenida
          </label>
        </div>

        <div className="flex flex-row gap-2">
          {/* Número */}
          <div className="relative w-full">
            <input
              type="text"
              id="numero"
              placeholder=" "
              className="peer w-full border-b-2 border-gray-400 bg-transparent px-2 pt-6 pb-2 text-white outline-none"
              value={formEndereco.numero}
              onChange={(e) =>
                setFormEndereco({ ...formEndereco, numero: e.target.value })
              }
            />
            <label
              htmlFor="numero"
              className="cursor-text absolute left-2 top-1 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-400"
            >
              Número
            </label>
          </div>

          {/* Complemento */}
          <div className="relative w-full">
            <input
              type="text"
              id="complemento"
              placeholder=" "
              className="peer w-full border-b-2 border-gray-400 bg-transparent px-2 pt-6 pb-2 text-white outline-none"
              value={formEndereco.complemento}
              onChange={(e) =>
                setFormEndereco({
                  ...formEndereco,
                  complemento: e.target.value,
                })
              }
            />
            <label
              htmlFor="complemento"
              className="cursor-text absolute left-2 top-1 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-400"
            >
              Complemento
            </label>
          </div>
        </div>

        {/* Bairro */}
        <div className="relative w-full">
          <input
            type="text"
            id="bairro"
            placeholder=" "
            className="peer w-full border-b-2 border-gray-400 bg-transparent px-2 pt-6 pb-2 text-white outline-none"
            value={formEndereco.bairro}
            onChange={(e) =>
              setFormEndereco({ ...formEndereco, bairro: e.target.value })
            }
          />
          <label
            htmlFor="bairro"
            className="cursor-text absolute left-2 top-1 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-400"
          >
            Bairro
          </label>
        </div>

        <div className="flex flex-row gap-2">
          {/* Cidade */}
          <div className="relative w-5/6">
            <input
              type="text"
              id="cidade"
              placeholder=" "
              className="peer w-full border-b-2 border-gray-400 bg-transparent px-2 pt-6 pb-2 text-white outline-none"
              value={formEndereco.cidade}
              onChange={(e) =>
                setFormEndereco({ ...formEndereco, cidade: e.target.value })
              }
            />
            <label
              htmlFor="cidade"
              className="cursor-text absolute left-2 top-1 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-400"
            >
              Cidade
            </label>
          </div>

          {/* Estado */}
          <div className="relative w-1/6">
            <select
              id="estado"
              className="peer w-full border-b-2 border-gray-400 bg-transparent px-2 pt-6 pb-2 text-white outline-none"
              value={formEndereco.uf}
              onChange={(e) =>
                setFormEndereco({ ...formEndereco, uf: e.target.value })
              }
            >
              <option value="" disabled className="bg-black text-white">
                Selecione o estado
              </option>
              {ufs.map((value) => (
                <option
                  key={value}
                  value={value}
                  className="bg-black text-white"
                >
                  {value}
                </option>
              ))}
            </select>

            <label
              htmlFor="estado"
              className="absolute left-2 top-1 text-gray-400 text-sm transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-base peer-placeholder-shown:text-white peer-focus:top-1 peer-focus:text-sm peer-focus:text-gray-400"
            >
              Estado
            </label>
          </div>
        </div>
      </section>
    </>
  );
}
