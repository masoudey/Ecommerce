import React from 'react';
import { Link } from 'react-router-dom';

const Logo: React.FC = () => {
    return (
        <div className="flex items-center">
            <Link
                to="/"
                className="dark:text-slate-300 text-slate-700 text-lg font-semibold"
            >
                Ecommerce
            </Link>
        </div>
    );
};

export default Logo;
