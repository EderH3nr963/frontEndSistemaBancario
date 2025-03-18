import { ReactNode, useState, useContext } from "react"
import axios from "axios";
import "../styles/animation.css";
import backgroundImage from "../assets/background-cards.png"; // Importação correta
import { AuthContext } from "../App";
import CustomButton from "../components/button";

interface FormData {
    cpf: string;
    password: string;
}

function LoginPage(): ReactNode {
    const [form, setForm] = useState<FormData>({
        cpf: "",
        password: ""
    });
    const [errorMessage, setErrorMessage] = useState("");
    const [disabledButton, setDisabledButton] = useState<boolean>(false);
    const auth = useContext(AuthContext);

    function formataCPF(cpf: String) {
        //retira os caracteres indesejados...
        cpf = cpf.replace(/[^\d]/g, "");

        //realizar a formatação...
        setForm({
            ...form,
            cpf: cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
        });
    }

    async function handleSubmit() {
        setDisabledButton(true);
        if (!form.password || !form.cpf) {
            setErrorMessage("Preencha todos os campos!");
            return;
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/auth/sign-in`, form);

            localStorage.setItem("token", response.data.token);
            auth?.setIsLogged(true);
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) return setErrorMessage(error.response?.data?.message || "Erro desconhecido")

            setErrorMessage("Erro desconhecido");
        } finally {
            setDisabledButton(false);
        }
    }

    return (
        <div
            className="grid bg-primary min-h-screen  font-[family-name:var(--font-geist-sans)] "
            style={{ background: `url(${backgroundImage}) no-repeat 50% 50%`, backgroundSize: '100%' }}
        >
            <main className="flex items-center justify-center">
                <section className="h-3/5 w-1/3 back-to-top bg-background rounded-3xl p-10 flex justify-between flex-col shadow-[2px_6px_20px_rgba(0,0,0,0.3)]">
                    <h1 className="text-4xl">Login</h1>
                    <div className="">
                        <div className="my-10">
                            <input
                                type="text"
                                className="p-2 text-white outline-0 border-b-1 border-white w-full text-lg"
                                name=""
                                placeholder="CPF"
                                id=""
                                onChange={(e) => formataCPF(e.target.value)}
                                value={form.cpf}
                                maxLength={14}
                            />
                        </div>
                        <div className="my-10 mb-0">
                            <input
                                type="password"
                                className="p-2 text-white outline-0 border-b-1 border-white w-full text-lg"
                                name=""
                                placeholder="Senha"
                                id=""
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                        </div>
                        {errorMessage ? <p className="mb-2 text-red-500">Erro ao efetuar login</p> : null}
                        <p className=" mb-10">Esqueceu sua senha? Clique <a className="text-blue-700" href="/auth/forgot-password">aqui</a>.</p>
                    </div>

                    <div className="flex justify-end">
                        <CustomButton onClick={handleSubmit} disabled={disabledButton}>
                            Entrar
                        </CustomButton>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default LoginPage;