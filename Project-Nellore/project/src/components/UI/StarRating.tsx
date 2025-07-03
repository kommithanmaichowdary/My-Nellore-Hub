import React from 'react';
import { Star } from 'lucide-react';

export interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  onRatingChange?: (rating: number) => void;
}

const StarRating: React.FC<StarRatingProps> = ({ 
  rating, 
  size = 'sm',
  interactive = false,
  onRatingChange
}) => {
  const starSize = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  }[size];

  const renderStar = (index: number) => {
    const isFilled = index < Math.floor(rating);
    const isHalf = !isFilled && index < rating;

    return (
      <button
        key={index}
        onClick={() => interactive && onRatingChange?.(index + 1)}
        className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
        disabled={!interactive}
      >
        <Star
          className={`${starSize} ${
            isFilled
              ? 'text-amber-400 fill-amber-400'
              : isHalf
              ? 'text-amber-400 fill-amber-400/50'
              : 'text-gray-300 dark:text-gray-600'
          }`}
        />
      </button>
    );
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(5)].map((_, index) => renderStar(index))}
    </div>
  );
};

export default StarRating;