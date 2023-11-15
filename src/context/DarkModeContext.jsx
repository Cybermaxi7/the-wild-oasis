import { createContext, useContext, useEffect } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
const DarkModeContext = createContext();

function DarkModeProvider({ children }) {
    const [isDarkMode, setIsDarkMode] = useLocalStorageState(
        window.matchMedia('(prefers-color-scheme : dark)').matches,
        "isDarkMode"
    );

    useEffect( function() {
        if (isDarkMode) {
            document.documentElement.classList.add('dark-mode')
            document.documentElement.classList.remove('light-mode')
        } else {
            document.documentElement.classList.remove('dark-mode')
            document.documentElement.classList.add('light-mode')
        }

    },	[isDarkMode])
    
    function toggleDarkMode() {
        setIsDarkMode((dark) => !dark);
    }
    return (
        <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
            {children}
        </DarkModeContext.Provider>
    );
}

function useDarkMode() {
    const context = useContext(DarkModeContext);
    if (context === "underfined")
        throw new Error(
            "DarkMode Context was used outside the DarkMode Provider"
        );
    return context;
}

export { DarkModeProvider, useDarkMode };
