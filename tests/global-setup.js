const { chromium } = require('@playwright/test');

/**
 * Global setup that runs once before all tests
 * Ensures the application is ready and performs initial setup
 */
async function globalSetup() {
    console.log('🚀 Starting global setup...');

    // Wait for servers to be ready
    await waitForServers();

    console.log('✅ Global setup completed');
}

/**
 * Wait for both backend and frontend servers to be ready
 */
async function waitForServers() {
    const maxRetries = 30;
    const retryDelay = 2000;

    for (let i = 0; i < maxRetries; i++) {
        try {
            // Check backend health
            const backendResponse = await fetch('http://localhost:3001/health');
            if (!backendResponse.ok) throw new Error('Backend not ready');

            // Check frontend
            const frontendResponse = await fetch('http://localhost:3000');
            if (!frontendResponse.ok) throw new Error('Frontend not ready');

            console.log('✅ Both servers are ready');
            return;
        } catch (error) {
            console.log(`⏳ Waiting for servers... (${i + 1}/${maxRetries})`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }

    throw new Error('Servers failed to start within timeout');
}

module.exports = globalSetup; 