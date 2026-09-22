const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const resultsRoot = path.join(__dirname, '..', 'allure-results');
const reportRoot = path.join(__dirname, '..', 'allure-report');

if (!fs.existsSync(resultsRoot)) {
    console.error('❌ No allure-results directory found.');
    process.exit(1);
}

const runs = fs
    .readdirSync(resultsRoot, { withFileTypes: true })
    .filter(entry => entry.isDirectory())
    .map(entry => entry.name)
    .sort()
    .reverse();

if (runs.length === 0) {
    console.error('❌ No Allure test runs found.');
    process.exit(1);
}

const latestRun = runs[0];

const resultsDir = path.join(resultsRoot, latestRun);
const reportDir = path.join(reportRoot, latestRun);

fs.mkdirSync(reportDir, { recursive: true });

console.log('');
console.log('========================================');
console.log('        GENERATING ALLURE REPORT');
console.log('========================================');
console.log(`Results: ${resultsDir}`);
console.log(`Report:  ${reportDir}`);
console.log('========================================');
console.log('');

try {
    execSync(
        `npx allure generate "${resultsDir}" --clean -o "${reportDir}"`,
        {
            stdio: 'inherit'
        }
    );

    console.log('');
    console.log('✅ Allure HTML report generated successfully.');
    console.log(`📊 Report: ${reportDir}`);
    console.log('');
} catch (error) {
    console.error('❌ Failed to generate Allure report.');
    process.exit(error.status || 1);
}