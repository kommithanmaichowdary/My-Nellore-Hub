import React from 'react';
import BusinessCard from '../Business/BusinessCard';

interface SectorItem {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
  averageRating?: number;
  totalReviews?: number;
}

interface SectorListProps {
  title: string;
  items: SectorItem[];
  basePath: string;
}

const SectorList: React.FC<SectorListProps> = ({ title, items, basePath }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-text-primaryDark mb-8 transition-colors duration-500">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <BusinessCard
            key={item.id}
            business={{
              id: item.id,
              name: item.name,
              description: item.description,
              image: item.imageUrl,
              averageRating: item.averageRating || 0,
              totalReviews: item.totalReviews || 0,
              sector: title
            } as any}
          />
        ))}
      </div>
    </div>
  );
};

export default SectorList; 