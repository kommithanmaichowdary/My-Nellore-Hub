import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: 'en' | 'te';
  setLanguage: (lang: 'en' | 'te') => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.login': 'Login',
    'nav.register': 'Register',
    'nav.logout': 'Logout',
    'nav.submit': 'Submit Business',
    'nav.admin': 'Admin',
    'nav.profile': 'Profile',
    
    // Homepage
    'hero.title': 'Discover Nellore',
    'hero.subtitle': 'Your gateway to the best businesses and services in Nellore',
    'hero.explore': 'Explore Businesses',
    'hero.submit': 'Submit Your Business',
    'categories.title': 'All Categories',
    
    // Sectors
    'sector.education': 'Education',
    'sector.shopping': 'Shopping Malls',
    'sector.hospitals': 'Hospitals',
    'sector.hotels': 'Hotels',
    'sector.restaurants': 'Restaurants',
    'sector.movies': 'Movie Theatres',
    
    // Common
    'common.search': 'Search',
    'common.filter': 'Filter by Rating',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.loading': 'Loading...',
    'common.rating': 'Rating',
    'common.reviews': 'Reviews',
    'common.address': 'Address',
    'common.phone': 'Phone',
    'common.timings': 'Timings',
    'common.description': 'Description',
    
    // Auth
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.fullName': 'Full Name',
    'auth.loginSuccess': 'Login successful!',
    'auth.loginError': 'Invalid credentials',
    'auth.registerSuccess': 'Registration successful!',
    'auth.registerError': 'Registration failed',
    
    // Business
    'business.details': 'Business Details',
    'business.writeReview': 'Write a Review',
    'business.yourRating': 'Your Rating',
    'business.yourReview': 'Your Review',
    'business.submitReview': 'Submit Review',
    'business.allReviews': 'All Reviews',
    'business.noReviews': 'No reviews yet',
    'business.shareExperience': 'Share Your Experience',
    'business.shareExperienceSubtitle': 'Let others know what you think about this business.',
    'business.loginToReview': 'Please login to submit a review.',
    
    // Chatbot
    'chat.assistant': 'Nellore Assistant',
    'chat.placeholder': 'Ask me anything about Nellore...',
    'chat.welcome': 'Hello! I\'m your Nellore assistant. How can I help you today?',
    'auth.loginToNelloreHub': 'Login to Nellore Hub',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.emailPlaceholder': 'Enter your email',
    'auth.passwordPlaceholder': 'Enter your password',
    'auth.demoCreds': 'Demo credentials: admin@nellorehub.com / admin123',
    
    'footer.about': 'Your comprehensive guide to the best businesses and services in Nellore. Discover, review, and connect with local establishments across various sectors.',
    'footer.quickLinks': 'Quick Links',
    'footer.support': 'Support',
    'footer.helpCenter': 'Help Center',
    'footer.contactUs': 'Contact Us',
    'footer.privacyPolicy': 'Privacy Policy',
    'footer.termsOfService': 'Terms of Service',
    'footer.copyright': 'All rights reserved.',
    'footer.madeWith': 'Made with',
    'footer.forNellore': 'for Nellore',
    
    'review.poor': 'Poor',
    'review.fair': 'Fair',
    'review.good': 'Good',
    'review.veryGood': 'Very Good',
    'review.excellent': 'Excellent',
    'review.selectRating': 'Select Rating',
    'review.submitting': 'Submitting...',
    'review.submit': 'Submit Review',
    'review.guide': 'Rating Guide:',
    'review.poorDesc': 'Poor - Not recommended',
    'review.fairDesc': 'Fair - Below average',
    'review.goodDesc': 'Good - Meets expectations',
    'review.veryGoodDesc': 'Very Good - Exceeds expectations',
    'review.excellentDesc': 'Excellent - Outstanding experience',
    
    'home.welcome': 'Welcome to Nellore Guide',
  },
  te: {
    // Navigation
    'nav.home': 'హోమ్',
    'nav.login': 'లాగిన్',
    'nav.register': 'రిజిస్టర్',
    'nav.logout': 'లాగ్ అవుట్',
    'nav.submit': 'వ్యాపారం సమర్పించండి',
    'nav.admin': 'అడ్మిన్',
    'nav.profile': 'ప్రొఫైల్',
    
    // Homepage
    'hero.title': 'నెల్లూరును కనుగొనండి',
    'hero.subtitle': 'నెల్లూరులోని ఉత్తమ వ్యాపారాలు మరియు సేవలకు మీ గేట్‌వే',
    'hero.explore': 'వ్యాపారాలను అన్వేషించండి',
    'hero.submit': 'మీ వ్యాపారాన్ని సమర్పించండి',
    'categories.title': 'అన్ని వర్గాలు',
    
    // Sectors
    'sector.education': 'విద్య',
    'sector.shopping': 'షాపింగ్ మాల్స్',
    'sector.hospitals': 'ఆసుపత్రులు',
    'sector.hotels': 'హోటల్స్',
    'sector.restaurants': 'రెస్టారెంట్లు',
    'sector.movies': 'చిత్రమందిరాలు',
    
    // Common
    'common.search': 'వెతుకు',
    'common.filter': 'రేటింగ్ ద్వారా ఫిల్టర్ చేయండి',
    'common.submit': 'సమర్పించండి',
    'common.cancel': 'రద్దు చేయండి',
    'common.save': 'భద్రపరచు',
    'common.delete': 'తొలగించు',
    'common.edit': 'సవరించు',
    'common.loading': 'లోడ్ అవుతోంది...',
    'common.rating': 'రేటింగ్',
    'common.reviews': 'సమీక్షలు',
    'common.address': 'చిరునామా',
    'common.phone': 'ఫోన్',
    'common.timings': 'సమయాలు',
    'common.description': 'వివరణ',
    
    // Auth
    'auth.login': 'లాగిన్',
    'auth.register': 'రిజిస్టర్',
    'auth.email': 'ఇమెయిల్',
    'auth.password': 'పాస్‌వర్డ్',
    'auth.confirmPassword': 'పాస్‌వర్డ్ నిర్ధారించండి',
    'auth.fullName': 'పూర్తి పేరు',
    'auth.loginSuccess': 'లాగిన్ విజయవంతమైంది!',
    'auth.loginError': 'చెల్లని ఆధారాలు',
    'auth.registerSuccess': 'రిజిస్ట్రేషన్ విజయవంతమైంది!',
    'auth.registerError': 'రిజిస్ట్రేషన్ విఫలమైంది',
    
    // Business
    'business.details': 'వ్యాపార వివరాలు',
    'business.writeReview': 'సమీక్ష రాయండి',
    'business.yourRating': 'మీ రేటింగ్',
    'business.yourReview': 'మీ సమీక్ష',
    'business.submitReview': 'సమీక్ష సమర్పించండి',
    'business.allReviews': 'అన్ని సమీక్షలు',
    'business.noReviews': 'ఇంకా సమీక్షలు లేవు',
    'business.shareExperience': 'మీ అనుభవాన్ని పంచుకోండి',
    'business.shareExperienceSubtitle': 'ఈ వ్యాపారం గురించి మీరు ఏమనుకుంటున్నారో ఇతరులకు తెలియజేయండి.',
    'business.loginToReview': 'సమీక్షను సమర్పించడానికి దయచేసి లాగిన్ చేయండి.',
    
    // Chatbot
    'chat.assistant': 'నెల్లూరు సహాయకుడు',
    'chat.placeholder': 'నెల్లూరు గురించి ఏదైనా అడుగు...',
    'chat.welcome': 'నమస్కారం! నేను మీ నెల్లూరు సహాయకుడు. ఈ రోజు నేను మీకు ఎలా సహాయం చేయగలను?',
    'auth.loginToNelloreHub': 'నెల్లూరు హబ్‌కి లాగిన్ చేయండి',
    'auth.noAccount': 'ఖాతా లేదా?',
    'auth.emailPlaceholder': 'మీ ఇమెయిల్‌ను నమోదు చేయండి',
    'auth.passwordPlaceholder': 'మీ పాస్‌వర్డ్‌ను నమోదు చేయండి',
    'auth.demoCreds': 'డెమో ఆధారాలు: admin@nellorehub.com / admin123',
    
    'footer.about': 'నెల్లూరులోని ఉత్తమ వ్యాపారాలు మరియు సేవలకు మీ సమగ్ర మార్గదర్శి. స్థానిక వ్యాపారాలను కనుగొనండి, సమీక్షించండి మరియు అనుసంధానించండి.',
    'footer.quickLinks': 'త్వరిత లింకులు',
    'footer.support': 'సహాయం',
    'footer.helpCenter': 'సహాయ కేంద్రం',
    'footer.contactUs': 'మమ్మల్ని సంప్రదించండి',
    'footer.privacyPolicy': 'గోప్యతా విధానం',
    'footer.termsOfService': 'సేవా నిబంధనలు',
    'footer.copyright': 'అన్ని హక్కులు రిజర్వ్ చేయబడ్డాయి.',
    'footer.madeWith': 'తో తయారు చేయబడింది',
    'footer.forNellore': 'నెల్లూరు కోసం',
    
    'review.poor': 'బాగాలేదు',
    'review.fair': 'సాధారణం',
    'review.good': 'మంచిది',
    'review.veryGood': 'చాలా బాగుంది',
    'review.excellent': 'అద్భుతం',
    'review.selectRating': 'రేటింగ్ ఎంచుకోండి',
    'review.submitting': 'సమర్పిస్తోంది...',
    'review.submit': 'సమీక్ష సమర్పించండి',
    'review.guide': 'రేటింగ్ గైడ్:',
    'review.poorDesc': 'బాగాలేదు - సిఫార్సు చేయబడలేదు',
    'review.fairDesc': 'సాధారణం - సగటు కంటే తక్కువ',
    'review.goodDesc': 'మంచిది - అంచనాలను అందుకుంటుంది',
    'review.veryGoodDesc': 'చాలా బాగుంది - అంచనాలను మించిపోతుంది',
    'review.excellentDesc': 'అద్భుతం - అసాధారణమైన అనుభవం',
    
    'home.welcome': 'నెల్లూరు గైడ్‌కి స్వాగతం',
  }
};

interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useState<'en' | 'te'>('en');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['en']] || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};