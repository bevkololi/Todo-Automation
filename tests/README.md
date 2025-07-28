# Playwright Test Suite

A comprehensive end-to-end test suite for the Todo application using Playwright best practices.

## 🏗️ Test Structure

```
tests/
├── fixtures/
│   └── test-fixtures.js      # Custom test fixtures
├── utils/
│   └── test-helpers.js       # Helper utilities and selectors
├── specs/
│   ├── auth.spec.js          # Authentication tests
│   ├── todo-crud.spec.js     # CRUD operations tests
│   ├── navigation.spec.js    # Navigation and views tests
│   └── api.spec.js           # Direct API testing
├── global-setup.js           # Global setup for all tests
├── global-teardown.js        # Global cleanup
└── README.md                 # This file
```

## 🎯 Test Categories

### 1. **Authentication Tests** (`auth.spec.js`)
- Login with valid/invalid credentials
- Logout functionality
- Authentication persistence
- Error handling for empty credentials

### 2. **CRUD Operations** (`todo-crud.spec.js`)
- Create todos (single and multiple)
- Read todos and verify display
- Update todo titles and completion status
- Delete todos with confirmation
- Clear all todos functionality
- Keyboard navigation in edit mode

### 3. **Navigation & Views** (`navigation.spec.js`)
- Side menu navigation
- Different views (My Todos, Completed, Pending)
- Empty states for each view
- Active navigation highlighting
- Todo counts and badges

### 4. **API Testing** (`api.spec.js`)
- Direct backend endpoint testing
- Authentication and authorization
- Error handling
- Health check endpoints

## 🚀 Running Tests

### Prerequisites
1. **Start the application:**
   ```bash
   npm run dev
   ```

2. **Install Playwright browsers:**
   ```bash
   npm run test:install
   ```

### Test Commands

```bash
# Run all tests
npm test

# Run tests in headed mode (see browser)
npm run test:headed

# Run tests with UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Show test report
npm run test:report

# Generate test code
npm run test:codegen
```

### Running Specific Tests

```bash
# Run specific test file
npx playwright test auth.spec.js

# Run tests matching a pattern
npx playwright test --grep "login"

# Run tests in specific browser
npx playwright test --project=chromium

# Run tests in parallel
npx playwright test --workers=4
```

## 🏆 Best Practices Implemented

### ✅ **Robust Selectors**
- Uses semantic selectors and data attributes
- Avoids fragile CSS selectors
- Stable element identification

### ✅ **Test Isolation**
- `beforeEach` and `afterEach` hooks for setup/cleanup
- Data isolation between tests
- Global setup/teardown for application state

### ✅ **Page Object Pattern**
- `PageHelper` class for common interactions
- `APIHelper` class for backend testing
- Reusable test utilities

### ✅ **Atomic Tests**
- Each test is independent
- No test dependencies
- Clear test descriptions

### ✅ **Real User Testing**
- Tests user workflows end-to-end
- Natural interaction patterns
- Realistic test scenarios

### ✅ **Error Handling**
- Tests both success and failure scenarios
- Validates error messages
- Tests edge cases

### ✅ **CI/CD Ready**
- Parallel test execution
- Retry logic for flaky tests
- Multiple browser support
- Trace viewer for debugging

## 🔧 Configuration

### Playwright Config (`playwright.config.js`)
- **Parallel execution** across browsers
- **Retry logic** for CI environments
- **Trace viewer** for failed tests
- **Screenshot/video** capture on failure
- **Multiple browsers** (Chrome, Firefox, Safari, Mobile)

### Test Fixtures
- **Authenticated page** - automatically logs in
- **API helper** - direct backend testing
- **Page helper** - common UI interactions

## 📊 Test Reports

### HTML Report
```bash
npm run test:report
```
- Interactive test results
- Screenshots and videos
- Trace viewer for debugging

### JUnit Report
- CI-friendly XML format
- Compatible with GitHub Actions
- Detailed test results

## 🐛 Debugging

### Trace Viewer
```bash
npx playwright show-trace trace.zip
```
- Step-by-step test execution
- Network requests
- Console logs

### Debug Mode
```bash
npm run test:debug
```
- Interactive debugging
- Step-through execution
- Live browser inspection

## 🚀 CI/CD Integration

### GitHub Actions Ready
- JUnit report generation
- Parallel test execution
- Browser installation
- Artifact upload

### Environment Variables
- `CI=true` - enables retries and CI mode
- `DEBUG=pw:api` - enables API debugging
- `PLAYWRIGHT_HTML_REPORT` - HTML report path

## 📝 Adding New Tests

### 1. **Create Test File**
```javascript
const { test, expect } = require('../fixtures/test-fixtures');
const { SELECTORS } = require('../utils/test-helpers');

test.describe('New Feature', () => {
  test('should do something', async ({ authenticatedPage, pageHelper }) => {
    // Test implementation
  });
});
```

### 2. **Use Fixtures**
- `authenticatedPage` - pre-logged in page
- `pageHelper` - common UI interactions
- `api` - direct backend testing

### 3. **Follow Patterns**
- Use `beforeEach` for setup
- Use robust selectors
- Test both success and failure cases
- Add meaningful assertions

## 🎯 Test Data Management

### Test Data Generation
```javascript
const { TestData } = require('../utils/test-helpers');

// Generate unique test data
const todoTitle = TestData.generateTodoTitle('Test Todo');
```

### Data Cleanup
- Global teardown clears all todos
- Each test starts with clean state
- No test data pollution

## 🔍 Monitoring & Maintenance

### Flaky Test Detection
- Retry logic identifies flaky tests
- Trace viewer helps debug issues
- Screenshot/video capture on failure

### Performance Monitoring
- Test execution time tracking
- Parallel execution optimization
- Resource usage monitoring

## 📚 Resources

- [Playwright Documentation](https://playwright.dev/)
- [Best Practices Guide](https://playwright.dev/docs/best-practices)
- [Test Generator](https://playwright.dev/docs/codegen)
- [Trace Viewer](https://playwright.dev/docs/trace-viewer) 