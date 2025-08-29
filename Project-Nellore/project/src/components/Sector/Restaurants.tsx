import React, { useEffect, useMemo, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Search, Filter } from 'lucide-react';
import BusinessCard from '../Business/BusinessCard';
import { restaurants, restaurantCategories } from '../../data/mockData';
import * as LucideIcons from 'lucide-react';

const Restaurants: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [rating, setRating] = useState<number>(0);
  // const navigate = useNavigate();

  const getIcon = (iconName: string) => {
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
    return IconComponent ? <IconComponent className="w-6 h-6" /> : null;
  };

  const [approved, setApproved] = useState<any[]>([]);

  const refreshBusinesses = () => {
    fetch('http://localhost:8080/api/businesses?status=APPROVED')
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((biz: any) => ({
          id: String(biz.id),
          name: biz.businessName || 'Unnamed',
          sector: biz.businessType || 'other',
          category: '',
          description: biz.services || 'No description',
          address: biz.address || 'No address',
          phone: biz.phone || 'No phone',
          timings: biz.timings || 'Morning 9:00 to Night 8:00pm',
          image: biz.imageUrl || '',
          averageRating: biz.averageRating || 0,
          totalReviews: biz.totalReviews || 0,
          status: biz.status || 'APPROVED',
          createdAt: biz.createdAt || new Date().toISOString(),
        }));
        setApproved(mapped);
      })
      .catch(() => setApproved([]));
  };

  useEffect(() => {
    refreshBusinesses();
  }, []);

  const mergedRestaurants = useMemo(() => {
    return [...restaurants, ...approved].filter(r => (r.sector || '').toLowerCase() === 'restaurants');
  }, [approved]);

  const filteredRestaurants = mergedRestaurants.filter(restaurant => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         restaurant.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || restaurant.category === selectedCategory;
    const avgRating = Math.floor(restaurant.averageRating || 0);
    const matchesRating = rating === 0 || avgRating === rating;
    return matchesSearch && matchesCategory && matchesRating;
  });

  // Navigation handled by BusinessCard link

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
                    <option value={1}>1</option>
                    <option value={2}>2</option>
                    <option value={3}>3</option>
                    <option value={4}>4</option>
                    <option value={5}>5</option>
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
              <BusinessCard key={restaurant.id} business={restaurant as any} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Restaurants; 