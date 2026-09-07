#!/usr/bin/env node

const { execSync } = require('child_process');
const readline = require('readline');
const fs = require('fs');
const path = require('path');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const run = (command, cwd = process.cwd()) => {
  try {
    console.log(`\x1b[36mRunning: ${command}\x1b[0m`);
    execSync(command, { stdio: 'inherit', cwd });
  } catch (error) {
    console.error(`\x1b[31mError running command: ${command}\x1b[0m`);
    process.exit(1);
  }
};

// Check if current branch is 'main'
let currentBranch = 'unknown';
try {
  currentBranch = execSync('git rev-parse --abbrev-ref HEAD', {
    encoding: 'utf8',
  }).trim();
} catch (err) {
  console.error('\x1b[31mError: Not a valid git repository.\x1b[0m');
  rl.close();
  process.exit(1);
}

if (currentBranch !== 'main') {
  console.error(
    `\n\x1b[31m\x1b[1m❌ Error: Releases are only allowed from the 'main' branch!\x1b[0m`
  );
  console.error(
    `\x1b[33mCurrently on branch: \x1b[1m${currentBranch}\x1b[0m\x1b[33m.\x1b[0m`
  );
  console.error(
    `\x1b[36mPlease merge your changes and checkout 'main' before running yarn release:\x1b[0m`
  );
  console.error(`  \x1b[32mgit checkout main\x1b[0m`);
  console.error(`  \x1b[32mgit merge ${currentBranch}\x1b[0m`);
  console.error(`  \x1b[32myarn release\x1b[0m\n`);
  rl.close();
  process.exit(1);
}

const pkgPath = path.join(__dirname, 'package.json');
const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));

console.log(`\x1b[35m\x1b[1mCurrent version: ${pkg.version}\x1b[0m`);

rl.question('Select release type (patch, minor, major) [patch]: ', type => {
  const releaseType = type.trim() || 'patch';

  if (!['patch', 'minor', 'major'].includes(releaseType)) {
    console.error('\x1b[31mInvalid release type!\x1b[0m');
    process.exit(1);
  }

  // 1. Linting inside MMTemplate
  console.log('\n\x1b[33m\x1b[1mStep 1: Linting check...\x1b[0m');
  const mmTemplatePath = path.join(__dirname, 'MMTemplate');

  if (!fs.existsSync(path.join(mmTemplatePath, 'node_modules'))) {
    console.log(
      '\x1b[33mNode modules missing in MMTemplate. Installing...\x1b[0m'
    );
    run('yarn install', mmTemplatePath);
  }

  run('yarn lint', mmTemplatePath);

  // 2. Version Bump
  console.log('\n\x1b[33m\x1b[1mStep 2: Bumping version...\x1b[0m');
  run(`npm version ${releaseType} --no-git-tag-version`);

  const newPkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const newVersion = newPkg.version;

  // 3. Git Operations
  console.log('\n\x1b[33m\x1b[1mStep 3: Git commit and tag...\x1b[0m');
  run('git add .');
  run(`git commit -m "chore: release v${newVersion}"`);
  run(`git tag v${newVersion}`);

  // 4. Final confirmation
  rl.question(
    `\n\x1b[35m\x1b[1mPush to git and publish v${newVersion} to npm? (y/n) [n]: \x1b[0m`,
    answer => {
      if (answer.toLowerCase() === 'y') {
        console.log('\n\x1b[33m\x1b[1mStep 4: Pushing to Git...\x1b[0m');
        run('git push origin main --tags');

        console.log('\n\x1b[33m\x1b[1mStep 5: Publishing to npm...\x1b[0m');
        run(
          'npm publish --access public --registry https://registry.npmjs.org/'
        );

        console.log(
          `\n\x1b[32m\x1b[1mSuccessfully released v${newVersion}! 🚀✨\x1b[0m`
        );
      } else {
        console.log(
          `\n\x1b[33mVersion bumped to v${newVersion} and tagged locally, but not pushed/published.\x1b[0m`
        );
      }
      rl.close();
    }
  );
});
