import { useTheme } from "../context/ThemeProvider"


export const ThemeToggle = () => {

    const { theme, toggleTheme } = useTheme();

    console.log(theme)

    return (
        <button className="fixed top-4 right-4 p-2 text-sm font-medium text-black hover:text-gray-600 border border-gray-300 dark:border-[#292a29] rounded transition-colors z-50 no-print" onClick={toggleTheme}>
            {theme === "dark" ? "Light" : "Dark"}
        </button>
    )
}