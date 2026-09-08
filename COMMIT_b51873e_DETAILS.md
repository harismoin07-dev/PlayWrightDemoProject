# Commit b51873e Details

## Merge Pull Request #14: Publish Allure Reports

**Commit SHA:** b51873e1db2d7dd7d9649a18a1292dc5f33518b7
**Date:** September 3, 2026
**Author:** harismoin07-dev
**Type:** Merge Commit

---

## Summary
This commit merges the `ci/allure-reports` feature branch and implements Allure reporting integration into the GitHub Actions CI/CD pipeline, replacing the previous HTML reporter with comprehensive Allure test reports.

## Changes Made

### 1. **GitHub Actions Workflow** (`.github/workflows/playwright.yml`)
- Changed test reporter from HTML to Allure
- Added Allure report generation step using: `npx allure generate allure-results --clean -o allure-report`
- Updated artifact upload to use Allure report instead of Playwright HTML report
- Added conditional execution with `if: ${{ !cancelled() }}` to ensure reports generate even if tests fail

**Key Changes:**
```diff
- run: npx playwright test --reporter=html
+ run: npx playwright test

+ - name: Generate Allure report
+   if: ${{ !cancelled() }}
+   run: npx allure generate allure-results --clean -o allure-report

- name: Upload Allure report
  name: allure-report
  path: allure-report/
```

### 2. **Git Ignore** (`.gitignore`)
- Added `/allure-results/` - directory for Allure test data collection
- Added `/allure-report/` - directory for generated Allure reports

### 3. **Package Scripts** (`package.json`)
- Fixed script naming: `allure-generate` → `allure:report`
- Now `npm run test:allure` properly chains test execution with report generation

**Before:**
```json
"test:allure": "npm run test && npm run allure-generate"
```

**After:**
```json
"test:allure": "npm run test && npm run allure:report"
```

### 4. **Playwright Configuration** (`playwright.config.js`)
- Removed HTML reporter from configuration
- Configured Allure reporter as primary reporter
- Cleaned up formatting and structure

**Changes:**
```diff
reporter: [
- ['html'],
  ['allure-playwright', {
    outputFolder: 'allure-results',
    details: true,
    suiteTitle: true,
  }],
],
```

---

## Benefits

✅ **Enhanced Test Reporting** - Allure provides rich, interactive test reports
✅ **Better CI/CD Integration** - Reports automatically generated during GitHub Actions workflow
✅ **Artifact Management** - Reports retained for 30 days for review and analysis
✅ **Consistent Naming** - Fixed npm script naming conventions
✅ **Failure Resilience** - Reports generated even when tests fail (using `!cancelled()`)

## Statistics
- **Files Changed:** 4
- **Additions:** 16
- **Deletions:** 11
- **Total Changes:** 27 lines

## Files Modified
1. `.github/workflows/playwright.yml`
2. `.gitignore`
3. `package.json`
4. `playwright.config.js`

---

## How to Use

**Run tests with Allure reporting locally:**
```bash
npm run test:allure
```

**Open the generated report:**
```bash
npm run allure:open
```

**Serve reports in interactive mode:**
```bash
npm run allure:serve
```

---

## Related
- **Pull Request:** #14
- **Branch:** ci/allure-reports
- **Parent Commits:** 
  - 74bcd20 (main branch)
  - 53e5e3f (ci/allure-reports branch)

