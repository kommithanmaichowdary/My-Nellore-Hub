import React, { useState, useEffect } from 'react';
import { Building2, AlertCircle, CheckCircle } from 'lucide-react';
// import { useLanguage } from '../contexts/LanguageContext';
import { useAuth } from '../contexts/AuthContext';
import { sectors } from '../data/mockData';

// Use app sectors to ensure submitted business maps to the correct sector pages
const sectorOptions = sectors.map(s => ({ id: s.id, name: s.name }));

const PublicUploadPage: React.FC = () => {
  // const { t } = useLanguage();
  const { isAuthenticated, user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: '',
    businessName: '',
    businessType: '',
    services: '',
    address: '',
    timings: '',
    imageUrl: ''
  });
  // Preview not currently used
  // const [previewImage, setPreviewImage] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      fullName: user?.name || '',
      email: user?.email || ''
    }));
  }, [user]);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Image upload is not wired to backend storage yet

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

  // Prepare data for backend
  const payload = {
    ...formData,
    submittedBy: user?.email || ''
  };

    try {
      const response = await fetch('http://localhost:8080/api/businesses', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) {
        throw new Error('Failed to submit business');
      }
      setIsSubmitted(true);
    } catch (err: any) {
      setError(err.message || 'Submission failed');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark transition-colors duration-500">
        <div className="bg-white dark:bg-card-dark rounded-2xl shadow-xl p-8 text-center border border-border-light dark:border-border-dark transition-colors duration-500">
          <h2 className="text-2xl font-bold text-text-primaryLight dark:text-text-primaryDark mb-4 transition-colors duration-500">
            Only registered users can submit a business.
          </h2>
          <p className="mb-6 text-text-secondaryLight dark:text-text-secondaryDark transition-colors duration-500">
            Please <a href="/login" className="text-blue-600 underline">login</a> or <a href="/register" className="text-blue-600 underline">register</a> to submit your business.
          </p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark transition-colors duration-500">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-accent-light dark:border-accent-dark mb-6"></div>
          <span className="text-xl font-semibold text-text-primaryLight dark:text-text-primaryDark">Loading...</span>
        </div>
      </div>
    );
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-500 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-card-light dark:bg-card-dark rounded-2xl shadow-xl p-8 text-center border border-border-light dark:border-border-dark transition-colors duration-500">
          <div className="bg-gradient-to-r from-accent-light to-accent-darkAlt dark:from-accent-dark dark:to-accent-darkAlt w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow-dark dark:shadow-glow-dark">
            <CheckCircle className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-text-primaryLight dark:text-text-primaryDark mb-4 transition-colors duration-500">
            Submission Successful!
          </h2>
          <p className="mb-6 text-text-secondaryLight dark:text-text-secondaryDark transition-colors duration-500">
            Thank you for submitting your business. Our team will review your submission and approve it within 24-48 hours. 
            You'll receive a notification once it's approved.
          </p>
          <button
            onClick={() => window.location.href = '/'}
            className="bg-button-light dark:bg-button-dark text-buttontext-light dark:text-buttontext-dark px-8 py-3 rounded-xl font-semibold hover:bg-accent-light dark:hover:bg-accent-darkAlt transition-colors duration-500 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-500 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="bg-gradient-to-r from-accent-light to-accent-darkAlt dark:from-accent-dark dark:to-accent-darkAlt w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow-dark dark:shadow-glow-dark">
            <Building2 className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl font-bold text-text-primaryLight dark:text-text-primaryDark mb-4 transition-colors duration-500">
            Submit Your Business
          </h1>
          <p className="text-lg text-text-secondaryLight dark:text-text-secondaryDark transition-colors duration-500">
            Help the Nellore community discover your business
          </p>
        </div>

        <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-lg p-8 mb-8 border border-border-light dark:border-border-dark transition-colors duration-500">
          <div className="flex items-start space-x-4 p-4 bg-accent-light/10 dark:bg-accent-dark/10 rounded-xl border border-accent-light/20 dark:border-accent-dark/20 transition-colors duration-500">
            <AlertCircle className="w-6 h-6 text-accent-light dark:text-accent-dark mt-0.5" />
            <div>
              <h3 className="font-medium text-text-primaryLight dark:text-text-primaryDark transition-colors duration-500">Before you submit</h3>
              <p className="mt-1 text-text-secondaryLight dark:text-text-secondaryDark transition-colors duration-500">
                Please ensure all information is accurate. Your submission will be reviewed by our team 
                and approved within 24-48 hours.
              </p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {error && (
            <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
              {error}
            </div>
          )}
          <div className="bg-card-light dark:bg-card-dark rounded-2xl shadow-lg p-8 border border-border-light dark:border-border-dark transition-colors duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-text-primaryLight dark:text-text-primaryDark mb-2 transition-colors duration-500">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl focus:outline-none text-text-primaryLight dark:text-text-primaryDark placeholder-text-secondaryLight dark:placeholder-text-secondaryDark transition-colors duration-500"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-text-primaryLight dark:text-text-primaryDark mb-2 transition-colors duration-500">
                  Email Address *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  readOnly
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl focus:outline-none text-text-primaryLight dark:text-text-primaryDark placeholder-text-secondaryLight dark:placeholder-text-secondaryDark transition-colors duration-500"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-text-primaryLight dark:text-text-primaryDark mb-2 transition-colors duration-500">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent text-text-primaryLight dark:text-text-primaryDark placeholder-text-secondaryLight dark:placeholder-text-secondaryDark transition-colors duration-500"
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-text-primaryLight dark:text-text-primaryDark mb-2 transition-colors duration-500">
                  Business/Shop Name *
                </label>
                <input
                  type="text"
                  id="businessName"
                  name="businessName"
                  required
                  value={formData.businessName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent text-text-primaryLight dark:text-text-primaryDark placeholder-text-secondaryLight dark:placeholder-text-secondaryDark transition-colors duration-500"
                  placeholder="Enter your business name"
                />
              </div>
            </div>

            <div className="mt-6">
              <label htmlFor="businessType" className="block text-sm font-medium text-text-primaryLight dark:text-text-primaryDark mb-2 transition-colors duration-500">
                Sector *
              </label>
              <select
                id="businessType"
                name="businessType"
                required
                value={formData.businessType}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent text-text-primaryLight dark:text-text-primaryDark"
              >
                <option value="" disabled>Select sector</option>
                {sectorOptions.map(opt => (
                  <option key={opt.id} value={opt.id}>
                    {opt.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mt-6">
              <label htmlFor="services" className="block text-sm font-medium text-text-primaryLight dark:text-text-primaryDark mb-2 transition-colors duration-500">
                Products/Services Offered *
              </label>
              <textarea
                id="services"
                name="services"
                required
                value={formData.services}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent text-text-primaryLight dark:text-text-primaryDark placeholder-text-secondaryLight dark:placeholder-text-secondaryDark transition-colors duration-500"
                placeholder="Describe your products or services"
              />
            </div>

            <div className="mt-6">
              <label htmlFor="address" className="block text-sm font-medium text-text-primaryLight dark:text-text-primaryDark mb-2 transition-colors duration-500">
                Business Address *
              </label>
              <textarea
                id="address"
                name="address"
                required
                value={formData.address}
                onChange={handleChange}
                className="w-full px-4 py-3 bg-white dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent text-text-primaryLight dark:text-text-primaryDark placeholder-text-secondaryLight dark:placeholder-text-secondaryDark transition-colors duration-500"
                placeholder="Enter your business address"
              />
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="timings" className="block text-sm font-medium text-text-primaryLight dark:text-text-primaryDark mb-2 transition-colors duration-500">
                  Business Timings
                </label>
                <input
                  type="text"
                  id="timings"
                  name="timings"
                  value={formData.timings}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent text-text-primaryLight dark:text-text-primaryDark placeholder-text-secondaryLight dark:placeholder-text-secondaryDark transition-colors duration-500"
                  placeholder="e.g., 10:00 AM - 9:00 PM"
                />
              </div>

              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-text-primaryLight dark:text-text-primaryDark mb-2 transition-colors duration-500">
                  Image/Logo URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-white dark:bg-background-dark border border-border-light dark:border-border-dark rounded-xl focus:outline-none focus:ring-2 focus:ring-accent-light dark:focus:ring-accent-dark focus:border-transparent text-text-primaryLight dark:text-text-primaryDark placeholder-text-secondaryLight dark:placeholder-text-secondaryDark transition-colors duration-500"
                  placeholder="https://example.com/logo.jpg"
                />
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-accent-light dark:bg-accent-dark text-white px-8 py-3 rounded-xl font-semibold hover:bg-accent-dark dark:hover:bg-accent-darkAlt transition-colors duration-500 transform hover:-translate-y-1 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Business'}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PublicUploadPage;