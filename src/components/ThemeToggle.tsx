"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <button className="relative p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200 h-9 w-9 hover:shadow-sm">
                <span className="sr-only">Toggle theme</span>
            </button>
        );
    }

    return (
        <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="relative p-2 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-all duration-200 hover:shadow-sm hover:text-slate-700 dark:hover:text-slate-200"
            title="Toggle theme"
        >
            {theme === "dark" ? (
                <Moon className="h-5 w-5 transition-transform duration-300 rotate-0 dark:rotate-180" />
            ) : (
                <Sun className="h-5 w-5 transition-transform duration-300 rotate-180 dark:rotate-0" />
            )}
            <span className="sr-only">Toggle theme</span>
        </button>
    );
}
