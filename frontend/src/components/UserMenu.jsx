import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Dropdown του εικονιδίου χρήστη: εμφανίζεται όταν ο χρήστης πατήσει το εικονίδιο.
export default function UserMenu() {
  const { isLoggedIn, logout } = useAuth()
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)
  const close = () => setOpen(false)

  const handleLogout = () => {
    logout()
    navigate('/')
  }

  return (
    <div className="user-menu">
      <button className="icon-btn" aria-label="Χρήστης" onClick={() => setOpen(o => !o)}>
        👤
      </button>

      {open && (
        <ul className="dropdown" onClick={close}>
          {isLoggedIn ? (
            <>
              <li><Link to="/favourites">♡ Αγαπημένα</Link></li>
              <li><Link to="/profile">👤 Προφίλ</Link></li>
              <li><Link to="/history">🚗 Ιστορικό</Link></li>
              <li><Link to="/bookings">🚙 Τρέχουσες κρατήσεις</Link></li>
              <li><button onClick={handleLogout}>⏻ Έξοδος</button></li>
              <li><Link to="/help">? Βοήθεια</Link></li>
            </>
          ) : (
            <>
              <li><Link to="/login">Σύνδεση</Link></li>
              <li><Link to="/register">Εγγραφή</Link></li>
            </>
          )}
        </ul>
      )}
    </div>
  )
}