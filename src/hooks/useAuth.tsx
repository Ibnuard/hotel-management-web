import { ReactNode, createContext, useContext, useEffect } from 'react';
import { create } from 'zustand';

interface AuthState {
  token: string | null;
  user: any;
  setToken: (token: string | null) => void;
  setUser: (user: any | null) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem('adm_token'),
  user: localStorage.getItem('ADM_SESSION')
    ? JSON.parse(localStorage.getItem('ADM_SESSION')!)
    : null,
  setToken: (token) => {
    if (token) {
      localStorage.setItem('adm_token', token);
    } else {
      localStorage.removeItem('adm_token');
    }
    set({ token });
  },
  setUser: (user) => {
    if (user) {
      localStorage.setItem('ADM_SESSION', JSON.stringify(user));
    } else {
      localStorage.removeItem('ADM_SESSION');
    }
    set({ user });
  },
}));

const AuthContext = createContext<AuthState | null>(null);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const auth = useAuthStore();

  useEffect(() => {
    if (auth.token && auth.user) {
    } else {
    }
  }, [auth.token, auth.user]);

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthProvider;
