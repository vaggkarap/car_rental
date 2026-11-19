import { Link } from 'react-router-dom'

// ΠΡΟΣΩΡΙΝΑ δεδομένα. Αργότερα οι κατηγορίες θα έρχονται από το API (GET /api/categories).
const categories = [
  { id: 1, name: 'Οικονομικά', description: 'Ιδανικά για την πόλη', price: 25 },
  { id: 2, name: 'Οικογενειακά', description: 'Χώρος για όλους', price: 45 },
  { id: 3, name: 'SUV', description: 'Άνεση και ισχύς', price: 60 },
  { id: 4, name: 'Πολυτελείας', description: 'Η κορυφαία εμπειρία', price: 95 },
]

const steps = [
  { title: 'Επίλεξε αυτοκίνητο', text: 'Δες τις κατηγορίες και βρες το κατάλληλο.' },
  { title: 'Διάλεξε ημερομηνίες', text: 'Δώσε παραλαβή και επιστροφή.' },
  { title: 'Κάνε κράτηση', text: 'Επιβεβαίωσε και δες το συνολικό κόστος.' },
  { title: 'Παράλαβε και φύγε', text: 'Το αυτοκίνητό σου είναι έτοιμο.' },
]

const faqs = [
  { q: 'Τι χρειάζομαι για να νοικιάσω αυτοκίνητο;', a: 'Λογαριασμό στην εφαρμογή και έγκυρο δίπλωμα οδήγησης.' },
  { q: 'Μπορώ να ακυρώσω μια κράτηση;', a: 'Ναι, πριν την ημερομηνία παραλαβής, από τις Τρέχουσες κρατήσεις.' },
  { q: 'Πώς υπολογίζεται το κόστος;', a: 'Ημέρες ενοικίασης × ημερήσια τιμή της κατηγορίας.' },
]

export default function HomePage() {
  return (
    <>
      {/* Hero: τίτλος + κουμπί Our Cars + ενδεικτικές φωτογραφίες */}
      <section className="hero">
        <div className="hero__text">
          <h1>You want it, we c.rent it!</h1>
          <Link to="/cars" className="btn">Our Cars</Link>
        </div>
        <div className="hero__images" aria-hidden="true">
          <div className="placeholder-img">Φωτογραφία</div>
        </div>
      </section>

      {/* Κάρτες με κατηγορίες αυτοκινήτων */}
      <section className="section">
        <h2>Κατηγορίες αυτοκινήτων</h2>
        <div className="cards">
          {categories.map(c => (
            <article key={c.id} className="card">
              <div className="placeholder-img">Φωτογραφία</div>
              <h3>{c.name}</h3>
              <p>{c.description}</p>
              <p className="price">από {c.price}€ / ημέρα</p>
            </article>
          ))}
        </div>
      </section>

      {/* Βήματα για renting */}
      <section className="section section--alt">
        <h2>Βήματα για renting</h2>
        <ol className="steps">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="steps__num">{i + 1}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Ο σκοπός μας */}
      <section className="section">
        <h2>Ο σκοπός μας</h2>
        <p className="narrow">
           Έχουμε υπάρξει στη θέση σας και καταλαβαίνουμε τους προβληματισμούς σας. Είτε είστε φοιτητές και 
           πάτε τις πρώτες σας διακοπές, είτε  μεγαλύτεροι ενήλικες με διάθεση για περιπετειώδη ταξίδια, 
           η crent είναι εδώ για να κάνει τη μετακίνηση σας πιο εύκολη και διαφανή. Η αποστολή μας είναι 
           να χαρίσουμε σε κόσμο που δεν έχει πάντα την ευχέρεια δικού του οχήματος, την ευκαιρία
            να μετακινηθεί εύκολα και το σημαντικότερο με ασφάλεια στους ιστορικούς και όμορφους δρόμους της Ελλάδας. 
            Οι άνθρωποι της εταιρείας μας έχουν όλη την καλή διάθεση να σας βοηθήσουν με την αναζήτηση σας 
            για το επιθυμητό σας αυτοκίνητο. Ανυπομονούμε να συνεργαστούμε μαζί σας!
        </p>
      </section>

      {/* Συχνές ερωτήσεις */}
      <section className="section section--alt">
        <h2>Συχνές ερωτήσεις</h2>
        <div className="narrow">
          {faqs.map(f => (
            <details key={f.q} className="faq">
              <summary>{f.q}</summary>
              <p>{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  )
}
