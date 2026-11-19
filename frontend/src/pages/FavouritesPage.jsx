import { Link } from 'react-router-dom'
import { cars } from '../data/cars'
import CarCard from '../components/CarCard'
import { useFavourites } from '../context/FavouritesContext'

export default function FavouritesPage() {
  const { ids, toggle } = useFavourites()
  const favouriteCars = cars.filter(c => ids.includes(c.id))

  return (
    <section className="section cars-page">
      <h2>Αγαπημένα</h2>

      {favouriteCars.length === 0 ? (
        <p>Δεν έχεις αγαπημένα ακόμα. <Link to="/cars">Δες τα αυτοκίνητα</Link></p>
      ) : (
        <div className="car-grid">
          {favouriteCars.map(car => (
            <CarCard key={car.id} car={car} isFavourite onToggleFavourite={toggle} />
          ))}
        </div>
      )}
    </section>
  )
}