import React from 'react';
import { useParams } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';
import { shoppingCategories, shoppingItems } from '../data/shoppingData';
import ShoppingItemList from '../components/Shopping/ShoppingItemList';

const ShoppingCategoryPage: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const { t } = useLanguage();

  const category = shoppingCategories.find(c => c.id === categoryId);
  const items = shoppingItems.filter(item => item.categoryId === categoryId);

  if (!category) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Category Not Found</h1>
          <p className="text-gray-600">The requested category could not be found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Category Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{category.name}</h1>
          <p className="text-xl text-gray-600">{category.description}</p>
        </div>

        {/* Items List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <ShoppingItemList items={items} />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCategoryPage; 