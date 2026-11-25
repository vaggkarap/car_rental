import { terms, LAST_UPDATED } from '../data/terms'

export default function HelpPage() {
  return (
    <section className="section help-page">
      <h2>Βοήθεια: Όροι και προϋποθέσεις</h2>
      <p className="muted help-page__updated">Τελευταία ενημέρωση: {LAST_UPDATED}</p>

      <div className="help-layout">
        {/* Περιεχόμενα: κάθε σύνδεσμος οδηγεί στην αντίστοιχη ενότητα */}
        <nav className="help-toc" aria-label="Περιεχόμενα">
          <strong>Περιεχόμενα</strong>
          <ul>
            {terms.map(t => (
              <li key={t.id}><a href={`#${t.id}`}>{t.title}</a></li>
            ))}
          </ul>
        </nav>

        <div className="help-content">
          {terms.map(t => (
            <article key={t.id} id={t.id} className="help-section">
              <h3>{t.title}</h3>
              {t.paragraphs?.map((p, i) => <p key={i}>{p}</p>)}
              {t.list && (
                <ul>
                  {t.list.map((item, i) => <li key={i}>{item}</li>)}
                </ul>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}