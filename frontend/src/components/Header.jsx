import { useState } from 'react'
import { Link } from 'react-router-dom'
import UserMenu from './UserMenu'
import logoBlack from '../assets/logo-black.png'

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false)

  return (
    <header className="header">
      <button
        className="icon-btn"
        aria-label="Μενού"
        onClick={() => setDrawerOpen(o => !o)}
      >
        ☰
      </button>

      {/* Πατώντας το logo ο χρήστης πηγαίνει στην αρχική οθόνη */}
      <Link to="/" className="logo" aria-label="Αρχική">
        <img src={logoBlack} alt="C.Rent" className="logo__img" />
      </Link>

      <UserMenu/>

      {drawerOpen && (
        <nav className="drawer" onClick={() => setDrawerOpen(false)}>
          <Link to="/">Αρχική</Link>
          <Link to="/cars">Our Cars</Link>
          <Link to="/help">Βοήθεια</Link>
        </nav>
      )}
    </header>
  )
}
