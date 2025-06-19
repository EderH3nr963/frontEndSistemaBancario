import { useEffect } from "react";
import { gsap } from "gsap";

interface ErrorMessageProps {
  errorMsg: string;
}

export default function ErrorMessage({ errorMsg }: ErrorMessageProps) {
  useEffect(() => {
    if (errorMsg) {
      gsap.fromTo(
        "#box-error",
        { top: -200, opacity: 0 },
        { top: 5, opacity: 1, duration: 1 }
      );
    }
  }, [errorMsg]);

  return (
    <>
      {errorMsg && (
        <article
          id="box-error"
          className="absolute p-6 bg-black rounded-2xl -z-0 shadow-2xl"
        >
          <span className="text-red-400">{errorMsg}</span>
        </article>
      )}
    </>
  );
}
