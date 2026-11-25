import { Link } from 'react-router-dom'
import logoRed from '../assets/logo-red.png'

export default function Footer() {
  return (
    <footer className="footer">
      <Link to="/" className="logo" aria-label="Αρχική">
        <img src={logoRed} alt="C.Rent" className="logo__img logo__img--footer" />
      </Link>
      <p>© 2026 C.Rent</p>
      <address>
        <strong>Στοιχεία επικοινωνίας</strong>
        <br />
        info@crent.example · +30 210 0000000
      </address>
    </footer>
  )
}
