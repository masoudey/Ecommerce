import React, { useState } from 'react';
import { NavLinks } from '../../constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const MobileMenu: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const { t } = useTranslation();

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <div className="flex flex-col justify-end">
            {/* Button to toggle the mobile menu */}
            <div className="md:hidden flex justify-end">
                <button
                    onClick={toggleMenu}
                    className="text-gray-300 hover:text-white focus:outline-none"
                >
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </svg>
                </button>
            </div>

            {/* Responsive Main Menu */}
            {isMenuOpen && (
                <div id="menu" className="md:hidden mt-2 menu">
                    {NavLinks.map((nav, i) => (
                        <li
                            key={i}
                            className="block text-gray-300 hover:text-white mb-2 py-2 pl-3 pr-4 rounded md:bg-transparent md:p-0 md:dark:text-sky-200"
                        >
                            <NavLink
                                to={`${nav.href}`}
                                className={({ isActive, isPending }) =>
                                    isActive
                                        ? 'active'
                                        : isPending
                                        ? 'pending'
                                        : ''
                                }
                            >
                                {t(nav.key)}
                            </NavLink>
                        </li>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MobileMenu;
