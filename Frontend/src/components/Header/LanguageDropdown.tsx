import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { resources } from '../i18n.config';

const LanguageDropdown: React.FC = () => {
    const { i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState(i18n.language);
    const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);
    const languages = Object.keys(resources);

    const toggleDropdown = () => {
        setIsLangDropdownOpen(!isLangDropdownOpen);
    };

    const handleLanguageChange = (language: string) => {
        i18n.loadLanguages(language);
        i18n.changeLanguage(language);
        setCurrentLanguage(language);
        setIsLangDropdownOpen(false);
    };

    return (
        <div className="relative flex">
            <button
                onClick={toggleDropdown}
                className="hidden lg:block rounded-full border border-slate-700 w-6 h-6 dropdown-togg mr-5 mt-4 text-slate-700 dark:text-slate-300 hover:text-slate-500 focus:outline-none"
            >
                {currentLanguage}
            </button>
            {isLangDropdownOpen && (
                <div
                    onClick={toggleDropdown}
                    className="fixed inset-0 z-10 bg-black opacity-0"
                ></div>
            )}
            <div className="relative ">
                <ul
                    className={`dropdown-menu absolute dark:bg-slate-700 bg-slate-300 z-20 top-10 right-0 pt-1 ${
                        isLangDropdownOpen ? 'block' : 'hidden'
                    }`}
                >
                    {languages.map((language) => (
                        <li key={language}>
                            <a
                                onClick={() => handleLanguageChange(language)}
                                className="rounded-t text-slate-700 dark:hover:bg-slate-500 dark:text-slate-300 hover:text-slate-500 py-2 px-4 block whitespace-no-wrap"
                            >
                                {language}
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default LanguageDropdown;
