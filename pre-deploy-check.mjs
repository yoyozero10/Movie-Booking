#!/usr/bin/env node

/**
 * Pre-deployment checklist script
 * Kiểm tra các điều kiện cần thiết trước khi deploy lên Vercel
 */

import { existsSync, readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('🔍 Checking deployment readiness...\n');

let hasErrors = false;
let hasWarnings = false;

// Check 1: Required files exist
console.log('📁 Checking required files...');
const requiredFiles = [
  'package.json',
  'vercel.json',
  '.vercelignore',
  'api/index.js',
  'src/App.tsx',
  'vite.config.ts',
];

requiredFiles.forEach(file => {
  const filePath = join(__dirname, file);
  if (existsSync(filePath)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING!`);
    hasErrors = true;
  }
});

// Check 2: Environment variables
console.log('\n🔐 Checking environment variables...');
const envPath = join(__dirname, '.env');
const requiredEnvVars = ['MONGODB_URI', 'JWT_SECRET'];

if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8');
  
  requiredEnvVars.forEach(varName => {
    if (envContent.includes(`${varName}=`)) {
      console.log(`  ✅ ${varName} is set`);
    } else {
      console.log(`  ⚠️  ${varName} - NOT SET (required for Vercel)`);
      hasWarnings = true;
    }
  });
} else {
  console.log('  ⚠️  .env file not found (you\'ll need to set env vars in Vercel)');
  hasWarnings = true;
}

// Check 3: Package.json scripts
console.log('\n📦 Checking package.json scripts...');
const packageJson = JSON.parse(readFileSync(join(__dirname, 'package.json'), 'utf-8'));

const requiredScripts = ['build', 'vercel-build'];
requiredScripts.forEach(script => {
  if (packageJson.scripts[script]) {
    console.log(`  ✅ ${script}: ${packageJson.scripts[script]}`);
  } else {
    console.log(`  ❌ ${script} - MISSING!`);
    hasErrors = true;
  }
});

// Check 4: Dependencies
console.log('\n📚 Checking critical dependencies...');
const criticalDeps = ['react', 'react-dom', 'express', 'mongoose', 'vite'];

criticalDeps.forEach(dep => {
  if (packageJson.dependencies[dep] || packageJson.devDependencies[dep]) {
    console.log(`  ✅ ${dep}`);
  } else {
    console.log(`  ❌ ${dep} - MISSING!`);
    hasErrors = true;
  }
});

// Check 5: Git repository
console.log('\n🔄 Checking Git repository...');
if (existsSync(join(__dirname, '.git'))) {
  console.log('  ✅ Git repository initialized');
} else {
  console.log('  ⚠️  Git repository not initialized (required for Vercel)');
  hasWarnings = true;
}

// Summary
console.log('\n' + '='.repeat(50));
if (hasErrors) {
  console.log('❌ DEPLOYMENT BLOCKED - Fix errors above before deploying!');
  process.exit(1);
} else if (hasWarnings) {
  console.log('⚠️  WARNINGS FOUND - Review warnings before deploying');
  console.log('\n📝 Next steps:');
  console.log('  1. Set environment variables in Vercel Dashboard');
  console.log('  2. Push code to GitHub');
  console.log('  3. Import project in Vercel');
  console.log('\n📖 See DEPLOY.md for detailed instructions');
} else {
  console.log('✅ ALL CHECKS PASSED - Ready to deploy!');
  console.log('\n📝 Next steps:');
  console.log('  1. git add .');
  console.log('  2. git commit -m "Ready for deployment"');
  console.log('  3. git push');
  console.log('  4. Deploy on Vercel');
  console.log('\n📖 See DEPLOY.md for detailed instructions');
}
console.log('='.repeat(50));
