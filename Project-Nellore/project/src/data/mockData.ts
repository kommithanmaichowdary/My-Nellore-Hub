import { Business, Review, Sector } from '../types';

export const sectors: Sector[] = [
  {
    id: 'education',
    name: 'Education',
    nameTE: 'విద్య',
    icon: 'GraduationCap',
    description: 'Schools, colleges, and educational institutions',
    descriptionTE: 'పాఠశాలలు, కళాశాలలు మరియు విద్యా సంస్థలు'
  },
  {
    id: 'shopping',
    name: 'Shopping Malls',
    nameTE: 'షాపింగ్ మాల్స్',
    icon: 'ShoppingBag',
    description: 'Shopping centers and retail outlets',
    descriptionTE: 'షాపింగ్ సెంటర్లు మరియు రిటైల్ అవుట్‌లెట్‌లు'
  },
  {
    id: 'hospitals',
    name: 'Hospitals',
    nameTE: 'ఆసుపత్రులు',
    icon: 'Hospital',
    description: 'Healthcare facilities and medical services',
    descriptionTE: 'ఆరోగ్య సంరక్షణ సౌకర్యాలు మరియు వైద్య సేవలు'
  },
  {
    id: 'hotels',
    name: 'Hotels',
    nameTE: 'హోటల్స్',
    icon: 'Hotel',
    description: 'Accommodation and lodging services',
    descriptionTE: 'వసతి మరియు బస వసతి సేవలు'
  },
  {
    id: 'restaurants',
    name: 'Restaurants',
    nameTE: 'రెస్టారెంట్లు',
    icon: 'Utensils',
    description: 'Dining and food services',
    descriptionTE: 'భోజనం మరియు ఆహార సేవలు'
  },
  {
    id: 'movies',
    name: 'Movie Theatres',
    nameTE: 'చిత్రమందిరాలు',
    icon: 'Film',
    description: 'Entertainment and cinema halls',
    descriptionTE: 'వినోదం మరియు సినిమా హాళ్లు'
  }
];

export const mockBusinesses: Business[] = [
  {
    id: '1',
    name: 'Sri Venkateswara College of Engineering',
    sector: 'education',
    description: 'Premier engineering college in Nellore with excellent facilities and faculty.',
    address: 'Tirupati Road, Nellore, Andhra Pradesh',
    phone: '+91 861 2344567',
    timings: '9:00 AM - 5:00 PM',
    image: 'https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=800',
    averageRating: 4.5,
    totalReviews: 125,
    status: 'APPROVED',
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'City Center Mall',
    sector: 'shopping',
    description: 'Modern shopping mall with brands, food court, and entertainment options.',
    address: 'Ranganayakulapet, Nellore, Andhra Pradesh',
    phone: '+91 861 2567890',
    timings: '10:00 AM - 10:00 PM',
    image: 'https://images.pexels.com/photos/1005417/pexels-photo-1005417.jpeg?auto=compress&cs=tinysrgb&w=800',
    averageRating: 4.2,
    totalReviews: 89,
    status: 'APPROVED',
    createdAt: '2024-01-20'
  },
  {
    id: '7',
    name: 'Nellore Central Mall',
    sector: 'shopping',
    description: 'Premium shopping destination featuring international brands, multiplex, and fine dining restaurants.',
    address: 'Dargamitta Junction, Nellore, Andhra Pradesh',
    phone: '+91 861 2789012',
    timings: '10:00 AM - 11:00 PM',
    image: 'https://images.pexels.com/photos/1488327/pexels-photo-1488327.jpeg?auto=compress&cs=tinysrgb&w=800',
    averageRating: 4.6,
    totalReviews: 156,
    status: 'APPROVED',
    createdAt: '2024-02-15'
  },
  {
    id: '8',
    name: 'Triveni Shopping Complex',
    sector: 'shopping',
    description: 'Traditional shopping complex with local brands, textile shops, and authentic food court.',
    address: 'Trunk Road, Nellore, Andhra Pradesh',
    phone: '+91 861 2890123',
    timings: '9:30 AM - 9:30 PM',
    image: 'https://images.pexels.com/photos/1488463/pexels-photo-1488463.jpeg?auto=compress&cs=tinysrgb&w=800',
    averageRating: 4.3,
    totalReviews: 92,
    status: 'APPROVED',
    createdAt: '2024-02-20'
  },
  {
    id: '9',
    name: 'Mega Mall',
    sector: 'shopping',
    description: 'Contemporary shopping center with entertainment zone, gaming arcade, and food plaza.',
    address: 'VRC Center, Nellore, Andhra Pradesh',
    phone: '+91 861 2901234',
    timings: '10:00 AM - 10:30 PM',
    image: 'https://images.pexels.com/photos/1488466/pexels-photo-1488466.jpeg?auto=compress&cs=tinysrgb&w=800',
    averageRating: 4.4,
    totalReviews: 78,
    status: 'APPROVED',
    createdAt: '2024-02-25'
  },
  {
    id: 'mgb-felicity',
    name: 'MGB Felicity',
    sector: 'shopping',
    description: 'Modern shopping complex with international brands and entertainment options',
    address: 'Grand Trunk Road, Dargamitta, Nellore, Andhra Pradesh',
    phone: '+91 861 2345678',
    timings: '10:00 AM - 10:00 PM',
    image: 'https://images.unsplash.com/photo-1596701062351-8c2c14d1fdd0?w=800',
    averageRating: 4.5,
    totalReviews: 210,
    status: 'APPROVED',
    createdAt: '2024-03-01'
  },
  {
    id: 'cmr-mall',
    name: 'CMR Mall',
    sector: 'shopping',
    description: 'Popular shopping destination with multiplex and food court',
    address: 'Near RTC Bus Stand, Nellore, Andhra Pradesh',
    phone: '+91 861 2345679',
    timings: '10:00 AM - 10:30 PM',
    image: 'https://images.unsplash.com/photo-1555529771-835f59fc5efe?w=800',
    averageRating: 4.2,
    totalReviews: 180,
    status: 'APPROVED',
    createdAt: '2024-03-05'
  },
  {
    id: 'sarvani-mall',
    name: 'Sarvani Mall',
    sector: 'shopping',
    description: 'Family-friendly mall with retail stores and entertainment',
    address: 'Magunta Layout, Nellore, Andhra Pradesh',
    phone: '+91 861 2345680',
    timings: '10:00 AM - 9:30 PM',
    image: 'https://images.unsplash.com/photo-1520105072000-62963d312e02?w=800',
    averageRating: 4.0,
    totalReviews: 150,
    status: 'APPROVED',
    createdAt: '2024-03-10'
  },
  {
    id: 'nellore-one',
    name: 'Nellore One',
    sector: 'shopping',
    description: 'Upcoming lifestyle center with premium amenities',
    address: 'Kovur Nagar, Nellore, Andhra Pradesh',
    phone: '+91 861 2345681',
    timings: '11:00 AM - 11:00 PM',
    image: 'https://images.unsplash.com/photo-1562280454-cece35d312d0?w=800',
    averageRating: 4.8,
    totalReviews: 300,
    status: 'APPROVED',
    createdAt: '2024-03-15'
  },
  {
    id: '3',
    name: 'Narayana Medical College',
    sector: 'hospitals',
    description: 'Multi-specialty hospital with 24/7 emergency services and modern equipment.',
    address: 'Nellore-Chinthareddypalem, Nellore, Andhra Pradesh',
    phone: '+91 861 2345678',
    timings: '24/7',
    image: 'https://images.pexels.com/photos/236380/pexels-photo-236380.jpeg?auto=compress&cs=tinysrgb&w=800',
    averageRating: 4.7,
    totalReviews: 203,
    status: 'APPROVED',
    createdAt: '2024-01-10'
  },
  {
    id: '4',
    name: 'Hotel Minerva Grand',
    sector: 'hotels',
    description: 'Luxury hotel with excellent amenities and traditional hospitality.',
    address: 'Dargamitta, Nellore, Andhra Pradesh',
    phone: '+91 861 2234567',
    timings: '24/7',
    image: 'https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=800',
    averageRating: 4.3,
    totalReviews: 156,
    status: 'APPROVED',
    createdAt: '2024-01-25'
  },
  {
    id: '5',
    name: 'Andhra Spice Restaurant',
    sector: 'restaurants',
    description: 'Authentic Andhra cuisine with traditional flavors and modern presentation.',
    address: 'Trunk Road, Nellore, Andhra Pradesh',
    phone: '+91 861 2456789',
    timings: '11:00 AM - 11:00 PM',
    image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800',
    averageRating: 4.6,
    totalReviews: 87,
    status: 'APPROVED',
    createdAt: '2024-02-01'
  },
  {
    id: '6',
    name: 'PVR Cinemas',
    sector: 'movies',
    description: 'Modern multiplex with latest movies and premium viewing experience.',
    address: 'City Center Mall, Nellore, Andhra Pradesh',
    phone: '+91 861 2678901',
    timings: '9:00 AM - 12:00 AM',
    image: 'https://images.pexels.com/photos/274937/pexels-photo-274937.jpeg?auto=compress&cs=tinysrgb&w=800',
    averageRating: 4.4,
    totalReviews: 134,
    status: 'APPROVED',
    createdAt: '2024-02-05'
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    businessId: '1',
    userId: '2',
    userName: 'John Doe',
    rating: 5,
    comment: 'Excellent college with great infrastructure and knowledgeable faculty.',
    createdAt: '2024-02-10'
  },
  {
    id: '2',
    businessId: '1',
    userId: '3',
    userName: 'Jane Smith',
    rating: 4,
    comment: 'Good college but could improve placement opportunities.',
    createdAt: '2024-02-08'
  },
  {
    id: '3',
    businessId: '2',
    userId: '2',
    userName: 'John Doe',
    rating: 4,
    comment: 'Nice mall with good variety of shops and food options.',
    createdAt: '2024-02-12'
  },
  {
    id: '4',
    businessId: '3',
    userId: '4',
    userName: 'Dr. Patel',
    rating: 5,
    comment: 'Excellent medical facility with state-of-the-art equipment.',
    createdAt: '2024-02-14'
  }
];

export const hospitals = [
  {
    id: 'apollo',
    name: 'Apollo Hospitals',
    description: 'Multi-specialty hospital with advanced medical facilities',
    imageUrl: 'https://example.com/simhapuri.jpg'
  },
  {
    id: 'medicover',
    name: 'Medicover Hospital',
    description: 'Modern healthcare facility with specialized departments',
    imageUrl: 'https://example.com/medicover.jpg'
  },
  {
    id: 'enel',
    name: 'Enel Hospital',
    description: 'Comprehensive healthcare center with emergency services',
    imageUrl: 'https://example.com/enel.jpg'
  },
  {
    id: 'nellore-specialty',
    name: 'Nellore Specialty Hospital',
    description: 'Specialized medical care with modern infrastructure',
    imageUrl: 'https://example.com/nellore-specialty.jpg'
  },
  {
    id: 'acsr-govt',
    name: 'ACSR Government Hospital',
    description: 'Government hospital providing affordable healthcare',
    imageUrl: 'https://example.com/acsr-govt.jpg'
  }
];

export const hotels = [
  {
    id: 'minerva-grand',
    name: 'Minerva Grand',
    description: 'Luxury hotel with premium amenities and fine dining',
    imageUrl: 'https://example.com/r-and-b.jpg'
  },
  {
    id: 'hotel-b',
    name: 'Hotel B',
    description: 'Business hotel with conference facilities',
    imageUrl: 'https://example.com/hotel-b.jpg'
  },
  {
    id: 'hotel-c',
    name: 'Hotel C',
    description: 'Boutique hotel with unique architecture',
    imageUrl: 'https://example.com/hotel-c.jpg'
  },
  {
    id: 'hotel-d',
    name: 'Hotel D',
    description: 'Family-friendly hotel with recreational facilities',
    imageUrl: 'https://example.com/hotel-d.jpg'
  },
  {
    id: 'hotel-e',
    name: 'Hotel E',
    description: 'Budget hotel with essential amenities',
    imageUrl: 'https://example.com/hotel-e.jpg'
  }
];

export const restaurantCategories = [
  {
    id: 'fine-dining',
    name: 'Fine Dining',
    icon: 'UtensilsCrossed',
    image: 'https://images.pexels.com/photos/1267320/pexels-photo-1267320.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Upscale restaurants with premium dining experience'
  },
  {
    id: 'casual-dining',
    name: 'Casual Dining',
    icon: 'Coffee',
    image: 'https://images.pexels.com/photos/2290070/pexels-photo-2290070.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Relaxed atmosphere with quality food'
  },
  {
    id: 'fast-food',
    name: 'Fast Food',
    icon: 'Pizza',
    image: 'https://images.pexels.com/photos/2983101/pexels-photo-2983101.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Quick service restaurants and fast food chains'
  },
  {
    id: 'cafes',
    name: 'Cafes & Bakeries',
    icon: 'Coffee',
    image: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Coffee shops, bakeries, and casual cafes'
  },
  {
    id: 'family',
    name: 'Family Restaurants',
    icon: 'Users',
    image: 'https://images.pexels.com/photos/1581384/pexels-photo-1581384.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'Family-friendly dining establishments'
  },
  {
    id: 'buffet',
    name: 'Buffet Restaurants',
    icon: 'UtensilsCrossed',
    image: 'https://images.pexels.com/photos/5718071/pexels-photo-5718071.jpeg?auto=compress&cs=tinysrgb&w=800',
    description: 'All-you-can-eat buffet restaurants'
  }
];

export const restaurantCollections = [
  {
    id: 'new',
    name: 'Newly Opened',
    description: 'Latest additions to the food scene',
    image: 'https://images.pexels.com/photos/262978/pexels-photo-262978.jpeg?auto=compress&cs=tinysrgb&w=800'
  },
  {
    id: 'local',
    name: 'Local Favorites',
    description: 'Best of Nellore cuisine',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800'
  }
];

export const restaurants = [
  {
    id: 'grand-pavilion',
    name: 'Grand Pavilion',
    sector: 'restaurants',
    category: 'fine-dining',
    description: 'Upscale dining with international cuisine and elegant ambiance',
    address: 'MG Road, Nellore, Andhra Pradesh',
    phone: '+91 861 234 5678',
    timings: '12:00 PM - 11:00 PM',
    image: 'https://images.pexels.com/photos/67468/pexels-photo-67468.jpeg?auto=compress&cs=tinysrgb&w=800',
    cuisine: ['Continental', 'Indian', 'Chinese'],
    averageRating: 4.6,
    totalReviews: 245,
    priceRange: '₹₹₹',
    features: ['Valet Parking', 'Full Bar', 'Private Dining'],
    status: 'APPROVED',
    createdAt: '2024-01-15'
  },
  {
    id: 'spice-garden',
    name: 'Spice Garden',
    sector: 'restaurants',
    category: 'casual-dining',
    description: 'Authentic Indian cuisine in a comfortable setting',
    address: 'Gandhi Nagar, Nellore, Andhra Pradesh',
    phone: '+91 861 234 5679',
    timings: '11:00 AM - 11:00 PM',
    image: 'https://images.pexels.com/photos/958545/pexels-photo-958545.jpeg?auto=compress&cs=tinysrgb&w=800',
    cuisine: ['North Indian', 'South Indian', 'Biryani'],
    averageRating: 4.4,
    totalReviews: 189,
    priceRange: '₹₹',
    features: ['Family Friendly', 'Outdoor Seating'],
    status: 'APPROVED',
    createdAt: '2024-02-01'
  },
  {
    id: 'cafe-central',
    name: 'Cafe Central',
    sector: 'restaurants',
    category: 'cafes',
    description: 'Modern cafe with great coffee and light bites',
    address: 'Trunk Road, Nellore, Andhra Pradesh',
    phone: '+91 861 234 5680',
    timings: '8:00 AM - 10:00 PM',
    image: 'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&w=800',
    cuisine: ['Cafe', 'Continental', 'Beverages'],
    averageRating: 4.3,
    totalReviews: 156,
    priceRange: '₹₹',
    features: ['Wi-Fi', 'Live Music'],
    status: 'APPROVED',
    createdAt: '2024-02-15'
  },
  {
    id: 'royal-feast',
    name: 'Royal Feast',
    sector: 'restaurants',
    category: 'buffet',
    description: 'Extensive buffet spread with multiple cuisines',
    address: 'Aditya Nagar, Nellore, Andhra Pradesh',
    phone: '+91 861 234 5681',
    timings: '12:30 PM - 3:30 PM, 7:00 PM - 11:00 PM',
    image: 'https://images.pexels.com/photos/5718071/pexels-photo-5718071.jpeg?auto=compress&cs=tinysrgb&w=800',
    cuisine: ['Multi-Cuisine', 'Buffet'],
    averageRating: 4.5,
    totalReviews: 278,
    priceRange: '₹₹₹',
    features: ['Buffet', 'Private Events'],
    status: 'APPROVED',
    createdAt: '2024-03-01'
  }
];

export const clinics = [
  {
    id: 'fertility',
    name: 'Fertility Clinic',
    description: 'Specialized fertility treatment center',
    imageUrl: 'https://example.com/fertility.jpg'
  },
  {
    id: 'eye-care',
    name: 'Eye Care Clinic',
    description: 'Comprehensive eye care and vision correction',
    imageUrl: 'https://example.com/eye-care.jpg'
  },
  {
    id: 'dental',
    name: 'Dental Clinic',
    description: 'Modern dental care with advanced equipment',
    imageUrl: 'https://example.com/dental.jpg'
  },
  {
    id: 'specialty',
    name: 'Specialty Clinic',
    description: 'Multi-specialty medical consultation',
    imageUrl: 'https://example.com/specialty.jpg'
  },
  {
    id: 'polyclinic',
    name: 'Polyclinic',
    description: 'General medical services and consultations',
    imageUrl: 'https://example.com/polyclinic.jpg'
  }
];

export const movies = [
  {
    id: 'pvr-cinemas',
    name: 'PVR Cinemas',
    description: 'Modern multiplex with latest movies and premium viewing experience.',
    imageUrl: 'https://example.com/s2-cinemas.jpg'
  }
];