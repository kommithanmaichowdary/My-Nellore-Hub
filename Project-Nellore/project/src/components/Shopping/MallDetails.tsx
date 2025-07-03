import React from 'react';
import { MapPin, Phone, Clock, ShoppingBag, Users, User } from 'lucide-react';
import { MallDetail } from '../../types';
import StarRating from '../Common/StarRating';

interface MallDetailsProps {
  mall: MallDetail;
}

const MallDetails: React.FC<MallDetailsProps> = ({ mall }) => {
  return (
    <div className="space-y-6">
      {/* Basic Info Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Basic Information</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <MapPin className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-700">Address</h3>
              <p className="text-gray-600">{mall.address}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Phone className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-700">Phone</h3>
              <p className="text-gray-600">{mall.phone}</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Clock className="w-5 h-5 text-gray-500 mt-1" />
            <div>
              <h3 className="font-semibold text-gray-700">Operating Hours</h3>
              <p className="text-gray-600">{mall.timings}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Products and Target Audience Section */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Products & Target Audience</h2>
        
        {/* Products */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <ShoppingBag className="w-5 h-5 text-gray-500" />
            <h3 className="font-semibold text-gray-700">Available Products</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {mall.products.map((product, index) => (
              <span
                key={index}
                className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm"
              >
                {product}
              </span>
            ))}
          </div>
        </div>

        {/* Target Age Groups */}
        <div className="mb-6">
          <div className="flex items-center space-x-2 mb-3">
            <Users className="w-5 h-5 text-gray-500" />
            <h3 className="font-semibold text-gray-700">Target Age Groups</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {mall.ageGroups.map((age, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
              >
                {age}
              </span>
            ))}
          </div>
        </div>

        {/* Target Gender */}
        <div>
          <div className="flex items-center space-x-2 mb-3">
            <User className="w-5 h-5 text-gray-500" />
            <h3 className="font-semibold text-gray-700">Target Gender</h3>
          </div>
          <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm">
            {mall.targetGender === 'all' ? 'All Genders' : 
             mall.targetGender === 'male' ? 'Men' : 
             mall.targetGender === 'female' ? 'Women' : 
             'All Genders'}
          </span>
        </div>
      </div>

      {/* Rating Summary */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Rating Summary</h2>
        <div className="flex items-center space-x-4">
          <div className="text-4xl font-bold text-gray-800">
            {mall.averageRating.toFixed(1)}
          </div>
          <div>
            <StarRating rating={mall.averageRating} />
            <p className="text-gray-600 mt-1">{mall.totalReviews} reviews</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MallDetails; 