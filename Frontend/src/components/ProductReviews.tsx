import StarRating from './StarRating';
import { Review } from '../common.types';

function ProductReviews({ reviews }: { reviews: Review[] }) {
    return (
        <div className="p-4 border-t">
            <h2 className="text-lg font-semibold mb-2">Product Reviews</h2>
            {reviews?.length > 0 ? (
                reviews.map((review: Review) => (
                    <div key={review.id} className="mb-4">
                        <p className="text-gray-600 mb-1">
                            By {review?.user?.username}
                        </p>
                        <div className=" items-center">
                            <StarRating rating={review.rate} />
                            <p className="ml-2">{review.body}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div className="   rounded-md p-4  w-full mx-auto">
                    There is no review for this product
                </div>
            )}
        </div>
    );
}

export default ProductReviews;
