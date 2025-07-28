const base = require('@playwright/test').test;
const { APIHelper, PageHelper } = require('../utils/test-helpers');

/**
 * Custom test fixtures extending Playwright's base test
 * Provides authenticated API and page helpers for all tests
 */

// Extend the base test with custom fixtures
const test = base.extend({
    // API helper with authentication
    api: async ({ }, use) => {
        const api = new APIHelper();
        await use(api);
    },

    // Page helper for common interactions
    pageHelper: async ({ page }, use) => {
        const pageHelper = new PageHelper(page);
        await use(pageHelper);
    },

    // Authenticated page (automatically logs in)
    authenticatedPage: async ({ page, pageHelper }, use) => {
        await pageHelper.login();
        await use(page);
    },

    // API with pre-authenticated token
    authenticatedApi: async ({ api }, use) => {
        // Login to get token (though we use the fixed token for demo)
        await api.login();
        await use(api);
    },
});

// Export the extended test
module.exports = {
    test,
    expect: base.expect
};