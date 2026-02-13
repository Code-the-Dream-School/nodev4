import { fileURLToPath } from 'url';
import { dirname } from 'path';

// In ESM, we need to create __dirname and __filename from import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Log __dirname and __filename
console.log('__dirname:', __dirname);
console.log('__filename:', __filename);

// Log process ID and platform
console.log('Process ID:', process.pid);
console.log('Platform:', process.platform);

// Attach a custom property to global and log it
global.myCustomVar = 'Hello, global!';
console.log('Custom global variable:', global.myCustomVar); 