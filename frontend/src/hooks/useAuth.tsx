'use client';

import { User } from '@/interfaces/user.interface';
import { localStorageKeys } from '@/utils/localStorageKeys';

import {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useMemo,
  useCallback,
  useState,
} from 'react';

import { usePathname, useRouter } from 'next/navigation';

interface IUserProvider {
  user: User;
  setUser: React.Dispatch<SetStateAction<User>>;
  isAuthenticated: boolean;
  logout: () => void;
}

interface ChildrenProps {
  children: ReactNode;
}

const AuthContext = createContext({} as IUserProvider);

const AuthProvider = ({ children }: ChildrenProps) => {
  const [user, setUser] = useState<User>({} as User);
  const [loading, setLoading] = useState(true);

  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const dataUser = localStorage.getItem(localStorageKeys.user);

    if (dataUser) {
      try {
        setUser(JSON.parse(dataUser));
      } catch {
        localStorage.removeItem(localStorageKeys.user);
      }
    }

    setLoading(false);
  }, []);

  const isAuthenticated = !!user?.id;

  const logout = useCallback(() => {
    localStorage.removeItem(localStorageKeys.user);
    localStorage.removeItem(localStorageKeys.accessToken);
    localStorage.removeItem(localStorageKeys.refreshToken);

    setUser({} as User);

    router.push('/');
  }, [router]);

  const publicRoutes = ['/'];

  useEffect(() => {
    if (loading) return;

    // usuário não autenticado
    if (!isAuthenticated && !publicRoutes.includes(pathname)) {
      router.push('/');
    }

    // usuário autenticado
    if (isAuthenticated && pathname === '/') {
      router.push('/pets');
    }
  }, [isAuthenticated, pathname, loading, router]);

  const contextValue = useMemo(
    () => ({ user, setUser, isAuthenticated, logout }),
    [user, setUser, isAuthenticated, logout],
  );

  if (loading) {
    return null;
  }

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
