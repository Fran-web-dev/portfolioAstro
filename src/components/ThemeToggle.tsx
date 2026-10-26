import { useEffect, useState } from "react";

export const ThemeToggle = () => {
    const [theme, setTheme] = useState<"light" | "dark">("dark");

    useEffect(() => {
      document.documentElement.setAttribute("data-theme", theme);
      document.documentElement.classList.toggle("dark", theme === "dark");
    }, [theme]);

    const toggleTheme = () => setTheme((current) => current === "dark" ? "light" : "dark");

    return (
        <button
            aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
            className="fixed top-4 right-4 z-50 inline-flex h-9 items-center gap-2 rounded-lg border border-neutral-300/80 bg-white/90 px-3 text-xs font-semibold tracking-wide text-neutral-700 shadow-sm backdrop-blur transition duration-200 hover:-translate-y-0.5 hover:border-neutral-400 hover:bg-white hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 dark:border-neutral-700 dark:bg-neutral-900/90 dark:text-neutral-200 dark:hover:border-neutral-500 dark:hover:bg-neutral-800 dark:focus-visible:ring-offset-neutral-950 no-print"
            onClick={toggleTheme}
            type="button"
        >
            <span aria-hidden="true" className="text-sm">{theme === "dark" ? "☀" : "☾"}</span>
            {theme === "dark" ? "Light" : "Dark"}
        </button>
    )
}

export default ThemeToggle;
