import React, { useState } from 'react';
import { Star } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';

interface ReviewFormProps {
  onSubmit: (rating: number, comment: string) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) return;

    setIsSubmitting(true);
    onSubmit(rating, comment);
    setComment('');
    setRating(0);
    setIsSubmitting(false);
  };

  const getRatingLabel = (value: number) => {
    switch (value) {
      case 1:
        return t('review.poor');
      case 2:
        return t('review.fair');
      case 3:
        return t('review.good');
      case 4:
        return t('review.veryGood');
      case 5:
        return t('review.excellent');
      default:
        return t('review.selectRating');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Rating Section */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-700">
          Your Rating <span className="text-red-500">*</span>
        </label>
        <div className="flex flex-col items-center space-y-2">
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setRating(value)}
                onMouseEnter={() => setHoverRating(value)}
                onMouseLeave={() => setHoverRating(0)}
                className="focus:outline-none transform transition-transform hover:scale-110"
              >
                <Star
                  className={`w-10 h-10 ${
                    value <= (hoverRating || rating)
                      ? 'text-yellow-400 fill-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
          <span className="text-sm font-medium text-gray-600">
            {getRatingLabel(hoverRating || rating)}
          </span>
        </div>
      </div>

      {/* Comment Section */}
      <div>
        <label
          htmlFor="comment"
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Your Review (Optional)
        </label>
        <textarea
          id="comment"
          rows={4}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
          placeholder="Share your experience with this mall..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={rating === 0 || isSubmitting}
        className={`w-full py-3 px-4 rounded-lg text-white font-medium ${
          rating === 0 || isSubmitting
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-orange-500 hover:bg-orange-600'
        } focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 transition-colors duration-200`}
      >
        {isSubmitting ? t('review.submitting') : t('review.submit')}
      </button>

      {/* Rating Guide */}
      <div className="text-sm text-gray-500 mt-4">
        <p className="font-medium mb-2">{t('review.guide')}</p>
        <ul className="space-y-1">
          <li>⭐ {t('review.poorDesc')}</li>
          <li>⭐⭐ {t('review.fairDesc')}</li>
          <li>⭐⭐⭐ {t('review.goodDesc')}</li>
          <li>⭐⭐⭐⭐ {t('review.veryGoodDesc')}</li>
          <li>⭐⭐⭐⭐⭐ {t('review.excellentDesc')}</li>
        </ul>
      </div>
    </form>
  );
};

export default ReviewForm; 