import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "../styles/animation.css";
import backgroundImage from "../assets/background-cards.png"; // Importação correta
import { ReactNode } from "react";

function ExtratoPage(): ReactNode {
    const navigate = useNavigate();

    // Simulando dados de transações
    const transacoes = [
        { tipo: "Transferência", valor: "+ R$ 500,00", status: "Recebida" },
        { tipo: "Transferência", valor: "+ R$ 300,00", status: "Recebida" },
        { tipo: "Compra", valor: "- R$ 120,00", status: "Efetuada" },
        { tipo: "Boleto", valor: "- R$ 250,00", status: "Pago" },
        { tipo: "Depósito", valor: "+ R$ 1.000,00", status: "Recebido" },
    ];

    return (
        <div
            className="grid bg-primary min-h-screen font-[var(--font-geist-sans)]"
            style={{ background: `url(${backgroundImage}) no-repeat 50% 50%`, backgroundSize: '100%'}}
        >
            <main className="flex items-end justify-center back-to-top">
                <section className="w-full max-w-xl h-5/6 bg-background shadow-[0_-6px_20px_rgba(0,0,0,0.3)] rounded-t-4xl p-7">
                    <div className="mb-10 flex flex-row items-center">
                        <FaArrowRight
                            className="text-white h-9 w-9 rotate-180 mr-2 hover:cursor-pointer"
                            onClick={() => navigate('/')}
                        />
                        <h1 className="text-4xl">Extrato</h1>
                    </div>

                    {/* Lista de transações com rolagem */}
                    <ul className="flex flex-col overflow-y-auto max-h-[calc(100%-100px)] pr-2">
                        {transacoes.map((transacao, index) => (
                            <li key={index}>
                                <div className="w-full my-3 p-4 rounded-2xl hover:translate-x-2 duration-150 hover:cursor-pointer bg-gray-700">
                                    <div className="flex justify-between">
                                        <span className="text-2xl">{transacao.tipo}</span>
                                        <span className={`text-2xl ${transacao.valor.startsWith('-') ? 'text-red-400' : 'text-green-300'}`}>
                                            {transacao.valor}
                                        </span>
                                    </div>
                                    <span className={`text-xl ${transacao.valor.startsWith('-') ? 'text-red-400' : 'text-green-300'}`}>
                                        {transacao.status}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </main>
        </div>
    );
}

export default ExtratoPage;
