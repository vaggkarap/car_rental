import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PlaceholderPage from './pages/PlaceholderPage'
import CarsPage from './pages/CarsPage'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProfilePage from './pages/ProfilePage'
import FavouritesPage from './pages/FavouritesPage'
import BookingsPage from './pages/BookingsPage'
import ComparePage from './pages/ComparePage'
import CarDetailsPage from './pages/CarDetailsPage'
import HelpPage from './pages/HelpPage'

// Κάθε διαδρομή αντιστοιχεί σε μια οθόνη του σχεδίου / user story.
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<CarsPage />} />
        <Route path="/cars/:id" element={<CarDetailsPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Οθόνες που απαιτούν login */}
        <Route element={<ProtectedRoute />}>
          <Route path="/favourites" element={<FavouritesPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/history" element={<BookingsPage mode="history" />} />
          <Route path="/bookings" element={<BookingsPage mode="current" />} />
          <Route path="/cars/:id/book" element={<PlaceholderPage title="Κράτηση (US-09)" />} />
        </Route>

        <Route path="/help" element={<HelpPage />} />
      </Route>
    </Routes>
  )
}