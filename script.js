#!/usr/bin/env node

const colors = {
  reset: "\x1b[0m",
  bold: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
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

console.log(logo);
console.log(
  `${colors.cyan}${colors.bold}🚀 Thank you for choosing MM Template!${colors.reset}`
);
console.log(
  `${colors.white}A production-ready React Native boilerplate designed for speed and productivity.${colors.reset}\n`
);

console.log(`${colors.yellow}${colors.bold}📦 Loaded Features:${colors.reset}`);
console.log(`${colors.green}  ✓${colors.reset} React Native + TypeScript`);
console.log(
  `${colors.green}  ✓${colors.reset} Internationalization (react-i18next)`
);
console.log(
  `${colors.green}  ✓${colors.reset} High Performance Storage (MMKV)`
);
console.log(
  `${colors.green}  ✓${colors.reset} Pre-configured Auth Flow & Routing`
);
console.log(
  `${colors.green}  ✓${colors.reset} Modern UI with Animations (Reanimated)\n`
);

console.log(`${colors.magenta}${colors.bold}👉 Next Steps:${colors.reset}`);
console.log(`${colors.white}  1. cd <project-name>`);
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
