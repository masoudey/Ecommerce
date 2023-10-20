import React, { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    return isOpen ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50">
            <div
                className="fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50"
                onClick={onClose}
            ></div>
            <div className=" bg-white dark:bg-slate-700 p-6 rounded-lg w-2/3 h-2/3  shadow-lg z-50  animate-custom-fade-in animate-duration-[3000] animate-ease-out">
                <div className="flex justify-end">
                    <button
                        className="text-gray-500 hover:text-gray-700 transition duration-300"
                        onClick={onClose}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>
                <div className="mt-4">{children}</div>
            </div>
        </div>
    ) : null;
};

export default Modal;
