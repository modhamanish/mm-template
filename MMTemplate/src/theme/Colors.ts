export type ThemeType = typeof lightTheme | typeof darkTheme;

const lightTheme = {
  colors: {
    primary: '#EF1D0B',
    secondary: '#FFD1D1',
    textColor: '#23272D',
    backgroundColor: '#FFFFFF',
    white: '#FFFFFF',
    black: '#000000',
  },
};

const darkTheme = {
  colors: {
    primary: '#EF1D0B',
    secondary: '#FFD1D1',
    textColor: '#FFFFFF',
    backgroundColor: '#121212',
    white: '#FFFFFF',
    black: '#000000',
  },
};

export { lightTheme, darkTheme };
