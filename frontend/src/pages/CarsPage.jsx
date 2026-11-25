import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { cars } from '../data/cars'
import CarCard from '../components/CarCard'
import { useFavourites } from '../context/FavouritesContext'

const today = new Date().toLocaleDateString('en-CA') // μορφή YYYY-MM-DD

export default function CarsPage() {
  const [form, setForm] = useState({ from: '', to: '', sort: 'default', text: '' })
  const [applied, setApplied] = useState(form) // τα φίλτρα που ισχύουν μετά το Search
  const [error, setError] = useState('')
  const { ids: favourites, toggle: toggleFavourite } = useFavourites()
  const [compared, setCompared] = useState([])

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSearch = e => {
    e.preventDefault()
    // Client-side validation (το backend θα τα ελέγχει ξανά, US-08)
    if (form.from && form.from < today) {
      setError('Η ημερομηνία παραλαβής δεν μπορεί να είναι στο παρελθόν.')
      return
    }
    if (form.from && form.to && form.to <= form.from) {
      setError('Η επιστροφή πρέπει να είναι μετά την παραλαβή.')
      return
    }
    setError('')
    setApplied(form)
  }


  const toggleCompare = id =>
    setCompared(list => {
      if (list.includes(id)) return list.filter(x => x !== id)
      return list.length >= 3 ? list : [...list, id] // μέγιστο 3 αυτοκίνητα
    })

  // ΠΡΟΣΩΡΙΝΟ: τα φίλτρα εφαρμόζονται εδώ, στον client. Αργότερα θα γίνονται από το API.
  // Οι ημερομηνίες (Από/Έως) θα φιλτράρουν τη διαθεσιμότητα όταν υπάρξει το backend (US-08).
  const visibleCars = useMemo(() => {
    const text = applied.text.trim().toLowerCase()
    const list = cars.filter(c =>
      `${c.brand} ${c.model} ${c.category}`.toLowerCase().includes(text),
    )
    if (applied.sort === 'priceAsc') list.sort((a, b) => a.pricePerDay - b.pricePerDay)
    if (applied.sort === 'priceDesc') list.sort((a, b) => b.pricePerDay - a.pricePerDay)
    if (applied.sort === 'name') list.sort((a, b) => a.brand.localeCompare(b.brand))
    return list
  }, [applied])

  return (
    <section className="section cars-page">
      <h2>Αναζήτηση αυτοκινήτων</h2>

      <form className="filters" onSubmit={handleSearch}>
        <div className="filters__row">
          <label>
            Από
            <input type="date" name="from" value={form.from} min={today} onChange={handleChange} />
          </label>
          <label>
            Έως
            <input type="date" name="to" value={form.to} min={form.from || today} onChange={handleChange} />
          </label>
          <label>
            Ταξινόμηση
            <select name="sort" value={form.sort} onChange={handleChange}>
              <option value="default">Προεπιλογή</option>
              <option value="priceAsc">Τιμή: χαμηλή → υψηλή</option>
              <option value="priceDesc">Τιμή: υψηλή → χαμηλή</option>
              <option value="name">Μάρκα (Α-Ω)</option>
            </select>
          </label>
          <button type="submit" className="btn">🚗 Search</button>
        </div>

        <input
          type="text"
          name="text"
          className="filters__text"
          placeholder={`Αναζήτηση σε ${cars.length} αυτοκίνητα`}
          value={form.text}
          onChange={handleChange}
        />

        {error && <p className="error" role="alert">{error}</p>}
      </form>

      {compared.length > 0 && (
        <div className="compare-bar">
                      Για σύγκριση: {compared.length} αυτοκίνητα
            {compared.length >= 2 ? (
              <Link to={`/compare?ids=${compared.join(',')}`} className="btn btn--small">Σύγκριση</Link>
            ) : (
              <span className="muted">Επίλεξε τουλάχιστον 2</span>
            )}
            <button className="btn btn--small" onClick={() => setCompared([])}>Καθαρισμός</button>
        </div>
      )}

      <p className="muted">{visibleCars.length} αποτελέσματα</p>

      {visibleCars.length === 0 ? (
        <p>Δεν βρέθηκαν αυτοκίνητα.</p>
      ) : (
        <div className="car-grid">
          {visibleCars.map(car => (
            <CarCard
              key={car.id}
              car={car}
              isFavourite={favourites.includes(car.id)}
              isCompared={compared.includes(car.id)}
              onToggleFavourite={toggleFavourite}
              onToggleCompare={toggleCompare}
            />
          ))}
        </div>
      )}
    </section>
  )
}