import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');

const APPS = ['apps/playground', 'apps/web'];
const BANNED_PATTERNS = [
  /node:crypto/g,
  /node:fs/g,
  /node:path/g,
  /require\(['"]node:/g,
  /from\s+['"]node:/g,
];

console.log('🛡️  Starting Bundle Integrity Audit...');

let totalErrors = 0;

for (const app of APPS) {
  const distPath = path.join(ROOT, app, 'dist');
  
  if (!fs.existsSync(distPath)) {
    console.warn(`⚠️  Skip: ${app}/dist not found. Build the app first.`);
    continue;
  }

  console.log(`\n🔍 Auditing ${app}...`);
  const files = getAllFiles(distPath).filter(f => f.endsWith('.js') || f.endsWith('.mjs'));

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    let fileHasError = false;

    for (const pattern of BANNED_PATTERNS) {
      if (pattern.test(content)) {
        console.error(`❌ FAILURE: Banned pattern ${pattern} found in ${path.relative(ROOT, file)}`);
        fileHasError = true;
        totalErrors++;
      }
    }

    if (!fileHasError) {
      // console.log(`✅ ${path.relative(distPath, file)}`);
    }
  }
}

if (totalErrors === 0) {
  console.log('\n✨ Audit Passed: Zero Node.js leaks detected in browser bundles.');
  process.exit(0);
} else {
  console.error(`\n🚨 Audit Failed: Found ${totalErrors} leaks.`);
  process.exit(1);
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  });
  return fileList;
}
