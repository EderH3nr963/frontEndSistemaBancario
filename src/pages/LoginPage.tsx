import { gsap } from "gsap";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import FormInput from "../components/FormInput";
import ErrorMessage from "../components/ErrorMessage";
import { AxiosError } from "axios";

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async () => {
    setErrorMsg("");

    if (!form.email || !form.password) {
      setErrorMsg("Os campos não podem ser nulos!");
      return;
    }

    try {
      await login(form.email, form.password);
      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) {
        console.log(error);
        setErrorMsg(
          error.response?.data.msg ||
            "Erro inesperado ao fazer login! Tente novamente mais tarde"
        );
      } else {
        setErrorMsg("Erro inesperado!");
      }
    }
  };

  useEffect(() => {
    if (errorMsg) {
      gsap.fromTo(
        "#box-error",
        {
          top: -200,
          opacity: 0,
        },
        {
          top: 5,
          opacity: 1,
          duration: 1,
        }
      );
    }
  }, [errorMsg]);

  return (
    <div
      className="w-[100vw] h-[100vh] flex bg-primary overflow-x-hidden items-center justify-center shadow-2xl"
      data-theme="dark"
    >
      <ErrorMessage errorMsg={errorMsg} />

      <main className="w-2/6 not-lg:w-[90%] min-h-2/4 bg-black rounded-4xl p-8 flex flex-col gap-6 shadow-[0px_0px_25px_-7px_rgba(0,0,0,0.76)]">
        <h1 className="text-white text-4xl font-bold">Seja bem-vindo!</h1>

        <section className="flex flex-col gap-4">
          <FormInput
            type="email"
            id="email"
            label="E-mail"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <FormInput
            type="password"
            id="password"
            label="Senha"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </section>

        <section>
          <p className="text-white">
            Esqueceu sua senha? Clique{" "}
            <span className="text-blue-600">
              <a href="">aqui</a>
            </span>
            .
          </p>
          <p className="text-white">
            Não possui conta? Clique{" "}
            <span className="text-blue-600">
              <Link to="/auth/cadastro">aqui</Link>
            </span>
            .
          </p>
        </section>

        <button
          onClick={handleSubmit}
          className="mt-6 w-full bg-white text-black font-semibold py-2 rounded-xl hover:bg-gray-200 transition-all hover:cursor-pointer"
        >
          Entrar
        </button>
      </main>
    </div>
  );
}
