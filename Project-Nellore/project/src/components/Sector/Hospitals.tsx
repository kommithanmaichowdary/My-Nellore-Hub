import React, { useEffect, useMemo, useState } from 'react';
// @ts-ignore
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, Star } from 'lucide-react';
import SectorList from './SectorList';
import { useLanguage } from '../../contexts/LanguageContext';
import BusinessCard from '../Business/BusinessCard';

const Hospitals: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [approved, setApproved] = useState<any[]>([]);

  const refreshBusinesses = () => {
    fetch('http://localhost:8080/api/businesses?status=APPROVED')
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((biz: any) => ({
          id: String(biz.id),
          name: biz.businessName || 'Unnamed',
          sector: biz.businessType || 'other',
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

  const allHospitals = useMemo(() => {
    return approved;
  }, [approved]);

  const filteredHospitals = useMemo(() => {
    return allHospitals.filter(hospital => {
      if ((hospital.sector || '').toLowerCase() !== 'hospitals') return false;
      const matchesSearch = (hospital.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                          (hospital.description || '').toLowerCase().includes(searchTerm.toLowerCase());
      const avg = Math.floor(hospital.averageRating || 0);
      const matchesRating = ratingFilter === 0 || avg === ratingFilter;
      return matchesSearch && matchesRating;
    });
  }, [allHospitals, searchTerm, ratingFilter]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark transition-colors duration-500">
      <section className="py-16 bg-white dark:bg-background-darkAlt transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Search and Filter */}
          <div className="mb-6">
            <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-300 dark:border-border-dark p-4 shadow-sm dark:shadow-glow-dark">
              <div className="flex flex-col md:flex-row md:items-center gap-4">
                <div className="flex-grow">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder={`${t('common.search')} ${t('sector.hospitals')}...`}
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
                    value={ratingFilter}
                    onChange={(e) => setRatingFilter(Number(e.target.value))}
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
          </div>

          {/* Hospital List */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.35 }}
          >
          <SectorList
            title={t('sector.hospitals')}
            items={filteredHospitals.map(h => ({
              id: h.id,
              name: h.name,
              description: h.description,
              imageUrl: h.image,
              averageRating: h.averageRating,
              totalReviews: h.totalReviews,
            }))}
            basePath="/business"
          />
          </motion.div>

          {filteredHospitals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-text-secondaryDark">{t('common.noResults')}</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Hospitals; 