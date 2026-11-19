import { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { cars } from '../data/cars'
import { useFavourites } from '../context/FavouritesContext'

export default function CarDetailsPage() {
  const { id } = useParams()
  const car = cars.find(c => c.id === Number(id))
  const { ids, toggle } = useFavourites()
  const [index, setIndex] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  // ΠΡΟΣΩΡΙΝΟ: χωρίς πραγματικές φωτογραφίες δείχνουμε 5 κουτιά.
  // Όταν το car έχει πεδίο images (λίστα από URL), θα εμφανίζονται αυτές.
  const photos = car?.images?.length ? car.images : Array(5).fill(null)
  const total = photos.length

  const prev = () => setIndex(i => (i - 1 + total) % total)
  const next = () => setIndex(i => (i + 1) % total)

  // Πλήκτρα στο lightbox: Esc κλείνει, βέλη αλλάζουν φωτογραφία
  useEffect(() => {
    if (!lightboxOpen) return
    const onKey = e => {
      if (e.key === 'Escape') setLightboxOpen(false)
      if (e.key === 'ArrowLeft') setIndex(i => (i - 1 + total) % total)
      if (e.key === 'ArrowRight') setIndex(i => (i + 1) % total)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [lightboxOpen, total])

  if (!car) {
    return (
      <section className="section cars-page">
        <h2>Το αυτοκίνητο δεν βρέθηκε</h2>
        <Link to="/cars" className="btn">Πίσω στα αυτοκίνητα</Link>
      </section>
    )
  }

  const isFavourite = ids.includes(car.id)

  const renderPhoto = (src, i, className) =>
    src ? (
      <img src={src} alt={`${car.brand} ${car.model} - φωτογραφία ${i + 1}`} className={className} />
    ) : (
      <div className={`placeholder-img ${className}`}>Φωτογραφία {i + 1}</div>
    )

  const specs = [
    ['Κατηγορία', car.category],
    ['Έτος', car.year],
    ['Θέσεις', car.seats],
    ['Κιβώτιο', car.transmission],
    ['Καύσιμο', car.fuel],
  ]

  return (
    <section className="section cars-page">
      <p><Link to="/cars">← Πίσω στα αυτοκίνητα</Link></p>

      {/* Γκαλερί φωτογραφιών: βέλη < > και ένδειξη θέσης (π.χ. 3/5) */}
      <div className="gallery">
        <button className="gallery__arrow" onClick={prev} aria-label="Προηγούμενη φωτογραφία">‹</button>
        <button className="gallery__photo" onClick={() => setLightboxOpen(true)} aria-label="Μεγέθυνση φωτογραφίας">
          {renderPhoto(photos[index], index, 'gallery__img')}
        </button>
        <button className="gallery__arrow" onClick={next} aria-label="Επόμενη φωτογραφία">›</button>
        <span className="gallery__counter">{index + 1}/{total}</span>
      </div>

      {/* Στοιχεία αυτοκινήτου */}
      <div className="details">
        <div className="details__head">
          <h2>{car.brand} {car.model}</h2>
          <button
            className={`heart ${isFavourite ? 'heart--on' : ''}`}
            aria-label="Αγαπημένο"
            aria-pressed={isFavourite}
            onClick={() => toggle(car.id)}
          >
            {isFavourite ? '♥' : '♡'}
          </button>
        </div>

        <dl className="specs">
          {specs.map(([label, value]) => (
            <div key={label} className="specs__row">
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>

        <div className="details__footer">
          <p className="price price--big">{car.pricePerDay}€ / ημέρα</p>
          <Link to={`/cars/${car.id}/book`} className="btn">Κράτηση</Link>
        </div>
      </div>

      {/* Lightbox: μεγάλη φωτογραφία με κουμπί κλεισίματος πάνω δεξιά */}
      {lightboxOpen && (
        <div className="lightbox" role="dialog" aria-modal="true" onClick={() => setLightboxOpen(false)}>
          <button className="lightbox__close" onClick={() => setLightboxOpen(false)} aria-label="Κλείσιμο">✕</button>
          <button
            className="gallery__arrow lightbox__arrow"
            onClick={e => { e.stopPropagation(); prev() }}
            aria-label="Προηγούμενη φωτογραφία"
          >‹</button>
          <div onClick={e => e.stopPropagation()}>
            {renderPhoto(photos[index], index, 'lightbox__img')}
          </div>
          <button
            className="gallery__arrow lightbox__arrow"
            onClick={e => { e.stopPropagation(); next() }}
            aria-label="Επόμενη φωτογραφία"
          >›</button>
          <span className="lightbox__counter">{index + 1}/{total}</span>
        </div>
      )}
    </section>
  )
}