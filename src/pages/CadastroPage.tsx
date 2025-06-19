import { useState } from "react";
import FormStep1 from "../components/cadastro/FormStep1";
import ErrorMessage from "../components/ErrorMessage";
import StepNavigation from "../components/StepNavigation";
import FormStep2 from "../components/cadastro/FormStep2";
import FormStep3 from "../components/cadastro/FormStep3";
import { Link } from "react-router-dom";
import FormStep4 from "../components/cadastro/FormStep4";
import {
  handleStep1,
  handleStep2,
  handleStep3,
  handleStep4,
} from "../handlers/handlerSteps";

type TipoConta = "corrente" | "poupanca" | "";

interface IFormConta {
  tipo_conta: TipoConta;
  password: string;
}

export default function CadastroPage() {
  const [formUsuario, setFormUsuario] = useState({
    full_name: "",
    email: "",
    password: "",
    confirm_password: "",
    cpf: "",
    telefone: "",
  });
  const [formEndereco, setFormEndereco] = useState({
    rua: "",
    numero: "",
    complemento: "",
    bairro: "",
    cidade: "",
    uf: "",
  });
  const [formConta, setFormConta] = useState<IFormConta>({
    tipo_conta: "",
    password: "",
  });
  const [codigoVerificacao, setCodigoVerificacao] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  const handlerSubmit = async () => {
    setErrorMsg("");

    if (step === 1)
      return await handleStep1(formUsuario, {
        setErrorMsg,
        setStep,
      });
    if (step === 2) return handleStep2(formEndereco, { setErrorMsg, setStep });
    if (step === 3)
      return await handleStep3(formConta, formUsuario, {
        setErrorMsg,
        setStep,
      });
    if (step === 4)
      return await handleStep4(
        formUsuario,
        formEndereco,
        formConta,
        codigoVerificacao,
        setErrorMsg
      );
  };

  return (
    <div
      className="w-[100vw] h-[100vh] flex bg-primary overflow-x-hidden items-center justify-center"
      data-theme="dark"
    >
      <ErrorMessage errorMsg={errorMsg} />

      <main className="w-2/6 not-lg:w-[90%] min-h-2/4 bg-black rounded-4xl p-8 flex flex-col gap-6 shadow-2xl">
        {step === 1 ? (
          <FormStep1
            formUsuario={formUsuario}
            setFormUsuario={setFormUsuario}
          />
        ) : step === 2 ? (
          <FormStep2
            formEndereco={formEndereco}
            setFormEndereco={setFormEndereco}
          />
        ) : step === 3 ? (
          <FormStep3
            formUsuario={formUsuario}
            setFormUsuario={setFormUsuario}
            formConta={formConta}
            setFormConta={setFormConta}
          />
        ) : (
          <FormStep4
            codigoVerificacao={codigoVerificacao}
            setCodigoVerificacao={setCodigoVerificacao}
            email={formUsuario.email}
          />
        )}

        <section>
          <p className="text-white">
            Já possui conta? Clique{" "}
            <span className="text-blue-600">
              <Link to="/auth/login">aqui</Link>
            </span>
            .
          </p>
        </section>

        <StepNavigation
          step={step}
          setStep={setStep}
          onSubmit={handlerSubmit}
        />
      </main>
    </div>
  );
}
