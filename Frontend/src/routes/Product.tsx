import { useEffect, useState } from 'react';
import {
    AiFillHeart,
    AiOutlineHeart,
    AiOutlineMessage,
    AiOutlineShoppingCart,
} from 'react-icons/ai';
import ProductImage from '../components/ProductImage';
import ProductDescription from '../components/ProductDesc';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { PRODUCT } from '../apollo/queries';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';
import Modal from '../components/Modal';
import styles from '../styles/style';
import { Product } from '../common.types';
import ProductDetailsInfo from '../components/ProductInfo';

const ProductPage = () => {
    const [count, setCount] = useState(1);
    const [click, setClick] = useState(false);

    const { productId } = useParams<{ productId: string }>();
    const productState = useSelector((state: RootState) =>
        productId ? state.products.byId[productId] : undefined
    );
    const [FetchProduct, { data, loading, error }] = useLazyQuery(PRODUCT);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    const incrementCount = () => {
        setCount(count + 1);
    };

    const decrementCount = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    };

    useEffect(() => {
        if (!productState) {
            console.log('pro');

            FetchProduct({ variables: { productId } });
        }
    }, [FetchProduct, productId, productState]);
    console.log('data in product page', data);
    const { product = productState } = data || [];
    console.log('productState', productState, 'product', product);

    // return (
    //     <div className="container mx-auto mt-20 text-slate-800 dark:text-slate-200">
    //         <div className="flex pt-6">
    //             <ProductImage image={product?.image || '/iphone.jpg'} />
    //             <div className=" w-2/3">
    //                 <ProductInfo name={product?.name} price={product?.price} />
    //                 <ProductDescription description={product?.description} />
    //                 <button onClick={openModal}>Details</button>
    //                 <Modal isOpen={isModalOpen} onClose={closeModal}>
    //                     <div>{product?.Manufacturer}</div>
    //                     {/* <div>{product?.colors[0]}</div> */}
    //                 </Modal>
    //             </div>
    //         </div>
    //         <ProductReviews reviews={product?.reviews} />
    //     </div>
    // );
    return (
        <div className="bg-white">
            {data ? (
                <div className={`${styles.section} w-[90%] 800px:w-[80%]`}>
                    <ProductImage images={product?.image} />
                    <div className="w-full py-5">
                        <div className="block w-full 800px:flex">
                            <div className="w-full 800px:w-[50%] pt-5">
                                <h1 className={`${styles.productTitle}`}>
                                    {data.name}
                                </h1>
                                <p>{data.description}</p>
                                <div className="flex pt-3">
                                    <h4
                                        className={`${styles.productDiscountPrice}`}
                                    >
                                        {data.discountPrice}$
                                    </h4>
                                    <h3 className={`${styles.price}`}>
                                        {data.originalPrice
                                            ? data.originalPrice + '$'
                                            : null}
                                    </h3>
                                </div>

                                <div className="flex items-center mt-12 justify-between pr-3">
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
                                    <div>
                                        {click ? (
                                            <AiFillHeart
                                                size={30}
                                                className="cursor-pointer"
                                                onClick={() => setClick(!click)}
                                                color={click ? 'red' : '#333'}
                                                title="Remove from wishlist"
                                            />
                                        ) : (
                                            <AiOutlineHeart
                                                size={30}
                                                className="cursor-pointer"
                                                onClick={() => setClick(!click)}
                                                color={click ? 'red' : '#333'}
                                                title="Add to wishlist"
                                            />
                                        )}
                                    </div>
                                </div>
                                <div
                                    className={`${styles.button} !mt-6 !rounded !h-11 flex items-center`}
                                >
                                    <span className="text-white flex items-center">
                                        Add to cart{' '}
                                        <AiOutlineShoppingCart className="ml-1" />
                                    </span>
                                </div>
                                <div className="flex items-center pt-8">
                                    <img
                                        src={`${data?.shop?.avatar}`}
                                        alt=""
                                        className="w-[50px] h-[50px] rounded-full mr-2"
                                    />
                                    <div className="pr-8">
                                        <h3
                                            className={`${styles.shop_name} pb-1 pt-1`}
                                        >
                                            {data.shop.name}
                                        </h3>
                                        <h5 className="pb-3 text-[15px]">
                                            (4/5) Ratings
                                        </h5>
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
                    <ProductDetailsInfo product={product} />
                    <br />
                    <br />
                </div>
            ) : null}
        </div>
    );
};

export default ProductPage;
