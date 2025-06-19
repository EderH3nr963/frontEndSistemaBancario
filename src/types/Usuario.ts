import type { IContaBancaria } from "./ContaBancaria";
import type { IEndereco } from "./Endereco";

export interface IUsuario {
  id_usuario?: number;
  full_name?: string;
  email?: string;
  telefone?: string;
  cpf?: string;
  is_inactive?: boolean;
  is_admin?: boolean;
  endereco?: IEndereco;
  conta_bancaria?: IContaBancaria;
}
