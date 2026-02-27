import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { userMockData } from '@mock';
import Routes from '@navigation/routes';
import { resetAndNavigate } from '@utils/navigationUtils';
import StorageHelper from '@utils/storageHelper';

type UserType = typeof userMockData;

type AuthContextType = {
  user?: UserType;
  updateUser: (user: UserType) => void;
  handleLogout: () => void;
  isUserLoggedIn: () => boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType>();

  useEffect(() => {
    const userItem = StorageHelper.getItem(StorageHelper.STORAGE_KEYS.USER);
    if (userItem) {
      setUser(JSON.parse(userItem));
    }
  }, []);

  const isUserLoggedIn = useCallback(() => {
    const userItem = StorageHelper.getItem(StorageHelper.STORAGE_KEYS.USER);
    if (userItem) {
      return true;
    }
    return false;
  }, []);

  const updateUser = useCallback((_user: UserType) => {
    setUser(_user);
    StorageHelper.saveItem(
      StorageHelper.STORAGE_KEYS.USER,
      JSON.stringify(_user),
    );
  }, []);

  const handleLogout = useCallback(() => {
    StorageHelper.removeItem(StorageHelper.STORAGE_KEYS.USER);
    setUser(undefined);
    resetAndNavigate(Routes.AuthStack);
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, updateUser, handleLogout, isUserLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () =>
  useContext(AuthContext) ?? {
    user: undefined,
    updateUser: () => {},
    handleLogout: () => {},
    isUserLoggedIn: () => false,
  };
