import { gsap } from "gsap";
import { useEffect, useState } from "react";
import ListServices from "../components/services/ListServices";

// Importação de imagens
import barChartFill from "../assets/icons/bar-chart-fill.svg";
import ImagemCartao from "../assets/imgs/cartaoImg.png";
import api from "../services/api/api";

import type { IUsuario } from "../types/Usuario";

/**
 * HomePage component - Main dashboard of the application
 * Displays user's balance, services, and cards
 */
export default function HomePage() {
  // State to store user data
  const [user, setUser] = useState<IUsuario | null>(null);

  // Animation effect when user data is loaded
  useEffect(() => {
    if (user !== null)
      gsap.fromTo(
        ".gsap-animation-main",
        {
          y: 1000,
          opacity: 0,
        },
        {
          y: 0,
          duration: 1,
          opacity: 1,
        }
      );
  }, []);

  // Fetch user data on component mount
  useEffect(() => {
    (async () => {
      try {
        const response = await api.get("/api/v1/usuario/");

        if (response.data.status == "error") {
          throw new Error();
        }

        setUser(response.data.usuario);
      } catch {
        //pass
      }
    })();
  }, []);

  // Show loading state while fetching user data
  if (user === null) {
    return <div>Carregando...</div>;
  }

  return (
    <div
      className="w-[100vw] h-[100vh] bg-primary overflow-x-hidden"
      data-theme="dark "
    >
      {/* Header section with balance and profile */}
      <header className="flex h-2/6 w-full flex-row items-center justify-between px-12 ">
        {/* Balance section */}
        <section className="h-[calc(40/100_*_100%)] min-w-[200px] gap-x-5 bg-black rounded-4xl flex justify-evenly items-center p-10 px-6 shadow-[6px_8px_24px_-7px_rgba(0,0,0,0.76)] shadow-black">
          <p className="text-white font-bold text-4xl">
            
            R$ {user.conta_bancaria?.saldo || "0.00"}
          </p>
          <button className="items-center justify-center p-5 bg-blue-800 shadow-[6px_8px_24px_-7px_rgba(0,0,0,0.76)] border-transparent rounded-full duration-300 hover:scale-110 hover:cursor-pointer">
            <img
              src={barChartFill}
              alt=""
              width={24}
              height={24}
              className="border-0 border-transparent"
            />
          </button>
        </section>
        {/* Profile section */}
        <section>
          <img
            src=""
            alt=""
            width={100}
            height={100}
            className="rounded-full bg-black"
          />
        </section>
      </header>

      {/* Main content section */}
      <main className="gsap-animation-main flex flex-col min-h-4/6 bg-black rounded-t-4xl p-12 gap-y-6 shadow-[-7px_-5px_24px_-7px_rgba(0,0,0,0.76)]">
        {/* Services section */}
        <section>
          <h1 className="text-white text-3xl font-bold mb-6">Serviços</h1>
          <ListServices />
        </section>
        {/* Cards section */}
        <section>
          <h1 className="text-white text-3xl font-bold ">Cartões</h1>
          <ul className="overflow-x-auto py-6">
            <li>
              <img
                src={ImagemCartao}
                alt=""
                width={300}
                height={173}
                className="duration-300 hover:-translate-y-4 "
              />
            </li>
          </ul>
        </section>
      </main>
    </div>
  );
}
