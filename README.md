# TypeScript API Automation Framework

## Overview

A scalable **API test automation framework built with TypeScript, Jest, and Axios**, designed to support maintainable, reusable, and reliable REST API testing.

The framework includes:

* REST API automation using **Axios**
* Test execution with **Jest**
* Strong typing with **TypeScript**
* Test data generation with **Faker**
* JSON schema validation with **AJV**
* Environment configuration with **dotenv**
* Structured logging with **Winston**
* Test reporting with **Allure**
* Code coverage
* TypeScript static type checking
* CI/CD integration with **GitHub Actions**

The current implementation includes automated tests for the **Restful Booker API**.

---

## Architecture

The framework follows a layered structure to separate API communication, test logic, test data, validation, and utilities.

```text
typescript-api-automation-framework/
│
├── .github/
│   └── workflows/
│       └── ...                 # CI/CD workflows
│
├── src/
│   ├── clients/                # HTTP/API clients
│   ├── services/               # API/business operations
│   ├── schemas/                # JSON schemas and validations
│   ├── data/                   # Test data
│   ├── utils/                  # Shared utilities
│   └── ...                     # Framework components
│
├── tests/
│   └── restful-booker/
│       └── ...                 # REST API test suites
│
├── scripts/
│   └── test-report.js          # Test reporting utilities
│
├── jest.config.ts              # Jest configuration
├── tsconfig.json               # TypeScript configuration
├── package.json                # Dependencies and npm scripts
└── README.md
```

### Architecture flow

```text
Test Cases
    │
    ▼
Service / API Layer
    │
    ▼
HTTP Client (Axios)
    │
    ▼
REST API
    │
    ▼
Response
    │
    ├── Status / Data Assertions
    ├── Schema Validation (AJV)
    └── Allure Reporting
```

This separation makes the framework easier to maintain and allows API clients, test data, validations, and utilities to be reused across multiple test suites.

---

## 🛠️ Technology Stack

| Technology     | Purpose                           |
| -------------- | --------------------------------- |
| TypeScript     | Strongly typed test development   |
| Jest           | Test runner and assertions        |
| Axios          | HTTP client for REST API requests |
| Faker.js       | Dynamic test data generation      |
| AJV            | JSON schema validation            |
| dotenv         | Environment configuration         |
| Winston        | Application/test logging          |
| Allure         | Test reporting                    |
| GitHub Actions | CI/CD automation                  |

---

## 📋 Prerequisites

Before running the framework, install:

* **Node.js**
* **npm**
* **Git**

Verify the installation:

```bash
node --version
npm --version
git --version
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/Jhanina-romero/typescript-api-automation-framework.git
```

Navigate to the project:

```bash
cd typescript-api-automation-framework
```

Install dependencies:

```bash
npm install
```

---

## ⚙️ Configuration

Environment-specific configuration can be managed using environment variables.

Create a `.env` file when required:

```env
BASE_URL=https://restful-booker.herokuapp.com
```

Do not commit credentials, tokens, or other sensitive information to the repository.

---

## Test Execution

### Run all tests

```bash
npm test
```

### Run tests in watch mode

```bash
npm run test:watch
```

### Run tests with coverage

```bash
npm run test:coverage
```

### Run TypeScript type checking

```bash
npm run typecheck
```

### Generate the test report

```bash
npm run test:report
```

---

## 📊 Test Reporting

The framework is configured to generate **Allure test results**.

Jest uses the Allure Jest environment and stores the results in:

```text
allure-results/
```

The results directory can also be configured using:

```bash
ALLURE_RESULTS_DIR
```

Example:

```bash
ALLURE_RESULTS_DIR=custom-results npm test
```

---

## Test Design

The framework is designed around common API testing practices:

### Functional validation

Tests validate:

* HTTP status codes
* Response payloads
* Required fields
* Business/API behavior
* Positive scenarios
* Negative scenarios

### Schema validation

AJV is used to validate API responses against JSON schemas.

This helps detect:

* Missing properties
* Unexpected data types
* Invalid response structures
* Contract changes

### Test data

Faker.js can be used to generate dynamic and independent test data, reducing hard-coded values and improving test isolation.

---

## CI/CD

The repository includes GitHub Actions workflows for automated test execution.

A typical CI pipeline can execute:

```text
Checkout repository
        │
        ▼
Install dependencies
        │
        ▼
TypeScript validation
        │
        ▼
Execute API tests
        │
        ▼
Generate coverage/report
        │
        ▼
Publish test artifacts
```

This allows the automated API tests to become part of the software delivery pipeline.

---

## Project Configuration

### Jest

The framework uses `jest.config.ts`.

The current configuration:

* Uses `ts-jest`
* Executes `.test.ts` files
* Uses the Allure Jest environment
* Collects coverage from `src/**/*.ts`
* Uses the `tests` directory as the test root
* Enables verbose test output

### TypeScript

The project uses strict TypeScript settings and targets **ES2022**.

The TypeScript configuration includes both application and test source files.

---

## Example Test Structure

A typical API test follows this general flow:

```text
Arrange
  │
  ├── Prepare test data
  └── Configure request
       │
       ▼
Act
  │
  └── Send API request
       │
       ▼
Assert
  │
  ├── Validate status code
  ├── Validate response body
  └── Validate response schema
```

This structure promotes readable, maintainable, and reusable tests.

---

## Future Improvements

Potential extensions for the framework include:

* Authentication/token management
* Multiple environment configurations
* API contract testing
* Improved test data factories
* Retry strategies for transient failures
* Parallel test execution
* Enhanced Allure reporting
* Docker support
* Expanded CI/CD pipelines
* Additional API test suites

---
