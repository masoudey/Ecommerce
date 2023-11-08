import { useState } from 'react';
import { Product } from '../common.types';
import {
    AiFillHeart,
    AiOutlineHeart,
    AiOutlineMessage,
    AiOutlineShoppingCart,
} from 'react-icons/ai';
import styles from '../styles/style';
import { Link } from 'react-router-dom';

interface ProductDetailsProps {
    product: Product;
}

function ProductDetails({ product }: ProductDetailsProps) {
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);

    const incrementCount = () => {
        setCount(count + 1);
    };

    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };
    return (
        <div className="w-full py-5 ml-10">
            <div className="block w-full 800px:flex">
                <div className="w-full 800px:w-[50%] pt-5 dark:text-slate-300 text-slate-700">
                    <h1 className={`${styles.productTitle}`}>{product.name}</h1>
                    <p>{product.description}</p>
                    <div className="flex pt-3">
                        <h4 className={`${styles.productDiscountPrice}`}>
                            {product.discount}$
                        </h4>
                        <h3 className={`${styles.price}`}>
                            {product.price ? product.price + '$' : null}
                        </h3>
                    </div>

                    <div className="flex items-center mt-12 pr-3">
                        <div>
                            <button
                                className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                onClick={decrementCount}
                            >
                                -
                            </button>
                            <span className="bg-gray-200 text-gray-800 font-medium px-4 py-[11px]">
                                {count}
                            </span>
                            <button
                                className="bg-gradient-to-r from-teal-400 to-teal-500 text-white font-bold rounded-l px-4 py-2 shadow-lg hover:opacity-75 transition duration-300 ease-in-out"
                                onClick={incrementCount}
                            >
                                +
                            </button>
                        </div>
                        <div className="ml-3">
                            {click ? (
                                <AiFillHeart
                                    size={30}
                                    className="cursor-pointer "
                                    onClick={() => setClick(!click)}
                                    color={click ? 'red' : '#6443d1'}
                                    title="Remove from wishlist"
                                />
                            ) : (
                                <AiOutlineHeart
                                    size={30}
                                    className="cursor-pointer "
                                    onClick={() => setClick(!click)}
                                    color={click ? 'red' : '#6443d1'}
                                    title="Add to wishlist"
                                />
                            )}
                        </div>
                    </div>
                    <div
                        className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                    >
                        <span className="dark:text-slate-700 text-slate-300 flex items-center">
                            Add to cart{' '}
                            <AiOutlineShoppingCart className="ml-1" />
                        </span>
                    </div>
                    <div className="flex items-center pt-8">
                        <img
                            src={`/${product?.createdBy?.logo}`}
                            alt=""
                            className="w-[50px] h-[50px] rounded-full mr-2"
                        />
                        <div className="pr-8">
                            <Link
                                to={`/stores/${product.createdBy.id}`}
                                className={`${styles.shop_name} pb-1 pt-1`}
                            >
                                {product.createdBy.name}
                            </Link>
                            <h5 className="pb-3 text-[15px]">(4/5) Ratings</h5>
                        </div>
                        <div
                            className={`${styles.button} bg-[#6443d1] mt-4 !rounded !h-11`}
                        >
                            <span className="text-white flex items-center">
                                Send Message{' '}
                                <AiOutlineMessage className="ml-1" />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetails;
