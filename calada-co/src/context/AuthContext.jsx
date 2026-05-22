import { createContext, useContext, useEffect, useState } from 'react'
import { getCustomer } from '../services/shopify'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(null)
  const [authLoading, setAuthLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('calada_customer_token')
    if (token) {
      getCustomer(token)
        .then(setCustomer)
        .catch(() => localStorage.removeItem('calada_customer_token'))
        .finally(() => setAuthLoading(false))
    } else {
      setAuthLoading(false)
    }
  }, [])

  function login(token, customerData) {
    localStorage.setItem('calada_customer_token', token)
    setCustomer(customerData)
  }

  function logout() {
    localStorage.removeItem('calada_customer_token')
    setCustomer(null)
  }

  return (
    <AuthContext.Provider value={{ customer, authLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
