import { ReactNode, useState, useEffect } from "react";
import "../styles/animation.css";
import backgroundImage from "../assets/background-cards.png";
import axios from "axios";
import CustomButton from "../components/button";
import { gsap } from "gsap";

interface PagamentoData {
    idPayment: string;
    valor: Float32Array;
    status: string;
    paidAt: null | Date;
}

interface ApiResponse {
    payment: PagamentoData;
}

interface FormProps {
    errorMessage?: string;
    setBarCode: (value: string) => void;
    handleSubmit: () => Promise<void>;
    disabledButton: boolean;
}

function FormPayFirstStep({ errorMessage, setBarCode, handleSubmit, disabledButton }: FormProps) {
    return (
        <section className="min-h-2/5 w-1/3 back-to-top bg-background rounded-3xl p-10 flex justify-between flex-col shadow-[2px_6px_20px_rgba(0,0,0,0.3)]">
            <h1 className="text-4xl">Pagar</h1>
            <div className="">
                <div className="my-10">
                    <input
                        type="text"
                        className="p-2 text-white outline-0 border-b-1 border-white w-full text-lg"
                        name=""
                        placeholder="Insira o código de barras"
                        id=""
                        onChange={(e) => setBarCode(e.target.value)}
                        maxLength={14}
                    />
                    {errorMessage ? <p className="mb-2 text-red-500">Erro ao efetuar o pagamento</p> : null}
                </div>
            </div>

            <div className="flex justify-end">
                <CustomButton onClick={handleSubmit} disabled={disabledButton}>
                    Continuar
                </CustomButton>
            </div>
        </section>
    )
}

const PaymentDetails = ({ handleSubmit }: { handleSubmit: () => void }) => (
    <section className="h-3/5 w-1/3 bg-background back-to-top rounded-3xl p-10 flex justify-evenly flex-col shadow-md">
        <p className="text-3xl">
            Pagamento<br />
            <span className="text-gray-500">CPFL LTDA</span>
        </p>
        <p className="text-3xl">
            $ <span className="text-gray-500">200.00</span>
        </p>
        <p className="text-3xl">
            Message<br />
            <span className="text-gray-500">Water bill</span>
        </p>
        <div className="flex justify-end">
            <CustomButton disabled={false} onClick={handleSubmit}>Pagar</CustomButton>
        </div>
    </section>
);

const PaymentConfirmation = ({ handleConfirm, setSenha }: { handleConfirm: () => void, setSenha: (value: string) => void }) => {
    useEffect(() => {
        gsap.to(".modal-confirmar-pagamento", {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
        });
    }, []);

    return (
        <div className="modal-confirmar-pagamento absolute back-to-top rounded-2xl flex flex-col h-2/5 w-1/3 p-10 bg-background shadow-2xl justify-between items-start">
            <h1 className="text-4xl">Confirmar pagamento</h1>
            <input type="password" onChange={(e) => setSenha(e.target.value)} className="p-2 text-white outline-0 border-b border-white w-full text-lg" placeholder="Confirme com sua senha" />
            <div className="flex justify-end w-full">
                <CustomButton disabled={false} onClick={handleConfirm}>Confirmar</CustomButton>
            </div>
        </div>
    );
};

function PayPage(): ReactNode {
    const [barCode, setBarCode] = useState("");
    const [senha, setSenha] = useState("");
    const [step, setStep] = useState(1);
    const [errorMessage, setErrorMessage] = useState("");
    const [disabledButton, setDisabledButton] = useState(false);
    const [pagamento, setPagamento] = useState<PagamentoData | null>(null);

    async function handleSubmit() {
        setErrorMessage("");
        setDisabledButton(true);

        if (step === 2) setStep(3);

        if (step === 1) {
            if (!barCode) {
                setErrorMessage("O campo não pode ser nulo");
                setDisabledButton(false);
                return;
            }

            // Logica para localizar a cobranca

            setStep(2);
            console.log(step);
        }
        setDisabledButton(false);
    }

    return (
        <div className="grid bg-primary min-h-screen font-[family-name:var(--font-geist-sans)]"
            style={{ background: `url(${backgroundImage}) no-repeat center`, backgroundSize: "cover" }}>
            <main className="flex items-center justify-center">
                {step === 1 && <FormPayFirstStep errorMessage={errorMessage} setBarCode={setBarCode} handleSubmit={handleSubmit} disabledButton={disabledButton} />}
                {step === 2 && <PaymentDetails handleSubmit={handleSubmit} />}
                {step === 3 && <PaymentConfirmation handleConfirm={handleSubmit} setSenha={setSenha} />}
            </main>
        </div>
    );
}

export default PayPage;