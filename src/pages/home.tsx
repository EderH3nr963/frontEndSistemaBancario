import { ReactNode, useState, useEffect, useRef } from "react"
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { FaPix } from "react-icons/fa6";
import { PiHandDeposit } from "react-icons/pi";
import { PiQrCode } from "react-icons/pi";
import { BiTransfer } from "react-icons/bi";


function HomePage(): ReactNode {
    const [textButton, setTextButton] = useState("");
    const timeouts = useRef<number[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Certifique-se de que o código só execute no lado do cliente
        return () => {
            // Limpeza de timeouts no caso de desmontagem do componente
            timeouts.current.forEach(clearTimeout);
            timeouts.current = [];
        };
    }, []);

    localStorage.setItem("authToken", "your-auth-token");

    const onEnterButton = () => {
        setTextButton(""); // Reinicia o texto antes de iniciar

        // Cancela timeouts anteriores
        timeouts.current.forEach(clearTimeout);
        timeouts.current = [];

        const letterText = ["E", "x", "t", "r", "a", "t", "o"];

        letterText.forEach((letter, index) => {
            const timeout = setTimeout(() => {
                setTextButton((prevText) => prevText + letter);
            }, index * 25);

            timeouts.current.push(timeout);
        });
    };

    const onLeaveButton = () => {
        // Cancela animação ao sair do botão
        timeouts.current.forEach(clearTimeout);
        timeouts.current = [];
        setTextButton(""); // Reseta o texto
    };

    return (
        <div className="grid bg-primary min-h-screen  font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col  justify-between">
                <section className="h-3/6 mx-10 my-16 flex-col-reverse sm:flex-row flex sm:items-center justify-end sm:justify-between items-start m-4">
                    <div className="bg-background rounded-full shadow-2xl w-1/3 h-28 flex items-center p-3 justify-between">
                        <p className="text-3xl ml-5">R$ 4999.99</p>
                        <button
                            className="bg-secondary rounded-full p-3 hover:cursor-pointer flex flex-row justify-center items-center group shadow-xl"
                            onMouseEnter={onEnterButton}
                            onMouseLeave={onLeaveButton}
                            onClick={() => navigate('/extrato')}
                        >
                            <p className="text-3xl tracking-wide text-background transition-all duration-600 ease-in-out group-hover:p-2 group-hover:mx-3 font-sans">{textButton}</p>
                            <FaArrowRight className="text-background h-16 w-16" />
                        </button>
                    </div>
                    <div className=" h-28 w-28">
                        <img src="user.webp" className=" h-28 w-28" />
                    </div>
                </section>
                <section className="w-full px-7 pt-8 h-full shadow-[0_-6px_20px_rgba(0,0,0,0.3)] bg-background rounded-t-3xl">
                    <article className="w-full mb-8">
                        <div className="justify-between flex flex-row mb-8 hover:cursor-pointer">
                            <h1 className="text-3xl ">Serviços</h1>
                            <IoMdHelpCircleOutline style={{ width: 36, height: 36 }} />
                        </div>
                        <div className="overflow-auto">
                            <ul className="list-none flex flex-row ">
                                <li className="flex flex-col justify-center hover:cursor-pointer items-center mr-4">
                                    <div style={{backgroundColor: "#474747"}} className="h-28 w-28 bg-backgroundHintColor bg-customGray rounded-full mb-2 flex items-center justify-center">
                                        <FaPix style={{ width: 76, height: 76 }} />
                                    </div>
                                    <p className="text-xl ">Pix</p>
                                </li>
                                <li className="flex flex-col justify-center hover:cursor-pointer items-center mx-4">
                                    <div style={{backgroundColor: "#474747"}}  className="h-28 w-28 bg-backgroundHintColor rounded-full mb-2 flex items-center justify-center">
                                        <PiQrCode style={{ width: 76, height: 76 }} />
                                    </div>
                                    <p className="text-xl ">Pagar</p>
                                </li>
                                <li className="flex flex-col justify-center hover:cursor-pointer items-center mx-4">
                                    <div style={{backgroundColor: "#474747"}} className="h-28 w-28 bg-backgroundHintColor rounded-full mb-2 flex items-center justify-center">
                                        <PiHandDeposit style={{ width: 76, height: 76 }} />
                                    </div>
                                    <p className="text-xl ">Depósito</p>
                                </li>
                                <li className="flex flex-col justify-center hover:cursor-pointer items-center mx-4">
                                    <div style={{backgroundColor: "#474747"}} className="h-28 w-28 bg-backgroundHintColor rounded-full mb-2 flex items-center justify-center">
                                        <BiTransfer style={{ width: 76, height: 76 }} />
                                    </div>
                                    <p className="text-xl ">Transferência</p>
                                </li>
                            </ul>
                        </div>
                    </article>
                    <article>
                        <div className="justify-between flex flex-row mb-8">
                            <h1 className="text-3xl ">Cartões</h1>
                        </div>
                        <div className="">
                            <ul className="list-none ml-4 flex flex-row">
                                {/* Cartão design */}
                                <li className="flex flex-col justify-center hover:cursor-pointer items-center mr-4">
                                    <div className="h-44 w-72 bg-secondary rounded-2xl mb-2 hover:-translate-y-3 duration-200 flex items-center justify-center">
                                        <div className="h-full w-full flex flex-col">
                                            <div className="h-1/2 w-full flex flex-col"></div>
                                            <div className="h-1/2 w-full flex flex-col p-2 items-center">
                                                <span className="text-black">**** **** **** 0000</span>
                                                <span className="text-black">Eder H V Justino</span>
                                            </div>
                                        </div>
                                        <div className="h-full w-full flex flex-col">
                                            <div className="h-1/2 w-full flex flex-col items-end justify-center ">
                                                <div className="h-10 w-1/3 bg-yellow-300 rounded-md m-5"></div>
                                            </div>
                                            <div className="h-1/2 w-full flex flex-col"></div>
                                        </div>
                                    </div>
                                </li>
                                {/* Fim cartão design */}
                            </ul>
                        </div>
                    </article>
                </section>
            </main>
        </div>
    )
}

export default HomePage