import type { IUsuario } from "./Usuario";

export interface IContaBancaria {
  id_conta?: number;
  tipo_conta?: string;
  saldo?: number;
  status_conta?: string;
  chave_transferencia?: string;
  id_usuario?: number;
  usuario?: IUsuario;
}
