import React, { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Business } from '../types';
import { Link } from 'react-router-dom';
import { Building2, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';

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

  // Helper function to get the correct image URL
  const getImageUrl = (imagePath: string | undefined) => {
    if (!imagePath) {
      return 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80';
    }
    
    // If it's already a full URL, return as is
    if (imagePath.startsWith('http')) {
      return imagePath;
    }
    
    // If it's a local file path, construct the backend URL
    if (imagePath.startsWith('uploads/')) {
      const filename = imagePath.split('/').pop();
      return `http://localhost:8080/api/images/${filename}`;
    }
    
    return imagePath;
  };

  // Helper function to get status display info
  const getStatusInfo = (status: string) => {
    switch (status.toUpperCase()) {
      case 'APPROVED':
        return {
          text: 'Approved',
          icon: CheckCircle,
          color: 'text-green-600',
          bgColor: 'bg-green-100',
          borderColor: 'border-green-200'
        };
      case 'PENDING':
        return {
          text: 'Pending Approval',
          icon: Clock,
          color: 'text-yellow-600',
          bgColor: 'bg-yellow-100',
          borderColor: 'border-yellow-200'
        };
      case 'REJECTED':
        return {
          text: 'Rejected',
          icon: XCircle,
          color: 'text-red-600',
          bgColor: 'bg-red-100',
          borderColor: 'border-red-200'
        };
      default:
        return {
          text: 'Unknown',
          icon: AlertCircle,
          color: 'text-gray-600',
          bgColor: 'bg-gray-100',
          borderColor: 'border-gray-200'
        };
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Information */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
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
          </div>
        </div>

        {/* User Businesses */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center gap-3 mb-6">
            <Building2 className="w-6 h-6 text-gray-600" />
            <h2 className="text-xl font-semibold text-gray-800">Businesses Submitted by Me</h2>
          </div>
          
          {isLoading ? (
            <div className="text-gray-600 text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600 mx-auto mb-2"></div>
              Loading your businesses...
            </div>
          ) : businesses.length > 0 ? (
            <div className="space-y-4">
              {businesses.map((biz) => {
                const statusInfo = getStatusInfo(biz.status);
                const StatusIcon = statusInfo.icon;
                const isApproved = biz.status === 'APPROVED';
                
                return (
                  <div key={biz.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-gray-800">{biz.name}</h3>
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${statusInfo.bgColor} ${statusInfo.color} ${statusInfo.borderColor}`}>
                            <StatusIcon className="w-3 h-3" />
                            {statusInfo.text}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-2">{biz.description}</p>
                        
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span>Sector: {biz.sector}</span>
                          <span>Submitted: {new Date(biz.createdAt).toLocaleDateString()}</span>
                        </div>
                        
                        {isApproved && (
                          <div className="mt-3">
                            <Link 
                              to={`/business/${biz.id}`} 
                              className="inline-flex items-center gap-2 text-orange-600 hover:text-orange-700 font-medium text-sm hover:underline"
                            >
                              View Details →
                            </Link>
                          </div>
                        )}
                        
                        {!isApproved && (
                          <div className="mt-3">
                            <p className="text-sm text-gray-500">
                              {biz.status === 'PENDING' 
                                ? 'Your business is under review. You will be notified once it\'s approved.'
                                : 'Your business was not approved. Please contact support for more information.'
                              }
                            </p>
                          </div>
                        )}
                      </div>
                      
                      <div className="ml-4">
                        <img 
                          src={getImageUrl(biz.image)} 
                          alt={biz.name}
                          className="w-16 h-16 object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80';
                          }}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-8">
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-4">No businesses submitted yet.</p>
              <Link 
                to="/upload" 
                className="inline-flex items-center gap-2 bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
              >
                Submit Your First Business
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 