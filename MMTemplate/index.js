import 'react-native-gesture-handler';
import { AppRegistry, Text, TextInput, TouchableOpacity, ScrollView, StatusBar, RefreshControl, View, Platform } from 'react-native';
// import App from './App';
import App from './src/Route';
import { name as appName } from './app.json';
import { color, font } from './src/Component/Styles';

console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
console.disableYellowBox = true;

View.defaultProps = View.defaultProps || {};
View.defaultProps.borderColor = color.borderColor;

Text.defaultProps = Text.defaultProps || {};
Text.defaultProps.allowFontScaling = false;

StatusBar.defaultProps = StatusBar.defaultProps || {};
StatusBar.defaultProps.backgroundColor = "#fff";
StatusBar.defaultProps.barStyle = "dark-content";

TextInput.defaultProps = TextInput.defaultProps || {};
TextInput.defaultProps.allowFontScaling = false;
TextInput.defaultProps.padding = 0;
TextInput.defaultProps.fontFamily = font.reg;
TextInput.defaultProps.paddingVertical = Platform.OS === 'ios' ? 10 : 4;
TextInput.defaultProps.margin = 0;
TextInput.defaultProps.placeholderTextColor = color.lableColor;
// TextInput.defaultProps.blurOnSubmit = false;

TouchableOpacity.defaultProps = TouchableOpacity.defaultProps || {};
TouchableOpacity.defaultProps.activeOpacity = .9;

ScrollView.defaultProps = ScrollView.defaultProps || {};
ScrollView.defaultProps.showsVerticalScrollIndicator = false;
ScrollView.defaultProps.showsHorizontalScrollIndicator = false;
ScrollView.defaultProps.keyboardShouldPersistTaps = 'handled';

RefreshControl.defaultProps = RefreshControl.defaultProps || {};
RefreshControl.defaultProps.tintColor = color.primeColor;
RefreshControl.defaultProps.colors = [color.primeColor];

AppRegistry.registerComponent(appName, () => App);
