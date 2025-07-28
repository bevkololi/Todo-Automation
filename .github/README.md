# CI/CD Setup

This directory contains GitHub Actions workflows for automated testing and deployment.

## Workflows

### 1. Playwright Tests (`playwright.yml`)
**Comprehensive testing across multiple operating systems**

- **Triggers**: Push to `main`/`develop` branches, Pull Requests
- **Platforms**: Ubuntu, Windows, macOS
- **Features**:
  - Manual server startup (backend + frontend)
  - Full test suite execution
  - Artifact uploads (reports, traces)
  - 30-day retention for artifacts

### 2. Playwright Tests Optimized (`playwright-optimized.yml`)
**Faster, more efficient testing using Playwright's webServer config**

- **Triggers**: Push to `main`/`develop` branches, Pull Requests
- **Platforms**: Ubuntu (main), Matrix testing across OS/browsers
- **Features**:
  - Uses Playwright's built-in webServer configuration
  - Matrix testing across browsers (Chromium, Firefox, WebKit)
  - Faster execution due to optimized server startup
  - Separate artifacts per OS/browser combination

## Usage

### Automatic Execution
Workflows run automatically on:
- Push to `main` or `develop` branches
- Pull requests targeting `main` or `develop`

### Manual Execution
You can manually trigger workflows from the GitHub Actions tab:
1. Go to your repository's "Actions" tab
2. Select the workflow you want to run
3. Click "Run workflow"
4. Choose branch and click "Run workflow"

### Viewing Results
1. **Test Results**: Download artifacts from the Actions tab
2. **HTML Reports**: Extract and open `playwright-report/index.html`
3. **Traces**: Use Playwright Trace Viewer for debugging
4. **Logs**: View detailed logs in the Actions tab

## Configuration

### Environment Variables
- `CI=true`: Enables CI mode in Playwright
- `NODE_ENV=test`: Sets test environment for backend
- `REACT_APP_API_URL=http://localhost:3001`: Frontend API endpoint

### Timeouts
- **Job timeout**: 60 minutes
- **Test timeout**: 30 seconds (configured in `playwright.config.js`)
- **Expect timeout**: 10 seconds (configured in `playwright.config.js`)

### Caching
- **Node modules**: Cached using `actions/setup-node`
- **Playwright browsers**: Installed fresh each run (recommended for CI)

## Troubleshooting

### Common Issues

1. **Server startup failures**:
   - Check if ports 3000/3001 are available
   - Verify backend/frontend dependencies are installed
   - Check environment variables

2. **Test timeouts**:
   - Increase timeout values in `playwright.config.js`
   - Check if servers are responding on expected ports
   - Review test data setup

3. **Browser installation issues**:
   - Ensure sufficient disk space
   - Check network connectivity
   - Verify Playwright version compatibility

### Debugging

1. **Download artifacts**: Get test results and traces
2. **View logs**: Check step-by-step execution logs
3. **Re-run failed jobs**: Use "Re-run jobs" option
4. **Local reproduction**: Run tests locally with same environment

## Best Practices

1. **Use the optimized workflow** for faster feedback
2. **Keep test data isolated** to prevent flaky tests
3. **Use data-testid selectors** for reliable element targeting
4. **Implement proper cleanup** in test teardown
5. **Monitor artifact storage** and adjust retention as needed

## Customization

### Adding New Workflows
1. Create `.yml` file in `.github/workflows/`
2. Follow GitHub Actions syntax
3. Test locally before committing

### Modifying Existing Workflows
1. Update trigger conditions as needed
2. Adjust timeout values for your project
3. Add new steps for additional testing/deployment

### Environment-Specific Configurations
- Use GitHub Secrets for sensitive data
- Create environment-specific workflows
- Implement conditional steps based on branch/event 