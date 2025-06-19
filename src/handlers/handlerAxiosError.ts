import { AxiosError } from "axios";

export const handleAxiosError = (
  e: unknown,
  fallback: string,
  setErrorMsg: React.Dispatch<React.SetStateAction<string>>
) => {
  if (e instanceof AxiosError) {
    setErrorMsg(e.response?.data?.msg || fallback);
  } else {
    setErrorMsg("Erro inesperado!");
  }
};
