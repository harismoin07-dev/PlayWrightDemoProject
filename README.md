# Playwright Demo Project

End-to-end UI tests for the OrangeHRM demo application using Playwright Test.

## Prerequisites

- Node.js 20 or later
- npm
- Internet access to the OrangeHRM demo application

## Installation

```bash
npm ci
npx playwright install
```

On Ubuntu or another Linux CI environment, install browser system dependencies with:

```bash
npx playwright install --with-deps
```

## Configuration

Create a `.env` file in the project root for local credentials:

```env
APP_USERNAME=Admin
APP_PASSWORD=admin123
# Optional:
# BASE_URL=https://opensource-demo.orangehrmlive.com/
```

`.env` is ignored by Git and must not be committed. `BasePage` uses the default OrangeHRM URL when `BASE_URL` is not set.

## Running tests

Run the full test suite:

```bash
npm test
```

Run tests with the Playwright UI:

```bash
npx playwright test --ui
```

Run a specific test file:

```bash
npx playwright test tests/login.spec.js
```

The configured browser project is Chromium. Tests retry once on CI and run with a single worker on CI.

## Test coverage

- **Login:** valid login and invalid-credentials validation
- **Dashboard:** dashboard loading, search, and Leave navigation
- **Leave:** filtering leave records by Taken status
- **Admin:** searching for and validating Admin user details

## Project structure

```text
pages/       Page objects and shared BasePage
fixtures/    Reusable logged-in Playwright fixture
tests/       Playwright test specifications
.github/     GitHub Actions workflow
playwright.config.js
```

## Reports

Playwright creates an HTML report after a test run. Open it with:

```bash
npx playwright show-report
```

Allure results are written to `allure-results/`. Generate and open an Allure report with:

```bash
npm run allure:report
npm run allure:open
```

You can also start an Allure server directly:

```bash
npm run allure:serve
```

## Continuous integration

The workflow in `.github/workflows/playwright.yml` runs on pushes and pull requests targeting `main` or `master`. It:

1. Uses Node.js 20.
2. Installs dependencies with `npm ci`.
3. Installs Playwright browsers and Linux dependencies.
4. Verifies `APP_USERNAME` and `APP_PASSWORD`.
5. Runs the Playwright suite.
6. Uploads the HTML report as the `playwright-report` artifact for 30 days.

GitHub Actions uses the `APP_USERNAME` and `APP_PASSWORD` repository secrets when provided. The workflow currently falls back to the OrangeHRM demo credentials (`Admin` / `admin123`) when those secrets are not configured.
