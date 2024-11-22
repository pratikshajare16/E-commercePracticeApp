import React, { createContext, useContext, useState } from 'react'


// Create a Context
const ThemeContext = createContext();

// Create a Provider component
const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState("light");

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Consume context using the useContext hook
// Updated ThemedComponent with data-testid
const ThemedComponent = () => {
    const { theme, setTheme } = useContext(ThemeContext);

    return (
        <div
            data-testid="themed-container"
            style={
                theme === "light"
                    ? { backgroundColor: "white", height: "100vh", paddingTop: "10%" }
                    : { backgroundColor: "black", height: "100vh", paddingTop: "10%" }
            }
        >
            <p
                style={
                    theme === "light"
                        ? { color: "black", textAlign: "center" }
                        : { color: "white", textAlign: "center" }
                }
            >
                Current theme: {theme}
            </p>
            <div style={{ marginLeft: "47%" }}>
                <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
                    Toggle Theme
                </button>
            </div>
        </div>
    );
};

export { ThemeProvider, ThemedComponent }