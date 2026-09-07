#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const colors = {
  reset: '\x1b[0m',
  bold: '\x1b[1m',
  dim: '\x1b[2m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  white: '\x1b[37m',
};

const logo = `
${colors.red}${colors.bold}
                        ███╗   ███╗███╗   ███╗
                        ████╗ ████║████╗ ████║
                        ██╔████╔██║██╔████╔██║
                        ██║╚██╔╝██║██║╚██╔╝██║
                        ██║ ╚═╝ ██║██║ ╚═╝ ██║
                        ╚═╝     ╚═╝╚═╝     ╚═╝

  ████████╗███████╗███╗   ███╗██████╗ ██╗      █████╗ ████████╗███████╗
  ╚══██╔══╝██╔════╝████╗ ████║██╔══██╗██║     ██╔══██╗╚══██╔══╝██╔════╝
     ██║   █████╗  ██╔████╔██║██████╔╝██║     ███████║   ██║   █████╗  
     ██║   ██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██╔══██║   ██║   ██╔══╝  
     ██║   ███████╗██║ ╚═╝ ██║██║     ███████╗██║  ██║   ██║   ███████╗
     ╚═╝   ╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝╚═╝  ╚═╝   ╚═╝   ╚══════╝
${colors.reset}`;

// Helper: Remove folder or file recursively if exists
function removePath(targetPath) {
  if (fs.existsSync(targetPath)) {
    const stats = fs.statSync(targetPath);
    if (stats.isDirectory()) {
      fs.rmSync(targetPath, { recursive: true, force: true });
    } else {
      fs.unlinkSync(targetPath);
    }
  }
}

// Ask question via readline
function askQuestion(rl, query) {
  return new Promise(resolve => rl.question(query, resolve));
}

// Parse CLI flags
function parseArgs() {
  const args = process.argv.slice(2);
  const options = {};

  args.forEach(arg => {
    if (arg.startsWith('--auth=')) options.auth = arg.split('=')[1];
    if (arg.startsWith('--onboarding=')) options.onboarding = arg.split('=')[1];
    if (arg.startsWith('--nav=')) options.nav = arg.split('=')[1];
    if (arg.startsWith('--target=')) options.target = arg.split('=')[1];
    if (arg === '--defaults') options.defaults = true;
    if (arg === '--test') options.test = true;
  });

  return options;
}

// Determine target root
function getProjectRoot(options) {
  if (options.target && fs.existsSync(options.target)) {
    return options.target;
  }
  const cwdSrc = path.join(process.cwd(), 'src');
  if (fs.existsSync(cwdSrc)) {
    return process.cwd();
  }
  const mmTemplateSrc = path.join(process.cwd(), 'MMTemplate', 'src');
  if (fs.existsSync(mmTemplateSrc)) {
    return path.join(process.cwd(), 'MMTemplate');
  }
  return process.cwd();
}

async function promptUserConfig(options) {
  if (options.defaults || (!process.stdin.isTTY && !options.auth)) {
    return {
      isAuth: options.auth !== '2',
      isOnboarding: (options.onboarding || 'y').toLowerCase() !== 'n',
      navType: options.nav === '2' ? 'drawer' : options.nav === '3' ? 'stack' : 'tab',
    };
  }

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log(`${colors.cyan}${colors.bold}⚙️  Configuring your MM Template App...\n${colors.reset}`);

  // Question 1: Onboarding
  console.log(`${colors.yellow}${colors.bold}📱 Step 1: Onboarding Screens:${colors.reset}`);
  let onboardingInput = options.onboarding;
  if (!onboardingInput) {
    onboardingInput = await askQuestion(
      rl,
      `${colors.cyan}👉 Do you need Onboarding screens? (y/n, default y): ${colors.reset}`
    );
  }
  const isOnboarding = onboardingInput.trim().toLowerCase() !== 'n';

  // Question 2: Auth
  console.log(`\n${colors.yellow}${colors.bold}🔐 Step 2: Authentication Setup:${colors.reset}`);
  console.log(`  ${colors.white}[1] With Auth${colors.reset} (Login, AuthCheck & Protected routes) ${colors.dim}[Default]${colors.reset}`);
  console.log(`  ${colors.white}[2] Without Auth${colors.reset} (Direct App flow)`);
  let authInput = options.auth;
  if (!authInput) {
    authInput = await askQuestion(rl, `${colors.cyan}👉 Select Auth option (1 or 2, default 1): ${colors.reset}`);
  }
  const isAuth = authInput.trim() !== '2';

  // Question 3: Navigation Type
  console.log(`\n${colors.yellow}${colors.bold}🧭 Step 3: Navigation Type:${colors.reset}`);
  console.log(`  ${colors.white}[1] Stack Navigation + Bottom Tab Bar${colors.reset} ${colors.dim}[Default]${colors.reset}`);
  console.log(`  ${colors.white}[2] Stack Navigation + Drawer Bar${colors.reset}`);
  console.log(`  ${colors.white}[3] Only Stack Navigation${colors.reset}`);
  let navInput = options.nav;
  if (!navInput) {
    navInput = await askQuestion(rl, `${colors.cyan}👉 Select Navigation type (1, 2, or 3, default 1): ${colors.reset}`);
  }
  const navType =
    navInput.trim() === '2' ? 'drawer' : navInput.trim() === '3' ? 'stack' : 'tab';

  rl.close();

  return { isAuth, isOnboarding, navType };
}

// 1. Update package.json dependencies
function updatePackageJson(projectRoot, { navType }) {
  const pkgPath = path.join(projectRoot, 'package.json');
  if (!fs.existsSync(pkgPath)) return;

  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  pkg.dependencies = pkg.dependencies || {};

  if (navType === 'drawer') {
    pkg.dependencies['@react-navigation/drawer'] = '^7.1.1';
    pkg.dependencies['react-native-gesture-handler'] = '^3.2.1';
    delete pkg.dependencies['@react-navigation/bottom-tabs'];
  } else if (navType === 'tab') {
    pkg.dependencies['@react-navigation/bottom-tabs'] = '^7.9.0';
    delete pkg.dependencies['@react-navigation/drawer'];
    delete pkg.dependencies['react-native-gesture-handler'];
  } else if (navType === 'stack') {
    delete pkg.dependencies['@react-navigation/bottom-tabs'];
    delete pkg.dependencies['@react-navigation/drawer'];
    delete pkg.dependencies['react-native-gesture-handler'];
  }

  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n', 'utf8');
}

// 2. Update index.js (gesture-handler import for drawer)
function updateIndexJs(projectRoot, { navType }) {
  const indexJsPath = path.join(projectRoot, 'index.js');
  if (!fs.existsSync(indexJsPath)) return;

  let content = fs.readFileSync(indexJsPath, 'utf8');
  const gestureImport = "import 'react-native-gesture-handler';\n";

  if (navType === 'drawer') {
    if (!content.includes('react-native-gesture-handler')) {
      content = gestureImport + content;
      fs.writeFileSync(indexJsPath, content, 'utf8');
    }
  } else {
    if (content.includes("import 'react-native-gesture-handler';")) {
      content = content.replace("import 'react-native-gesture-handler';\n", '');
      content = content.replace("import 'react-native-gesture-handler';", '');
      fs.writeFileSync(indexJsPath, content, 'utf8');
    }
  }
}

// 3. Generate routes.ts
function generateRoutesTs(projectRoot, { isAuth, isOnboarding, navType }) {
  const routesPath = path.join(projectRoot, 'src', 'navigation', 'routes.ts');

  const lines = ['enum Routes {'];

  if (isAuth) {
    lines.push("  AuthCheck = 'AuthCheck',");
    lines.push("  AuthStack = 'AuthStack',");
  }

  if (isOnboarding) {
    lines.push("  OnboardingStack = 'OnboardingStack',");
    lines.push("  OnboardingScreen1 = 'OnboardingScreen1',");
    lines.push("  OnboardingScreen2 = 'OnboardingScreen2',");
    lines.push("  OnboardingScreen3 = 'OnboardingScreen3',");
  }

  lines.push("  AppStack = 'AppStack',");

  if (navType === 'tab') {
    lines.push("  MainTab = 'MainTab',");
  } else if (navType === 'drawer') {
    lines.push("  MainDrawer = 'MainDrawer',");
  }

  if (isAuth) {
    lines.push("  LoginScreen = 'LoginScreen',");
  }

  lines.push("  HomeScreen = 'HomeScreen',");
  lines.push("  NoteScreen = 'NoteScreen',");
  lines.push("  ProfileScreen = 'ProfileScreen',");
  lines.push("  SettingsScreen = 'SettingsScreen',");
  lines.push("  AddNoteScreen = 'AddNoteScreen',");
  lines.push('}');
  lines.push('');
  lines.push('export default Routes;');
  lines.push('');

  fs.writeFileSync(routesPath, lines.join('\n'), 'utf8');
}

// 4. Generate AppStack.tsx
function generateAppStack(projectRoot, { navType }) {
  const appStackPath = path.join(projectRoot, 'src', 'navigation', 'stack', 'AppStack.tsx');

  let navImport = '';
  let initialRoute = 'Routes.HomeScreen';
  let mainScreenElement = '';

  if (navType === 'tab') {
    navImport = "import { BottomTabNavigator } from '@navigation/tab';\n";
    initialRoute = 'Routes.MainTab';
    mainScreenElement = '<Stack.Screen name={Routes.MainTab} component={BottomTabNavigator} />';
  } else if (navType === 'drawer') {
    navImport = "import { DrawerNavigator } from '@navigation/drawer';\n";
    initialRoute = 'Routes.MainDrawer';
    mainScreenElement = '<Stack.Screen name={Routes.MainDrawer} component={DrawerNavigator} />';
  } else {
    navImport = `import { HomeScreen } from '@screens/home';
import { NoteScreen } from '@screens/note';
import { ProfileScreen } from '@screens/profile';\n`;
    initialRoute = 'Routes.HomeScreen';
    mainScreenElement = `<Stack.Screen name={Routes.HomeScreen} component={HomeScreen} />
      <Stack.Screen name={Routes.NoteScreen} component={NoteScreen} />
      <Stack.Screen name={Routes.ProfileScreen} component={ProfileScreen} />`;
  }

  const content = `import React, { FC } from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { AppStackParamList } from '@app-types/navigation.types';
import Routes from '@navigation/routes';
${navImport}import { AddNoteScreen } from '@screens/note';
import { SettingsScreen } from '@screens/settings';

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={${initialRoute}}
      screenOptions={{
        headerShown: false,
      }}
    >
      ${mainScreenElement}
      <Stack.Screen name={Routes.SettingsScreen} component={SettingsScreen} />
      <Stack.Screen name={Routes.AddNoteScreen} component={AddNoteScreen} />
    </Stack.Navigator>
  );
};

export default AppStack;
`;

  fs.writeFileSync(appStackPath, content, 'utf8');
}

// 5. Generate AppNavigator.tsx
function generateAppNavigator(projectRoot, { isAuth, isOnboarding }) {
  const appNavPath = path.join(projectRoot, 'src', 'navigation', 'AppNavigator.tsx');

  let imports = '';
  let initialRoute = 'Routes.AppStack';
  let screens = '';

  if (isAuth) {
    imports += "import AuthCheck from '@navigation/auth/AuthCheck';\n";
    imports += "import AuthStack from '@navigation/auth/AuthStack';\n";
    initialRoute = 'Routes.AuthCheck';
  } else if (isOnboarding) {
    initialRoute = 'Routes.OnboardingStack';
  }

  if (isOnboarding) {
    imports += "import OnboardingStack from '@navigation/onboarding/OnboardingStack';\n";
  }

  if (isAuth) {
    screens += `        <Stack.Screen
          options={{ animation: 'fade' }}
          name={Routes.AuthCheck}
          component={AuthCheck}
        />\n`;
  }

  if (isOnboarding) {
    screens += `        <Stack.Screen
          options={{ animation: 'fade' }}
          name={Routes.OnboardingStack}
          component={OnboardingStack}
        />\n`;
  }

  if (isAuth) {
    screens += `        <Stack.Screen
          options={{ animation: 'fade' }}
          name={Routes.AuthStack}
          component={AuthStack}
        />\n`;
  }

  screens += `        <Stack.Screen
          options={{ animation: 'fade' }}
          name={Routes.AppStack}
          component={AppStack}
        />`;

  const content = `import React, { FC } from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { RootStackParamList } from '@app-types/navigation.types';
${imports}import Routes from '@navigation/routes';
import AppStack from '@navigation/stack/AppStack';
import { navigationRef } from '@utils/navigationUtils';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: FC = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator
        initialRouteName={${initialRoute}}
        screenOptions={{
          headerShown: false,
        }}
      >
${screens}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
`;

  fs.writeFileSync(appNavPath, content, 'utf8');
}

// 6. Generate navigation.types.ts
function generateNavigationTypes(projectRoot, { isAuth, isOnboarding, navType }) {
  const typesPath = path.join(projectRoot, 'src', 'types', 'navigation.types.ts');

  let rootParams = '';
  if (isAuth) {
    rootParams += '  [Routes.AuthCheck]: undefined;\n';
    rootParams += '  [Routes.AuthStack]: undefined;\n';
  }
  if (isOnboarding) {
    rootParams += '  [Routes.OnboardingStack]: undefined;\n';
  }
  rootParams += '  [Routes.AppStack]: undefined;\n';

  let sections = [];

  if (isOnboarding) {
    sections.push(`export type OnboardingStackParamList = {
  [Routes.OnboardingScreen1]: undefined;
  [Routes.OnboardingScreen2]: undefined;
  [Routes.OnboardingScreen3]: undefined;
};`);
  }

  if (isAuth) {
    sections.push(`export type AuthStackParamList = {
  [Routes.LoginScreen]: undefined;
};`);
  }

  if (navType === 'tab') {
    sections.push(`export type MainTabParamList = {
  [Routes.HomeScreen]: undefined;
  [Routes.NoteScreen]: undefined;
  [Routes.ProfileScreen]: undefined;
};`);
  } else if (navType === 'drawer') {
    sections.push(`export type MainDrawerParamList = {
  [Routes.HomeScreen]: undefined;
  [Routes.NoteScreen]: undefined;
  [Routes.ProfileScreen]: undefined;
};`);
  }

  let appStackItems = '';
  if (navType === 'tab') {
    appStackItems += '  [Routes.MainTab]?: undefined;\n';
  } else if (navType === 'drawer') {
    appStackItems += '  [Routes.MainDrawer]?: undefined;\n';
  } else {
    appStackItems += '  [Routes.HomeScreen]?: undefined;\n';
    appStackItems += '  [Routes.NoteScreen]?: undefined;\n';
    appStackItems += '  [Routes.ProfileScreen]?: undefined;\n';
  }
  appStackItems += '  [Routes.SettingsScreen]: undefined;\n';
  appStackItems += '  [Routes.AddNoteScreen]: undefined;\n';

  sections.push(`export type AppStackParamList = {
${appStackItems}};`);

  let paramsParts = ['RootStackParamList'];
  if (isOnboarding) paramsParts.push('OnboardingStackParamList');
  if (isAuth) paramsParts.push('AuthStackParamList');
  paramsParts.push('AppStackParamList');
  if (navType === 'tab') paramsParts.push('MainTabParamList');
  if (navType === 'drawer') paramsParts.push('MainDrawerParamList');

  const content = `import { NativeStackScreenProps } from '@react-navigation/native-stack';

import Routes from '@navigation/routes';

export type RootStackParamList = {
${rootParams}};

${sections.join('\n\n')}

export type ParamsType = ${paramsParts.join(' &\n  ')};

export type NavigationProps<RouteName extends keyof ParamsType> =
  NativeStackScreenProps<ParamsType, RouteName>;
`;

  fs.writeFileSync(typesPath, content, 'utf8');
}

// 7. Update Onboarding screens destination based on auth
function updateOnboardingDestinations(projectRoot, { isAuth }) {
  const screen1Path = path.join(projectRoot, 'src', 'screens', 'onboarding', 'OnboardingScreen1.tsx');
  const screen2Path = path.join(projectRoot, 'src', 'screens', 'onboarding', 'OnboardingScreen2.tsx');
  const screen3Path = path.join(projectRoot, 'src', 'screens', 'onboarding', 'OnboardingScreen3.tsx');

  [screen1Path, screen2Path, screen3Path].forEach(filePath => {
    if (fs.existsSync(filePath)) {
      let content = fs.readFileSync(filePath, 'utf8');
      if (!isAuth) {
        content = content.replace(/resetAndNavigate\(Routes\.AuthStack\)/g, 'resetAndNavigate(Routes.AppStack)');
      } else {
        content = content.replace(/resetAndNavigate\(Routes\.AppStack\)/g, 'resetAndNavigate(Routes.AuthStack)');
      }
      fs.writeFileSync(filePath, content, 'utf8');
    }
  });
}

// 8. Update AuthCheck destination based on onboarding
function updateAuthCheckDestination(projectRoot, { isOnboarding }) {
  const authCheckPath = path.join(projectRoot, 'src', 'navigation', 'auth', 'AuthCheck.tsx');
  if (!fs.existsSync(authCheckPath)) return;

  let content = fs.readFileSync(authCheckPath, 'utf8');
  if (!isOnboarding) {
    content = content.replace(
      'resetAndNavigate(Routes.OnboardingStack);',
      'resetAndNavigate(Routes.AuthStack);'
    );
  } else {
    content = content.replace(
      'resetAndNavigate(Routes.AuthStack);',
      'resetAndNavigate(Routes.OnboardingStack);'
    );
  }
  fs.writeFileSync(authCheckPath, content, 'utf8');
}

// 8b. Update services and context references for non-auth mode
function updateAuthReferences(projectRoot, { isAuth }) {
  if (isAuth) return;

  const axiosPath = path.join(projectRoot, 'src', 'services', 'axiosInstance.ts');
  if (fs.existsSync(axiosPath)) {
    let content = fs.readFileSync(axiosPath, 'utf8');
    content = content.replace(
      /if\s*\(error\.response\.status === 403\)\s*\{\s*\n\s*\/\/ Unauthorized\s*\n\s*resetAndNavigate\(Routes\.AuthStack\);\s*\n\s*\}/,
      '// Without Auth: no redirect needed\n      // Pass through error'
    );
    content = content.replace(/import\s+Routes\s+from\s+['"]@navigation\/routes['"];\s*\n/, '');
    content = content.replace(/,\s*resetAndNavigate/, '');
    fs.writeFileSync(axiosPath, content, 'utf8');
  }

  const authContextPath = path.join(projectRoot, 'src', 'context', 'AuthContext.tsx');
  if (fs.existsSync(authContextPath)) {
    let content = fs.readFileSync(authContextPath, 'utf8');
    content = content.replace(
      'resetAndNavigate(Routes.AuthStack);',
      'resetAndNavigate(Routes.AppStack);'
    );
    fs.writeFileSync(authContextPath, content, 'utf8');
  }
}

// 9. Clean up screens/index.ts barrel exports
function updateScreensIndex(projectRoot, { isAuth, isOnboarding }) {
  const indexPath = path.join(projectRoot, 'src', 'screens', 'index.ts');
  if (!fs.existsSync(indexPath)) return;

  const lines = [];
  if (isOnboarding) {
    lines.push("// Onboarding screens\nexport {\n  OnboardingScreen1,\n  OnboardingScreen2,\n  OnboardingScreen3,\n} from './onboarding';\n");
  }
  if (isAuth) {
    lines.push("// Auth screens\nexport { LoginScreen } from './auth';\n");
  }
  lines.push("// Home screens\nexport { HomeScreen } from './home';\n");
  lines.push("// Note screens\nexport { NoteScreen, AddNoteScreen } from './note';\n");
  lines.push("// Profile screens\nexport { ProfileScreen } from './profile';\n");
  lines.push("// Settings screens\nexport { SettingsScreen } from './settings';\n");

  fs.writeFileSync(indexPath, lines.join('\n'), 'utf8');
}

// 10. Generate clean navigation/index.ts barrel exports
function generateNavigationIndex(projectRoot, { isAuth, isOnboarding, navType }) {
  const indexPath = path.join(projectRoot, 'src', 'navigation', 'index.ts');

  const lines = [
    "export { default as AppNavigator } from './AppNavigator';",
    "export { default as Routes } from './routes';",
  ];

  if (isAuth) {
    lines.push("export { AuthStack, AuthCheck } from './auth';");
  }

  if (isOnboarding) {
    lines.push("export { OnboardingStack } from './onboarding';");
  }

  if (navType === 'tab') {
    lines.push("export { BottomTabNavigator } from './tab';");
  } else if (navType === 'drawer') {
    lines.push("export { DrawerNavigator } from './drawer';");
  }

  lines.push("export { AppStack } from './stack';");
  lines.push('');

  fs.writeFileSync(indexPath, lines.join('\n'), 'utf8');
}

// 11. Update screen headers based on navigation type
function updateScreenHeaders(projectRoot, { navType }) {
  const notePath = path.join(projectRoot, 'src', 'screens', 'note', 'NoteScreen.tsx');
  const profilePath = path.join(projectRoot, 'src', 'screens', 'profile', 'ProfileScreen.tsx');
  const homePath = path.join(projectRoot, 'src', 'screens', 'home', 'HomeScreen.tsx');

  [notePath, profilePath, homePath].forEach(filePath => {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');

    // First strip existing showDrawer or showBack
    content = content.replace(/\bshowDrawer\b\s*/g, '');
    content = content.replace(/\bshowBack\b\s*/g, '');

    if (navType === 'drawer') {
      // All root screens in drawer mode show drawer button
      content = content.replace(/(<Header\b)/, '$1\n        showDrawer');
    } else if (navType === 'tab') {
      // In tab mode, tabs navigate between root screens - no left button
    } else if (navType === 'stack') {
      // In stack mode, Note and Profile have back button, Home has no left button
      if (!filePath.includes('HomeScreen')) {
        content = content.replace(/(<Header\b)/, '$1\n        showBack');
      }
    }
    fs.writeFileSync(filePath, content, 'utf8');
  });
}

// 12. Update Profile screen for auth/non-auth modes
function updateProfileScreen(projectRoot, { isAuth }) {
  const profilePath = path.join(projectRoot, 'src', 'screens', 'profile', 'ProfileScreen.tsx');
  if (!fs.existsSync(profilePath)) return;
  let content = fs.readFileSync(profilePath, 'utf8');
  if (!isAuth) {
    // Remove useAuth import and call
    content = content.replace(/import\s*\{\s*useAuth\s*\}\s*from\s*['"]@context\/AuthContext['"];\s*\n/, '');
    content = content.replace(
      /\s*const\s*\{\s*user,\s*handleLogout\s*\}\s*=\s*useAuth\(\);/,
      "  const user = { name: 'Guest User', email: 'guest@example.com' };"
    );
    // Remove logout confirmation & button
    content = content.replace(/\n\s*const confirmLogout = \(\) => \{[\s\S]*?\};\n/, '\n');
    content = content.replace(
      /\s*<AnimationView delay=\{600\} animType="FadeIn" duration=\{800\}>\s*<TouchableOpacity\s*style=\{styles\.logoutButton\}[\s\S]*?<\/TouchableOpacity>\s*<\/AnimationView>/,
      ''
    );
    fs.writeFileSync(profilePath, content, 'utf8');
  }
}

// 11. Automatically initialize Git repository and create initial commit
function initGitCommit(projectRoot) {
  try {
    const { execSync } = require('child_process');
    const resolvedRoot = path.resolve(projectRoot);
    const templateRoot = path.resolve(__dirname);
    const mmTemplateDir = path.resolve(__dirname, 'MMTemplate');

    // Safety guard: Never run on template repository itself
    if (resolvedRoot === templateRoot || resolvedRoot === mmTemplateDir) {
      return;
    }

    // Check if git CLI is available
    try {
      execSync('git --version', { stdio: 'ignore' });
    } catch {
      return;
    }

    console.log(`${colors.dim}  • Initializing Git and preparing initial commit...${colors.reset}`);

    // Initialize git repository if not already initialized
    if (!fs.existsSync(path.join(projectRoot, '.git'))) {
      execSync('git init', { cwd: projectRoot, stdio: 'ignore' });
    }

    // Stage all changes (new files, updates, removals)
    execSync('git add -A', { cwd: projectRoot, stdio: 'ignore' });

    // Check if there are any existing commits
    let hasCommits = false;
    try {
      execSync('git rev-parse HEAD', { cwd: projectRoot, stdio: 'ignore' });
      hasCommits = true;
    } catch {
      hasCommits = false;
    }

    if (!hasCommits) {
      execSync('git commit -m "Initial commit from MM Template" --no-verify', {
        cwd: projectRoot,
        stdio: 'ignore',
      });
      console.log(`${colors.green}  ✔${colors.reset} Initial Git commit created.`);
    } else {
      const status = execSync('git status --porcelain', {
        cwd: projectRoot,
        encoding: 'utf8',
      }).trim();
      if (status) {
        execSync('git commit -m "Setup MM Template configuration" --no-verify', {
          cwd: projectRoot,
          stdio: 'ignore',
        });
        console.log(`${colors.green}  ✔${colors.reset} Git commit updated with template setup.`);
      }
    }
  } catch (err) {
    // Fail-safe: git errors should never break template initialization
  }
}

// Main execution function
async function main() {
  console.log(logo);
  console.log(`${colors.cyan}${colors.bold}🚀 Thank you for choosing MM Template!${colors.reset}`);
  console.log(
    `${colors.white}A production-ready React Native boilerplate designed for speed and productivity.${colors.reset}\n`
  );

  const options = parseArgs();
  const projectRoot = getProjectRoot(options);
  const userConfig = await promptUserConfig(options);

  console.log(`\n${colors.yellow}${colors.bold}🔄 Applying your custom configuration...${colors.reset}`);

  // 1. Auth cleanup if Without Auth
  if (!userConfig.isAuth) {
    console.log(`${colors.dim}  • Removing Auth screens and stack...${colors.reset}`);
    removePath(path.join(projectRoot, 'src', 'navigation', 'auth'));
    removePath(path.join(projectRoot, 'src', 'screens', 'auth'));
    updateAuthReferences(projectRoot, userConfig);
  }

  // 2. Onboarding cleanup if Without Onboarding
  if (!userConfig.isOnboarding) {
    console.log(`${colors.dim}  • Removing Onboarding screens and stack...${colors.reset}`);
    removePath(path.join(projectRoot, 'src', 'navigation', 'onboarding'));
    removePath(path.join(projectRoot, 'src', 'screens', 'onboarding'));
  } else {
    updateOnboardingDestinations(projectRoot, userConfig);
  }

  // 3. Navigation cleanup
  if (userConfig.navType === 'tab') {
    console.log(`${colors.dim}  • Configuring Stack + Bottom Tab navigation...${colors.reset}`);
    removePath(path.join(projectRoot, 'src', 'navigation', 'drawer'));
  } else if (userConfig.navType === 'drawer') {
    console.log(`${colors.dim}  • Configuring Stack + Drawer navigation...${colors.reset}`);
    removePath(path.join(projectRoot, 'src', 'navigation', 'tab'));
  } else {
    console.log(`${colors.dim}  • Configuring Pure Stack navigation...${colors.reset}`);
    removePath(path.join(projectRoot, 'src', 'navigation', 'tab'));
    removePath(path.join(projectRoot, 'src', 'navigation', 'drawer'));
  }

  // 4. Update package.json and index.js
  updatePackageJson(projectRoot, userConfig);
  updateIndexJs(projectRoot, userConfig);

  // 5. Generate tailored navigators, routes, and types
  generateRoutesTs(projectRoot, userConfig);
  generateAppStack(projectRoot, userConfig);
  generateAppNavigator(projectRoot, userConfig);
  generateNavigationIndex(projectRoot, userConfig);
  generateNavigationTypes(projectRoot, userConfig);
  updateScreensIndex(projectRoot, userConfig);
  updateScreenHeaders(projectRoot, userConfig);
  updateProfileScreen(projectRoot, userConfig);

  if (userConfig.isAuth) {
    updateAuthCheckDestination(projectRoot, userConfig);
  }

  // 6. Automatically initialize Git repo and create Initial Commit
  initGitCommit(projectRoot);

  console.log(`${colors.green}${colors.bold}✔ Configuration applied successfully!${colors.reset}\n`);

  // Summary Table
  console.log(`${colors.yellow}${colors.bold}📦 Your Configured Features:${colors.reset}`);
  console.log(
    `${colors.green}  ✓${colors.reset} Onboarding: ${
      userConfig.isOnboarding
        ? `${colors.white}3-Step Animated Onboarding Flow${colors.reset}`
        : `${colors.dim}Disabled${colors.reset}`
    }`
  );
  console.log(
    `${colors.green}  ✓${colors.reset} Authentication: ${
      userConfig.isAuth
        ? `${colors.white}With Auth (Login, Session Check, Protected Routes)${colors.reset}`
        : `${colors.dim}Disabled (Direct main flow)${colors.reset}`
    }`
  );
  console.log(
    `${colors.green}  ✓${colors.reset} Navigation: ${
      userConfig.navType === 'tab'
        ? `${colors.white}Stack Navigation + Bottom Tabs${colors.reset}`
        : userConfig.navType === 'drawer'
          ? `${colors.white}Stack Navigation + Drawer Bar${colors.reset}`
          : `${colors.white}Pure Stack Navigation${colors.reset}`
    }`
  );
  console.log(`${colors.green}  ✓${colors.reset} Architecture: ${colors.white}Modular folder structure (tab, drawer, stack, screens)${colors.reset}`);
  console.log(`${colors.green}  ✓${colors.reset} UI & Header: ${colors.white}Universal Header with back & drawer support${colors.reset}`);
  console.log(`${colors.green}  ✓${colors.reset} Git: ${colors.white}Initialized with clean Initial Commit${colors.reset}`);
  console.log(`${colors.green}  ✓${colors.reset} Core: ${colors.white}React Native 0.87, React 19, TypeScript, MMKV, Reanimated v4${colors.reset}\n`);

  // Next steps
  console.log(`${colors.magenta}${colors.bold}👉 Next Steps:${colors.reset}`);
  console.log(`${colors.white}  1. cd <project-name>${colors.reset}`);
  console.log(`  2. yarn install`);
  console.log(`  3. cd ios && pod install (for iOS developers)`);
  console.log(
    `  4. yarn ios ${colors.reset}or${colors.white} yarn android${colors.reset}\n`
  );

  console.log(`${colors.blue}${colors.bold}🔗 Useful Links:${colors.reset}`);
  console.log(
    `${colors.cyan}  GitHub: https://github.com/modhamanish/mm-template${colors.reset}`
  );
  console.log(`${colors.cyan}  Author: Manish Modha${colors.reset}\n`);

  console.log(`${colors.red}${colors.bold}Happy Coding! 🚀✨${colors.reset}\n`);
}

main().catch(err => {
  console.error(`\x1b[31mConfiguration failed: ${err.message}\x1b[0m`);
  process.exit(1);
});
