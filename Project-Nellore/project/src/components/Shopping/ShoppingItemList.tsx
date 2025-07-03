import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Phone, Clock, Star } from 'lucide-react';
import { ShoppingItem } from '../../types';
import StarRating from '../Common/StarRating';

interface ShoppingItemListProps {
  items: ShoppingItem[];
}

const ShoppingItemList: React.FC<ShoppingItemListProps> = ({ items }) => {
  const [search, setSearch] = useState('');
  const navigate = useNavigate();

  const handleItemClick = (itemId: string) => {
    navigate(`/mall/${itemId}`);
  };

  const filteredItems = useMemo(() => {
    return items.filter(item =>
      item.name.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  return (
    <div>
      <div className="mb-6 flex justify-center">
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search malls..."
          className="w-full md:w-1/3 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-darkAlt transition-all shadow-sm"
        />
      </div>
      <div className="space-y-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            onClick={() => handleItemClick(item.id)}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer hover:shadow-lg transition-shadow duration-200"
          >
            <div className="relative h-48">
              <img
                src={item.image || 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'}
                alt={item.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80'; }}
              />
              <div className="absolute inset-0 bg-black bg-opacity-20" />
            </div>
            <div className="p-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {item.name}
              </h3>
              <p className="text-gray-600 mb-4 line-clamp-2">{item.description}</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <StarRating rating={item.averageRating} size="sm" />
                  <span className="text-sm text-gray-600">
                    ({item.totalReviews})
                  </span>
                </div>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    item.status === 'open'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                  }`}
                >
                  {item.status === 'open' ? 'Open' : 'Closed'}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShoppingItemList; 