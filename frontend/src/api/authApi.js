// ΠΡΟΣΩΡΙΝΟ MOCK. Στο US-01/US-02 αντικαθίσταται με κλήσεις fetch στο backend:
//   POST /api/auth/register, POST /api/auth/login, PUT /api/users/me
// ΠΡΟΣΟΧΗ: εδώ ο κωδικός αποθηκεύεται σε απλό κείμενο ΜΟΝΟ για το demo.
// Στο πραγματικό backend αποθηκεύεται αποκλειστικά ως hash.

const USERS_KEY = 'mock_users'
const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

const defaultUsers = [
  {
    id: 1, firstName: 'Admin', lastName: 'C.Rent', email: 'admin@crent.gr',
    phone: '', address: '', password: 'Admin123!', role: 'Admin',
  },
]

function readUsers() {
  try {
    const raw = localStorage.getItem(USERS_KEY)
    return raw ? JSON.parse(raw) : defaultUsers
  } catch {
    return defaultUsers
  }
}

function writeUsers(users) {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users))
  } catch {
    /* αγνοούμε σφάλματα αποθήκευσης */
  }
}

// Επιστρέφουμε τον χρήστη χωρίς τον κωδικό
const toPublic = ({ password, ...user }) => user

export async function registerUser(data) {
  await delay(300)
  const users = readUsers()
  if (users.some(u => u.email.toLowerCase() === data.email.toLowerCase())) {
    throw new Error('Υπάρχει ήδη λογαριασμός με αυτό το email.') // αντιστοιχεί σε 409
  }
  const user = { id: Date.now(), role: 'User', phone: '', address: '', ...data }
  writeUsers([...users, user])
  return toPublic(user)
}

export async function loginUser(email, password) {
  await delay(300)
  const user = readUsers().find(
    u => u.email.toLowerCase() === email.toLowerCase() && u.password === password,
  )
  if (!user) throw new Error('Λάθος email ή κωδικός.') // αντιστοιχεί σε 401
  return toPublic(user)
}

export async function updateUser(id, changes) {
  await delay(300)
  const users = readUsers()
  const index = users.findIndex(u => u.id === id)
  if (index === -1) throw new Error('Ο χρήστης δεν βρέθηκε.')
  users[index] = { ...users[index], ...changes }
  writeUsers(users)
  return toPublic(users[index])
}