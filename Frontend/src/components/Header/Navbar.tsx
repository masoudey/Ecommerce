// Navbar.tsx
import { useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { NavLinks } from '../../constant';
import Sidebar from './Sidebar';
import { useTranslation } from 'react-i18next';
import SearchBar from './SearchBar';
import Logo from './Logo';
import LanguageDropdown from './LanguageDropdown';
import DarkModeToggle from './DarkModeToggle';
import UserDropdown from './UserDropdown';
import CartDropdown from './CartDropdown';
import MobileMenu from './MobileMenu';

interface NavbarProps {
    q: string;
}

const Navbar: React.FC<NavbarProps> = ({ q }) => {
    const { t } = useTranslation();

    const containerRef = useRef<HTMLDivElement | null>(null);
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
            if (
                containerRef.current &&
                !containerRef.current.contains(event.target as Node)
            ) {
                console.log('g');
            }
        };

        document.addEventListener('click', handleOutsideClick);

        return () => {
            document.removeEventListener('click', handleOutsideClick);
        };
    }, [q]);

    return (
        <>
            <header
                ref={containerRef}
                className=" dark:bg-[#0f172a] bg-sky-50 bg-no-repeat bg-[url(./shadow.svg)] bg-[100%] pt-2 pb-1 shadow-sm fixed w-full top-0 z-10 border-b dark:border-slate-800 border-white "
            >
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex justify-between">
                        {/* Logo */}
                        <Logo />
                        {/* Search Bar */}
                        <SearchBar q={q} />

                        <div className="relative flex">
                            <LanguageDropdown />
                            <DarkModeToggle />
                            {/* User Dropdown or Login Button */}
                            <UserDropdown />

                            <CartDropdown />
                        </div>
                    </div>
                    <nav className="bottom-menu flex justify-between lg:justify-start border-t-cyan-700 border-opacity-40 dark:border-slate-700 border-t">
                        <Sidebar />

                        {/* Main Menu - Desktop */}
                        <div className="hidden md:flex space-x-4 pl-4">
                            {NavLinks.map((nav, i) => (
                                <li
                                    key={i}
                                    className=" text-slate-700 dark:text-slate-300 hover:text-slate-600 block pt-1  pl-3 pr-4  rounded md:bg-transparent  "
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
                                        {/* <Link to={`${nav.href}`}>{nav.text}</Link> */}
                                    </NavLink>
                                </li>
                            ))}
                        </div>

                        <MobileMenu />
                    </nav>
                </div>
            </header>
        </>
    );
};

export default Navbar;
