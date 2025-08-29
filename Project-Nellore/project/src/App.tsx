import React from 'react';
// @ts-ignore - ensure types after install
import { AnimatePresence, motion } from 'framer-motion';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Chatbot from './components/Chatbot/Chatbot';
import HomePage from './pages/HomePage';
import SectorPage from './pages/SectorPage';
import ShoppingCategoryPage from './pages/ShoppingCategoryPage';
import MallDetailPage from './pages/MallDetailPage';
import BusinessDetailPage from './pages/BusinessDetailPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import PublicUploadPage from './pages/PublicUploadPage';
import AdminPage from './pages/AdminPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/Auth/PrivateRoute';
import AdminRoute from './components/Auth/AdminRoute';
import ShoppingMalls from './components/Sector/ShoppingMalls';
import Hospitals from './components/Sector/Hospitals';
import Hotels from './components/Sector/Hotels';
import Restaurants from './components/Sector/Restaurants';
import Clinics from './components/Sector/Clinics';
import RestaurantDetailsPage from './pages/RestaurantDetailsPage';
import AdminLoginPage from './pages/AdminLoginPage';

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <ThemeProvider>
          <Router>
            <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
              <Navbar />
              <main className="flex-1">
                <AnimatePresence mode="wait">
                  <Routes>
                    <Route path="/" element={
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                        <HomePage />
                      </motion.div>
                    } />
                    <Route path="/sector/:sectorId" element={
                      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
                        <SectorPage />
                      </motion.div>
                    } />
                    <Route path="/shopping/:categoryId" element={<ShoppingCategoryPage />} />
                    <Route path="/mall/:mallId" element={<MallDetailPage />} />
                    <Route path="/business/:businessId" element={<BusinessDetailPage />} />
                    <Route path="/login" element={<LoginPage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/upload" element={<PublicUploadPage />} />
                    <Route path="/admin/login" element={<AdminLoginPage />} />
                    <Route path="/profile" element={
                      <PrivateRoute>
                        <ProfilePage />
                      </PrivateRoute>
                    } />
                    <Route path="/admin" element={
                      <AdminRoute>
                        <AdminPage />
                      </AdminRoute>
                    } />
                    <Route path="/sector/shopping-malls" element={<ShoppingMalls />} />
                    <Route path="/sector/hospitals" element={<Hospitals />} />
                    <Route path="/sector/hotels" element={<Hotels />} />
                    <Route path="/restaurants" element={<Restaurants />} />
                    <Route path="/restaurants/collection/:collectionId" element={<Restaurants />} />
                    <Route path="/restaurants/:restaurantId" element={<RestaurantDetailsPage />} />
                    <Route path="/sector/clinics" element={<Clinics />} />
                  </Routes>
                </AnimatePresence>
              </main>
              <Footer />
              <Chatbot />
            </div>
          </Router>
        </ThemeProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;