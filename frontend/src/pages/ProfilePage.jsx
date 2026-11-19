import { useState } from 'react'
import { useAuth } from '../context/AuthContext'

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()

  // Οι φόρμες ξεκινούν με τα τρέχοντα στοιχεία του χρήστη
  const [profile, setProfile] = useState({
    firstName: user.firstName, lastName: user.lastName, email: user.email,
    phone: user.phone || '', address: user.address || '',
  })
  const [passwords, setPasswords] = useState({ password: '', confirmPassword: '' })
  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' })
  const [passwordMsg, setPasswordMsg] = useState({ type: '', text: '' })

  const handleProfileChange = e => setProfile({ ...profile, [e.target.name]: e.target.value })
  const handlePasswordChange = e => setPasswords({ ...passwords, [e.target.name]: e.target.value })

  const saveProfile = async e => {
    e.preventDefault()
    if (!profile.firstName.trim() || !profile.lastName.trim()) {
      setProfileMsg({ type: 'error', text: 'Το όνομα και το επίθετο είναι υποχρεωτικά.' })
      return
    }
    if (!/^\S+@\S+\.\S+$/.test(profile.email)) {
      setProfileMsg({ type: 'error', text: 'Δώσε έγκυρο email.' })
      return
    }
    try {
      await updateProfile(profile)
      setProfileMsg({ type: 'success', text: 'Τα στοιχεία αποθηκεύτηκαν.' })
    } catch (err) {
      setProfileMsg({ type: 'error', text: err.message })
    }
  }

  const changePassword = async e => {
    e.preventDefault()
    if (passwords.password.length < 8) {
      setPasswordMsg({ type: 'error', text: 'Ο κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες.' })
      return
    }
    if (passwords.password !== passwords.confirmPassword) {
      setPasswordMsg({ type: 'error', text: 'Οι κωδικοί δεν ταιριάζουν.' })
      return
    }
    try {
      await updateProfile({ password: passwords.password })
      setPasswords({ password: '', confirmPassword: '' })
      setPasswordMsg({ type: 'success', text: 'Ο κωδικός άλλαξε.' })
    } catch (err) {
      setPasswordMsg({ type: 'error', text: err.message })
    }
  }

  return (
    <section className="section">
      <h2>Προφίλ</h2>

      <form className="auth-form" onSubmit={saveProfile}>
        <label>Όνομα<input name="firstName" value={profile.firstName} onChange={handleProfileChange} /></label>
        <label>Επίθετο<input name="lastName" value={profile.lastName} onChange={handleProfileChange} /></label>
        <label>Email<input type="email" name="email" value={profile.email} onChange={handleProfileChange} /></label>
        <label>Τηλέφωνο<input type="tel" name="phone" value={profile.phone} onChange={handleProfileChange} /></label>
        <label>Διεύθυνση<input name="address" value={profile.address} onChange={handleProfileChange} /></label>

        {profileMsg.text && (
          <p className={profileMsg.type} role={profileMsg.type === 'error' ? 'alert' : 'status'}>{profileMsg.text}</p>
        )}
        <button type="submit" className="btn">Αποθήκευση</button>
      </form>

      <form className="auth-form" onSubmit={changePassword}>
        <h3>Αλλαγή κωδικού πρόσβασης</h3>
        <label>Νέος κωδικός<input type="password" name="password" value={passwords.password} onChange={handlePasswordChange} /></label>
        <label>Επιβεβαίωση κωδικού<input type="password" name="confirmPassword" value={passwords.confirmPassword} onChange={handlePasswordChange} /></label>

        {passwordMsg.text && (
          <p className={passwordMsg.type} role={passwordMsg.type === 'error' ? 'alert' : 'status'}>{passwordMsg.text}</p>
        )}
        <button type="submit" className="btn">Αλλαγή</button>
      </form>
    </section>
  )
}