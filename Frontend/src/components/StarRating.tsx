import React from 'react';

interface StarRatingProps {
    rating: number;
}

function StarRating({ rating }: StarRatingProps) {
    return (
        <div className="text-yellow-400 flex">
            {Array.from({ length: rating }).map((_, index) => (
                <svg
                    key={index}
                    className="w-5 h-5 fill-current"
                    viewBox="0 0 24 24"
                >
                    <path d="M12 2L9.879 8.293 4.293 9.12l1.76 5.131L3.88 19.88l5.131-1.76L9.879 24l2.121-5.293 5.596-1.271-1.76-5.13L21.12 4.88 15.99 6.64l-1.27-5.13L12 2z" />
                </svg>
            ))}
        </div>
    );
}

export default StarRating;
