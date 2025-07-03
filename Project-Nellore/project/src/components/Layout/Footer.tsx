import React from 'react';
import { MapPin, Phone, Mail, Heart } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer id="footer-section" className="bg-headerfooter-light dark:bg-headerfooter-dark border-t border-border-light dark:border-border-dark text-text-secondaryLight dark:text-text-secondaryDark transition-colors duration-500 py-6 shadow-inner">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-white font-bold">
                N
              </div>
              <span className="text-xl font-bold text-text-primaryLight dark:text-text-primaryDark transition-colors duration-500">Nellore Hub</span>
            </div>
            <p className="mb-4 max-w-md text-text-secondaryLight dark:text-text-secondaryDark transition-colors duration-500">
              {t('footer.about')}
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-text-secondaryLight dark:text-text-secondaryDark transition-colors duration-500">
                <MapPin className="w-4 h-4" />
                <span>Nellore, Andhra Pradesh</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-primaryLight dark:text-text-primaryDark transition-colors duration-500">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2">
              <li><a href="/" className="transition-colors duration-500 text-text-secondaryLight dark:text-text-secondaryDark hover:text-accent-light dark:hover:text-accent-darkAlt">{t('nav.home')}</a></li>
              <li><a href="/sector/education" className="transition-colors duration-500 text-text-secondaryLight dark:text-text-secondaryDark hover:text-accent-light dark:hover:text-accent-darkAlt">{t('sector.education')}</a></li>
              <li><a href="/sector/hospitals" className="transition-colors duration-500 text-text-secondaryLight dark:text-text-secondaryDark hover:text-accent-light dark:hover:text-accent-darkAlt">{t('sector.hospitals')}</a></li>
              <li><a href="/sector/restaurants" className="transition-colors duration-500 text-text-secondaryLight dark:text-text-secondaryDark hover:text-accent-light dark:hover:text-accent-darkAlt">{t('sector.restaurants')}</a></li>
              <li><a href="/public-upload" className="transition-colors duration-500 text-text-secondaryLight dark:text-text-secondaryDark hover:text-accent-light dark:hover:text-accent-darkAlt">{t('nav.submit')}</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-text-primaryLight dark:text-text-primaryDark transition-colors duration-500">{t('footer.support')}</h3>
            <ul className="space-y-2">
              <li><a href="/help" className="transition-colors duration-500 text-text-secondaryLight dark:text-text-secondaryDark hover:text-accent-light dark:hover:text-accent-darkAlt">{t('footer.helpCenter')}</a></li>
              <li><a href="/contact" className="transition-colors duration-500 text-text-secondaryLight dark:text-text-secondaryDark hover:text-accent-light dark:hover:text-accent-darkAlt">{t('footer.contactUs')}</a></li>
              <li><a href="/privacy" className="transition-colors duration-500 text-text-secondaryLight dark:text-text-secondaryDark hover:text-accent-light dark:hover:text-accent-darkAlt">{t('footer.privacyPolicy')}</a></li>
              <li><a href="/terms" className="transition-colors duration-500 text-text-secondaryLight dark:text-text-secondaryDark hover:text-accent-light dark:hover:text-accent-darkAlt">{t('footer.termsOfService')}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border-light dark:border-border-dark mt-8 pt-8 flex flex-col md:flex-row justify-between items-center transition-colors duration-500">
          <p className="text-sm text-text-secondaryLight dark:text-text-secondaryDark transition-colors duration-500">
            &copy; {new Date().getFullYear()} Nellore Hub. {t('footer.copyright')}
          </p>
          <div className="flex items-center space-x-1 text-sm text-text-secondaryLight dark:text-text-secondaryDark transition-colors duration-500">
            <span>{t('footer.madeWith')}</span>
            <Heart className="w-4 h-4 text-red-500" />
            <span>{t('footer.forNellore')}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;