import { createContext, useContext, useState } from 'react'

const FavouritesContext = createContext(null)
const KEY = 'favourite_car_ids'

function load() {
  try {
    return JSON.parse(localStorage.getItem(KEY)) ?? []
  } catch {
    return []
  }
}

// ΠΡΟΣΩΡΙΝΟ: τα αγαπημένα κρατιούνται στον browser. Αργότερα θα αποθηκεύονται στο backend.
export function FavouritesProvider({ children }) {
  const [ids, setIds] = useState(load)

  const toggle = id =>
    setIds(list => {
      const next = list.includes(id) ? list.filter(x => x !== id) : [...list, id]
      try {
        localStorage.setItem(KEY, JSON.stringify(next))
      } catch {
        /* αγνοούμε σφάλματα αποθήκευσης */
      }
      return next
    })

  return <FavouritesContext.Provider value={{ ids, toggle }}>{children}</FavouritesContext.Provider>
}

export const useFavourites = () => useContext(FavouritesContext)