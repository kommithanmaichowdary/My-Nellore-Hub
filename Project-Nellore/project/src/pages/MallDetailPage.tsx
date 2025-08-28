import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { mockReviews } from '../data/mockData';
import { shoppingItems } from '../data/shoppingData';
import { Business, Review, MallDetail } from '../types';
import MallDetails from '../components/Shopping/MallDetails';
import ReviewList from '../components/Shopping/ReviewList';
import ReviewForm from '../components/Shopping/ReviewForm';
import Modal from '../components/Common/Modal';
import Toast from '../components/Common/Toast';
import ShoppingItemList from '../components/Shopping/ShoppingItemList';

const MallDetailPage: React.FC = () => {
  const { mallId } = useParams<{ mallId: string }>();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();

  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const business = null;

  const handleReviewSubmit = (rating: number, comment: string) => {
    console.log('Review Submitted:', { mallId, rating, comment });
    setShowReviewModal(false);
    setToastMessage('Review submitted successfully!');
    setShowToast(true);
  };

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <h1 className="text-2xl font-bold text-text-primaryLight dark:text-text-primaryDark">Mall not found</h1>
      </div>
    );
  }

  const mockMall: MallDetail = {
    ...business,
    image: business.image || '',
    products: ['Clothing', 'Footwear', 'Electronics', 'Home Decor', 'Food Court', 'Entertainment', 'Jewelry', 'Accessories'],
    ageGroups: ['1-10 years', '11-20 years', '21-30 years', '31-40 years', '41+ years'],
    targetGender: 'all',
    reviews: mockReviews.filter(r => r.businessId === mallId),
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-500">
      <div className="mx-4 sm:mx-6 lg:mx-8 mt-8">
        {/* Hero Section */}
        <div className="relative h-64 md:h-80">
          <img
            src={mockMall.image}
            alt={mockMall.name}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-end">
            <div className="w-full p-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">{mockMall.name}</h1>
              <p className="text-lg opacity-90 text-white">{mockMall.description}</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-md dark:shadow-glow-dark p-6 border border-border-light dark:border-border-dark transition-colors duration-500">
              <MallDetails mall={mockMall} />
            </div>
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-md dark:shadow-glow-dark p-6 border border-border-light dark:border-border-dark transition-colors duration-500">
              <ReviewList reviews={mockMall.reviews} />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-md dark:shadow-glow-dark p-6 border border-border-light dark:border-border-dark transition-colors duration-500">
              <ReviewForm onSubmit={handleReviewSubmit} />
            </div>
            
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-md dark:shadow-glow-dark p-6 border border-border-light dark:border-border-dark transition-colors duration-500">
              <ShoppingItemList items={shoppingItems} />
            </div>
          </div>
        </div>
      </div>

      {/* Toast Notification */}
      {showToast && (
        <Toast
          message={toastMessage}
          type="success"
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
};

export default MallDetailPage; 