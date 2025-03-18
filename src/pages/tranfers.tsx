import { ReactNode, useState, useContext } from "react"

import "../styles/animation.css";
import backgroundImage from "../assets/background-cards.png"; // Importação correta
import { AuthContext } from "../App";
import CustomButton from "../components/button";

function TranfersPage(): ReactNode {
    const [barCode, setBarCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [disabledButton, setDisabledButton] = useState<boolean>(false);
    const auth = useContext(AuthContext);

    return (
        <div
            className="grid bg-primary min-h-screen  font-[family-name:var(--font-geist-sans)]"
            style={{ background: `url(${backgroundImage}) no-repeat 50% 50%`, backgroundSize: '100%' }}>
            <main className="flex items-center justify-center">
                <section className="h-2/5 w-1/3 back-to-top bg-background rounded-3xl p-10 flex justify-between flex-col shadow-[2px_6px_20px_rgba(0,0,0,0.3)]">
                    <h1 className="text-4xl">Transfer</h1>
                    <div className="">
                        <div className="my-10">
                            <input
                                type="text"
                                className="p-2 text-white outline-0 border-b-1 border-white w-full text-lg"
                                name=""
                                placeholder="Key PIX"
                                id=""
                                onChange={(e) => setBarCode(e.target.value)}
                                maxLength={14}
                            />
                        </div>
                        {errorMessage ? <p className="mb-2 text-red-500">Erro ao efetuar o pagamento</p> : null}
                    </div>

                    <div className="flex justify-end">
                        <CustomButton onClick={() => null} disabled={disabledButton}>
                            Continuar
                        </CustomButton>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default TranfersPage;