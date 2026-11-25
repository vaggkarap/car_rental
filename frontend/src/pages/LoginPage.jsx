import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    if (!form.email || !form.password) {
      setError('Συμπλήρωσε email και κωδικό.')
      return
    }
    setLoading(true)
    setError('')
    try {
      await login(form.email, form.password)
      navigate(location.state?.from || '/', { replace: true })
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Σύνδεση</h2>

        {location.state?.registered && (
          <p className="success" role="status">Ο λογαριασμός δημιουργήθηκε. Συνδέσου για να συνεχίσεις.</p>
        )}

        <label>
          Email
          <input type="email" name="email" value={form.email} onChange={handleChange} autoComplete="email" />
        </label>
        <label>
          Κωδικός
          <input type="password" name="password" value={form.password} onChange={handleChange} autoComplete="current-password" />
        </label>

        {error && <p className="error" role="alert">{error}</p>}

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Σύνδεση...' : 'Σύνδεση'}
        </button>

        <p className="auth-form__alt">
          Δεν έχεις λογαριασμό; <Link to="/register">Εγγραφή</Link>
        </p>
      </form>
    </section>
  )
}