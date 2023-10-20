import { useState, useEffect } from 'react';
import { Link, useLoaderData, useNavigate } from 'react-router-dom';
import { Product } from '../common.types';
import ProductGrid from '../components/ProductGrid';
import { GET_PRODUCTS } from '../apollo/queries';
import { useQuery } from '@apollo/client';
import { useDispatch } from 'react-redux';
import { setProducts } from '../redux/slices/productsSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

//  Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Index() {
    const { skip, q, ctg } = useLoaderData() as {
        products: [];
        q: string;
        skip: string;
        tottal: number;
        ctg: string;
    };
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, data, error } = useQuery(GET_PRODUCTS, {
        variables: {
            where:
                q || ctg
                    ? {
                          OR: [
                              q ? { name: { contains: q } } : {},
                              q ? { description: { contains: q } } : {},
                              q ? { Manufacturer: { contains: q } } : {},
                              ctg
                                  ? {
                                        categories: {
                                            some: {
                                                name: {
                                                    equals: ctg,
                                                },
                                            },
                                        },
                                    }
                                  : {},
                          ],
                      }
                    : {},
            skip: parseInt(skip),
            take: 6,
        },
        fetchPolicy: 'cache-first',
    });
    console.log('data', data, 'error', error, 'ctg', ctg);

    const { products = [], tottal = 0 } = data?.productSearch ?? [];
    if (products?.length > 0) {
        dispatch(setProducts(products));
    }

    const initSkip = parseInt(skip) || 0;
    console.log('init', initSkip);
    const [skipValue, setSkipValue] = useState(initSkip);
    // const [ctg, setCtg] = useState('');

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        searchParams.set('skip', skipValue.toString());

        // Construct the new URL and navigate
        const newURL = `${window.location.pathname}?${searchParams.toString()}`;
        navigate(newURL);
    }, [skipValue, navigate]);

    const handleNext = () => {
        if (products?.length < 5) {
            setSkipValue(0);
        } else {
            setSkipValue(skipValue + 6);
        }
    };
    return (
        <div className={`${q ? 'flex' : 'block'} mt-[5.5rem]`}>
            {q ? (
                <div className=" w-1/7 pl-3 pr-4 border-r-2 border-slate-300 dark:border-slate-700 ">
                    <h3 className="text-xl text-slate-700 dark:text-slate-300 font-semibold mb-4 mt-6">
                        Featured Brands
                    </h3>
                    <ul className="space-y-2">
                        <li>
                            <Link
                                to="?ctg=phones"
                                className="text-blue-500 hover:underline"
                            >
                                <input type="checkbox" />
                                <span>Apple</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="?ctg=phones"
                                className="text-blue-500 hover:underline"
                            >
                                <input type="checkbox" />
                                <span>Samsung</span>
                            </Link>
                        </li>
                    </ul>
                </div>
            ) : (
                <div className="swiper-container">
                    <Swiper
                        loop={true}
                        spaceBetween={30}
                        centeredSlides={true}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        pagination={{
                            clickable: true,
                        }}
                        navigation={true}
                        modules={[Autoplay, Pagination, Navigation]}
                        className="mySwiper"
                    >
                        <SwiperSlide>
                            <img src="sw1.jpg" alt="iphone" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="sw2.jpg" alt="iphone" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="sw3.jpg" alt="iphone" />
                        </SwiperSlide>
                        <SwiperSlide>
                            <img src="sw4.jpg" alt="iphone" />
                        </SwiperSlide>
                    </Swiper>
                </div>
            )}
            {/* Main Content */}
            <div className="w-6/7  pl-2">
                <div>
                    <div className="container mx-auto py-8">
                        <h1 className="text-2xl font-semibold mb-4">
                            Product List
                        </h1>
                        {!loading ? (
                            <div className="grid grid-cols-1 md:grid-cols-3  lg:grid-cols-5 gap-2">
                                {products.map((product: Product) => (
                                    <ProductGrid
                                        key={product.id}
                                        product={product}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="  shadow rounded-md p-4  w-full mx-auto">
                                <div className="animate-pulse flex space-x-4">
                                    <div className="flex-1 space-y-6 py-1">
                                        <div className="h-80 bg-slate-500 rounded"></div>
                                    </div>
                                    <div className="flex-1 space-y-6 py-1">
                                        <div className="h-80 bg-slate-500 rounded"></div>
                                    </div>
                                    <div className="flex-1 space-y-6 py-1">
                                        <div className="h-80 bg-slate-500 rounded"></div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <div>
                    <button
                        onClick={handleNext}
                        className="rounded bg-slate-500 text-slate-100 py-1 px-5 hover:bg-slate-600"
                    >
                        Next
                    </button>
                    <div>
                        {products?.length} out of {tottal}
                    </div>
                </div>
            </div>
        </div>
    );
}
