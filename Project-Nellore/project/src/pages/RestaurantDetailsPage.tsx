import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, MapPin, Clock, Phone, DollarSign, ChefHat, User, Calendar } from 'lucide-react';
import { restaurants as allRestaurants, mockReviews } from '../data/mockData';
import StarRating from '../components/UI/StarRating';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

interface ReviewFormData {
  rating: number;
  comment: string;
}

const RestaurantDetailsPage: React.FC = () => {
  const { restaurantId } = useParams<{ restaurantId: string }>();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewForm, setReviewForm] = useState<ReviewFormData>({
    rating: 0,
    comment: ''
  });

  const restaurant = allRestaurants.find(r => r.id === restaurantId);
  const restaurantReviews = mockReviews.filter(r => r.businessId === restaurantId);

  if (!restaurant) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-text-primaryLight dark:text-text-primaryDark mb-4">Restaurant Not Found</h1>
          <p className="text-text-secondaryLight dark:text-text-secondaryDark">The requested restaurant could not be found.</p>
        </div>
      </div>
    );
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically make an API call to submit the review
    console.log('Review submitted:', reviewForm);
    setIsReviewModalOpen(false);
    setReviewForm({ rating: 0, comment: '' });
  };

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-500">
      {/* Hero Section */}
      <div className="mx-4 sm:mx-6 lg:mx-8 mt-8">
        <div className="relative h-64 md:h-80">
          <img
            src={restaurant.image}
            alt={restaurant.name}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end rounded-lg">
            <div className="w-full p-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">{restaurant.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <StarRating rating={restaurant.averageRating} size="md" />
                  <span className="text-lg font-medium text-white">
                    {restaurant.averageRating.toFixed(1)}
                  </span>
                  <span className="text-sm opacity-90 text-white">
                    ({restaurant.totalReviews} reviews)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-4 sm:mx-6 lg:mx-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Restaurant Info */}
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-md dark:shadow-glow-dark p-6 border border-border-light dark:border-border-dark transition-colors duration-500">
              <h2 className="text-2xl font-bold text-text-primaryLight dark:text-text-primaryDark mb-4">
                About {restaurant.name}
              </h2>
              <p className="text-text-secondaryLight dark:text-text-secondaryDark mb-6">
                {restaurant.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-text-primaryLight dark:text-text-primaryDark mb-3">Details</h3>
                  <div className="space-y-3">
                    <div className="flex items-start">
                      <MapPin className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-text-secondaryLight dark:text-text-secondaryDark">{restaurant.address}</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3 flex-shrink-0" />
                      <span className="text-text-secondaryLight dark:text-text-secondaryDark">{restaurant.phone}</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 text-gray-400 dark:text-gray-500 mr-3 flex-shrink-0" />
                      <span className="text-text-secondaryLight dark:text-text-secondaryDark">{restaurant.timings}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-text-primaryLight dark:text-text-primaryDark mb-3">Cuisine & Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {(restaurant.cuisine || []).map((c, i) => (
                      <span key={i} className="px-3 py-1 text-sm bg-gray-100 dark:bg-background-dark text-text-secondaryLight dark:text-text-secondaryDark rounded-full">{c}</span>
                    ))}
                    {(restaurant.features || []).map((f, i) => (
                      <span key={i} className="px-3 py-1 text-sm bg-blue-100 dark:bg-accent-dark/20 text-blue-800 dark:text-accent-dark rounded-full">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Write a Review Section */}
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-md dark:shadow-glow-dark p-6 text-center border border-border-light dark:border-border-dark transition-colors duration-500">
              <h2 className="text-2xl font-bold text-text-primaryLight dark:text-text-primaryDark mb-4">
                {t('business.shareExperience')}
              </h2>
              <p className="text-text-secondaryLight dark:text-text-secondaryDark mb-6 max-w-lg mx-auto">
                {t('business.shareExperienceSubtitle')}
              </p>
              {isAuthenticated ? (
                  <button
                    onClick={() => setIsReviewModalOpen(true)}
                    className="bg-secondary-light dark:bg-secondary-dark text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    {t('business.submitReview')}
                  </button>
                ) : (
                  <div className="text-center p-4 border-2 border-dashed rounded-lg border-gray-300 dark:border-gray-600">
                    <p className="text-text-secondaryLight dark:text-text-secondaryDark">
                      <a href="/login" className="font-bold text-secondary-light dark:text-secondary-dark hover:underline">
                        {t('business.loginToReview')}
                      </a>
                    </p>
                  </div>
                )}
            </div>
            
            {/* Reviews Section */}
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-md dark:shadow-glow-dark p-6 border border-border-light dark:border-border-dark transition-colors duration-500">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-text-primaryLight dark:text-text-primaryDark">
                  All Reviews
                </h2>
              </div>
              <div className="space-y-4">
                {restaurantReviews.map((review) => (
                  <div key={review.id} className="border-b border-border-light dark:border-border-dark pb-4 last:border-b-0">
                    <div className="flex items-start space-x-3">
                      <div className="bg-orange-100 dark:bg-secondary-dark/20 w-10 h-10 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5 text-orange-500 dark:text-secondary-dark" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="font-medium text-text-primaryLight dark:text-text-primaryDark">{review.userName}</h4>
                          <StarRating rating={review.rating} size="sm" />
                          <span className="text-sm text-text-secondaryLight dark:text-text-secondaryDark flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-text-secondaryLight dark:text-text-secondaryDark">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Rating Summary */}
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-md dark:shadow-glow-dark p-6 border border-border-light dark:border-border-dark transition-colors duration-500">
              <h3 className="text-lg font-semibold text-text-primaryLight dark:text-text-primaryDark mb-4">
                Rating Summary
              </h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500 dark:text-secondary-dark mb-2">
                  {restaurant.averageRating.toFixed(1)}
                </div>
                <StarRating rating={restaurant.averageRating} size="lg" />
                <p className="text-text-secondaryLight dark:text-text-secondaryDark mt-2">
                  Based on {restaurant.totalReviews} reviews
                </p>
              </div>
            </div>

            {/* Book a Table */}
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-md dark:shadow-glow-dark p-6 border border-border-light dark:border-border-dark transition-colors duration-500">
              <h3 className="text-lg font-semibold text-text-primaryLight dark:text-text-primaryDark mb-4">
                Book a Table
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-secondary-light text-white py-2.5 rounded-lg hover:bg-opacity-90 transition-all flex items-center justify-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>Reserve Now</span>
                </button>
                <button className="w-full bg-green-500 text-white py-2.5 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <form onSubmit={handleReviewSubmit} className="bg-card-light dark:bg-card-dark rounded-lg max-w-md w-full p-6 border border-border-light dark:border-border-dark">
            <h3 className="text-lg font-semibold text-text-primaryLight dark:text-text-primaryDark mb-4">
              {t('business.writeReview')}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-text-primaryLight dark:text-text-primaryDark mb-2">
                  {t('business.yourRating')}
                </label>
                <StarRating
                  rating={reviewForm.rating}
                  onRatingChange={(rating) => setReviewForm(prev => ({ ...prev, rating }))}
                  size="lg"
                  interactive={true}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-primaryLight dark:text-text-primaryDark mb-2">
                  {t('business.yourReview')}
                </label>
                <textarea
                  value={reviewForm.comment}
                  onChange={(e) => setReviewForm(prev => ({ ...prev, comment: e.target.value }))}
                  className="w-full px-3 py-2 border border-border-light dark:border-border-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-light dark:focus:ring-secondary-dark focus:border-transparent bg-background-light dark:bg-background-dark text-text-primaryLight dark:text-text-primaryDark transition-colors duration-500"
                  rows={4}
                  placeholder="Share your experience..."
                  maxLength={300}
                  required
                />
                <p className="text-sm text-text-secondaryLight dark:text-text-secondaryDark mt-1">
                  {reviewForm.comment.length}/300 characters
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                type="button"
                onClick={() => setIsReviewModalOpen(false)}
                className="flex-1 px-4 py-2 border border-border-light dark:border-border-dark text-text-primaryLight dark:text-text-primaryDark rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-secondary-light dark:bg-secondary-dark text-white rounded-lg hover:opacity-90 transition-colors"
              >
                {t('business.submitReview')}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RestaurantDetailsPage; 