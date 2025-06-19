import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormInput from "../components/FormInput";
import ErrorMessage from "../components/ErrorMessage";
import ArrowLeftIcon from "../assets/icons/arrow-left-icon.svg";
import api from "../services/api/api";
import { AxiosError } from "axios";
import PasswordInput from "../components/forms/PasswordCountInput";

interface PaymentForm {
  barcode: string;
  value: number;
  password: string;
}

interface PaymentData {
  full_name: string;
  barcode: string;
  value: number;
}

const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value);
};

export default function PagarPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState<PaymentForm>({
    barcode: "",
    value: 0,
    password: "",
  });
  const [paymentData, setPaymentData] = useState<PaymentData | null>(null);

  const handleBarcodeSubmit = async () => {
    setErrorMsg("");
    if (!form.barcode) {
      setErrorMsg("Por favor, insira o código de barras");
      return;
    }

    try {
      const response = await api.get(`/api/v1/pagamento/${form.barcode}`, {
        withCredentials: true,
      });

      if (response.data.status == "error") throw new Error();

      // TODO: Implement barcode validation API call
      setPaymentData({
        full_name: response.data.conta_cobrador.usuario.full_name,
        barcode: response.data.pagamento.chave_pagamento,
        value: response.data.pagamento.valor, // This should come from the API
      });
      setForm((prev) => ({ ...prev, value: 150.0 })); // This should come from the API
      setCurrentStep(2);
    } catch (e) {
      console.log(e);
      setErrorMsg("Erro ao buscar dados do pagamento");
    }
  };

  const handleValueSubmit = () => {
    setErrorMsg("");
    setCurrentStep(3);
  };

  const handlePaymentSubmit = async () => {
    setErrorMsg("");
    if (!form.password) {
      setErrorMsg("Por favor, insira sua senha");
      return;
    }

    try {
      // TODO: Implement payment API call

      const response = await api.post(
        "/api/v1/pagamento/pay",
        {
          barcode: form.barcode,
          password: form.password,
        },
        { withCredentials: true }
      );

      if (response.data.status == "error") throw new Error();

      await new Promise(() => setTimeout(() => navigate("/"), 1000));
    } catch (e: unknown) {
      if (e instanceof AxiosError) {
        setErrorMsg(
          e.response?.data?.msg || e.message || "Erro ao realizar pagamento"
        );
      } else {
        setErrorMsg("Erro inesperado!");
      }
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
          <h1 className="text-white text-2xl font-bold">Pagamento</h1>
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
              id="barcode"
              label="Código de Barras"
              value={form.barcode}
              onChange={(e) => setForm({ ...form, barcode: e.target.value })}
            />
            <button
              onClick={handleBarcodeSubmit}
              className="mt-6 w-full bg-white text-black font-semibold py-2 rounded-xl hover:bg-gray-200 transition-all hover:cursor-pointer"
            >
              Continuar
            </button>
          </div>
        )}

        {currentStep === 2 && paymentData && (
          <div className="flex flex-col gap-4">
            <div className="flex flex-col -gap-1">
              <p className="text-gray-400 text-lg">Para</p>
              <p className="text-white text-xl font-bold">
                {paymentData.full_name}
              </p>
            </div>

            <div className="flex flex-col -gap-1">
              <p className="text-gray-400 text-lg">Valor</p>
              <p className="text-white text-xl font-bold">
                R$ {formatCurrency(paymentData.value)}
              </p>
            </div>

            <div className="flex flex-col -gap-1">
              <p className="text-gray-400 text-lg">Código de Barras</p>
              <p className="text-white text-xl font-bold">
                {paymentData.barcode.substring(0, 15)}
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
                onClick={handleValueSubmit}
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
              <h2 className="text-white text-lg mb-2">Confirme o Pagamento</h2>
              <p className="text-gray-300">
                Valor: R$ {formatCurrency(paymentData?.value || 0)}
              </p>
              <p className="text-gray-300">Para: {paymentData?.full_name}</p>
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
                onClick={handlePaymentSubmit}
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
