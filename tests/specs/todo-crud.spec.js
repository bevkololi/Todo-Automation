const { test, expect } = require('../fixtures/test-fixtures');
const { SELECTORS, TestData } = require('../utils/test-helpers');

/**
 * Todo CRUD Tests
 * Tests create, read, update, delete operations for todos
 */
test.describe('Todo CRUD Operations', () => {
    test.beforeEach(async ({ authenticatedPage, api }) => {
        await api.clearAllTodos();
    });

    test.afterEach(async ({ pageHelper }) => {
        await pageHelper.logout();
    });

    test('User can create a new todo', async ({ authenticatedPage, pageHelper }) => {
        const todoTitle = TestData.generateTodoTitle('Create Test');
        await pageHelper.addTodo(todoTitle);
        await expect(authenticatedPage.locator(`text=${todoTitle}`)).toBeVisible();
        await pageHelper.waitForBanner('Todo added successfully!', 'success');
        const todoCount = await pageHelper.getTodoCount();
        expect(todoCount).toBe(1);
    });

    test('User can create multiple todos', async ({ authenticatedPage, pageHelper }) => {
        const todos = TestData.getTestTodos();
        for (const todo of todos) {
            await pageHelper.addTodo(todo);
        }
        for (const todo of todos) {
            await expect(authenticatedPage.locator(`text=${todo}`)).toBeVisible();
        }
        const todoCount = await pageHelper.getTodoCount();
        expect(todoCount).toBe(todos.length);
    });

    test('User cannot create todo with empty title', async ({ authenticatedPage, pageHelper }) => {
        await pageHelper.setupEmptyState();

        await authenticatedPage.fill(SELECTORS.ADD_TODO_INPUT, '');
        await authenticatedPage.press(SELECTORS.ADD_TODO_INPUT, 'Enter');
        await expect(authenticatedPage.locator(SELECTORS.TODO_ITEM)).toHaveCount(0);
    });

    test('User can toggle todo to completion', async ({ authenticatedPage, pageHelper }) => {
        const todoTitle = TestData.generateTodoTitle('Toggle Test');
        await pageHelper.addTodo(todoTitle);
        await pageHelper.toggleTodo(todoTitle);
        const todoItem = authenticatedPage.locator(SELECTORS.TODO_ITEM).filter({ hasText: todoTitle });
        const checkbox = todoItem.locator(SELECTORS.TODO_CHECKBOX);
        await expect(checkbox).toBeChecked();
        await pageHelper.waitForBanner('Todo status updated!', 'success');
    });

    test('User can edit todo title', async ({ authenticatedPage, pageHelper }) => {
        const originalTitle = TestData.generateTodoTitle('Edit Test');
        const newTitle = 'Updated Todo Title';
        await pageHelper.addTodo(originalTitle);

        const todoItem = authenticatedPage.locator(SELECTORS.TODO_ITEM).filter({ hasText: originalTitle });
        const editButton = todoItem.locator(SELECTORS.EDIT_BUTTON);
        await editButton.click();

        await authenticatedPage.waitForSelector('input[type="text"]:focus');
        const titleInput = authenticatedPage.locator('input[type="text"]:focus');
        await expect(titleInput).toHaveValue(originalTitle);

        await titleInput.fill('');
        await titleInput.fill(newTitle);
        await titleInput.press('Enter');

        await expect(authenticatedPage.locator(`text=${newTitle}`)).toBeVisible();
        await expect(authenticatedPage.locator(`text=${originalTitle}`)).not.toBeVisible();

        await pageHelper.waitForBanner('Todo updated successfully!', 'success');
    });

    test('User can delete todo with confirmation', async ({ authenticatedPage, pageHelper }) => {
        await pageHelper.setupEmptyState();

        const todoTitle = TestData.generateTodoTitle('Delete Test');
        await pageHelper.addTodo(todoTitle);
        await expect(authenticatedPage.locator(`text=${todoTitle}`)).toBeVisible();

        await pageHelper.deleteTodo(todoTitle);

        await expect(authenticatedPage.locator(`text=${todoTitle}`)).not.toBeVisible();

        await pageHelper.waitForBanner('Todo deleted successfully!', 'success');

        // Verify todo count decreases
        const todoCount = await pageHelper.getTodoCount();
        expect(todoCount).toBe(0);
    });

    test('User can cancel todo deletion', async ({ authenticatedPage, pageHelper }) => {
        const todoTitle = TestData.generateTodoTitle('Cancel Delete Test');
        await pageHelper.addTodo(todoTitle);

        const todoItem = authenticatedPage.locator(SELECTORS.TODO_ITEM).filter({ hasText: todoTitle });
        const deleteButton = todoItem.locator(SELECTORS.DELETE_BUTTON);
        await deleteButton.click();

        await authenticatedPage.waitForSelector(SELECTORS.MODAL_OVERLAY);

        // Cancel deletion
        await authenticatedPage.click(SELECTORS.MODAL_CANCEL_BUTTON);

        // Wait for modal to disappear
        await authenticatedPage.waitForSelector(SELECTORS.MODAL_OVERLAY, { state: 'hidden' });

        // Verify todo still exists
        await expect(authenticatedPage.locator(`text=${todoTitle}`)).toBeVisible();
    });

}); 