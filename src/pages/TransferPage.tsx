import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import ErrorMessage from "../components/ErrorMessage";

import ArrowLeftIcon from "../assets/icons/arrow-left-icon.svg";
import api from "../services/api/api";
import { AxiosError } from "axios";
import PasswordInput from "../components/forms/PasswordCountInput";

interface TransferForm {
  chave_transferencia: string;
  value: number;
  password: string;
}

interface RecipientData {
  name: string;
  email: string;
  chave_transferencia: string;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

const parseCurrency = (value: string): number => {
  // Remove all non-digit characters
  const digits = value.replace(/\D/g, "");
  // Convert to number and divide by 100 to get the decimal value
  return Number(digits) / 100;
};

export default function TransferPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [isEditingValue, setIsEditingValue] = useState(false);
  const [form, setForm] = useState<TransferForm>({
    chave_transferencia: "",
    value: 0,
    password: "",
  });
  const [recipientData, setRecipientData] = useState<RecipientData | null>(
    null
  );

  const handlechave_transferenciaSubmit = async () => {
    setErrorMsg("");
    if (!form.chave_transferencia) {
      setErrorMsg("Por favor, insira a chave de transferência");
      return;
    }

    try {
      const response = await api.get(
        `/api/v1/usuario/${form.chave_transferencia}`
      );

      setRecipientData({
        email:
          typeof response.data.conta.usuario.email == "string"
            ? response.data.conta.usuario.email
            : "",
        chave_transferencia: form.chave_transferencia,
        name:
          typeof response.data.conta.usuario.full_name == "string"
            ? response.data.conta.usuario.full_name
            : "",
      });
      setCurrentStep(2);
    } catch (e) {
      console.log(e);
      setErrorMsg("Erro ao buscar dados do destinatário");
    }
  };

  const handlevalueEdit = () => {
    setIsEditingValue(true);
  };

  const handlevalueSave = () => {
    if (form.value <= 0) {
      setErrorMsg("Por favor, insira um valor válido");
      return;
    }
    setIsEditingValue(false);
  };

  const handlevalueSubmit = () => {
    setErrorMsg("");
    if (form.value <= 0) {
      setErrorMsg("Por favor, insira um valor válido");
      return;
    }
    setCurrentStep(3);
  };

  const handleTransferSubmit = async () => {
    setErrorMsg("");
    if (!form.password) {
      setErrorMsg("Por favor, insira sua senha");
      return;
    }

    try {
      const response = await api.post("/api/v1/transacao/", form, {
        withCredentials: true,
      });

      if (response.data.status === "error") throw new Error(response.data.msg);

      await new Promise(() => setTimeout(() => navigate("/"), 1000));
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        setErrorMsg(
          e.response?.data?.msg || e.message || "Erro ao realizar transferência"
        );
      } else {
        setErrorMsg("Erro inesperado!");
      }
    }
  };

  const handlevalueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, "");
    const numericValue = parseCurrency(rawValue);

    if (numericValue >= 0) {
      setForm({ ...form, value: numericValue });
      setErrorMsg("");
    } else {
      setErrorMsg("Por favor, insira um valor válido");
      setForm({ ...form, value: 0 });
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4">
      <ErrorMessage errorMsg={errorMsg} />

      <main className="w-full max-w-md bg-black rounded-4xl p-8 flex flex-col gap-6 shadow-[0px_0px_25px_-7px_rgba(0,0,0,0.76)]">
        <div className="flex justify-between items-center">
          <h1 className="text-white text-2xl font-bold">Transferência</h1>
          <button
            onClick={() => navigate("/")}
            className="hover:cursor-pointer hover:bg-gray-800 rounded-full p-2 duration-300"
          >
            <img src={ArrowLeftIcon} alt="Voltar" width={24} height={24} />
          </button>
        </div>

        <div className="flex justify-between mb-4">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-8 h-8 rounded-full flex items-center justify-center ${
                currentStep >= step ? "bg-blue-500" : "bg-gray-600"
              }`}
            >
              <span className="text-white">{step}</span>
            </div>
          ))}
        </div>

        {currentStep === 1 && (
          <div className="flex flex-col gap-4">
            <FormInput
              type="text"
              id="chave_transferencia"
              label="Chave de Transferência"
              value={form.chave_transferencia}
              onChange={(e) =>
                setForm({ ...form, chave_transferencia: e.target.value })
              }
            />
            <button
              onClick={handlechave_transferenciaSubmit}
              className="mt-6 w-full bg-white text-black font-semibold py-2 rounded-xl hover:bg-gray-200 transition-all hover:cursor-pointer"
            >
              Continuar
            </button>
          </div>
        )}

        {currentStep === 2 && recipientData && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col -gap-1">
              <p className="text-gray-400 text-lg">Transferir para</p>
              <p className="text-white text-xl font-bold">
                {recipientData.name}
              </p>
            </div>

            <div className="flex flex-col -gap-1">
              <p className="text-gray-400 text-lg">Email</p>
              <p className="text-white text-xl font-bold">
                {recipientData.email}
              </p>
            </div>

            <div className="flex flex-col -gap-1">
              <div className="flex justify-between">
                <p className="text-gray-400 text-lg">Valor</p>
                {!isEditingValue ? (
                  <button
                    onClick={handlevalueEdit}
                    className="text-blue-500 hover:text-blue-400"
                  >
                    Editar
                  </button>
                ) : (
                  <button
                    onClick={handlevalueSave}
                    className="text-green-500 hover:text-green-400"
                  >
                    Salvar
                  </button>
                )}
              </div>
              {isEditingValue ? (
                <FormInput
                  type="text"
                  id="value"
                  label=""
                  value={formatCurrency(form.value)}
                  onChange={handlevalueChange}
                  className="mt-2"
                />
              ) : (
                <p className="text-white text-xl font-bold">
                  R$ {formatCurrency(form.value)}
                </p>
              )}
            </div>

            <div className="flex flex-col -gap-1">
              <p className="text-gray-400 text-lg">Chave</p>
              <p className="text-white text-xl font-bold">
                {recipientData.chave_transferencia.substring(0, 15)}
                <span className="text-gray-400">{"..."}</span>
              </p>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="mt-6 w-1/2 bg-black border-2 border-white text-white hover:text-black font-semibold py-2 rounded-xl hover:bg-gray-200 transition-all hover:cursor-pointer"
              >
                Voltar
              </button>
              <button
                onClick={handlevalueSubmit}
                className="mt-6 w-1/2 bg-white text-black font-semibold py-2 rounded-xl hover:bg-gray-200 transition-all hover:cursor-pointer"
              >
                Continuar
              </button>
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="flex flex-col gap-4">
            <div className="bg-gray-800 p-4 rounded-lg">
              <h2 className="text-white text-lg mb-2">
                Confirme a Transferência
              </h2>
              <p className="text-gray-300">
                Valor: R$ {formatCurrency(form.value)}
              </p>
              <p className="text-gray-300">Para: {recipientData?.name}</p>
            </div>

            <PasswordInput
              length={6}
              onChange={(password) => setForm({ ...form, password })}
            />
            <div className="flex gap-4">
              <button
                onClick={handleBack}
                className="mt-6 w-1/2 bg-black border-2 border-white text-white hover:text-black font-semibold py-2 rounded-xl hover:bg-gray-200 transition-all hover:cursor-pointer"
              >
                Voltar
              </button>
              <button
                onClick={handleTransferSubmit}
                className="mt-6 w-1/2 bg-white text-black font-semibold py-2 rounded-xl hover:bg-gray-200 transition-all hover:cursor-pointer"
              >
                Confirmar
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
