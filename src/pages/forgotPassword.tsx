import { ReactNode, useState } from "react";
import axios from "axios";
import "../styles/animation.css";
import backgroundImage from "../assets/background-cards.png"; // Importação correta

interface FormData {
    password: string;
    confirmPassword: string;
    code: number | null;
}

function ForgotPasswordPage(): ReactNode {
    const [form, setForm] = useState<FormData>({
        password: "",
        confirmPassword: "",
        code: null,
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [disabledButton, setDisabledButton] = useState<boolean>(false);

    async function handleSubmit() {
        setDisabledButton(true);
        if (!form.password || !form.confirmPassword || !form.code) {
            setErrorMessage("Preencha todos os campos!");
            return;
        }

        if (form.password != form.confirmPassword) {
            setErrorMessage("As senhas não conferem!");
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/sign-in`, form);
            localStorage.setItem("token", response.data.token);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) return setErrorMessage(error.response?.data?.message || "Erro desconhecido");
            setErrorMessage("Erro desconhecido");
        } finally {
            setDisabledButton(false);
        }
    }

    return (
        <div
            className="grid bg-primary min-h-screen font-[family-name:var(--font-geist-sans)]"
            style={{ background: `url(${backgroundImage}) no-repeat 50% 50%`, backgroundSize: "100%" }}
        >
            <main className="flex items-center justify-center">
                <section className="min-h-4/6 w-1/3 back-to-top bg-background rounded-3xl p-10 flex justify-between flex-col shadow-[2px_6px_20px_rgba(0,0,0,0.3)]">
                    <div className="">
                        <h1 className="text-4xl">Alterar sua senha</h1>
                        <span className="text-[#949494]">Enviamos um código de verificação no seu email</span>
                    </div>
                    <div className="">
                        <div className="my-10">
                            <input
                                type="password"
                                className="p-2 text-white outline-0 border-b-1 border-white w-full text-lg"
                                placeholder="Senha"
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                        </div>
                        <div className="my-10 mb-0">
                            <input
                                type="password"
                                className="p-2 text-white outline-0 border-b-1 border-white w-full text-lg"
                                placeholder="Confirme sua senha"
                                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                            />
                        </div>
                        <div className="my-10 mb-0">
                            <input
                                type="text"
                                className="p-2 text-white outline-0 border-b-1 border-white w-full text-lg"
                                placeholder="Código de verificação"
                                maxLength={6}
                                onChange={(e) => setForm({ 
                                    ...form, 
                                    code: Number(e.target.value.replace(/[^\d]/g, "")) || null
                                })}
                                value={form.code?.toString()}
                            />
                        </div>
                        {errorMessage && <p className="mb-2 text-red-500">{errorMessage}</p>}
                        <p className="mb-10 hover:cursor-pointer">
                            Re-enviar código de verificição
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <button
                            className="px-7 py-2 rounded-full text-lg bg-tertiary hover:cursor-pointer relative"
                            onClick={handleSubmit}
                            disabled={disabledButton}
                        >
                            Alterar
                        </button>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default ForgotPasswordPage;
