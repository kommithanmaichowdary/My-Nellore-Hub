import React from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Phone, Clock } from 'lucide-react';
import { Business } from '../../types';
import StarRating from '../UI/StarRating';

interface BusinessCardProps {
  business: Business;
}

const BusinessCard: React.FC<BusinessCardProps> = ({ business }) => {
  return (
    <Link to={`/business/${business.id}`} className="block">
      <div className="group bg-white dark:bg-card-dark rounded-2xl shadow-md dark:shadow-glow-dark hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-border-dark hover:border-amber-500 dark:hover:border-accent-darkAlt cursor-pointer">
        <div className="relative h-48 w-full overflow-hidden">
          <img
            src={business.image || 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80'}
            alt={business.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            onError={(e) => { (e as any).currentTarget.onerror = null; (e as any).currentTarget.src = 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80'; }}
          />
        </div>
        
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-text-primaryDark mb-2 line-clamp-2 group-hover:text-amber-500 dark:group-hover:text-accent-darkAlt transition-colors duration-300 flex items-center gap-2">
            <span className="truncate">{business.name}</span>
            <span className="flex items-center gap-1 text-sm font-medium text-gray-700 dark:text-text-primaryDark">
              <StarRating rating={business.averageRating} />
              {Number.isFinite(business.averageRating as any) ? business.averageRating.toFixed(1) : '0.0'}
            </span>
          </h3>
          
          <p className="text-gray-600 dark:text-text-secondaryDark text-sm mb-3 line-clamp-2 transition-colors duration-500">
            {business.description}
          </p>
          
          <div className="space-y-2">
            <div className="flex items-center text-gray-500 dark:text-text-secondaryDark text-sm">
              <MapPin className="w-4 h-4 mr-2 flex-shrink-0" />
              <span className="line-clamp-1">{business.address}</span>
            </div>
            
            <div className="flex items-center text-gray-500 dark:text-text-secondaryDark text-sm">
              <Phone className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{business.phone}</span>
            </div>
            
            <div className="flex items-center text-gray-500 dark:text-text-secondaryDark text-sm">
              <Clock className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>{business.timings}</span>
            </div>
          </div>
          
          <div className="mt-3 flex items-center justify-end">
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