import PaymentIcon from "../../assets/icons/payment-icon.svg";

/**
 * ListServices component - Displays a list of available banking services
 * Each service is represented by a circular button with a label
 */
export default function ListServices() {
  return (
    <ul className="flex items-start flex-row gap-x-4 pt-6 overflow-x-auto">
      {/* PIX Service */}
      <li>
        <div className="flex flex-col items-center">
          <button
            className="w-[125px] h-[125px] bg-gray-icon rounded-full mb-2 duration-300 hover:-translate-y-4 hover:cursor-pointer shadow-lg"
            onClick={() => null}
          ></button>
          <span className="text-white font-bold text-lg">PIX</span>
        </div>
      </li>

      {/* Payment Service */}
      <li className="relative">
        <div className="flex flex-col items-center">
          <button
            className="w-[125px] h-[125px] flex justify-center items-center bg-gray-icon rounded-full mb-2 duration-300 hover:-translate-y-4 hover:cursor-pointer shadow-lg"
            onClick={() => (window.location.href = "/payment/pay")}
          >
            <img src={PaymentIcon} alt="" width={100} height={100} />
          </button>
          <span className="text-white font-bold text-lg">Pagar</span>
        </div>
      </li>

      {/* Transfer Service */}
      <li>
        <div className="flex flex-col items-center">
          <button
            className="w-[125px] h-[125px] bg-gray-icon rounded-full mb-2 duration-300 hover:-translate-y-4 hover:cursor-pointer shadow-lg"
            onClick={() => (window.location.href = "/transfer")}
          ></button>
          <span className="text-white font-bold text-lg">Transferir</span>
        </div>
      </li>
    </ul>
  );
}
