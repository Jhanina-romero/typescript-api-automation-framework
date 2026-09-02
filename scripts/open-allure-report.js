const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const reportRoot = path.join(__dirname, '..', 'allure-report');

if (!fs.existsSync(reportRoot)) {
    console.error('❌ No allure-report directory found.');
    process.exit(1);
}

const runs = fs
    .readdirSync(reportRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort()
    .reverse();

if (runs.length === 0) {
    console.error('❌ No Allure reports found.');
    process.exit(1);
}

const latestRun = runs[0];
const reportDir = path.join(reportRoot, latestRun);

console.log('');
console.log('========================================');
console.log('          OPENING ALLURE REPORT');
console.log('========================================');
console.log(`Report: ${reportDir}`);
console.log('========================================');
console.log('');

try {
    execSync(`npx allure open "${reportDir}"`, {
        stdio: 'inherit'
    });
} catch (error) {
    console.error('❌ Failed to open Allure report.');
    process.exit(error.status || 1);
}