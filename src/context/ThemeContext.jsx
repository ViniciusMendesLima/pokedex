import { createContext, useEffect, useState } from 'react'

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext();

export function ThemeProvider({children}) {
    const [theme, setTheme] = useState ('light');

    useEffect(()=> {
        document.body.className = theme
    },[theme])

    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    return (
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}