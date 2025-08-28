import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Business } from '../types';
import { Link } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const userEmail = user?.email;

  useEffect(() => {
    const fetchUserBusinesses = async () => {
      if (!userEmail) return;
      setIsLoading(true);
      try {
        const res = await fetch(`http://localhost:8080/api/businesses?submittedBy=${encodeURIComponent(userEmail)}`);
        if (res.ok) {
          const data = await res.json();
          const mapped: Business[] = (data || []).map((biz: any) => ({
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
            status: (biz.status || 'APPROVED') as Business['status'],
            createdAt: biz.createdAt || new Date().toISOString(),
          }));
          setBusinesses(mapped);
        } else {
          setBusinesses([]);
        }
      } catch {
        setBusinesses([]);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUserBusinesses();
  }, [userEmail]);

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-6">Profile</h1>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <p className="mt-1 text-gray-900">{user.name}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <p className="mt-1 text-gray-900">{user.email}</p>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">Role</label>
              <p className="mt-1 text-gray-900">{user.isAdmin ? 'Admin' : 'User'}</p>
            </div>
          </div>
        </div>

        {/* User Businesses - names list with navigation */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Businesses submited by me</h2>
          {isLoading ? (
            <div className="text-gray-600">Loading your businesses...</div>
          ) : businesses.length > 0 ? (
            <ul className="list-disc pl-6 space-y-2">
              {businesses.map((biz) => (
                <li key={biz.id} className="text-gray-800">
                  <Link to={`/business/${biz.id}`} className="text-orange-600 hover:underline">
                    {biz.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-700">No submitted businesses.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 