import React, { useState, useEffect, useRef } from 'react';
// @ts-ignore - local types added until deps are installed
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Star, Users, MapPin, TrendingUp, Upload, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { sectors } from '../data/mockData';
import * as LucideIcons from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

// Background assets handled via CSS/URLs

const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const { user, isLoggingOut } = useAuth();
  const [showWelcome, setShowWelcome] = useState(false);
  const [showLogoutMsg, setShowLogoutMsg] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState<typeof sectors>([]);
  const navigate = useNavigate();
  const categoriesRef = useRef<HTMLDivElement>(null);
  const prevUserRef = useRef(user);
  const justLoggedOut = useRef(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    if (value.trim()) {
      const filteredSuggestions = sectors.filter(sector =>
        sector.name.toLowerCase().includes(value.trim().toLowerCase())
      );
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (sectorId: string) => {
    setSearchTerm('');
    setSuggestions([]);
    navigate(`/sector/${sectorId}`);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length === 1) {
      handleSuggestionClick(suggestions[0].id);
    } else if (searchTerm.trim()) {
      const matchedSector = sectors.find(sector =>
        sector.name.toLowerCase() === searchTerm.trim().toLowerCase()
      );
      if (matchedSector) {
        handleSuggestionClick(matchedSector.id);
      } else {
        alert('Please select a valid sector from the suggestions.');
      }
    }
  };

  const scrollToCategories = () => {
    categoriesRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToFooter = () => {
    document.getElementById('footer-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    // Add animation to stats when they come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.stat-item, .sector-card').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (prevUserRef.current && !user) {
      // User just logged out
      justLoggedOut.current = true;
      setShowLogoutMsg(true);
      setShowWelcome(false); // Suppress welcome message
      const timer = setTimeout(() => setShowLogoutMsg(false), 3000);
      return () => clearTimeout(timer);
    } else if (!prevUserRef.current && user) {
      // User just logged in
      justLoggedOut.current = false;
    }
    prevUserRef.current = user;
  }, [user]);

  useEffect(() => {
    if (user && !justLoggedOut.current) {
      setShowWelcome(true);
      const timer = setTimeout(() => setShowWelcome(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  useEffect(() => {
    if (showLogoutMsg) {
      const timer = setTimeout(() => setShowLogoutMsg(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showLogoutMsg]);

  useEffect(() => {
    if (sessionStorage.getItem('showLogoutMsg') === 'true') {
      setShowLogoutMsg(true);
      sessionStorage.removeItem('showLogoutMsg');
    }
  }, []);

  const stats = [
    { icon: Star, label: 'Verified Businesses', value: '500+' },
    { icon: Users, label: 'Happy Customers', value: '10K+' },
    { icon: MapPin, label: 'Locations Covered', value: '50+' },
    { icon: TrendingUp, label: 'Reviews & Ratings', value: '25K+' }
  ];

  const getIcon = (iconName: string) => {
    const IconComponent = LucideIcons[iconName as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
    return IconComponent ? <IconComponent className="w-8 h-8" /> : <Star className="w-8 h-8" />;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark transition-colors duration-500">
      {/* Welcome Message */}
      <AnimatePresence>
        {user && showWelcome && !isLoggingOut && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="absolute top-10 left-1/2 -translate-x-1/2 z-30 bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded text-lg font-semibold shadow"
            style={{ minWidth: '300px', maxWidth: '90vw' }}
          >
            Welcome, {user.name || user.email}!
          </motion.div>
        )}
      </AnimatePresence>
      {/* Logout Message */}
      <AnimatePresence>
        {showLogoutMsg && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="absolute top-10 left-1/2 -translate-x-1/2 z-30 bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded text-lg font-semibold shadow"
            style={{ minWidth: '300px', maxWidth: '90vw' }}
          >
            Logout successfully
          </motion.div>
        )}
      </AnimatePresence>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax Effect */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed z-0 transition-transform duration-700 scale-110 blur-[1px]"
          style={{
            backgroundImage: `url('https://as2.ftcdn.net/v2/jpg/08/42/08/03/1000_F_842080306_IYs25Z3XmrUu2k5mKyIkrxUq6o4i0vqE.jpg')`,
          }}
        />
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 z-1 transition-colors duration-500"></div>
        <div className="absolute inset-0 bg-black/30 z-2 transition-colors duration-500"></div>
        {/* Animated Stars */}
        <div className="absolute inset-0 z-2 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="star"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`
              }}
            />
          ))}
        </div>
        {/* Shooting Star Effect */}
        <div className="absolute inset-0 z-2 overflow-hidden pointer-events-none">
          <div className="shooting-star"></div>
          <div className="shooting-star" style={{ animationDelay: '2s' }}></div>
          <div className="shooting-star" style={{ animationDelay: '4s' }}></div>
        </div>
        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="animate-fade-in-up text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl">
            {t('hero.title')}
          </h1>
          <p className="animate-fade-in-up-delay-1 text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-[#F0F4FF]">
            {t('hero.subtitle')}
          </p>
          <form onSubmit={handleSearchSubmit} className="animate-fade-in-up-delay-2 relative max-w-xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={handleSearchChange}
                placeholder="Search for a sector..."
                className="w-full bg-white/20 backdrop-blur-sm text-white placeholder-gray-300 px-6 py-4 rounded-lg font-semibold transition-all duration-300 focus:ring-2 focus:ring-[#FF9F1C] focus:outline-none"
                autoComplete="off"
              />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-[#FF9F1C]/90 text-white p-2.5 rounded-lg hover:bg-[#FF9F1C] transition-colors duration-300"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
            {suggestions.length > 0 && (
              <ul className="absolute z-20 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg mt-1 shadow-lg max-h-60 overflow-y-auto">
                {suggestions.map(sector => (
                  <li
                    key={sector.id}
                    className="px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 text-left text-text-primaryLight dark:text-text-primaryDark"
                    onClick={() => handleSuggestionClick(sector.id)}
                  >
                    {sector.name}
                  </li>
                ))}
              </ul>
            )}
          </form>
          <motion.div className="flex flex-col sm:flex-row gap-4 justify-center mt-4"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <button
              onClick={scrollToCategories}
              className="group bg-transparent border-2 border-white/50 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Explore Businesses</span>
            </button>
            <Link
              to="/upload"
              className="group bg-amber-500/90 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-500 transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg"
            >
              <span>Submit Business</span>
              <Upload className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>

        {/* Scroll Down Hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
          <button
            onClick={scrollToFooter}
            className="p-2 rounded-full bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300 animate-bounce"
            aria-label="Scroll to footer"
          >
            <ChevronDown className="w-6 h-6" />
          </button>
        </div>

        {/* Reflection Effect - Enhanced */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-50/40 to-transparent z-3 backdrop-blur-[2px]"></div>
      </section>

      {/* Stats Section with Animation - Updated colors */}
      <section className="py-16 bg-white dark:bg-background-darkAlt transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div 
                key={index} 
                className="stat-item opacity-0 transform translate-y-8 transition-all duration-1000 ease-out text-center"
                style={{ transitionDelay: `${index * 200}ms` }}
              >
                <div className="bg-white dark:bg-card-dark rounded-xl p-6 shadow-md dark:shadow-glow-dark hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-gray-200 dark:border-border-dark transition-colors duration-500">
                  <div className="bg-amber-500 dark:bg-accent-darkAlt w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-500">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-text-primaryDark transition-colors duration-500">{stat.value}</h3>
                  <p className="text-gray-500 dark:text-text-secondaryDark mt-2 transition-colors duration-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section with Enhanced Animations - Updated colors */}
      <section ref={categoriesRef} className="py-16 bg-gray-50 dark:bg-background-darkAlt transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-text-primaryDark mb-4 transition-colors duration-500">
              {t('categories.title')}
            </h2>
            <p className="text-xl text-gray-500 dark:text-text-secondaryDark transition-colors duration-500">
              Explore businesses across various sectors in Nellore
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sectors.map((sector, index) => (
              <Link
                key={sector.id}
                to={sector.id === 'restaurants' ? '/restaurants' : `/sector/${sector.id}`}
                className="sector-card opacity-0 transform translate-y-8 transition-all duration-1000 ease-out"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="group bg-white dark:bg-card-dark rounded-2xl shadow-md dark:shadow-glow-dark hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-border-dark hover:border-amber-500 dark:hover:border-accent-darkAlt transition-colors duration-500">
                  <div className="p-8">
                    <div className="flex items-center space-x-6 mb-4">
                      <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 dark:from-accent-dark dark:to-accent-darkAlt rounded-xl opacity-0 group-hover:opacity-20 transform group-hover:scale-110 transition-all duration-500"></div>
                        <div className="bg-gray-100 dark:bg-background-darkAlt w-20 h-20 rounded-xl flex items-center justify-center group-hover:scale-110 transform transition-all duration-500 relative">
                          <div className="text-amber-500 dark:text-accent-darkAlt transform group-hover:rotate-12 transition-all duration-500 group-hover:scale-110">
                            {getIcon(sector.icon)}
                          </div>
                          <div className="absolute inset-0 bg-amber-500 dark:bg-accent-darkAlt opacity-0 group-hover:opacity-5 rounded-xl transform group-hover:scale-95 transition-all duration-500"></div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-text-primaryDark group-hover:text-amber-500 dark:group-hover:text-accent-darkAlt transition-colors duration-300">
                          {sector.name}
                        </h3>
                        <p className="text-gray-500 dark:text-text-secondaryDark text-sm mt-1 transition-colors duration-500">
                          {sector.description}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center text-amber-500 dark:text-accent-darkAlt font-medium group-hover:text-amber-600 dark:group-hover:text-accent-dark transition-all duration-300">
                      <span className="group-hover:translate-x-2 transition-transform duration-300">Explore</span>
                      <ArrowRight className="w-4 h-4 ml-2 transform group-hover:translate-x-3 transition-all duration-300" />
                    </div>
                  </div>
                  {/* Animated background elements */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                    <div className="absolute top-0 right-0 w-20 h-20 bg-amber-500/10 dark:bg-accent-darkAlt/10 rounded-full transform translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-20 h-20 bg-orange-500/10 dark:bg-accent-dark/10 rounded-full transform -translate-x-1/2 translate-y-1/2"></div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Updated colors */}
      <section className="py-16 bg-gradient-to-r from-gray-50 via-gray-100 to-white dark:from-[#232526] dark:via-[#414345] dark:to-[#232526] transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-800 dark:text-white drop-shadow-lg transition-colors duration-500">
            Ready to Grow Your Business?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-gray-600 dark:text-gray-200 transition-colors duration-500">
            Join thousands of businesses that trust Nellore Hub to connect with customers
          </p>
          <Link
            to="/upload"
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:from-amber-500/90 hover:to-orange-500/90 transition-all duration-500 inline-flex items-center space-x-2 shadow-xl hover:shadow-2xl transform hover:-translate-y-1"
          >
            <span>Submit Your Business</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;