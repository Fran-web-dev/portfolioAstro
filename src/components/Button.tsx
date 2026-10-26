import { useContext } from "react";
import { ThemeContext } from "../context/ThemeProvider.tsx";

interface ButtonProps {
  children: any;
  onClick: () => void;
  className?: string;
}

export const Button = ({children,onClick, className=""}:ButtonProps) => {
    const {theme} = useContext(ThemeContext);
    const themeClassName = 'button-' + theme
    return (
    <button className={`${className} ${themeClassName}`} onClick={onClick}>
        {children}
    </button>
  )
}