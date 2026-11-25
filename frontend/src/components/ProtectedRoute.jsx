import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Οθόνες που απαιτούν login. Αν ο χρήστης δεν είναι συνδεδεμένος, πηγαίνει στο /login.
export default function ProtectedRoute() {
  const { isLoggedIn } = useAuth()
  const location = useLocation()

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  )
}