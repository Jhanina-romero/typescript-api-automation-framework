const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.join(__dirname, '..');

const resultsRoot = path.join(
    projectRoot,
    'allure-results'
);

const reportRoot = path.join(
    projectRoot,
    'allure-report'
);

const now = new Date();

const timestamp = now
    .toISOString()
    .replace(/T/, '_')
    .replace(/:/g, '-')
    .replace(/\..+/, '');

const runName = `run-${timestamp}`;

const resultsDir = path.join(
    resultsRoot,
    runName
);

const reportDir = path.join(
    reportRoot,
    runName
);

fs.mkdirSync(resultsDir, {
    recursive: true
});

console.log('');
console.log('========================================');
console.log('       API AUTOMATION TEST RUN');
console.log('========================================');
console.log(`Run:     ${runName}`);
console.log(`Results: ${resultsDir}`);
console.log(`Report:  ${reportDir}`);
console.log('========================================');
console.log('');

const environment = {
    ...process.env,
    ALLURE_RESULTS_DIR: resultsDir
};

let testExitCode = 0;

try {
    execSync('npx jest', {
        stdio: 'inherit',
        env: environment
    });
} catch (error) {
    testExitCode = error.status || 1;
}

console.log('');
console.log('========================================');
console.log('       GENERATING ALLURE REPORT');
console.log('========================================');
console.log('');

try {
    fs.mkdirSync(reportDir, {
        recursive: true
    });

    execSync(
        `npx allure generate "${resultsDir}" --clean -o "${reportDir}"`,
        {
            stdio: 'inherit'
        }
    );

    console.log('');
    console.log('✅ Allure report generated.');
    console.log(`📊 ${reportDir}`);
    console.log('');

} catch (error) {

    console.error('❌ Failed to generate Allure report.');

    process.exit(error.status || 1);
}

console.log('========================================');
console.log('          OPENING ALLURE REPORT');
console.log('========================================');
console.log('');

try {

    execSync(
        `npx allure open "${reportDir}"`,
        {
            stdio: 'inherit'
        }
    );

} catch (error) {

    console.error('❌ Failed to open Allure report.');

    process.exit(error.status || 1);
}

process.exitCode = testExitCode;