import { bookings } from '../data/bookings'
import { cars } from '../data/cars'

const CURRENT_STATUSES = ['Εκκρεμεί', 'Επιβεβαιωμένη', 'Σε εξέλιξη']
const formatDate = d => new Date(d).toLocaleDateString('el-GR')

// mode="current": τρέχουσες κρατήσεις, mode="history": ιστορικό (Ολοκληρωμένες / Ακυρωμένες)
export default function BookingsPage({ mode }) {
  const isCurrent = mode === 'current'
  const list = bookings.filter(b => CURRENT_STATUSES.includes(b.status) === isCurrent)

  return (
    <section className="section cars-page">
      <h2>{isCurrent ? 'Τρέχουσες κρατήσεις' : 'Ιστορικό κρατήσεων'}</h2>

      {list.length === 0 ? (
        <p>Δεν υπάρχουν κρατήσεις.</p>
      ) : (
        <div className="car-grid">
          {list.map(b => {
            const car = cars.find(c => c.id === b.carId)
            return (
              <article key={b.id} className="car-card">
                <h3>{car.brand} {car.model}</h3>
                <div className="placeholder-img">Φωτογραφία</div>
                <p>{formatDate(b.startDate)} → {formatDate(b.endDate)}</p>
                <p className="price">{b.totalPrice}€</p>
                <span className="badge">{b.status}</span>
              </article>
            )
          })}
        </div>
      )}
    </section>
  )
}