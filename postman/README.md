# API Testing with Postman and Newman

This directory contains Postman collections and Newman configurations for comprehensive API testing.

## 📁 Files

- **`Todo-Automation.postman_collection.json`** - Complete API test collection
- **`Todo-Automation.postman_environment.json`** - Environment variables
- **`newman-config.json`** - Newman configuration file

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Newman CLI: `npm install -g newman`

### Local Testing

1. **Start the backend server:**
   ```bash
   npm run backend:dev
   ```

2. **Run API tests:**
   ```bash
   # Run with detailed output
   npm run api:test
   
   # Run for CI (JUnit reporter)
   npm run api:test:ci
   ```

3. **Run with Newman config:**
   ```bash
   newman run newman-config.json
   ```

## 📋 Test Collection Structure

### Authentication Tests
- ✅ **Login - Valid Credentials** - Tests successful authentication
- ✅ **Login - Invalid Credentials** - Tests authentication failure

### Health Check Tests
- ✅ **Health Check** - Verifies server status

### CRUD Operations Tests
- ✅ **Create Todo** - Creates a new todo item
- ✅ **Get All Todos** - Retrieves all todos
- ✅ **Get Todo by ID** - Retrieves specific todo
- ✅ **Update Todo** - Updates todo title
- ✅ **Toggle Todo Completion** - Toggles completion status
- ✅ **Delete Todo** - Deletes specific todo
- ✅ **Clear All Todos** - Clears all todos

### Error Handling Tests
- ✅ **Get Todo - Invalid ID** - Tests 404 response
- ✅ **Create Todo - No Auth** - Tests authentication requirement

## 🔧 Configuration

### Environment Variables
- **`baseUrl`** - API base URL (default: `http://localhost:3001`)
- **`authToken`** - Authentication token (auto-set after login)
- **`todoId`** - Todo ID for testing (auto-set after creation)

### Newman Configuration
- **Reporters**: CLI, JSON, JUnit
- **Timeout**: 30 seconds per request
- **Delay**: 1 second between requests
- **Bail**: Stop on first failure

## 📊 Test Reports

### Local Reports
- **JSON Report**: `test-results/newman-report.json`
- **JUnit Report**: `test-results/newman-report.xml`

### CI Reports
- Downloaded as artifacts from GitHub Actions
- Available in Actions tab for each workflow run

## 🎯 Test Features

### Automated Testing
- ✅ **Token Management** - Auto-sets auth token after login
- ✅ **Data Dependencies** - Uses created todo ID for subsequent tests
- ✅ **Environment Variables** - Dynamic URL and token management
- ✅ **Comprehensive Coverage** - All API endpoints tested

### Validation
- ✅ **Status Codes** - Verifies correct HTTP responses
- ✅ **Response Structure** - Validates JSON structure
- ✅ **Data Integrity** - Checks data consistency
- ✅ **Error Handling** - Tests error scenarios

## 🔄 CI/CD Integration

### GitHub Actions
- **Dedicated API workflow**: `api-tests.yml`
- **Integrated with Playwright**: Runs alongside UI tests
- **Multi-platform testing**: Ubuntu, Windows, macOS
- **Artifact collection**: Test reports and results

### Workflow Steps
1. **Setup**: Install Node.js and dependencies
2. **Backend**: Start API server
3. **Testing**: Run Newman collection
4. **Reporting**: Generate and upload reports

## 🐛 Debugging

### Local Debugging
```bash
# Run with verbose output
newman run postman/Todo-Automation.postman_collection.json -e postman/Todo-Automation.postman_environment.json --verbose

# Run specific folder
newman run postman/Todo-Automation.postman_collection.json -e postman/Todo-Automation.postman_environment.json --folder "Authentication"

# Run with custom environment
newman run postman/Todo-Automation.postman_collection.json -e postman/Todo-Automation.postman_environment.json --env-var "baseUrl=http://localhost:3001"
```

### CI Debugging
1. **Check logs**: View detailed Newman output in Actions
2. **Download artifacts**: Get test reports for analysis
3. **Re-run jobs**: Use "Re-run jobs" for failed tests

## 📈 Best Practices

### Collection Design
- ✅ **Logical grouping** - Tests organized by functionality
- ✅ **Dependencies** - Tests that depend on previous results
- ✅ **Data isolation** - Clean state between test runs
- ✅ **Error scenarios** - Comprehensive error testing

### Newman Usage
- ✅ **CI-friendly** - JUnit reporter for CI integration
- ✅ **Configurable** - External configuration file
- ✅ **Reliable** - Proper timeouts and retries
- ✅ **Reportable** - Multiple output formats

## 🔗 Integration with Playwright

### Combined Testing
- **API Tests**: Newman for backend validation
- **UI Tests**: Playwright for frontend validation
- **End-to-End**: Full application testing

### Test Strategy
1. **API First**: Validate backend endpoints
2. **UI Integration**: Test frontend-backend integration
3. **Full Stack**: Complete application validation

## 📝 Adding New Tests

### 1. Create Test in Postman
1. Open Postman
2. Import the collection
3. Add new request
4. Write test scripts
5. Export updated collection

### 2. Update Collection File
```bash
# Replace the collection file
cp ~/Downloads/Todo-Automation.postman_collection.json postman/
```

### 3. Test Locally
```bash
npm run api:test
```

### 4. Commit and Push
```bash
git add postman/
git commit -m "Add new API test: [description]"
git push origin main
```

## 🆘 Troubleshooting

### Common Issues
1. **Server not running**: Ensure backend is started
2. **Authentication failed**: Check login credentials
3. **Timeout errors**: Increase timeout in config
4. **Environment issues**: Verify environment variables

### Solutions
- **Check server status**: `curl http://localhost:3001/health`
- **Verify environment**: Check Postman environment variables
- **Review logs**: Check Newman output for errors
- **Test manually**: Run requests in Postman first 