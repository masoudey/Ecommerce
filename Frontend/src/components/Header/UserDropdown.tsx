import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { SIGNOUT } from '../../apollo/mutations';
import { useMutation } from '@apollo/client';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';
import { useTranslation } from 'react-i18next';
import { RootState } from '../../redux/reducers';

const UserDropdown: React.FC = () => {
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [signOut, { error }] = useMutation(SIGNOUT);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { t } = useTranslation();
    const userInfo = useSelector((state: RootState) => state.auth.userInfo);

    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };
    const logoutHandler = async () => {
        try {
            const res = await signOut();
            console.log(res);

            dispatch(logout());
            navigate('/signIn');
        } catch (err) {
            console.log(err);
            console.log(error);
        }
    };
    return (
        <>
            {userInfo ? (
                // User Dropdown
                <>
                    <button
                        onClick={toggleUserMenu}
                        className="flex items-center pt-2 pr-4 space-x-2 text-gray-300 text-slate-500 dark:text-slate-300 hover:text-slate-600 focus:outline-none"
                    >
                        <span>{userInfo?.username}</span>
                        <svg
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <FontAwesomeIcon icon={faUser} />
                        </svg>
                    </button>
                    {isUserMenuOpen && (
                        <>
                            <div
                                onClick={toggleUserMenu}
                                className="fixed inset-0 z-10 bg-black opacity-0"
                            ></div>

                            <div
                                id="usermenu"
                                className=" text-zinc-200 z-20 origin-top-right absolute top-9 right-7 mt-2 w-48 rounded-md shadow-lg dark:bg-slate-700 bg-white ring-1 ring-black ring-opacity-5"
                            >
                                <div
                                    className="py-1"
                                    role="menu"
                                    aria-orientation="vertical"
                                    aria-labelledby="user-menu"
                                >
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-500"
                                        role="menuitem"
                                    >
                                        {t('profile')}
                                    </a>
                                    <a
                                        href="#"
                                        className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-500"
                                        role="menuitem"
                                    >
                                        {t('settings')}
                                    </a>
                                    <button
                                        className="block px-4 py-2 text-sm w-full text-start text-slate-700 dark:text-slate-300 hover:bg-slate-500"
                                        role="menuitem"
                                        onClick={logoutHandler}
                                    >
                                        {t('logout')}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </>
            ) : (
                // Login Button
                <Link
                    to="/signIn"
                    className="text-slate-500 dark:text-slate-300 mt-4 pr-5 hover:text-white focus:outline-none"
                >
                    {t('login')}
                </Link>
            )}
        </>
    );
};

export default UserDropdown;
