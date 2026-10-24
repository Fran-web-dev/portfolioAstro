import { ThemeProvider } from "../context/ThemeProvider";
import { ThemeToggle } from "./ThemeToggle";

export const ThemeApp = () => {
  return (
    <ThemeProvider>
        <ThemeToggle/>
    </ThemeProvider>
  )
}

