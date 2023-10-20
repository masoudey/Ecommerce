import { useState } from 'react';

function ProductImage({ images }: { images: [string] }) {
    const [select, setSelect] = useState(0);
    return (
        <div className="w-full 800px:w-[50%]">
            <img src={`${images[select]}`} alt="" className="w-[80%]" />
            <div className="w-full flex">
                {images &&
                    images.map((i, index) => (
                        <div
                            className={`${
                                select === 0 ? 'border' : 'null'
                            } cursor-pointer`}
                        >
                            <img
                                src={`${i}`}
                                alt=""
                                className="h-[200px] overflow-hidden mr-3 mt-3"
                                onClick={() => setSelect(index)}
                            />
                        </div>
                    ))}
                <div
                    className={`${
                        select === 1 ? 'border' : 'null'
                    } cursor-pointer`}
                ></div>
            </div>
        </div>
    );
}

export default ProductImage;
