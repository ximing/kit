#!/usr/bin/env node

/**
 * TypeDI Release Script
 * Usage: node scripts/release.js [patch|minor|major]
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Colors for console output
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
};

// Helper functions for colored output
const print = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
};

// Execute command and return output
function exec(command, options = {}) {
  try {
    const result = execSync(command, {
      encoding: 'utf8',
      stdio: options.silent ? 'pipe' : 'inherit',
      ...options,
    });
    return result ? result.trim() : '';
  } catch (error) {
    if (!options.ignoreError) {
      throw error;
    }
    return '';
  }
}

// Ask for user confirmation
function askQuestion(question) {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes');
    });
  });
}

// Get current git branch
function getCurrentBranch() {
  return exec('git branch --show-current', { silent: true });
}

// Check for uncommitted changes
function hasUncommittedChanges() {
  const status = exec('git status --porcelain', { silent: true });
  return status.length > 0;
}

// Calculate new version
function getNewVersion(currentVersion, versionType) {
  const parts = currentVersion.split('.').map(Number);
  let [major, minor, patch] = parts;

  switch (versionType) {
    case 'major':
      major += 1;
      minor = 0;
      patch = 0;
      break;
    case 'minor':
      minor += 1;
      patch = 0;
      break;
    case 'patch':
      patch += 1;
      break;
    default:
      throw new Error(`Invalid version type: ${versionType}`);
  }

  return `${major}.${minor}.${patch}`;
}

// Update package.json version
function updatePackageVersion(newVersion) {
  const packagePath = path.join(process.cwd(), 'package.json');
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  packageJson.version = newVersion;
  fs.writeFileSync(packagePath, JSON.stringify(packageJson, null, 2) + '\n');
}

// Main release function
async function release() {
  try {
    // Get version type from command line argument
    const versionType = process.argv[2] || 'patch';

    if (!['patch', 'minor', 'major'].includes(versionType)) {
      print.error(`Invalid version type: ${versionType}`);
      console.log('Usage: node scripts/release.js [patch|minor|major]');
      process.exit(1);
    }

    console.log('');
    print.info('🚀 TypeDI Release Script');
    console.log('');

    // Check current branch
    const currentBranch = getCurrentBranch();
    if (!['develop', 'release', 'main', 'master'].includes(currentBranch)) {
      print.warning(`You are on branch '${currentBranch}', not 'develop' or 'release' or 'main' or 'master'`);
      const shouldContinue = await askQuestion('Continue anyway? (y/N) ');
      if (!shouldContinue) {
        print.error('Release cancelled');
        process.exit(1);
      }
    }

    // Check for uncommitted changes
    if (hasUncommittedChanges()) {
      print.error('You have uncommitted changes. Please commit or stash them first.');
      exec('git status --short');
      process.exit(1);
    }

    // Get current version
    const packagePath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
    const currentVersion = packageJson.version;

    print.info(`Current version: ${currentVersion}`);

    // Calculate new version
    const newVersion = getNewVersion(currentVersion, versionType);
    const tagName = `v${newVersion}`;

    print.info(`New version: ${newVersion}`);
    print.info(`Tag name: ${tagName}`);
    console.log('');

    // Confirm release
    const shouldRelease = await askQuestion('Continue with release? (y/N) ');
    if (!shouldRelease) {
      print.error('Release cancelled');
      process.exit(1);
    }

    console.log('');
    print.info('Starting release process...');
    console.log('');

    // Update package.json
    print.info('Updating package.json...');
    updatePackageVersion(newVersion);
    print.success(`Updated package.json to version ${newVersion}`);

    // Git commit
    print.info('Creating git commit...');
    exec('git add package.json');
    exec(`git commit -m "chore: release v${newVersion}"`);
    print.success(`Created commit for version ${newVersion}`);

    // Create git tag
    print.info('Creating git tag...');
    exec(`git tag -a "${tagName}" -m "Release ${tagName}"`);
    print.success(`Created tag ${tagName}`);

    // Push to remote
    print.info('Pushing changes to remote...');
    exec(`git push origin ${currentBranch}`);
    print.success(`Pushed changes to ${currentBranch}`);

    print.info('Pushing tag to remote...');
    exec(`git push origin ${tagName}`);
    print.success(`Pushed tag ${tagName}`);

    // Success message
    console.log('');
    print.success(`Release ${newVersion} completed successfully! 🎉`);
    console.log('');
    print.info('Next steps:');
    console.log('  1. GitHub Actions will automatically create a release');
    console.log('  2. The CD workflow will build and publish to NPM');
    console.log('  3. Monitor the workflow at: https://github.com/ximing/typedi/actions');
    console.log('');
    print.info(`Release URL: https://github.com/ximing/typedi/releases/tag/${tagName}`);
    console.log('');
  } catch (error) {
    console.log('');
    print.error(`Release failed: ${error.message}`);
    process.exit(1);
  }
}

// Run the release
release();
