import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Star, MapPin, Clock, Filter } from 'lucide-react';
import { restaurants, restaurantCategories, restaurantCollections } from '../../data/mockData';
import * as LucideIcons from 'lucide-react';

const Restaurants: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [rating, setRating] = useState<number>(0);
  const navigate = useNavigate();

  const getIcon = (iconName: string) => {
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
    return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
  };

  const filteredRestaurants = restaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || restaurant.category === selectedCategory;
    const avgRating = restaurant.averageRating || 0;
    const matchesRating = rating === 0 || Math.floor(avgRating) >= rating;
    return matchesSearch && matchesCategory && matchesRating;
  });

  const handleRestaurantClick = (restaurantId: string) => {
    navigate(`/restaurants/${restaurantId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark transition-colors duration-500">
      <section className="py-16 bg-white dark:bg-background-darkAlt transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search, Rating Filter, and Categories */}
          <div className="mb-8">
            {/* Search and Rating Filter */}
            <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-300 dark:border-border-dark p-4 shadow-sm dark:shadow-glow-dark mb-6">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-grow">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search for restaurants, cuisines..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-[#FF9F1C] dark:focus:ring-accent-darkAlt transition-all bg-gray-50 dark:bg-background-dark text-gray-900 dark:text-text-primaryDark placeholder-gray-400 dark:placeholder-text-secondaryDark"
                    />
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
                <div className="flex items-center gap-3 md:w-auto">
                  <Filter className="w-5 h-5 text-amber-500 flex-shrink-0" />
                  <select
                    value={rating}
                    onChange={e => setRating(Number(e.target.value))}
                    className="flex-grow md:flex-grow-0 px-4 py-2 rounded-lg border border-gray-300 dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-[#FF9F1C] dark:focus:ring-accent-darkAlt bg-gray-50 dark:bg-background-dark text-gray-900 dark:text-text-primaryDark"
                  >
                    <option value={0}>All Ratings</option>
                    <option value={4}>4+ Stars</option>
                    <option value={3}>3+ Stars</option>
                    <option value={2}>2+ Stars</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {restaurantCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id === selectedCategory ? '' : category.id)}
                  className={`flex flex-col items-center p-4 rounded-lg border transition-all duration-300 group
                    ${selectedCategory === category.id
                      ? 'bg-amber-50 border-amber-500 dark:bg-amber-900/20 dark:border-accent-darkAlt'
                      : 'bg-gray-50 dark:bg-background-dark border-gray-200 dark:border-border-dark'}
                    hover:border-amber-500 dark:hover:border-accent-darkAlt`}
                >
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-colors duration-300
                    ${selectedCategory === category.id
                      ? 'bg-amber-100 dark:bg-amber-800/30 text-amber-700 dark:text-amber-300'
                      : 'bg-amber-50 dark:bg-background-darkAlt text-amber-600 dark:text-amber-400'}
                    group-hover:bg-amber-200 dark:group-hover:bg-amber-800/40`}
                  >
                    {getIcon(category.icon)}
                  </div>
                  <span className={`text-sm font-medium text-center transition-colors duration-300
                    ${selectedCategory === category.id
                      ? 'text-amber-800 dark:text-amber-300'
                      : 'text-gray-800 dark:text-text-primaryDark'}
                    group-hover:text-amber-700 dark:group-hover:text-amber-300`}
                  >
                    {category.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Restaurant List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <div
                key={restaurant.id}
                onClick={() => handleRestaurantClick(restaurant.id)}
                className="group bg-white dark:bg-card-dark rounded-2xl shadow-md dark:shadow-glow-dark hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-border-dark hover:border-amber-500 dark:hover:border-accent-darkAlt cursor-pointer"
              >
                <div className="relative h-48">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-text-primaryDark">
                      {restaurant.name}
                    </h3>
                    <div className="flex items-center bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded">
                      <span className="text-green-700 dark:text-green-400 font-medium mr-1">
                        {restaurant.averageRating}
                      </span>
                      <Star className="w-4 h-4 text-green-700 dark:text-green-400" />
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-text-secondaryDark text-sm mb-3">
                    {restaurant.cuisine.join(' • ')}
                  </p>
                  <div className="flex items-center text-gray-500 dark:text-text-secondaryDark text-sm mb-2">
                    <MapPin className="w-4 h-4 mr-1" />
                    {restaurant.address}
                  </div>
                  <div className="flex items-center text-gray-500 dark:text-text-secondaryDark text-sm">
                    <Clock className="w-4 h-4 mr-1" />
                    {restaurant.timings}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {restaurant.features.map((feature, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium bg-gray-100 dark:bg-background-darkAlt rounded-full"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Restaurants; 