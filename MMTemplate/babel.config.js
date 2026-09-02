const workletsPluginOptions = {
  // Your custom options.
};

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    ['react-native-worklets/plugin', workletsPluginOptions],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@src': './src',
          '@assets': './src/assets',
          '@components': './src/components',
          '@context': './src/context',
          '@locales': './src/locales',
          '@mock': './src/mock',
          '@navigation': './src/navigation',
          '@screens': './src/screens',
          '@services': './src/services',
          '@theme': './src/theme',
          '@app-types': './src/types',
          '@utils': './src/utils',
        },
      },
    ],
  ],
};
