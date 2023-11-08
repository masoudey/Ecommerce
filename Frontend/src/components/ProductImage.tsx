import { useState } from 'react';
import Modal from '../components/Modal';

function ProductImage({ images }: { images: [string] }) {
    const [select, setSelect] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };
    return (
        <div className="w-1/3 800px:w-[50%] h-8">
            <button onClick={openModal}>Details</button>

            <Modal isOpen={isModalOpen} onClose={closeModal}>
                <div>Image</div>
            </Modal>
            <img src={`/${images[select]}`} alt="" className=" h-[350px]" />
            <div className="w-full flex">
                {images &&
                    images.map((image, i) => (
                        <div
                            className={`${
                                select === i ? 'border' : 'null'
                            } h-[60px] w-[60px] `}
                        >
                            <img
                                src={`/${image}`}
                                alt=""
                                className=" overflow-hidden h-full w-full"
                                onClick={() => setSelect(i)}
                            />
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default ProductImage;
