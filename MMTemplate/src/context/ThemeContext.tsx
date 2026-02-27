import {
  createContext,
  FC,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react';

import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

import { darkTheme, lightTheme, ThemeType } from '@src/theme/colors';
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
  const [currentTheme, setCurrentTheme] = useState<
    ThemeContextType['currentTheme']
  >(() => {
    const theme = storageHelper.getItem(storageHelper.STORAGE_KEYS.THEME);
    return theme === 'dark' ? 'dark' : 'light';
  });

  const colors = currentTheme === 'dark' ? darkTheme.colors : lightTheme.colors;

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
