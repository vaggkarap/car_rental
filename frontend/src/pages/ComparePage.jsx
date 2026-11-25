import { Link, useSearchParams } from 'react-router-dom'
import { cars } from '../data/cars'

const rows = [
  { label: 'Μοντέλο', value: c => c.model },
  { label: 'Κατηγορία', value: c => c.category },
  { label: 'Έτος', value: c => c.year },
  { label: 'Θέσεις', value: c => c.seats },
  { label: 'Κιβώτιο', value: c => c.transmission },
  { label: 'Καύσιμο', value: c => c.fuel },
  { label: 'Τιμή / ημέρα', value: c => `${c.pricePerDay}€`, isPrice: true },
]

export default function ComparePage() {
  // Τα αυτοκίνητα για σύγκριση περνούν στο URL: /compare?ids=1,2,3
  const [searchParams, setSearchParams] = useSearchParams()
  const ids = [...new Set((searchParams.get('ids') || '').split(',').map(Number).filter(Boolean))]
  const selected = ids
    .map(id => cars.find(c => c.id === id))
    .filter(Boolean)
    .slice(0, 3)

  const cheapest = Math.min(...selected.map(c => c.pricePerDay))

  const remove = id => {
    const rest = selected.filter(c => c.id !== id).map(c => c.id)
    setSearchParams(rest.length ? { ids: rest.join(',') } : {})
  }

  if (selected.length < 2) {
    return (
      <section className="section cars-page">
        <h2>Σύγκριση αυτοκινήτων</h2>
        <p>Χρειάζονται τουλάχιστον 2 αυτοκίνητα για σύγκριση.</p>
        <Link to="/cars" className="btn">Επιλογή αυτοκινήτων</Link>
      </section>
    )
  }

  return (
    <section className="section cars-page">
      <h2>Σύγκριση αυτοκινήτων</h2>

      <div className="table-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th />
              {selected.map(c => (
                <th key={c.id}>
                  <div className="placeholder-img">Φωτογραφία</div>
                  <h3>{c.brand}</h3>
                  <button className="btn btn--small" onClick={() => remove(c.id)}>Αφαίρεση</button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map(r => (
              <tr key={r.label}>
                <th scope="row">{r.label}</th>
                {selected.map(c => (
                  <td key={c.id} className={r.isPrice && c.pricePerDay === cheapest ? 'best' : ''}>
                    {r.value(c)}
                    {r.isPrice && c.pricePerDay === cheapest && <small> · Φθηνότερο</small>}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p><Link to="/cars">← Πίσω στην αναζήτηση</Link></p>
    </section>
  )
}