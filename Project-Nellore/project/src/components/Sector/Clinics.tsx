import React from 'react';
import SectorList from './SectorList';
import { clinics } from '../../data/mockData';

const Clinics: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background-dark transition-colors duration-500">
      <section className="py-16 bg-white dark:bg-background-darkAlt transition-colors duration-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Example card, replace with actual card mapping */}
            <div className="group bg-white dark:bg-card-dark rounded-2xl shadow-md dark:shadow-glow-dark hover:shadow-xl transition-all duration-500 overflow-hidden border border-gray-200 dark:border-border-dark hover:border-amber-500 dark:hover:border-accent-darkAlt cursor-pointer">
              <div className="h-48 w-full overflow-hidden">
                <img src="https://images.unsplash.com/photo-1465101178521-c1a9136a3b99?auto=format&fit=crop&w=800&q=80" alt="Clinic" className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-text-primaryDark group-hover:text-amber-500 dark:group-hover:text-accent-darkAlt transition-colors duration-300">Clinic Name</h3>
                <p className="text-gray-500 dark:text-text-secondaryDark text-sm mt-1 transition-colors duration-500">Clinic description goes here.</p>
              </div>
            </div>
            {/* End example card */}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Clinics; 