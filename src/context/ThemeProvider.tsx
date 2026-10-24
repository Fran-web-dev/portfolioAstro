import {createContext, useContext, useState, useEffect, type ReactNode} from "react"

interface ThemeContextType {
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext)

  if(!context) {
    throw new Error(
      "useTheme debe utilizarse dentro de ThemeProvider"
    )
  }

  return context;
}

export const ThemeProvider = ({children}: {children: ReactNode}) => {

    const [theme, setTheme] = useState<"light" | "dark">("dark");
    const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

    const toggleTheme = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setTheme((current) => (current === "dark" ? "light" : "dark"));
      setTimeout(() => {
        setIsAnimating(false);
      }, 100);
    }, 100);
  };

    return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {isAnimating && (
        <div className="fixed top-0 right-0 z-[100] bg-black rounded-full animate-curtain" />
      )}
      {children}
    </ThemeContext.Provider>
    )
}