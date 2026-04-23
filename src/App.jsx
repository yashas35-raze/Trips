import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import PlaceDetailPage from './components/PlaceDetailPage';
import Footer from './components/Footer'; 
import { AuthProvider } from './context/AuthContext'; // Import AuthProvider
import './styles.css';

export default function App() {
  return (
    <AuthProvider> {/* Wrap everything in AuthProvider */}
      <main> 
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/place/:id" element={<PlaceDetailPage />} />
        </Routes>
      </main>
      
      <Footer /> 
    </AuthProvider>
  );
}