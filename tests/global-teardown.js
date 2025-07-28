/**
 * Global teardown that runs once after all tests
 * Cleans up resources and performs final cleanup
 */
async function globalTeardown() {
    console.log('🧹 Starting global teardown...');

    try {
        // Clear all todos from the backend (clean slate for next test run)
        await clearAllTodos();
        console.log('✅ Test data cleaned up');
    } catch (error) {
        console.log('⚠️ Warning: Could not clean up test data:', error.message);
    }

    console.log('✅ Global teardown completed');
}

/**
 * Clear all todos from the backend API
 */
async function clearAllTodos() {
    try {
        const response = await fetch('http://localhost:3001/items', {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer fake-jwt-token',
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to clear todos: ${response.status}`);
        }
    } catch (error) {
        console.log('Could not clear todos:', error.message);
    }
}

module.exports = globalTeardown; 