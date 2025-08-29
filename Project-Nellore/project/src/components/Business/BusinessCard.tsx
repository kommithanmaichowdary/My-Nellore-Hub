import React from 'react';
import { Link } from 'react-router-dom';
import { Business } from '../../types';
import StarRating from '../Common/StarRating';

interface BusinessCardProps {
  business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  // Helper function to get the correct image URL
  const getImageUrl = (imagePath: string | undefined) => {
    if (!imagePath) {
      return 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80';
    }
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it's a local file path, construct the backend URL
    if (imagePath.startsWith('uploads/')) {
      const filename = imagePath.split('/').pop();
      return `http://localhost:8080/api/images/${filename}`;
    }
    
    return imagePath;
  };

  return (
    <Link to={`/business/${business.id}`} className="block">
      <div className="group bg-white dark:bg-card-dark rounded-2xl shadow-md dark:shadow-glow-dark hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-border-dark hover:border-amber-500 dark:hover:border-accent-darkAlt cursor-pointer">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={getImageUrl(business.image)}
            alt={business.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => { 
              (e as any).currentTarget.onerror = null; 
              (e as any).currentTarget.src = 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80'; 
            }}
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-text-primaryDark line-clamp-2 group-hover:text-amber-500 dark:group-hover:text-accent-darkAlt transition-colors duration-300">
            {business.name}
          </h3>
          <div className="mt-2 flex items-center space-x-2">
            <StarRating rating={business.averageRating || 0} size="sm" />
            <span className="text-sm text-gray-600 dark:text-text-secondaryDark">
              ({business.totalReviews || 0})
            </span>
          </div>
          <p className="text-gray-600 dark:text-text-secondaryDark text-sm mt-2 line-clamp-2">
            {business.description}
          </p>
          <div className="mt-3 flex items-center justify-between">
            <span className="text-sm text-gray-500 dark:text-text-secondaryDark">
              {business.sector}
            </span>
            <span className="text-orange-500 dark:text-accent-darkAlt font-medium text-sm group-hover:underline">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BusinessCard;