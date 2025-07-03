import React from 'react';
import { useNavigate } from 'react-router-dom';

interface SectorItem {
  id: string;
  name: string;
  description: string;
  imageUrl?: string;
}

interface SectorListProps {
  title: string;
  items: SectorItem[];
  basePath: string;
}

const SectorList: React.FC<SectorListProps> = ({ title, items, basePath }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-text-primaryDark mb-8 transition-colors duration-500">
        {title}
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(`${basePath}/${item.id}`)}
            className="group bg-white dark:bg-card-dark rounded-2xl shadow-md dark:shadow-glow-dark hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-border-dark hover:border-amber-500 dark:hover:border-accent-darkAlt cursor-pointer"
          >
            {item.imageUrl && (
              <div className="h-48 w-full overflow-hidden">
                <img
                  src={item.imageUrl}
                  alt={item.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e: any) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80'; }}
                />
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-text-primaryDark group-hover:text-amber-500 dark:group-hover:text-accent-darkAlt transition-colors duration-300">
                {item.name}
              </h3>
              <p className="text-gray-500 dark:text-text-secondaryDark text-sm mt-1 transition-colors duration-500">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectorList; 