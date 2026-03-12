#!/usr/bin/env node

import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Checking deployment readiness...\n');

let hasErrors = false;
let hasWarnings = false;

console.log('Checking required files...');
const requiredFiles = [
  'package.json',
  'frontend/package.json',
  'backend/package.json',
  'frontend/src/App.tsx',
  'frontend/vite.config.ts',
  'backend/server/server.js',
  'backend/api/index.js',
];

for (const file of requiredFiles) {
  const filePath = join(__dirname, file);
  if (existsSync(filePath)) {
    console.log(`  OK ${file}`);
  } else {
    console.log(`  MISSING ${file}`);
    hasErrors = true;
  }
}

console.log('\nChecking environment variables...');
const envPath = join(__dirname, '.env');
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];

if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8');
  for (const varName of requiredEnvVars) {
    if (envContent.includes(`${varName}=`)) {
      console.log(`  OK ${varName}`);
    } else {
      console.log(`  WARN ${varName} is not set in .env`);
      hasWarnings = true;
    }
  }
} else {
  console.log('  WARN .env not found at repository root');
  hasWarnings = true;
}

console.log('\nChecking workspace scripts...');
const rootPackage = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf-8'));
const requiredRootScripts = ['build', 'vercel-build', 'start'];

for (const script of requiredRootScripts) {
  if (rootPackage.scripts?.[script]) {
    console.log(`  OK ${script}: ${rootPackage.scripts[script]}`);
  } else {
    console.log(`  MISSING script ${script}`);
    hasErrors = true;
  }
}

console.log('\nChecking critical workspace dependencies...');
const frontendPackage = JSON.parse(readFileSync(join(__dirname, 'frontend/package.json'), 'utf-8'));
const backendPackage = JSON.parse(readFileSync(join(__dirname, 'backend/package.json'), 'utf-8'));

const frontendCriticalDeps = ['react', 'react-dom', 'vite'];
const backendCriticalDeps = ['express', 'mongoose'];

for (const dep of frontendCriticalDeps) {
  if (frontendPackage.dependencies?.[dep] || frontendPackage.devDependencies?.[dep]) {
    console.log(`  OK frontend:${dep}`);
  } else {
    console.log(`  MISSING frontend:${dep}`);
    hasErrors = true;
  }
}

for (const dep of backendCriticalDeps) {
  if (backendPackage.dependencies?.[dep] || backendPackage.devDependencies?.[dep]) {
    console.log(`  OK backend:${dep}`);
  } else {
    console.log(`  MISSING backend:${dep}`);
    hasErrors = true;
  }
}

console.log('\nChecking Git repository...');
if (existsSync(join(__dirname, '.git'))) {
  console.log('  OK Git repository initialized');
} else {
  console.log('  WARN Git repository not initialized');
  hasWarnings = true;
}

console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('DEPLOYMENT BLOCKED - Fix errors above before deploying.');
  process.exit(1);
}

if (hasWarnings) {
  console.log('WARNINGS FOUND - Review warnings before deploying.');
} else {
  console.log('ALL CHECKS PASSED - Ready to deploy.');
}
console.log('='.repeat(50));
