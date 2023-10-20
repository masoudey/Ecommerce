import React, { useEffect, useState } from 'react';

const DarkModeToggle: React.FC = () => {
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)');
    const [darkMode, setDarkMode] = useState(prefersDarkMode.matches);

    useEffect(() => {
        document.body.classList.toggle('dark', darkMode);
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode((prevDarkMode) => !prevDarkMode);
    };
    return (
        <button
            onClick={toggleDarkMode}
            className="w-10 h-5 mt-5 mr-5 flex items-center p-1 bg-slate-700 dark:bg-slate-300 rounded-full border-slate-600 dark:border-slate-300   border"
        >
            <div
                className={`w-4 h-4 rounded-full transition-transform duration-300 transform ${
                    darkMode
                        ? 'translate-x-4 bg-[url(./mode.dark.svg)]'
                        : 'translate-x-0 bg-[url(./mode-day.svg)]'
                } dark:bg-white `}
            ></div>
        </button>
    );
};

export default DarkModeToggle;
