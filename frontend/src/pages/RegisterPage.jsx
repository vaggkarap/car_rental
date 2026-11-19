import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const fields = [
  { name: 'firstName', label: 'Όνομα', type: 'text' },
  { name: 'lastName', label: 'Επίθετο', type: 'text' },
  { name: 'email', label: 'Email', type: 'email' },
  { name: 'phone', label: 'Τηλέφωνο (προαιρετικό)', type: 'tel' },
  { name: 'password', label: 'Κωδικός (τουλάχιστον 8 χαρακτήρες)', type: 'password' },
  { name: 'confirmPassword', label: 'Επιβεβαίωση κωδικού', type: 'password' },
]

function validate(f) {
  const errors = {}
  if (!f.firstName.trim()) errors.firstName = 'Το όνομα είναι υποχρεωτικό.'
  if (!f.lastName.trim()) errors.lastName = 'Το επίθετο είναι υποχρεωτικό.'
  if (!/^\S+@\S+\.\S+$/.test(f.email)) errors.email = 'Δώσε έγκυρο email.'
  if (f.password.length < 8) errors.password = 'Ο κωδικός πρέπει να έχει τουλάχιστον 8 χαρακτήρες.'
  if (f.confirmPassword !== f.password) errors.confirmPassword = 'Οι κωδικοί δεν ταιριάζουν.'
  return errors
}

export default function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', password: '', confirmPassword: '',
  })
  const [errors, setErrors] = useState({})
  const [serverError, setServerError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    const found = validate(form)
    setErrors(found)
    setServerError('')
    if (Object.keys(found).length > 0) return

    setLoading(true)
    try {
      const { confirmPassword, ...data } = form // το confirmPassword δεν στέλνεται
      await register(data)
      navigate('/login', { state: { registered: true } })
    } catch (err) {
      setServerError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="section">
      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        <h2>Εγγραφή</h2>

        {fields.map(f => (
          <label key={f.name}>
            {f.label}
            <input type={f.type} name={f.name} value={form[f.name]} onChange={handleChange} />
            {errors[f.name] && <span className="field-error">{errors[f.name]}</span>}
          </label>
        ))}

        {serverError && <p className="error" role="alert">{serverError}</p>}

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Δημιουργία...' : 'Δημιουργία λογαριασμού'}
        </button>

        <p className="auth-form__alt">
          Έχεις ήδη λογαριασμό; <Link to="/login">Σύνδεση</Link>
        </p>
      </form>
    </section>
  )
}