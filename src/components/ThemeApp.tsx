import { ThemeProvider } from "../context/ThemeProvider";

export const ThemeApp = ({ children }: { children: any }) => {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
};

export default ThemeApp;

