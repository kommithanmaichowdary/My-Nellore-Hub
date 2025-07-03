import React, { useState, useMemo } from 'react';
import SectorList from './SectorList';
import { mockBusinesses } from '../../data/mockData';
import { useLanguage } from '../../contexts/LanguageContext';
import { Search, Star } from 'lucide-react';

const ShoppingMalls: React.FC = () => {
  const [search, setSearch] = useState('');
  const [rating, setRating] = useState<number | null>(null);
  const { t } = useLanguage();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleRating = (r: number | null) => {
    setRating(r);
  };

  const filteredMalls = useMemo(() => {
    return mockBusinesses.filter((mall) => {
      if (mall.sector !== 'shopping') return false;
      const matchesSearch = mall.name.toLowerCase().includes(search.toLowerCase());
      const avgRating = mall.averageRating || 0;
      const matchesRating = rating ? Math.floor(avgRating) === rating : true;
      return matchesSearch && matchesRating;
    });
  }, [search, rating]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark transition-colors duration-500">
      <section className="py-16 bg-white dark:bg-background-darkAlt transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-6">
            <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-300 dark:border-border-dark p-4 shadow-sm dark:shadow-glow-dark">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-grow">
                  <div className="relative">
                    <input
                      type="text"
                      value={search}
                      onChange={handleSearch}
                      placeholder={`${t('common.search')} ${t('sector.shopping')}...`}
                      className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 dark:border-border-dark focus:outline-none focus:ring-2 focus:ring-[#FF9F1C] dark:focus:ring-accent-darkAlt transition-all bg-gray-50 dark:bg-background-dark text-gray-900 dark:text-text-primaryDark placeholder-gray-400 dark:placeholder-text-secondaryDark"
                    />
                    <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium text-gray-700 dark:text-text-primaryDark">{t('common.filter')}:</span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
                    {[5, 4, 3, 2, 1].map((star) => (
                      <button
                        key={star}
                        onClick={() => handleRating(star === rating ? null : star)}
                        className={`px-3 py-1.5 rounded-lg border text-sm font-semibold flex items-center gap-1 transition-all duration-200 whitespace-nowrap
                          ${rating === star 
                            ? 'bg-amber-500 text-white border-amber-500 dark:bg-accent-darkAlt dark:border-accent-darkAlt' 
                            : 'bg-gray-50 dark:bg-background-dark text-amber-500 dark:text-accent-darkAlt border-gray-300 dark:border-border-dark hover:bg-amber-50 dark:hover:bg-background-darkAlt'}`}
                      >
                        <Star className={`w-4 h-4 ${rating === star ? 'text-white' : 'text-amber-500 dark:text-accent-darkAlt'}`} />
                        {star}+
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <SectorList
            title={t('sector.shopping')}
            items={filteredMalls.map(m => ({...m, imageUrl: m.image}))}
            basePath="/business"
          />
        </div>
      </section>
    </div>
  );
};

export default ShoppingMalls; 