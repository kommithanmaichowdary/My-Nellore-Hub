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

export const mockBusinesses: Business[] = [];

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

export const restaurants = [];

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
