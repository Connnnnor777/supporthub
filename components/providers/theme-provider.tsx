"use client";

import * as React from "react";

type Theme = "light" | "dark" | "system" | "colorblind" | "vista";
type ResolvedTheme = "light" | "dark";

type ThemeContextValue = {
    theme: Theme;
    resolvedTheme: ResolvedTheme;
    setTheme: (theme: Theme) => void;
};

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

const ThemeContext = React.createContext<ThemeContextValue | undefined>(undefined);

function getSystemTheme(): ResolvedTheme {
    if (typeof window === "undefined") {
        return "light";
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme: Theme) {
    if (typeof document === "undefined") {
        return "light";
    }

    const resolvedTheme = theme === "system" ? getSystemTheme() : theme;
    const root = document.documentElement;
    root.classList.toggle("dark", resolvedTheme === "dark");
    root.classList.toggle("theme-colorblind", theme === "colorblind");
    root.classList.toggle("theme-vista", theme === "vista");
    root.style.colorScheme = resolvedTheme;
    return resolvedTheme;
}

export function ThemeProvider({ children, defaultTheme = "system", storageKey = "supporthub-theme" }: ThemeProviderProps) {
    const [theme, setThemeState] = React.useState<Theme>(defaultTheme);
    const [resolvedTheme, setResolvedTheme] = React.useState<ResolvedTheme>("light");

    React.useEffect(() => {
        const savedTheme = window.localStorage.getItem(storageKey) as Theme | null;
        const initialTheme = savedTheme ?? defaultTheme;
        setThemeState(initialTheme);
        setResolvedTheme(applyTheme(initialTheme));
    }, [defaultTheme, storageKey]);

    React.useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
        const handleChange = () => {
            if (theme === "system") {
                setResolvedTheme(applyTheme("system"));
            }
        };

        mediaQuery.addEventListener?.("change", handleChange);
        return () => mediaQuery.removeEventListener?.("change", handleChange);
    }, [theme]);

    const setTheme = React.useCallback(
        (nextTheme: Theme) => {
            setThemeState(nextTheme);
            window.localStorage.setItem(storageKey, nextTheme);
            setResolvedTheme(applyTheme(nextTheme));
        },
        [storageKey]
    );

    return (
        <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

export function useTheme() {
    const context = React.useContext(ThemeContext);

    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }

    return context;
}
