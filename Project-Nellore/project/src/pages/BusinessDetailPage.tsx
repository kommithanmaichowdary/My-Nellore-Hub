import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Phone, Clock, User, Calendar } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { mockReviews } from '../data/mockData';
import StarRating from '../components/UI/StarRating';

interface Review {
  id: string;
  businessId: string;
  userName: string;
  userEmail?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

const BusinessDetailPage: React.FC = () => {
  const { businessId } = useParams<{ businessId: string }>();
  const { isAuthenticated, user } = useAuth();
  const { t } = useLanguage();
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [business, setBusiness] = useState<any | null>(null);
  const [businessReviews, setBusinessReviews] = useState<Review[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const loadBusiness = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/businesses/${businessId}`);
        if (res.ok) {
          const biz = await res.json();
          const mapped = {
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
          };
          setBusiness(mapped);
        } else {
          setBusiness(null);
        }
      } catch (error) {
        setBusiness(null);
      }
    };

    const loadReviews = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/businesses/${businessId}/reviews`);
        if (res.ok) {
          const reviews = await res.json();
          const mappedReviews = reviews.map((r: any) => ({
            id: String(r.id),
            businessId: String(r.business.id),
            userName: r.userName || 'Anonymous',
            userEmail: r.userEmail || '',
            rating: r.rating || 0,
            comment: r.comment || '',
            createdAt: r.createdAt || new Date().toISOString(),
          }));
          setBusinessReviews(mappedReviews);
        } else {
          setBusinessReviews(mockReviews.filter(r => r.businessId === businessId));
        }
      } catch (error) {
        setBusinessReviews(mockReviews.filter(r => r.businessId === businessId));
      }
    };

    if (businessId) {
      loadBusiness();
      loadReviews();
    }
  }, [businessId]);

  const hasUserReviewed = isAuthenticated && user?.email
    ? businessReviews.some(r => r.userEmail === user.email)
    : false;

  const handleSubmitReview = async () => {
    if (!business || !user) return;
    setErrorMessage(null);
    setIsSubmitting(true);
    try {
      const reviewData = {
        business: { id: parseInt(businessId!) },
        userName: user.name || user.email || 'Anonymous',
        userEmail: user.email || '',
        rating: reviewRating,
        comment: reviewText
      };

      const response = await fetch('http://localhost:8080/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(reviewData)
      });

      if (response.ok) {
        const newReview = await response.json();
        const mappedReview = {
          id: String(newReview.id),
          businessId: businessId!,
          userName: newReview.userName || 'Anonymous',
          userEmail: newReview.userEmail || '',
          rating: newReview.rating || 0,
          comment: newReview.comment || '',
          createdAt: newReview.createdAt || new Date().toISOString(),
        } as Review;
        
        setBusinessReviews(prev => [mappedReview, ...prev]);
        
        const businessRes = await fetch(`http://localhost:8080/api/businesses/${businessId}`);
        if (businessRes.ok) {
          const updatedBiz = await businessRes.json();
          setBusiness((prev: any) => prev ? {
            ...prev,
            averageRating: updatedBiz.averageRating || 0,
            totalReviews: updatedBiz.totalReviews || 0
          } : null);
        }
        
        setIsReviewModalOpen(false);
        setReviewRating(5);
        setReviewText('');
      } else if (response.status === 409) {
        const text = await response.text();
        setErrorMessage(text || 'You have already submitted a review for this business.');
      } else if (response.status === 400) {
        const text = await response.text();
        setErrorMessage(text || 'Invalid review data.');
      } else {
        setErrorMessage('Failed to submit review. Please try again.');
      }
    } catch (error) {
      setErrorMessage('Failed to submit review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!business) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Business Not Found</h1>
          <p className="text-gray-600">The requested business could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-500">
      {/* Hero Section */}
      <div className="mx-4 sm:mx-6 lg:mx-8 mt-8">
        <div className="relative h-64 md:h-80">
          <img
            src={business.image || 'https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=1200'}
            alt={business.name}
            className="w-full h-full object-cover rounded-lg"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end rounded-lg">
            <div className="w-full p-6">
              <h1 className="text-3xl md:text-4xl font-bold mb-2 text-white">{business.name}</h1>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <StarRating rating={business.averageRating} size="md" />
                  <span className="text-lg font-medium text-white">
                    {business.averageRating.toFixed(1)}
                  </span>
                  <span className="text-sm opacity-90 text-white">
                    ({business.totalReviews} {t('common.reviews')})
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
            {/* Business Info */}
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-md dark:shadow-glow-dark p-6 border border-border-light dark:border-border-dark transition-colors duration-500">
              <h2 className="text-2xl font-bold text-text-primaryLight dark:text-text-primaryDark mb-4">
                {t('business.details')}
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-text-primaryLight dark:text-text-primaryDark">{t('common.address')}</h3>
                    <p className="text-text-secondaryLight dark:text-text-secondaryDark">{business.address}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Phone className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-text-primaryLight dark:text-text-primaryDark">{t('common.phone')}</h3>
                    <p className="text-text-secondaryLight dark:text-text-secondaryDark">{business.phone}</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-gray-400 dark:text-gray-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium text-text-primaryLight dark:text-text-primaryDark">{t('common.timings')}</h3>
                    <p className="text-text-secondaryLight dark:text-text-secondaryDark">{business.timings}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <h3 className="font-medium text-text-primaryLight dark:text-text-primaryDark mb-2">{t('common.description')}</h3>
                <p className="text-text-secondaryLight dark:text-text-secondaryDark leading-relaxed">{business.description}</p>
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
                    disabled={hasUserReviewed}
                    className="bg-secondary-light text-white font-bold py-3 px-8 rounded-lg hover:opacity-90 transition-all duration-300 transform hover:scale-105 shadow-lg disabled:opacity-50"
                  >
                    {hasUserReviewed ? 'Already reviewed' : t('business.submitReview')}
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
                  {t('business.allReviews')}
                </h2>
              </div>

              {errorMessage && (
                <div className="mb-4 p-3 rounded bg-red-50 text-red-700 border border-red-200">
                  {errorMessage}
                </div>
              )}

              <div className="space-y-4">
                {businessReviews.length === 0 ? (
                  <p className="text-text-secondaryLight dark:text-text-secondaryDark text-center py-8">
                    {t('business.noReviews')}
                  </p>
                ) : (
                  businessReviews.map((review) => (
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
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Rating Summary */}
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-md dark:shadow-glow-dark p-6 border border-border-light dark:border-border-dark transition-colors duration-500">
              <h3 className="text-lg font-semibold text-text-primaryLight dark:text-text-primaryDark mb-4">
                {t('common.rating')} Summary
              </h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-500 dark:text-secondary-dark mb-2">
                  {business.averageRating.toFixed(1)}
                </div>
                <StarRating rating={business.averageRating} size="lg" />
                <p className="text-text-secondaryLight dark:text-text-secondaryDark mt-2">
                  Based on {business.totalReviews} reviews
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-card-light dark:bg-card-dark rounded-xl shadow-md dark:shadow-glow-dark p-6 border border-border-light dark:border-border-dark transition-colors duration-500">
              <h3 className="text-lg font-semibold text-text-primaryLight dark:text-text-primaryDark mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <button className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Call Now</span>
                </button>
                <button className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Get Directions</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Review Modal */}
      {isReviewModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              {t('business.writeReview')}
            </h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('business.yourRating')}
                </label>
                <StarRating
                  rating={reviewRating}
                  interactive={true}
                  onRatingChange={setReviewRating}
                  size="lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('business.yourReview')}
                </label>
                <textarea
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  rows={4}
                  placeholder="Share your experience..."
                  maxLength={300}
                />
                <p className="text-sm text-gray-500 mt-1">
                  {reviewText.length}/300 characters
                </p>
              </div>
            </div>
            
            <div className="flex space-x-3 mt-6">
              <button
                onClick={() => setIsReviewModalOpen(false)}
                className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                {t('common.cancel')}
              </button>
              <button
                onClick={handleSubmitReview}
                disabled={isSubmitting}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? 'Submitting...' : t('business.submitReview')}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BusinessDetailPage;