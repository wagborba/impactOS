import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: string
  initials: string
  provider: 'local' | 'google'
}

interface AuthContextValue {
  user: AuthUser | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string, role: string) => Promise<void>
  loginWithGoogle: () => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)

const SESSION_KEY = 'impactos_session'
const USERS_KEY = 'impactos_users'

interface StoredUser {
  id: string
  name: string
  email: string
  password: string
  role: string
}

function getInitials(name: string): string {
  const parts = name.trim().split(' ').filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

function getStoredUsers(): StoredUser[] {
  try { return JSON.parse(localStorage.getItem(USERS_KEY) ?? '[]') as StoredUser[] }
  catch { return [] }
}

function saveStoredUsers(users: StoredUser[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users))
}

function delay(ms: number) { return new Promise(r => setTimeout(r, ms)) }

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(SESSION_KEY)
      if (stored) setUser(JSON.parse(stored) as AuthUser)
    } catch {}
    setIsLoading(false)
  }, [])

  const setSession = (u: AuthUser) => {
    setUser(u)
    localStorage.setItem(SESSION_KEY, JSON.stringify(u))
  }

  const login = async (email: string, password: string) => {
    await delay(600)
    const users = getStoredUsers()
    const found = users.find(u => u.email.toLowerCase() === email.toLowerCase())
    if (!found) throw new Error('E-mail não encontrado')
    if (found.password !== btoa(password)) throw new Error('Senha incorreta')
    setSession({ id: found.id, name: found.name, email: found.email, role: found.role, initials: getInitials(found.name), provider: 'local' })
  }

  const signup = async (name: string, email: string, password: string, role: string) => {
    await delay(600)
    const users = getStoredUsers()
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase()))
      throw new Error('Este e-mail já está cadastrado')
    const newUser: StoredUser = { id: Date.now().toString(), name, email, password: btoa(password), role }
    saveStoredUsers([...users, newUser])
    setSession({ id: newUser.id, name, email, role, initials: getInitials(name), provider: 'local' })
  }

  const loginWithGoogle = async () => {
    await delay(800)
    // Simulated Google OAuth — para produção integre @react-oauth/google com VITE_GOOGLE_CLIENT_ID
    setSession({
      id: 'google-' + Date.now(),
      name: 'Marina Alves',
      email: 'marina@institutosemear.org.br',
      role: 'Diretora Executiva',
      initials: 'MA',
      provider: 'google',
    })
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem(SESSION_KEY)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, login, signup, loginWithGoogle, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be inside AuthProvider')
  return ctx
}
