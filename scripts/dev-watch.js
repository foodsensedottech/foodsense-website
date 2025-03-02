const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');
const chokidar = require('chokidar');

// Configuration
const NEXT_DIR = path.join(process.cwd(), '.next');
const SERVER_DIR = path.join(NEXT_DIR, 'server');
const MANIFEST_FILES = {
  'middleware-manifest.json': {
    version: 1,
    sortedMiddleware: [],
    middleware: {},
    functions: {},
    matchers: {}
  }
};

console.log('🚀 Starting development environment with file watching...');

// Ensure directories exist
function ensureDirsExist() {
  if (!fs.existsSync(NEXT_DIR)) {
    fs.mkdirSync(NEXT_DIR, { recursive: true });
  }
  if (!fs.existsSync(SERVER_DIR)) {
    fs.mkdirSync(SERVER_DIR, { recursive: true });
  }
}

// Create manifest files
function createManifestFiles() {
  ensureDirsExist();
  
  Object.entries(MANIFEST_FILES).forEach(([file, content]) => {
    const filePath = path.join(SERVER_DIR, file);
    if (!fs.existsSync(filePath)) {
      try {
        fs.writeFileSync(filePath, JSON.stringify(content, null, 2), { mode: 0o644 });
        console.log(`✅ Created ${file}`);
      } catch (error) {
        console.error(`❌ Error creating ${file}:`, error.message);
      }
    }
  });
}

// Initialize files before starting the server
createManifestFiles();

// Start Next.js dev server
const nextDev = spawn('next', ['dev'], { 
  stdio: 'inherit',
  shell: true 
});

// Set up watcher to recreate files if they're deleted
const watcher = chokidar.watch(SERVER_DIR, {
  ignoreInitial: true,
  awaitWriteFinish: true,
  persistent: true,
  interval: 1000,
});

// When a file is removed (or doesn't exist), create it
watcher.on('unlink', (path) => {
  const filename = path.split('/').pop();
  if (MANIFEST_FILES[filename]) {
    console.log(`🔄 File ${filename} was deleted, recreating...`);
    createManifestFiles();
  }
});

// Also check every 5 seconds to ensure files exist
const interval = setInterval(createManifestFiles, 5000);

// Handle process exit
process.on('SIGINT', () => {
  watcher.close();
  clearInterval(interval);
  nextDev.kill();
  process.exit(0);
});

process.on('exit', () => {
  watcher.close();
  clearInterval(interval);
  nextDev.kill();
});

nextDev.on('exit', (code) => {
  watcher.close();
  clearInterval(interval);
  process.exit(code);
}); 