export interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Restaurant {
  id: string;
  name: string;
  description: string;
  image: string;
  cuisine: string;
  location: string;
  fullAddress: string;
  averageRating: number;
  totalReviews: number;
  priceRange: string;
  hours: string;
  phone: string;
  capacity: string;
  features: string[];
  menuItems: MenuItem[];
  reviews: Review[];
}

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "Spice Garden",
    description: "A fine dining restaurant offering authentic Indian cuisine with a modern twist. Our chefs use traditional recipes and fresh, locally-sourced ingredients to create memorable dining experiences.",
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
    cuisine: "Indian",
    location: "Downtown",
    fullAddress: "123 Main Street, Downtown, Nellore, Andhra Pradesh 524001",
    averageRating: 4.5,
    totalReviews: 128,
    priceRange: "₹₹₹",
    hours: "11:00 AM - 11:00 PM",
    phone: "+91 98765 43210",
    capacity: "120 seats",
    features: [
      "Outdoor Seating",
      "Full Bar",
      "Private Dining",
      "Valet Parking",
      "Live Music (Weekends)"
    ],
    menuItems: [
      {
        name: "Butter Chicken",
        description: "Tender chicken in rich tomato-butter sauce",
        price: 320,
        image: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398"
      },
      {
        name: "Paneer Tikka",
        description: "Grilled cottage cheese with spices",
        price: 280,
        image: "https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8"
      },
      {
        name: "Biryani",
        description: "Fragrant rice with spices and choice of protein",
        price: 350,
        image: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8"
      },
      {
        name: "Gulab Jamun",
        description: "Traditional Indian sweet dumplings",
        price: 150,
        image: "https://images.unsplash.com/photo-1601050690597-df0568f70950"
      }
    ],
    reviews: [
      {
        id: "r1",
        userName: "Priya R.",
        rating: 5,
        comment: "Amazing food and ambiance! The butter chicken was outstanding.",
        date: "2024-03-15"
      },
      {
        id: "r2",
        userName: "Rahul S.",
        rating: 4,
        comment: "Great service and authentic flavors. Slightly on the expensive side.",
        date: "2024-03-10"
      }
    ]
  },
  // Add more restaurants as needed
]; 