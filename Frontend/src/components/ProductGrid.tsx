import React from 'react';
import { Product } from '../common.types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

interface Props {
    product: Product;
}

const ProductGrid: React.FC<Props> = ({ product }) => {
    // const numericPrice = parseFloat(product.price || '0'); // Convert price to a number

    return (
        <div className="bg-slate-600 rounded-lg shadow-md p-1 text-white">
            <Link to={`products/${product.id}`} key={product.id}>
                <img
                    src={product.image || 'iphone.jpg'}
                    alt={product.name}
                    className="mx-auto max-h-52 object-contain "
                />
                <h2 className="text-md font-semibold mb-1">{product.name}</h2>
                {product.price !== null && (
                    <p className="text-gray-400">{product.price}</p>
                )}

                <div className="flex justify-between items-center mt-2">
                    <div className="text-gray-500">
                        Colors: {product.colors[0]?.name}
                    </div>
                    <div className="text-gray-500">Stock: {product.stock}</div>
                </div>
                <div className="justify-between items-center mt-2">
                    <div className="text-gray-500">
                        Manufacturer: {product.Manufacturer}
                    </div>
                    <div className="text-gray-500">
                        Features: {product.features}
                    </div>
                </div>
            </Link>
            <div className="mt-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-2 rounded">
                    <FontAwesomeIcon icon={faShoppingCart} className="mr-1" />
                    Add to Cart
                </button>
            </div>
        </div>
    );
};

export default ProductGrid;
