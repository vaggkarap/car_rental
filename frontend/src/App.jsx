import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import PlaceholderPage from './pages/PlaceholderPage'
import ProtectedRoute from './components/ProtectedRoute'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cars" element={<PlaceholderPage title="Our Cars" />} />
        <Route path="/cars/:id" element={<PlaceholderPage title="Car details" />} />
        <Route path="/compare" element={<PlaceholderPage title="Compare cars" />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Login-only screens */}
        <Route element={<ProtectedRoute />}>
          <Route path="/cars/:id/book" element={<PlaceholderPage title="Booking (US-09)" />} />
          <Route path="/favourites" element={<PlaceholderPage title="Favourites" />} />
          <Route path="/profile" element={<PlaceholderPage title="Profile" />} />
          <Route path="/history" element={<PlaceholderPage title="Booking history" />} />
          <Route path="/bookings" element={<PlaceholderPage title="Current bookings" />} />
        </Route>

        <Route path="/help" element={<PlaceholderPage title="Help" />} />
      </Route>
    </Routes>
  )
}
