import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { darkTheme, lightTheme, ThemeType } from '../theme/Colors';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

export type ThemeContextType = {
  theme: ThemeType;
  currentTheme?: 'dark' | 'light';
  toggleTheme: () => void;
  safeAreaInsets: EdgeInsets;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

type ThemeProviderProps = {
  children: ReactNode;
};

export const ThemeProvider: FC<ThemeProviderProps> = ({ children }) => {
  const safeAreaInsets = useSafeAreaInsets();
  const [currentTheme, setCurrentTheme] =
    useState<ThemeContextType['currentTheme']>();
  const [theme, setTheme] = useState<ThemeContextType['theme']>(lightTheme);

  useEffect(() => {
    if (currentTheme === 'dark') {
      setTheme(darkTheme);
    } else {
      setTheme(lightTheme);
    }
  }, [currentTheme]);

  const toggleTheme = useCallback(() => {
    setCurrentTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  }, []);

  return (
    <ThemeContext.Provider
      value={{ currentTheme, theme, toggleTheme, safeAreaInsets }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const defaultThemeContext: ThemeContextType = {
  theme: lightTheme,
  currentTheme: 'light',
  toggleTheme: () => {},
  safeAreaInsets: { top: 0, bottom: 0, left: 0, right: 0 },
};

export const useTheme = () => useContext(ThemeContext) ?? defaultThemeContext;
