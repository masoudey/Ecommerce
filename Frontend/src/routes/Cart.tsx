interface CartProps {
    cartItems: { id: number; name: string; price: number }[];
}

const Cart: React.FC<CartProps> = ({ cartItems }) => {
    // Calculate the total price from the cart items
    const total = cartItems.reduce((total, item) => total + item.price, 0);

    return (
        <div className="cart">
            {/* Display cart items here */}
            {cartItems.map((item, index) => (
                <div key={index} className="cart-item">
                    {/* Display item details */}
                    <div className="item-name">{item.name}</div>
                    <div className="item-price">${item.price}</div>
                </div>
            ))}

            {/* Display total price */}
            <div className="total-price">Total: ${total}</div>
        </div>
    );
};

export default Cart;
