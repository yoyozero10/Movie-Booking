import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

try {
  const logPath = path.join(__dirname, 'logs', 'server.log');
  const logs = fs.readFileSync(logPath, 'utf8');
  const lines = logs.split('\n').filter(line => line.trim());
  const lastLines = lines.slice(-30);
  console.log('=== LAST 30 LOG ENTRIES ===');
  lastLines.forEach((line, index) => {
    console.log(`${lines.length - 30 + index + 1}: ${line}`);
  });
} catch (error) {
  console.error('Error reading logs:', error.message);
}
