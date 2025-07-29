const { expect } = require('@playwright/test');

/**
 * Test helper utilities following Playwright best practices
 * Provides robust selectors, API helpers, and common test functions
 */

// Robust selectors using data attributes and semantic queries
const SELECTORS = {
    // Login page
    LOGIN_FORM: '[data-testid="login-form"]',
    USERNAME_INPUT: '[data-testid="username-input"]',
    PASSWORD_INPUT: '[data-testid="password-input"]',
    LOGIN_BUTTON: '[data-testid="login-button"]',

    // Side menu
    SIDE_MENU: '[data-testid="side-menu"]',
    NAV_ITEM: '[data-testid="nav-item"]',
    LOGOUT_BUTTON: '[data-testid="logout-btn"]',

    // Todo list
    TODO_CONTAINER: '.todo-container',
    ADD_TODO_FORM: '[data-testid="add-todo-form"]',
    ADD_TODO_INPUT: '[data-testid="add-todo-input"]',
    TODO_LIST: '[data-testid="todo-list"]',
    TODO_ITEM: '[data-testid="todo-item"]',
    TODO_CHECKBOX: '[data-testid="todo-checkbox"]',
    TODO_TITLE: '[data-testid="todo-title"]',
    TODO_ACTIONS: '.todo-actions',
    EDIT_BUTTON: '[data-testid="edit-btn"]',
    EDIT_TODO_INPUT: '[data-testid="edit-todo-input"]',
    DELETE_BUTTON: '[data-testid="delete-btn"]',
    CLEAR_ALL_BUTTON: '[data-testid="clear-all-btn"]',

    // Modal
    MODAL_OVERLAY: '[data-testid="modal-overlay"]',
    MODAL: '[data-testid="modal"]',
    MODAL_CONFIRM_BUTTON: '[data-testid="modal-confirm-btn"]',
    MODAL_CANCEL_BUTTON: '[data-testid="modal-cancel-btn"]',

    // Banner
    BANNER: '[data-testid="banner"]',
    BANNER_SUCCESS: '[data-testid="banner"].success',
    BANNER_ERROR: '[data-testid="banner"].error',
    BANNER_CLOSE: '[data-testid="banner-close"]',

    // Content
    MAIN_CONTENT: '.main-content',
    CONTENT_HEADER: '.content-header',
};

/**
 * API helper functions for direct backend testing
 */
class APIHelper {
    constructor(baseURL = 'http://localhost:3001') {
        this.baseURL = baseURL;
        this.token = 'fake-jwt-token';
    }

    async login(username = 'admin', password = 'admin') {
        const response = await fetch(`${this.baseURL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });

        if (!response.ok) {
            throw new Error(`Login failed: ${response.status}`);
        }

        return response.json();
    }

    async createTodo(title, completed = false) {
        const response = await fetch(`${this.baseURL}/items`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title, completed })
        });

        if (!response.ok) {
            throw new Error(`Create todo failed: ${response.status}`);
        }

        return response.json();
    }

    async getTodos() {
        const response = await fetch(`${this.baseURL}/items`, {
            headers: { 'Authorization': `Bearer ${this.token}` }
        });

        if (!response.ok) {
            throw new Error(`Get todos failed: ${response.status}`);
        }

        return response.json();
    }

    async deleteTodo(id) {
        const response = await fetch(`${this.baseURL}/items/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${this.token}` }
        });

        if (!response.ok) {
            throw new Error(`Delete todo failed: ${response.status}`);
        }

        return response.json();
    }

    async clearAllTodos() {
        const response = await fetch(`${this.baseURL}/items`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${this.token}` }
        });

        if (!response.ok) {
            throw new Error(`Clear todos failed: ${response.status}`);
        }

        return response.json();
    }
}

/**
 * Page object helper for common page interactions
 */
class PageHelper {
    constructor(page) {
        this.page = page;
    }

    /**
     * Login to the application
     */
    async login(username = 'admin', password = 'admin') {
        await this.page.goto('/');

        // Wait for login form to be visible
        await this.page.waitForSelector(SELECTORS.LOGIN_FORM);

        // Fill login form
        await this.page.fill(SELECTORS.USERNAME_INPUT, username);
        await this.page.fill(SELECTORS.PASSWORD_INPUT, password);

        // Submit form
        await this.page.click(SELECTORS.LOGIN_BUTTON);

        // Wait for successful login (side menu should appear)
        await this.page.waitForSelector(SELECTORS.SIDE_MENU);
    }

    /**
     * Add a new todo
     */
    async addTodo(title) {
        await this.page.fill(SELECTORS.ADD_TODO_INPUT, title);
        await this.page.press(SELECTORS.ADD_TODO_INPUT, 'Enter');

        // Wait for the todo to appear in the list
        await this.page.waitForSelector(`text=${title}`);
    }

    /**
     * Toggle todo completion
     */
    async toggleTodo(title) {
        const todoItem = this.page.locator(SELECTORS.TODO_ITEM).filter({ hasText: title });
        const checkbox = todoItem.locator(SELECTORS.TODO_CHECKBOX);
        await checkbox.click();
    }

    /**
     * Delete a todo with confirmation
     */
    async deleteTodo(title) {
        const todoItem = this.page.locator(SELECTORS.TODO_ITEM).filter({ hasText: title });
        const deleteButton = todoItem.locator(SELECTORS.DELETE_BUTTON);

        await deleteButton.click();

        // Wait for confirmation modal
        await this.page.waitForSelector(SELECTORS.MODAL_OVERLAY);

        // Confirm deletion
        await this.page.click(SELECTORS.MODAL_CONFIRM_BUTTON);

        // Wait for modal to disappear
        await this.page.waitForSelector(SELECTORS.MODAL_OVERLAY, { state: 'hidden' });
    }

    /**
     * Navigate to a specific view
     */
    async navigateToView(viewName) {
        const viewMap = {
            'todos': 'My Todos',
            'completed': 'Completed',
            'pending': 'Pending'
        };

        const navItem = this.page.locator(SELECTORS.NAV_ITEM).filter({ hasText: viewMap[viewName] });
        await navItem.click();
    }

    /**
     * Wait for banner to appear and check its content
     */
    async waitForBanner(message, type = 'success') {
        const banner = type === 'success' ? SELECTORS.BANNER_SUCCESS : SELECTORS.BANNER_ERROR;
        await this.page.waitForSelector(banner);

        const bannerText = await this.page.locator(banner).textContent();
        expect(bannerText).toContain(message);
    }

    /**
     * Set up empty state for tests
     */
    async setupEmptyState() {
        const api = new APIHelper();
        await api.clearAllTodos();
        await this.page.reload();
        await this.page.waitForSelector(SELECTORS.TODO_LIST);
    }

    /**
     * Set up test data with common todo patterns
     */
    async setupTestData(todos = null) {
        // Clear existing todos
        const api = new APIHelper();
        await api.clearAllTodos();

        // Use default test data if none provided
        if (!todos) {
            todos = [
                { title: 'Pending Task 1', completed: false },
                { title: 'Pending Task 2', completed: false },
                { title: 'Completed Task 1', completed: true },
                { title: 'Completed Task 2', completed: true }
            ];
        }

        // Create todos
        for (const todo of todos) {
            await api.createTodo(todo.title, todo.completed);
        }

        // Refresh page to ensure UI reflects the updated state
        await this.page.reload();
        await this.page.waitForSelector(SELECTORS.TODO_LIST);
    }

    /**
     * Get todo count from side menu badge
     */
    async getTodoCount() {
        const badge = this.page.locator(SELECTORS.NAV_ITEM).filter({ hasText: 'My Todos' }).locator('.badge');
        const countText = await badge.textContent();
        return parseInt(countText) || 0;
    }

    /**
     * Logout from the application
     */
    async logout() {
        await this.page.click(SELECTORS.LOGOUT_BUTTON);
        await this.page.waitForSelector(SELECTORS.LOGIN_FORM);
    }
}

/**
 * Test data generator
 */
class TestData {
    static generateTodoTitle(prefix = 'Test Todo') {
        return `${prefix} ${Date.now()}`;
    }

    static getTestTodos() {
        return [
            'Buy groceries',
            'Walk the dog',
            'Read a book',
            'Call mom',
            'Exercise'
        ];
    }
}

module.exports = {
    SELECTORS,
    APIHelper,
    PageHelper,
    TestData
}; 