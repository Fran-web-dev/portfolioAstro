import { useContext, type ReactNode } from "react";
import { ThemeContext } from "../context/ThemeProvider.tsx";

interface ButtonProps {
  children: ReactNode;
  onClick: () => void;
  className?: string;
}

export const Button = ({children,onClick, className=""}:ButtonProps) => {
    const {theme} = useContext(ThemeContext);
    const className = 'button-' + theme
    return (
    <button className={className} onClick={onClick}>
        {children}
    </button>
  )
}