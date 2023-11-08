import { useEffect } from 'react';

import ProductImage from '../components/ProductImage';
import ProductDetails from '../components/ProductDetails';
import { useParams } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { PRODUCT } from '../apollo/queries';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/reducers';

import styles from '../styles/style';
import ProductInfo from '../components/ProductInfo';

const ProductPage = () => {
    const { productId } = useParams<{ productId: string }>();
    const productState = useSelector((state: RootState) =>
        productId ? state.products.byId[productId] : undefined
    );
    const [FetchProduct, { data }] = useLazyQuery(PRODUCT);

    useEffect(() => {
        if (!productState) {
            console.log('pro');

            FetchProduct({ variables: { productId } });
        }
    }, [FetchProduct, productId, productState]);
    console.log('data in product page', data);
    const { product = productState } = data || [];
    console.log('productState', productState, 'product', product);

    return (
        <div className=" mt-24 ">
            {product ? (
                <div className={`${styles.section} w-[90%] 800px:w-[80%] `}>
                    <div className="flex">
                        <ProductImage images={product?.images} />
                        <ProductDetails product={product} />
                    </div>
                    <ProductInfo product={product} />
                    <br />
                    <br />
                </div>
            ) : null}
        </div>
    );
};

export default ProductPage;
