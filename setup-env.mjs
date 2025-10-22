#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if .env.local already exists
const envLocalPath = path.join(__dirname, '.env.local');
const envExamplePath = path.join(__dirname, '.env.example');

console.log('🚀 Setting up environment variables...\n');

if (fs.existsSync(envLocalPath)) {
  console.log('✅ .env.local already exists!');
  console.log('📝 Edit .env.local to update your configuration');
  process.exit(0);
}

if (!fs.existsSync(envExamplePath)) {
  console.log('❌ .env.example not found!');
  console.log('💡 Run this script from the project root directory');
  process.exit(1);
}

// Copy .env.example to .env.local
try {
  fs.copyFileSync(envExamplePath, envLocalPath);
  console.log('✅ Created .env.local from .env.example');
  console.log('');
  console.log('🌐 Current configuration:');
  console.log('   VITE_API_BASE_URL=http://localhost:5000/api (development)');
  console.log('');
  console.log('📝 Next steps:');
  console.log('   1. Edit .env.local if you need to change the API URL');
  console.log('   2. Run "npm run dev" to start development');
  console.log('');
  console.log('🚀 For production deployment:');
  console.log('   - Update VITE_API_BASE_URL to your deployed backend URL');
  console.log('   - Set VITE_NODE_ENV=production');
} catch (error) {
  console.error('❌ Failed to create .env.local:', error.message);
  process.exit(1);
}
