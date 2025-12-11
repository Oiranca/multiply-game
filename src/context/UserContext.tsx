import {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren
} from 'react';
import {
  getUser,
  saveUser,
  clearUser,
  isLoggedIn,
  isGuest as isGuestInStorage,
  setGuestFlag,
  clearGuestFlag,
  setUserAndCreateToken,
  createAuthToken,
  isTokenValid,
  UserData
} from '../services/localStorage.service';

interface UserContextType {
  user: UserData | null;
  isGuest: boolean;
  login: (username: string) => void;
  loginAsGuest: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: PropsWithChildren) => {
  const [user, setUser] = useState<UserData | null>(() => {
    if (isTokenValid() && isLoggedIn()) {
      const guest = isGuestInStorage();
      if (!guest) {
        return getUser() || null;
      }
    }
    return null;
  });
  
  const [isGuest, setIsGuest] = useState(() => isTokenValid() && isLoggedIn() && isGuestInStorage());
  const [isAuthenticated, setIsAuthenticated] = useState(() => isTokenValid() && isLoggedIn());

  useEffect(() => {
    const checkAuth = () => {
      if (!isTokenValid()) {
        clearUser();
        setUser(null);
        setIsGuest(false);
        setIsAuthenticated(false);
        return;
      }

      if (isLoggedIn()) {
        const guest = isGuestInStorage();
        if (guest) {
          setUser(null);
          setIsGuest(true);
          setIsAuthenticated(true);
        } else {
          const currentUser = getUser();
          if (currentUser) {
            setUser(currentUser);
            setIsGuest(false);
            setIsAuthenticated(true);
          } else {
            clearUser();
            setUser(null);
            setIsGuest(false);
            setIsAuthenticated(false);
          }
        }
      } else {
        clearUser();
        setUser(null);
        setIsGuest(false);
        setIsAuthenticated(false);
      }
    };
    
    checkAuth();
  }, []);

  const login = (username: string) => {
    try {
      saveUser(username);
      clearGuestFlag();
      setUserAndCreateToken(username);
      const newUser = getUser();
      setUser(newUser);
      setIsGuest(false);
      setIsAuthenticated(true);
    } catch (error) {
      throw error;
    }
  };

  const loginAsGuest = () => {
    setGuestFlag();
    createAuthToken();
    setUser(null);
    setIsGuest(true);
    setIsAuthenticated(true);
  };

  const logout = () => {
    clearUser();
    setUser(null);
    setIsGuest(false);
    setIsAuthenticated(false);
  };

  return (
    <UserContext.Provider
      value={{ user, isGuest, login, loginAsGuest, logout, isAuthenticated }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
