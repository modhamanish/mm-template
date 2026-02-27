import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';

import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { darkTheme, lightTheme, ThemeType } from '@theme/Colors';
import storageHelper from '@utils/storageHelper';

export type ThemeContextType = {
  colors: ThemeType['colors'];
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
  const [colors, setColors] = useState<ThemeContextType['colors']>(
    lightTheme.colors,
  );

  useEffect(() => {
    const theme = storageHelper.getItem(storageHelper.STORAGE_KEYS.THEME);
    setCurrentTheme(theme === 'dark' ? 'dark' : 'light');
  }, []);

  useEffect(() => {
    if (currentTheme === 'dark') {
      setColors(darkTheme.colors);
    } else {
      setColors(lightTheme.colors);
    }
  }, [currentTheme]);

  const toggleTheme = useCallback(() => {
    setCurrentTheme(prev => {
      if (prev === 'dark') {
        storageHelper.saveItem(storageHelper.STORAGE_KEYS.THEME, 'light');
        return 'light';
      } else {
        storageHelper.saveItem(storageHelper.STORAGE_KEYS.THEME, 'dark');
        return 'dark';
      }
    });
  }, []);

  return (
    <ThemeContext.Provider
      value={{
        currentTheme,
        colors,
        toggleTheme,
        safeAreaInsets,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

const defaultThemeContext: ThemeContextType = {
  colors: lightTheme.colors,
  currentTheme: 'light',
  toggleTheme: () => {},
  safeAreaInsets: { top: 0, bottom: 0, left: 0, right: 0 },
};

export const useTheme = () => useContext(ThemeContext) ?? defaultThemeContext;
