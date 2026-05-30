import { createContext, useContext, useEffect, useState } from 'react';
import { customerLogin, customerLogout, getCustomer, customerCreate } from '../services/shopify';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('calada_token');
    if (token) {
      getCustomer(token).then(setCustomer).catch(() => {
        localStorage.removeItem('calada_token');
      }).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const result = await customerLogin(email, password);
    if (result.customerUserErrors?.length) throw new Error(result.customerUserErrors[0].message);
    const { accessToken } = result.customerAccessToken;
    localStorage.setItem('calada_token', accessToken);
    const cust = await getCustomer(accessToken);
    setCustomer(cust);
    return cust;
  };

  const register = async (firstName, lastName, email, password) => {
    const result = await customerCreate(firstName, lastName, email, password);
    if (result.customerUserErrors?.length) throw new Error(result.customerUserErrors[0].message);
    return login(email, password);
  };

  const logout = async () => {
    const token = localStorage.getItem('calada_token');
    if (token) await customerLogout(token);
    localStorage.removeItem('calada_token');
    setCustomer(null);
  };

  return (
    <AuthContext.Provider value={{ customer, loading, login, logout, register, isLoggedIn: !!customer }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
