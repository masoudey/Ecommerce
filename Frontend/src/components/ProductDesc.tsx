import React from 'react';

interface ProductDescriptionProps {
    description: string;
}

function ProductDescription({ description }: ProductDescriptionProps) {
    return (
        <div className="p-4 border-t">
            <h2 className="text-lg font-semibold mb-2">Product Description</h2>
            <p>{description}</p>
            {/* Add more description here */}
        </div>
    );
}

export default ProductDescription;
