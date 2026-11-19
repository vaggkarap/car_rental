import { Link } from 'react-router-dom'

export default function CarCard({ car, isFavourite, isCompared, onToggleFavourite, onToggleCompare }) {
  return (
    <article className="car-card">
      <div className="car-card__top">
        <h3>{car.brand}</h3>
        <button
          className={`heart ${isFavourite ? 'heart--on' : ''}`}
          aria-label="Αγαπημένο"
          aria-pressed={isFavourite}
          onClick={() => onToggleFavourite(car.id)}
        >
          {isFavourite ? '♥' : '♡'}
        </button>
      </div>

      <div className="placeholder-img">Φωτογραφία</div>

      <p>{car.model} · {car.year}</p>
      <p className="muted">{car.category}</p>
      <p className="price">{car.pricePerDay}€ / ημέρα</p>

      {onToggleCompare && (
        <button
          className={`btn btn--small ${isCompared ? 'btn--on' : ''}`}
          onClick={() => onToggleCompare(car.id)}
        >
          {isCompared ? 'Αφαίρεση από σύγκριση' : 'Σύγκριση'}
        </button>
      )}
      <Link to={`/cars/${car.id}`} className="btn btn--small btn--outline">Πληροφορίες</Link>
    </article>
  )
}