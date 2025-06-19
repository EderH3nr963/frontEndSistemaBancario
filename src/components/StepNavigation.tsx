interface StepNavigationProps {
  step: 1 | 2 | 3 | 4;
  setStep: React.Dispatch<React.SetStateAction<1 | 2 | 3 | 4>>;
  onSubmit: () => void;
}

export default function StepNavigation({
  step,
  setStep,
  onSubmit,
}: StepNavigationProps) {
  const handleBack = () => {
    const previousStep = step - 1;
    if ([1, 2, 3, 4].includes(previousStep)) {
      setStep(previousStep as 1 | 2 | 3 | 4);
    }
  };

  return step > 1 ? (
    <section className="flex flex-row gap-x-3">
      <button
        onClick={handleBack}
        className="mt-6 w-1/2 bg-black border-2 border-white text-white hover:text-black font-semibold py-2 rounded-xl hover:bg-gray-200 transition-all hover:cursor-pointer"
      >
        Voltar
      </button>
      <button
        onClick={onSubmit}
        className="mt-6 w-1/2 bg-white text-black font-semibold py-2 rounded-xl hover:bg-gray-200 transition-all hover:cursor-pointer"
      >
        {step == 4 ? "Registrar" : "Continuar"}
      </button>
    </section>
  ) : (
    <button
      onClick={onSubmit}
      className="mt-6 w-full bg-white text-black font-semibold py-2 rounded-xl hover:bg-gray-200 transition-all hover:cursor-pointer"
    >
      Continuar
    </button>
  );
}
