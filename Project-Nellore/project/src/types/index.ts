export interface User {
  email: string;
  name?: string;
  googleId?: string;
  isAdmin?: boolean;
  role?: 'USER' | 'ADMIN';
}

export interface Business {
  id: string;
  name: string;
  sector: string;
  description: string;
  address: string;
  phone: string;
  timings: string;
  image?: string;
  averageRating: number;
  totalReviews: number;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  createdAt: string;
}

export interface Review {
  id: string;
  businessId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Language {
  code: 'en' | 'te';
  name: string;
  flag: string;
}

export interface Sector {
  id: string;
  name: string;
  nameTE: string;
  icon: string;
  description: string;
  descriptionTE: string;
}

export interface ShoppingCategory {
  id: string;
  name: string;
  nameTE: string;
  icon: string;
  description: string;
  descriptionTE: string;
  image: string;
}

export interface ShoppingItem {
  id: string;
  name: string;
  sector: string;
  description: string;
  address: string;
  phone: string;
  timings: string;
  image: string;
  averageRating: number;
  totalReviews: number;
  status: 'open' | 'closed';
}

export interface MallDetail extends ShoppingItem {
  products: string[];
  ageGroups: string[];
  targetGender: 'all' | 'male' | 'female';
  reviews: MallReview[];
}

export interface MallReview {
  id: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface StarRatingProps {
  rating: number;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
  onChange?: (rating: number) => void;
}