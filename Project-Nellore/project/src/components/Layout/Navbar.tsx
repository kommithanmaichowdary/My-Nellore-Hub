import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, ArrowLeft, UserCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import ThemeToggle from '../UI/ThemeToggle';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout, setIsLoggingOut } = useAuth();
  // Debug print
  console.log('user:', user, 'isAuthenticated:', isAuthenticated);
  const { t, language, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isHomePage = location.pathname === '/';

  // Helper for closing dropdown on outside click
  useEffect(() => {
    if (!profileMenuOpen) return;
    const handleClick = (e: MouseEvent) => {
      const dropdown = document.getElementById('profile-dropdown');
      if (dropdown && !dropdown.contains(e.target as Node)) {
        setProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [profileMenuOpen]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await logout();
    navigate('/');
    sessionStorage.setItem('showLogoutMsg', 'true');
    window.location.reload();
  };

  return (
    <nav className="bg-headerfooter-light dark:bg-headerfooter-dark border-b border-border-light dark:border-border-dark shadow-lg transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            {!isHomePage && (
              <button
                onClick={() => navigate(-1)}
                className="mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
              </button>
            )}
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-2xl font-bold transition-colors duration-500">
                <span className="text-primary-light dark:text-primary-dark">My</span>
                <span className="bg-gradient-to-r from-amber-500 to-orange-600 bg-clip-text text-transparent dark:from-yellow-400 dark:to-orange-400 ml-1">Nellore Hub</span>
              </span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  className="flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-light transition-colors duration-200 focus:outline-none"
                  onClick={() => setProfileMenuOpen((open) => !open)}
                  aria-haspopup="true"
                  aria-expanded={profileMenuOpen}
                >
                  <UserCircle className="w-7 h-7 text-primary-light dark:text-primary-dark" />
                  <span className="font-semibold">{user?.name || user?.email}</span>
                </button>
                {profileMenuOpen && (
                  <div id="profile-dropdown" className="absolute right-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => setProfileMenuOpen(false)}
                    >
                      {t('nav.profile')}
                    </Link>
                    {user?.role === 'ADMIN' && (
                      <Link
                        to="/admin"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setProfileMenuOpen(false)}
                      >
                        {t('nav.admin')}
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm bg-white dark:bg-gray-800 text-primary-light dark:text-primary-dark border border-primary-light dark:border-primary-dark rounded-md hover:bg-primary-light hover:text-white dark:hover:bg-primary-dark dark:hover:text-white transition-colors duration-200 mt-1"
                    >
                      {t('nav.logout')}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-1.5 rounded-md text-sm font-semibold border-2 border-blue-900 bg-blue-900 text-white hover:bg-blue-800 hover:text-white dark:border-blue-900 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800 dark:hover:text-white transition-colors duration-300 transform hover:scale-105 shadow-[0_0_8px_2px_rgba(30,64,175,0.5)] dark:shadow-[0_0_8px_2px_rgba(30,64,175,0.7)] focus:shadow-[0_0_12px_4px_rgba(30,64,175,0.8)] dark:focus:shadow-[0_0_12px_4px_rgba(30,64,175,1)]"
                >
                  {t('nav.login')}
                </Link>
                <a
                  href="http://localhost:8080/oauth2/authorization/google"
                  className="px-4 py-1.5 rounded-md text-sm font-semibold border-2 border-secondary-light dark:border-secondary-dark bg-secondary-light dark:bg-secondary-dark text-white dark:text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-[0_0_8px_2px_rgba(251,191,36,0.5)] dark:shadow-[0_0_8px_2px_rgba(251,191,36,0.7)] focus:shadow-[0_0_12px_4px_rgba(251,191,36,0.8)] dark:focus:shadow-[0_0_12px_4px_rgba(251,191,36,1)]"
                >
                  {t('nav.register')}
                </a>
              </>
            )}

            <ThemeToggle />

            {/* Language Toggle Button */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
              className={`relative ml-2 w-14 h-9 rounded-md text-sm font-semibold border-2 border-green-800 bg-green-800 text-white hover:bg-green-900 hover:text-white dark:border-green-900 dark:bg-green-900 dark:text-white dark:hover:bg-green-800 dark:hover:text-white transition-all duration-500 transform hover:scale-105 [transform-style:preserve-3d] focus:outline-none focus:ring-2 focus:ring-green-800 dark:focus:ring-green-900 shadow-[0_0_8px_2px_rgba(16,185,129,0.5)] dark:shadow-[0_0_8px_2px_rgba(5,150,105,0.7)] focus:shadow-[0_0_12px_4px_rgba(16,185,129,0.8)] dark:focus:shadow-[0_0_12px_4px_rgba(5,150,105,1)] ${language === 'te' ? '[transform:rotateY(180deg)]' : ''}`}
              aria-label="Toggle Language"
            >
              <span className="absolute inset-0 w-full h-full flex items-center justify-center [backface-visibility:hidden]">
                EN
              </span>
              <span className="absolute inset-0 w-full h-full flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                TL
              </span>
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-light focus:outline-none"
            >
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden bg-white dark:bg-gray-800 transition-colors duration-300`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {isAuthenticated ? (
            <div className="relative">
              <button
                className="flex items-center gap-2 w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-primary-light dark:hover:text-primary-light transition-colors duration-200 focus:outline-none"
                onClick={() => setProfileMenuOpen((open) => !open)}
                aria-haspopup="true"
                aria-expanded={profileMenuOpen}
              >
                <UserCircle className="w-7 h-7 text-primary-light dark:text-primary-dark" />
                <span className="font-semibold">{user?.name || user?.email}</span>
              </button>
              {profileMenuOpen && (
                <div id="profile-dropdown" className="absolute left-0 mt-2 w-44 bg-white dark:bg-gray-800 rounded-md shadow-lg py-2 z-50 border border-gray-200 dark:border-gray-700">
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                    onClick={() => { setProfileMenuOpen(false); setIsOpen(false); }}
                  >
                    {t('nav.profile')}
                  </Link>
                  {user?.role === 'ADMIN' && (
                    <Link
                      to="/admin"
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      onClick={() => { setProfileMenuOpen(false); setIsOpen(false); }}
                    >
                      {t('nav.admin')}
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm bg-white dark:bg-gray-800 text-primary-light dark:text-primary-dark border border-primary-light dark:border-primary-dark rounded-md hover:bg-primary-light hover:text-white dark:hover:bg-primary-dark dark:hover:text-white transition-colors duration-200 mt-1"
                  >
                    {t('nav.logout')}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="block text-center px-4 py-1.5 rounded-md text-sm font-semibold border-2 border-blue-900 bg-blue-900 text-white hover:bg-blue-800 hover:text-white dark:border-blue-900 dark:bg-blue-900 dark:text-white dark:hover:bg-blue-800 dark:hover:text-white transition-colors duration-300 transform hover:scale-105 shadow-[0_0_8px_2px_rgba(30,64,175,0.5)] dark:shadow-[0_0_8px_2px_rgba(30,64,175,0.7)] focus:shadow-[0_0_12px_4px_rgba(30,64,175,0.8)] dark:focus:shadow-[0_0_12px_4px_rgba(30,64,175,1)]"
              >
                {t('nav.login')}
              </Link>
              <a
                href="http://localhost:8080/oauth2/authorization/google"
                className="block text-center px-4 py-1.5 rounded-md text-sm font-semibold border-2 border-secondary-light dark:border-secondary-dark bg-secondary-light dark:bg-secondary-dark text-white dark:text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-[0_0_8px_2px_rgba(251,191,36,0.5)] dark:shadow-[0_0_8px_2px_rgba(251,191,36,0.7)] focus:shadow-[0_0_12px_4px_rgba(251,191,36,0.8)] dark:focus:shadow-[0_0_12px_4px_rgba(251,191,36,1)]"
              >
                {t('nav.register')}
              </a>
            </>
          )}
        </div>

        {/* Language Toggle Button for Mobile */}
        <div className="px-5 pb-3 mt-2 flex justify-center items-center space-x-4">
          <ThemeToggle />
          <button
            onClick={() => setLanguage(language === 'en' ? 'te' : 'en')}
            className={`relative w-14 h-9 rounded-md text-sm font-semibold border-2 border-green-800 bg-green-800 text-white hover:bg-green-900 hover:text-white dark:border-green-900 dark:bg-green-900 dark:text-white dark:hover:bg-green-800 dark:hover:text-white transition-all duration-500 transform hover:scale-105 [transform-style:preserve-3d] focus:outline-none focus:ring-2 focus:ring-green-800 dark:focus:ring-green-900 shadow-[0_0_8px_2px_rgba(16,185,129,0.5)] dark:shadow-[0_0_8px_2px_rgba(5,150,105,0.7)] focus:shadow-[0_0_12px_4px_rgba(16,185,129,0.8)] dark:focus:shadow-[0_0_12px_4px_rgba(5,150,105,1)] ${language === 'te' ? '[transform:rotateY(180deg)]' : ''}`}
            aria-label="Toggle Language"
          >
            <span className="absolute inset-0 w-full h-full flex items-center justify-center [backface-visibility:hidden]">
                EN
            </span>
            <span className="absolute inset-0 w-full h-full flex items-center justify-center [backface-visibility:hidden] [transform:rotateY(180deg)]">
                TL
            </span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;