import React from 'react';
import { Star } from 'lucide-react';
import { StarRatingProps } from '../../types';

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  size = 'md',
  readonly = true,
  onChange
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const handleClick = (value: number) => {
    if (!readonly && onChange) {
      onChange(value);
    }
  };

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          onClick={() => handleClick(value)}
          className={`focus:outline-none ${readonly ? 'cursor-default' : 'cursor-pointer'}`}
          disabled={readonly}
        >
          <Star
            className={`${sizeClasses[size]} ${
              value <= rating
                ? 'text-yellow-400 fill-yellow-400'
                : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
};

export default StarRating; 