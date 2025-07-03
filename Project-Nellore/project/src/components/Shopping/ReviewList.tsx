import React from 'react';
import { Calendar } from 'lucide-react';
import { MallReview } from '../../types';
import StarRating from '../UI/StarRating';

interface ReviewListProps {
  reviews: MallReview[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h3 className="font-medium text-gray-800">{review.userName}</h3>
              <div className="flex items-center space-x-2 mt-1">
                <StarRating rating={review.rating} size="sm" />
                <span className="text-sm text-gray-500">
                  {new Date(review.createdAt).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          
          {review.comment && (
            <p className="text-gray-600">{review.comment}</p>
          )}
        </div>
      ))}

      {reviews.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">No reviews yet. Be the first to review!</p>
        </div>
      )}
    </div>
  );
};

export default ReviewList; 