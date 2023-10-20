import { faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    return (
        <>
            <div className="flex flex-col">
                <button
                    onClick={toggleSidebar}
                    className="text-slate-500 dark:text-slate-300 hover:text-white focus:outline-none pt-2"
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <FontAwesomeIcon icon={faBars} />
                    </svg>
                </button>
            </div>
            {isSidebarOpen && (
                <div className="fixed top-0 left-0 pl-2 h-full w-56 z-20 pr-4 border-r-2 text-slate-700 border-sky-200 dark:bg-slate-700 bg-sky-100">
                    <button
                        onClick={toggleSidebar}
                        className="text-white absolute top-2 right-2 cursor-pointer"
                    >
                        X
                    </button>
                    <h2 className="text-xl font-semibold mb-4 mt-6">
                        Categories
                    </h2>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="?ctg=phones"
                                className="text-blue-500 hover:underline"
                            >
                                Category 1
                            </Link>
                        </li>
                    </ul>
                </div>
            )}
        </>
    );
};
export default Sidebar;
