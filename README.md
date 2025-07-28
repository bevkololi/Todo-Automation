# Todo-Automation

A full-stack todo application with comprehensive Playwright testing and CI/CD integration.

## 🚀 Features

- **Backend**: Node.js/Express API with full CRUD operations
- **Frontend**: React.js with modern UI (green/white theme)
- **Testing**: Comprehensive Playwright E2E test suite
- **CI/CD**: GitHub Actions with multi-platform testing
- **Authentication**: Simple token-based auth system

## 📁 Project Structure

```
Todo-Automation/
├── backend/                 # Node.js API server
├── frontend/               # React.js application
├── tests/                  # Playwright test suite
├── .github/workflows/      # GitHub Actions CI/CD
└── package.json           # Root package.json for scripts
```

## 🛠️ Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd Todo-Automation

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Development
```bash
# Start both backend and frontend
npm run dev

# Or start individually
npm run backend:dev    # Backend on http://localhost:3001
npm run frontend:dev   # Frontend on http://localhost:3000
```

### Testing
```bash
# Run all tests
npm test

# Run tests in headed mode
npm run test:headed

# Run tests with UI
npm run test:ui

# Run specific test file
npm test tests/specs/auth.spec.js

# Generate test report
npm run test:report

# Run API tests with Newman
npm run api:test

# Run API tests for CI
npm run api:test:ci
```

## 🧪 Test Suite

### Test Categories
- **Authentication**: Login, logout, session management
- **CRUD Operations**: Create, read, update, delete todos
- **Navigation**: Side menu, different views, empty states
- **API Testing**: Direct backend endpoint testing with Newman/Postman
- **UI Testing**: Frontend testing with Playwright

### Test Features
- ✅ **Robust selectors** using `data-testid` attributes
- ✅ **Test isolation** with proper setup/teardown
- ✅ **Atomic tests** that don't depend on each other
- ✅ **Parallel execution** for faster feedback
- ✅ **Retry mechanism** for flaky tests
- ✅ **Trace viewer** for debugging
- ✅ **Multiple browsers** (Chromium, Firefox, WebKit)
- ✅ **API testing** with Newman and Postman collections
- ✅ **Comprehensive coverage** of all endpoints

### Test Structure
```
tests/
├── fixtures/           # Test fixtures and helpers
├── specs/             # Test specifications
├── utils/             # Test utilities and helpers
├── global-setup.js    # Global test setup
└── global-teardown.js # Global test cleanup

postman/
├── Todo-Automation.postman_collection.json    # API test collection
├── Todo-Automation.postman_environment.json   # Environment variables
└── README.md                                  # API testing documentation
```

## 🔄 CI/CD Pipeline

### GitHub Actions Workflows

1. **Playwright Tests** (`playwright.yml`)
   - Multi-platform testing (Ubuntu, Windows, macOS)
   - Manual server startup
   - Comprehensive artifact collection

2. **Playwright Tests Optimized** (`playwright-optimized.yml`)
   - Uses Playwright's webServer configuration
   - Matrix testing across browsers
   - Faster execution
   - Includes Newman API testing

3. **API Tests with Newman** (`api-tests.yml`)
   - Dedicated API testing workflow
   - Multi-platform API validation
   - Comprehensive endpoint coverage

### CI Features
- ✅ **Automatic triggers** on push/PR to main/develop
- ✅ **Multi-platform testing** (Linux, Windows, macOS)
- ✅ **Multi-browser testing** (Chrome, Firefox, Safari)
- ✅ **Artifact uploads** (reports, traces, screenshots)
- ✅ **30-day retention** for test artifacts
- ✅ **Parallel execution** for faster feedback

### Viewing CI Results
1. Go to your repository's "Actions" tab
2. Click on a workflow run
3. Download artifacts for detailed reports
4. View logs for debugging information

## 🎯 API Endpoints

### Authentication
- `POST /login` - Login with username/password

### Todo Operations
- `GET /items` - Get all todos
- `POST /items` - Create new todo
- `GET /items/:id` - Get specific todo
- `PUT /items/:id` - Update todo
- `PATCH /items/:id/toggle` - Toggle completion
- `DELETE /items/:id` - Delete specific todo
- `DELETE /items` - Clear all todos

### Health Check
- `GET /health` - Server health status

## 🔧 Configuration

### Environment Variables
- `NODE_ENV` - Environment (development, test, production)
- `REACT_APP_API_URL` - Frontend API endpoint
- `CI` - CI environment flag

### Playwright Configuration
- **Base URL**: `http://localhost:3000`
- **Test timeout**: 30 seconds
- **Expect timeout**: 10 seconds
- **Retries**: 2 for failed tests
- **Workers**: 4 parallel tests
- **Trace**: On for failed tests

## 📊 Test Reports

### Local Reports
```bash
# Generate HTML report
npm run test:report

# Open report in browser
npx playwright show-report
```

### CI Reports
- Download artifacts from GitHub Actions
- Extract and open `playwright-report/index.html`
- View traces with Playwright Trace Viewer

## 🐛 Debugging

### Local Debugging
```bash
# Run tests in headed mode
npm run test:headed

# Run with debug mode
npm run test:debug

# Generate test code
npm run test:codegen
```

### CI Debugging
1. Download trace files from artifacts
2. Use Playwright Trace Viewer: `npx playwright show-trace trace.zip`
3. View screenshots and videos in test-results folder
4. Check detailed logs in GitHub Actions

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Write tests for new features
4. Ensure all tests pass
5. Submit a pull request

### Testing Guidelines
- Write tests for all new features
- Use `data-testid` attributes for selectors
- Keep tests independent and atomic
- Follow the existing test patterns
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
1. Check the test documentation in `tests/README.md`
2. Review CI/CD setup in `.github/README.md`
3. Open an issue with detailed information
4. Include test logs and screenshots for failures
