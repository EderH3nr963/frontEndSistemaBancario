import {
  cpfInUse,
  emailInUse,
  registerService,
  sendCodeService,
  verifyCodeService,
} from "../services/auth/authServices";
import { handleAxiosError } from "./handlerAxiosError";

// Tipos dos formulários
export interface IFormConta {
  tipo_conta: "corrente" | "poupanca" | "";
  password: string;
}

export interface IFormUsuario {
  full_name: string;
  email: string;
  password: string;
  confirm_password: string;
  cpf: string;
  telefone: string;
}

export interface IFormEndereco {
  rua: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
}

interface CommonParams {
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>;
  setStep: React.Dispatch<React.SetStateAction<1 | 2 | 3 | 4>>;
}

// STEP 1
export const handleStep1 = async (
  formUsuario: IFormUsuario,
  { setErrorMsg, setStep }: CommonParams
): Promise<void> => {
  if (
    [
      formUsuario.email,
      formUsuario.full_name,
      formUsuario.password,
      formUsuario.confirm_password,
    ].includes("")
  ) {
    setErrorMsg("Todos os campos são obrigatórios!");
    return;
  }

  if (formUsuario.password !== formUsuario.confirm_password) {
    setErrorMsg("As senhas não coincidem!");
    return;
  }

  try {
    const response = await emailInUse(formUsuario.email);

    if (response.data.status === "error") {
      setErrorMsg(response.data.msg);
      return;
    }

    setStep(2);
  } catch (e) {
    handleAxiosError(
      e,
      "Erro inesperado ao avançar para próxima etapa! Tente novamente mais tarde",
      setErrorMsg
    );
  }
};

// STEP 2
export const handleStep2 = (
  formEndereco: IFormEndereco,
  { setErrorMsg, setStep }: CommonParams
): void => {
  if (Object.values(formEndereco).includes("")) {
    setErrorMsg("Todos os campos são obrigatórios!");
    return;
  }

  setStep(3);
};

// STEP 3
export const handleStep3 = async (
  formConta: IFormConta,
  formUsuario: IFormUsuario,
  { setErrorMsg, setStep }: CommonParams
): Promise<void> => {
  if (Object.values(formConta).includes("")) {
    setErrorMsg("Todos os campos são obrigatórios!");
    return;
  }

  try {
    const responseCpfInUse = await cpfInUse(formUsuario.cpf.replace(/\D/g, ""));

    if (responseCpfInUse.data.status === "error") {
      setErrorMsg(responseCpfInUse.data.msg);
      return;
    }

    const responseSendCode = await sendCodeService(formUsuario.email);

    if (responseSendCode.data.status === "error") {
      setErrorMsg(responseSendCode.data.msg);
      return;
    }

    setStep(4);
  } catch (e) {
    console.log(e);
    handleAxiosError(
      e,
      "Erro inesperado ao avançar para próxima etapa! Tente novamente mais tarde",
      setErrorMsg
    );
  }
};

// STEP 4
export const handleStep4 = async (
  formUsuario: IFormUsuario,
  formEndereco: IFormEndereco,
  formConta: IFormConta,
  codigoVerificacao: string,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>
): Promise<void> => {
  try {
    const responseVerifyCode = await verifyCodeService(
      formUsuario.email,
      codigoVerificacao
    );

    if (responseVerifyCode.data.status === "error") {
      setErrorMsg(responseVerifyCode.data.msg);
      return;
    }

    const responseRegister = await registerService({
      usuario: {
        ...formUsuario,
        cpf: formUsuario.cpf.replace(/\D/g, ""), // limpa CPF
      },
      endereco: formEndereco,
      conta: formConta,
    });

    if (responseRegister.data.status === "error") {
      setErrorMsg(responseRegister.data.msg);
      return;
    }

    window.location.href = "/auth/login";
  } catch (e) {
    handleAxiosError(
      e,
      "Erro inesperado ao concluir o cadastro! Tente novamente mais tarde",
      setErrorMsg
    );
  }
};
