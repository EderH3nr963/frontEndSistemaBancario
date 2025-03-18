import { ReactNode } from "react";

interface PropsButton {
    onClick: () => void;
    disabled: boolean | null;
    children: ReactNode;
}

export default function CustomButton({ onClick, disabled, children }: PropsButton) {
    return (
        <button
            className="px-7 py-3 rounded-full text-xl bg-tertiary hover:cursor-pointer"
            onClick={onClick}
            disabled={disabled || false}
        >
            {children}
        </button>
    );
}
