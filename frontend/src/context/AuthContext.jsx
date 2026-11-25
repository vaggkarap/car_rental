import { createContext, useContext, useState } from 'react'
import { loginUser, registerUser, updateUser } from '../api/authApi'

const AuthContext = createContext(null)
const SESSION_KEY = 'session_user'

function loadSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(loadSession)

  const saveSession = u => {
    setUser(u)
    try {
      if (u) localStorage.setItem(SESSION_KEY, JSON.stringify(u))
      else localStorage.removeItem(SESSION_KEY)
    } catch {
      /* αγνοούμε σφάλματα αποθήκευσης */
    }
  }

  const value = {
    user,
    isLoggedIn: !!user,
    isAdmin: user?.role === 'Admin',
    login: async (email, password) => saveSession(await loginUser(email, password)),
    register: async data => {
      await registerUser(data)
    },
    logout: () => saveSession(null),
    updateProfile: async changes => saveSession(await updateUser(user.id, changes)),
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)