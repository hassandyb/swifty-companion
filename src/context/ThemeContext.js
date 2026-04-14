import react, {createContext, useContext, useState} from 'react'
import {darkColors, lightColors} from '../theme'

const ThemeContext = createContext(null);

export function ThemeProvider({children}) {
    const [mode, setMode] = useState('light');

    let colors;
    if(mode === 'dark') {
        colors = darkColors;
    } else {
        colors = lightColors;
    }

    const switchTheme = () => {

        if(mode === 'dark') {
            setMode('light');
        } else {
            setMode('dark');
        }
    };

    return (
        <ThemeContext.Provider value={{mode, colors, switchTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}



export function useTheme () {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error ('useTheme must be used inside ThemeProvider');
    }
    return context;
}