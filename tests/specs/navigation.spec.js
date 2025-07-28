const { test, expect } = require('../fixtures/test-fixtures');
const { SELECTORS, TestData } = require('../utils/test-helpers');

/**
 * Navigation Tests
 * Tests side menu navigation, different views, and responsive behavior
 */
test.describe('Navigation and Views', () => {
    test.afterEach(async ({ pageHelper }) => {
        await pageHelper.logout();
    });

    test('User can navigate to My Todos view', async ({ authenticatedPage, pageHelper }) => {
        await pageHelper.setupTestData();

        await pageHelper.navigateToView('todos');

        await expect(authenticatedPage.locator('.content-header h2')).toHaveText('My Todo List');
        await expect(authenticatedPage.locator('.content-header p')).toHaveText('Manage your tasks and stay organized');

        await expect(authenticatedPage.locator('text=Pending Task 1')).toBeVisible();
        await expect(authenticatedPage.locator('text=Pending Task 2')).toBeVisible();
        await expect(authenticatedPage.locator('text=Completed Task 1')).toBeVisible();
        await expect(authenticatedPage.locator('text=Completed Task 2')).toBeVisible();

        await expect(authenticatedPage.locator(SELECTORS.ADD_TODO_FORM)).toBeVisible();
    });

    test('User can navigate to Completed todos view', async ({ authenticatedPage, pageHelper }) => {
        await pageHelper.setupTestData();

        await pageHelper.navigateToView('completed');

        await expect(authenticatedPage.locator('.content-header h2')).toHaveText('Completed Tasks');
        await expect(authenticatedPage.locator('.content-header p')).toHaveText('Tasks you have completed');

        await expect(authenticatedPage.locator('text=Completed Task 1')).toBeVisible();
        await expect(authenticatedPage.locator('text=Completed Task 2')).toBeVisible();

        await expect(authenticatedPage.locator('text=Pending Task 1')).not.toBeVisible();
        await expect(authenticatedPage.locator('text=Pending Task 2')).not.toBeVisible();

        await expect(authenticatedPage.locator(SELECTORS.ADD_TODO_FORM)).not.toBeVisible();
    });

    test('User can navigate to Pending todos view', async ({ authenticatedPage, pageHelper }) => {
        await pageHelper.setupTestData();

        await pageHelper.navigateToView('pending');

        await expect(authenticatedPage.locator('.content-header h2')).toHaveText('Pending Tasks');
        await expect(authenticatedPage.locator('.content-header p')).toHaveText('Tasks that need your attention');

        await expect(authenticatedPage.locator('text=Pending Task 1')).toBeVisible();
        await expect(authenticatedPage.locator('text=Pending Task 2')).toBeVisible();

        await expect(authenticatedPage.locator('text=Completed Task 1')).not.toBeVisible();
        await expect(authenticatedPage.locator('text=Completed Task 2')).not.toBeVisible();

        await expect(authenticatedPage.locator(SELECTORS.ADD_TODO_FORM)).toBeVisible();
    });

    test('User can see correct todo counts in navigation', async ({ authenticatedPage, api, pageHelper }) => {
        const customTodos = [
            { title: 'Test Todo 1', completed: false },
            { title: 'Test Todo 2', completed: true },
            { title: 'Test Todo 3', completed: false }
        ];
        await pageHelper.setupTestData(customTodos);

        const apiTodos = await api.getTodos();
        const expectedCount = apiTodos.length;

        const todoCount = await pageHelper.getTodoCount();
        expect(todoCount).toBe(expectedCount);

        const badge = authenticatedPage.locator(SELECTORS.NAV_ITEM).filter({ hasText: 'My Todos' }).locator('.badge');
        await expect(badge).toHaveText(expectedCount.toString());
    });

    test('User can see empty state for completed view when no completed todos', async ({ authenticatedPage, api, pageHelper }) => {
        const customTodos = [
            { title: 'Only Pending Task', completed: false }
        ];
        await pageHelper.setupTestData(customTodos);

        await pageHelper.navigateToView('completed');

        // Wait for empty state to be visible before checking text
        await authenticatedPage.waitForSelector('[data-testid="empty-state"]');

        await expect(authenticatedPage.locator('[data-testid="empty-state-title"]')).toHaveText('No completed tasks yet');
        await expect(authenticatedPage.locator('[data-testid="empty-state-description"]')).toHaveText('Complete some tasks to see them here!');
    });

    test('User can see empty state for pending view when no pending todos', async ({ authenticatedPage, api, pageHelper }) => {
        const customTodos = [
            { title: 'Only Completed Task', completed: true }
        ];
        await pageHelper.setupTestData(customTodos);

        await pageHelper.navigateToView('pending');

        // Wait for empty state to be visible before checking text
        await authenticatedPage.waitForSelector('[data-testid="empty-state"]');

        await expect(authenticatedPage.locator('[data-testid="empty-state-title"]')).toHaveText('No pending tasks');
        await expect(authenticatedPage.locator('[data-testid="empty-state-description"]')).toHaveText('All caught up! No pending tasks.');
    });

    test('User can see empty state for todos view when no todos', async ({ authenticatedPage, pageHelper }) => {
        await pageHelper.setupEmptyState();

        await expect(authenticatedPage.locator('[data-testid="empty-state-title"]')).toHaveText('No todos yet');
        await expect(authenticatedPage.locator('[data-testid="empty-state-description"]')).toHaveText('Add your first task to get started!');
    });

    test('Correct tab is highlighted when navigating to different views', async ({ authenticatedPage, pageHelper }) => {
        const myTodosNav = authenticatedPage.locator(SELECTORS.NAV_ITEM).filter({ hasText: 'My Todos' });
        await expect(myTodosNav).toHaveClass(/active/);

        await pageHelper.navigateToView('completed');
        const completedNav = authenticatedPage.locator(SELECTORS.NAV_ITEM).filter({ hasText: 'Completed' });
        await expect(completedNav).toHaveClass(/active/);
        await expect(myTodosNav).not.toHaveClass(/active/);

        await pageHelper.navigateToView('pending');
        const pendingNav = authenticatedPage.locator(SELECTORS.NAV_ITEM).filter({ hasText: 'Pending' });
        await expect(pendingNav).toHaveClass(/active/);
        await expect(completedNav).not.toHaveClass(/active/);
    });

    test('User can add todo from pending view', async ({ authenticatedPage, pageHelper }) => {
        const customTodos = [
            { title: 'Existing Pending Todo', completed: false }
        ];
        await pageHelper.setupTestData(customTodos);

        await pageHelper.navigateToView('pending');

        const newTodo = TestData.generateTodoTitle('From Pending View');
        await pageHelper.addTodo(newTodo);

        await expect(authenticatedPage.locator(`text=${newTodo}`)).toBeVisible();
        await pageHelper.waitForBanner('Todo added successfully!', 'success');
    });

    test('Todo count is correct on UI after updating a todo via API', async ({ authenticatedPage, api, pageHelper }) => {
        const customTodos = [
            { title: 'Pending Task 1', completed: false },
            { title: 'Pending Task 2', completed: false },
            { title: 'Completed Task 1', completed: true }
        ];
        await pageHelper.setupTestData(customTodos);

        const initialApiTodos = await api.getTodos();
        const initialCount = await pageHelper.getTodoCount();
        expect(initialCount).toBe(initialApiTodos.length);

        await pageHelper.toggleTodo('Pending Task 1');

        const updatedApiTodos = await api.getTodos();
        const updatedCount = await pageHelper.getTodoCount();
        expect(updatedCount).toBe(updatedApiTodos.length);

        await pageHelper.navigateToView('completed');
        await expect(authenticatedPage.locator('text=Pending Task 1')).toBeVisible();
    });
}); 