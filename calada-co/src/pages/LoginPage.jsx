import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { customerLogin, getCustomer } from '../services/shopify'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const result = await customerLogin(form)
      if (result.customerUserErrors?.length) {
        setError(result.customerUserErrors[0].message)
      } else {
        const token = result.customerAccessToken.accessToken
        const customer = await getCustomer(token)
        login(token, customer)
        navigate('/account')
      }
    } catch {
      setError('something went wrong. please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-medium text-navy text-center mb-2">welcome back</h1>
        <p className="text-sm text-gray-400 text-center mb-8">sign in to your CalAda & Co account</p>

        {error && <p className="text-red-400 text-sm text-center mb-4 bg-red-50 rounded-xl py-3">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" required placeholder="email address" value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink" />
          <input type="password" required placeholder="password" value={form.password}
            onChange={e => setForm(p => ({ ...p, password: e.target.value }))}
            className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-pink" />
          <button type="submit" disabled={loading}
            className="w-full bg-navy text-white py-3 rounded-full text-sm font-medium hover:bg-navy-mid transition-colors disabled:opacity-60">
            {loading ? 'signing in...' : 'sign in'}
          </button>
        </form>

        <p className="text-sm text-center text-gray-400 mt-6">
          don't have an account?{' '}
          <Link to="/account/register" className="text-pink hover:text-pink-dark font-medium">create one</Link>
        </p>
      </div>
    </div>
  )
}
