import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';

const cartItems = [
    { id: 1, name: 'Product 1', price: 10 },
    { id: 2, name: 'Product 2', price: 20 },
];

const CartDropdown: React.FC = () => {
    return (
        <div className="relative inline-block text-slate-500 dark:text-slate-300 hover:text-white">
            {/* Cart Button */}
            <div className="group">
                {/* Add a shopping cart icon here */}
                <button className="flex items-center mt-5 space-x-2 focus:outline-none">
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <FontAwesomeIcon icon={faCartShopping} />
                    </svg>
                    {/* Display the number of items in the cart */}
                    {cartItems.length > 0 && (
                        <span className="cart-item-count absolute top-2 left-2 bg-red-500 text-white rounded-full px-1 text-xs">
                            {cartItems.length}
                        </span>
                    )}
                </button>

                {/* Dropdown Menu */}
                <div className="hidden group-hover:block origin-top-right absolute top-10 right-0 mt-2 w-48 rounded-md shadow-lg dark:bg-slate-700 bg-white ring-1 ring-black ring-opacity-5">
                    {/* Display cart items here */}
                    {cartItems.map((item, index) => (
                        <div key={index} className="cart-item ">
                            {/* Display item details */}
                            <span className="item-name">{item.name}</span>
                            <span className="item-price">${item.price}</span>
                        </div>
                    ))}

                    {/* Display total price */}
                    <div className="total-price">
                        Total: $
                        {cartItems.reduce(
                            (total, item) => total + item.price,
                            0
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDropdown;
