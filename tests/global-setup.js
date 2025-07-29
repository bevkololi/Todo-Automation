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
    const maxRetries = 60; // Increased from 30 to 60
    const retryDelay = 2000;

    console.log('⏳ Waiting for servers to start...');

    for (let i = 0; i < maxRetries; i++) {
        try {
            // Check backend health
            console.log(`🔍 Checking backend (attempt ${i + 1}/${maxRetries})...`);
            const backendResponse = await fetch('http://localhost:3001/health');
            if (!backendResponse.ok) {
                console.log(`❌ Backend not ready: ${backendResponse.status} ${backendResponse.statusText}`);
                throw new Error('Backend not ready');
            }
            console.log('✅ Backend is ready');

            // Check frontend
            console.log(`🔍 Checking frontend (attempt ${i + 1}/${maxRetries})...`);
            const frontendResponse = await fetch('http://localhost:3000');
            if (!frontendResponse.ok) {
                console.log(`❌ Frontend not ready: ${frontendResponse.status} ${frontendResponse.statusText}`);
                throw new Error('Frontend not ready');
            }
            console.log('✅ Frontend is ready');

            console.log('✅ Both servers are ready');
            return;
        } catch (error) {
            console.log(`⏳ Waiting for servers... (${i + 1}/${maxRetries}) - ${error.message}`);
            await new Promise(resolve => setTimeout(resolve, retryDelay));
        }
    }

    console.log('❌ Server startup timeout reached');
    console.log('💡 Make sure backend and frontend servers are running on ports 3001 and 3000');
    throw new Error('Servers failed to start within timeout');
}

module.exports = globalSetup; 