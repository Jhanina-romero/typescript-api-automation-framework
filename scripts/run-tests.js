const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const now = new Date();

const timestamp = now
    .toISOString()
    .replace(/T/, '_')
    .replace(/:/g, '-')
    .replace(/\..+/, '');

const resultsDir = path.join(
    'allure-results',
    `run-${timestamp}`
);

fs.mkdirSync(resultsDir, {
    recursive: true
});

process.env.ALLURE_RESULTS_DIR = resultsDir;

console.log('');
console.log('========================================');
console.log('        ALLURE TEST EXECUTION');
console.log('========================================');
console.log(`Results: ${resultsDir}`);
console.log('========================================');
console.log('');

try {

    execSync('npx jest', {
        stdio: 'inherit',
        env: process.env
    });

} catch (error) {

    process.exitCode = error.status || 1;
}