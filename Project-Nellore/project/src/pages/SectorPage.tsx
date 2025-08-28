import React, { useState, useEffect, useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Search, Filter, Star, MapPin, Phone, Clock } from 'lucide-react';
import { sectors } from '../data/mockData';
import BusinessCard from '../components/Business/BusinessCard';

const SectorPage: React.FC = () => {
  const { sectorId } = useParams<{ sectorId: string }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [ratingFilter, setRatingFilter] = useState<number>(0);
  const [approvedBusinesses, setApprovedBusinesses] = useState([]);

  const refreshBusinesses = () => {
    fetch('http://localhost:8080/api/businesses?status=APPROVED')
      .then(res => res.json())
      .then(data => {
        const mapped = data.map((biz: any) => ({
          ...biz,
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
        setApprovedBusinesses(mapped);
        // Debug log
        console.log('Mapped approved businesses:', mapped);
      });
  };

  useEffect(() => {
    refreshBusinesses();
  }, []);

  const sector = sectors.find(s => s.id === sectorId);
  
  const allBusinesses = approvedBusinesses as any[];

  // Debug log for allBusinesses and sectorId
  useEffect(() => {
    console.log('allBusinesses:', allBusinesses);
    console.log('sectorId:', sectorId);
  }, [allBusinesses, sectorId]);

  const filteredBusinesses = useMemo(() => {
    const normalize = (str: string | undefined) =>
      str ? str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') : '';
    const result = allBusinesses.filter(business => {
      const matchesSector = normalize(business.sector) === sectorId;
      const matchesSearch = business.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           business.description?.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesRating = ratingFilter === 0 || business.averageRating >= ratingFilter;
      const isApproved = business.status ? business.status === 'APPROVED' : true;
      if (matchesSector && isApproved) {
        console.log('Business passing filter:', business, 'sectorId:', sectorId);
      }
      return matchesSector && matchesSearch && matchesRating && isApproved;
    });
    console.log('filteredBusinesses:', result);
    return result;
  }, [allBusinesses, sectorId, searchTerm, ratingFilter]);

  if (!sector) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Sector Not Found</h1>
          <p className="text-gray-600">The requested sector could not be found.</p>
        </div>
      </div>
    );
  }

  // Default sector page
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark transition-colors duration-500">
      <div className="mx-4 sm:mx-6 lg:mx-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-text-primaryDark mb-2">{sector.name}</h1>
          <p className="text-xl text-gray-600 dark:text-text-secondaryDark">{sector.description}</p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="bg-white dark:bg-card-dark rounded-xl border border-gray-300 dark:border-border-dark p-4 shadow-sm dark:shadow-glow-dark">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex-grow">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search businesses..."
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
                  <option value={4}>4+ Stars</option>
                  <option value={3}>3+ Stars</option>
                  <option value={2}>2+ Stars</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Business Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBusinesses.map((business) => (
            sector.id === 'shopping' ? (
              <Link to={`/business/${business.id}`} key={business.id} className="block">
              <div className="group bg-white dark:bg-card-dark rounded-2xl shadow-md dark:shadow-glow-dark hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-border-dark hover:border-amber-500 dark:hover:border-accent-darkAlt cursor-pointer">
                <div className="relative h-48 w-full overflow-hidden">
                  <img
                    src={business.image || 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80'}
                    alt={business.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80'; }}
                  />
                </div>
                
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2 gap-2">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-text-primaryDark line-clamp-2 group-hover:text-amber-500 dark:group-hover:text-accent-darkAlt transition-colors duration-300 flex-grow">
                      {business.name}
                    </h3>
                    <div className="flex items-center bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded">
                      <span className="text-green-700 dark:text-green-400 font-medium mr-1">
                        {business.averageRating.toFixed(1)}
                      </span>
                      <Star className="w-4 h-4 text-green-700 dark:text-green-400" />
                    </div>
                  </div>
                  
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

                  <div className="mt-3 flex items-center justify-between">
                    <div />
                    <span className="text-orange-500 dark:text-accent-darkAlt font-medium text-sm group-hover:underline">
                      View Details →
                    </span>
                  </div>
                </div>
              </div>
            </Link>
            ) : (
              <BusinessCard key={business.id} business={business} />
            )
          ))}
        </div>

        {filteredBusinesses.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-600">No businesses found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SectorPage;
                    placeholder="Search businesses..."

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

                  <option value={4}>4+ Stars</option>

                  <option value={3}>3+ Stars</option>

                  <option value={2}>2+ Stars</option>

                </select>

              </div>

            </div>

          </div>

        </div>



        {/* Business Grid */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {filteredBusinesses.map((business) => (

            sector.id === 'shopping' ? (

              <Link to={`/business/${business.id}`} key={business.id} className="block">

              <div className="group bg-white dark:bg-card-dark rounded-2xl shadow-md dark:shadow-glow-dark hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-border-dark hover:border-amber-500 dark:hover:border-accent-darkAlt cursor-pointer">

                <div className="relative h-48 w-full overflow-hidden">

                  <img

                    src={business.image || 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80'}

                    alt={business.name}

                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"

                    onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80'; }}

                  />

                </div>

                

                <div className="p-4">

                  <div className="flex justify-between items-start mb-2 gap-2">

                    <h3 className="text-lg font-semibold text-gray-800 dark:text-text-primaryDark line-clamp-2 group-hover:text-amber-500 dark:group-hover:text-accent-darkAlt transition-colors duration-300 flex-grow">

                      {business.name}

                    </h3>

                    <div className="flex items-center bg-green-100 dark:bg-green-900/20 px-2 py-1 rounded">

                      <span className="text-green-700 dark:text-green-400 font-medium mr-1">

                        {business.averageRating.toFixed(1)}

                      </span>

                      <Star className="w-4 h-4 text-green-700 dark:text-green-400" />

                    </div>

                  </div>

                  

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



                  <div className="mt-3 flex items-center justify-between">

                    <div />

                    <span className="text-orange-500 dark:text-accent-darkAlt font-medium text-sm group-hover:underline">

                      View Details →

                    </span>

                  </div>

                </div>

              </div>

            </Link>

            ) : (

              <BusinessCard key={business.id} business={business} />

            )

          ))}

        </div>



        {filteredBusinesses.length === 0 && (

          <div className="text-center py-12">

            <p className="text-gray-600">No businesses found matching your criteria.</p>

          </div>

        )}

      </div>

    </div>

  );

};



export default SectorPage;
