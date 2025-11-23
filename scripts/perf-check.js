#!/usr/bin/env node

/**
 * Performance Testing Script for Next.js Website
 * Cross-platform Node.js version
 * 
 * Usage:
 *   node scripts/perf-check.js [url]
 * 
 * Default URL: http://localhost:3000
 * 
 * Prerequisites:
 *   - npm run build && npm run start (production build running)
 *   - @lhci/cli available via npx
 */

const http = require('http');
const { execSync } = require('child_process');

const URL = process.argv[2] || 'http://localhost:3000';

console.log('\n🚀 Performance Testing Script');
console.log('==============================\n');
console.log(`Testing URL: ${URL}\n`);

// Check if production server is running
console.log('📋 Step 1: Checking if production server is running...');

try {
  const urlObj = new URL(URL);
  const options = {
    hostname: urlObj.hostname,
    port: urlObj.port || (urlObj.protocol === 'https:' ? 443 : 80),
    path: urlObj.pathname,
    method: 'HEAD',
    timeout: 3000,
  };

  const req = http.request(options, (res) => {
    console.log('✅ Server is running\n');
    runLighthouse();
  });

  req.on('error', (err) => {
    console.error('❌ Error: Production server is not running at', URL);
    console.error('\nPlease run:');
    console.error('  npm run build');
    console.error('  npm run start');
    console.error('\nOr start the server and run this script with a custom URL:');
    console.error(`  node scripts/perf-check.js ${URL}\n`);
    process.exit(1);
  });

  req.on('timeout', () => {
    req.destroy();
    console.error('❌ Error: Connection timeout');
    process.exit(1);
  });

  req.end();
} catch (err) {
  console.error('❌ Error: Invalid URL format');
  process.exit(1);
}

function runLighthouse() {
  console.log('📊 Step 2: Running Lighthouse CI...\n');

  const command = `npx @lhci/cli autorun \
    --collect.url="${URL}" \
    --collect.settings.emulatedFormFactor=mobile \
    --collect.settings.throttling.cpuSlowdownMultiplier=4 \
    --collect.settings.throttling.rttMs=150 \
    --collect.settings.throttling.throughputKbps=1600 \
    --collect.settings.screenEmulation.width=412 \
    --collect.settings.screenEmulation.height=915 \
    --collect.settings.screenEmulation.deviceScaleFactor=2.625 \
    --collect.numberOfRuns=3 \
    --upload.target=temporary-public-storage \
    --assert.assertions.off=all \
    --assert.assertions.presets=minimal`;

  try {
    execSync(command, { stdio: 'inherit', shell: true });
    console.log('\n✅ Lighthouse CI completed!\n');
    console.log('📈 Target Metrics:');
    console.log('  - LCP (Largest Contentful Paint): < 2.5s');
    console.log('  - CLS (Cumulative Layout Shift): < 0.1');
    console.log('  - TBT (Total Blocking Time): < 150ms');
    console.log('  - FCP (First Contentful Paint): < 1.8s\n');
    console.log('💡 Tips:');
    console.log('  - Check the Lighthouse report URL above for detailed metrics');
    console.log('  - Compare before/after scores to measure improvements');
    console.log('  - Run multiple times for consistent results\n');
  } catch (error) {
    console.error('\n❌ Lighthouse CI failed. Make sure @lhci/cli is available:');
    console.error('  npx @lhci/cli --version\n');
    process.exit(1);
  }
}

