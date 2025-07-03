import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCategory } from '../../types';
import * as LucideIcons from 'lucide-react';

interface ShoppingCategoryGridProps {
  categories: ShoppingCategory[];
}

const ShoppingCategoryGrid: React.FC<ShoppingCategoryGridProps> = ({ categories }) => {
  const [search, setSearch] = useState('');
  const getIcon = (iconName: string) => {
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
    return IconComponent ? <IconComponent className="w-8 h-8" /> : null;
  };

  const filteredCategories = useMemo(() => {
    return categories.filter(category =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [categories, search]);

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search mall types..."
          className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-darkAlt transition-all shadow-sm"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCategories.map((category) => (
          <Link
            key={category.id}
            to={`/shopping/${category.id}`}
            className="block group"
          >
            <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 group-hover:shadow-lg group-hover:-translate-y-1">
              <div className="relative h-48">
                <img
                  src={category.image || 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80'}
                  alt={category.name}
                  className="w-full h-full object-cover"
                  onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80'; }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                  <div className="text-center text-white">
                    {getIcon(category.icon)}
                    <h3 className="text-xl font-semibold mt-2">{category.name}</h3>
                  </div>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm">{category.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShoppingCategoryGrid; 