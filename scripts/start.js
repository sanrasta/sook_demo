const { spawn } = require('child_process');

const BANNER = `
🚀 SOOK MVP Starting...

🎥 Broadcaster: http://localhost:3000/broadcast
📺 Viewer:      http://localhost:3000/watch
🔌 API:         http://localhost:3001
`;

console.log(BANNER);

// Spawn the dev command with piped output so we can filter it
const dev = spawn('npm', ['run', 'dev'], {
    stdio: ['ignore', 'pipe', 'pipe'],
    shell: true
});

let webReady = false;
let apiReady = false;

function checkReady() {
    if (webReady && apiReady) {
        console.log('\n✅ All services are ready!');
        console.log(BANNER);
    }
}

dev.stdout.on('data', (data) => {
    const line = data.toString();

    // Filter out the noisy Next.js lockfile warning
    if (line.includes('Warning: Next.js inferred your workspace root') ||
        line.includes('We detected multiple lockfiles') ||
        line.includes('To silence this warning') ||
        line.includes('Detected additional lockfiles') ||
        line.includes('package-lock.json')) {
        return;
    }

    process.stdout.write(line);

    // Detect readiness
    if (line.includes('Ready in')) webReady = true;
    if (line.includes('Nest application successfully started')) apiReady = true;

    if (webReady && apiReady) {
        // Debounce the final banner to ensure it's at the bottom
        webReady = false; // Reset so we don't spam
        apiReady = false;
        setTimeout(() => {
            console.log('\n' + '='.repeat(50));
            console.log(BANNER);
            console.log('='.repeat(50) + '\n');
        }, 1000);
    }
});

dev.stderr.on('data', (data) => {
    process.stderr.write(data);
});

dev.on('close', (code) => {
    process.exit(code);
});
