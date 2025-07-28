const { test, expect } = require('../fixtures/test-fixtures');
const { APIHelper } = require('../utils/test-helpers');

/**
 * API Tests
 * Direct backend testing to ensure API endpoints work correctly
 */
test.describe('API Endpoints', () => {
    let api;

    test.beforeEach(async ({ api: apiFixture }) => {
        api = apiFixture;
        // Clear all todos before each test
        await api.clearAllTodos();
    });

    test('API should login successfully with valid credentials', async () => {
        const response = await api.login('admin', 'admin');

        expect(response).toHaveProperty('token');
        expect(response).toHaveProperty('user');
        expect(response.token).toBe('fake-jwt-token');
        expect(response.user.username).toBe('admin');
    });

    test('API should fail login with invalid credentials', async () => {
        await expect(api.login('invalid', 'invalid')).rejects.toThrow('Login failed: 401');
    });

    test('APIshould create a new todo', async () => {
        const todoData = {
            title: 'API Test Todo',
            completed: false
        };

        const response = await api.createTodo(todoData.title, todoData.completed);

        expect(response).toHaveProperty('id');
        expect(response).toHaveProperty('title', todoData.title);
        expect(response).toHaveProperty('completed', todoData.completed);
        expect(response).toHaveProperty('createdAt');
        expect(response).toHaveProperty('updatedAt');
    });

    test('APIshould get all todos', async () => {
        // Create some todos first
        await api.createTodo('Todo 1', false);
        await api.createTodo('Todo 2', true);

        const todos = await api.getTodos();

        expect(Array.isArray(todos)).toBe(true);
        expect(todos).toHaveLength(2);
        expect(todos[0]).toHaveProperty('title', 'Todo 1');
        expect(todos[1]).toHaveProperty('title', 'Todo 2');
    });

    test('API should delete a specific todo', async () => {
        // Create a todo first
        const createdTodo = await api.createTodo('Todo to Delete', false);

        // Delete the todo
        const response = await api.deleteTodo(createdTodo.id);

        expect(response).toHaveProperty('message', 'Todo deleted successfully');
        expect(response).toHaveProperty('deletedTodo');
        expect(response.deletedTodo.id).toBe(createdTodo.id);

        // Verify todo is deleted
        const todos = await api.getTodos();
        expect(todos).toHaveLength(0);
    });

    test('API should clear all todos', async () => {
        // Create multiple todos
        await api.createTodo('Todo 1', false);
        await api.createTodo('Todo 2', true);
        await api.createTodo('Todo 3', false);

        // Clear all todos
        const response = await api.clearAllTodos();

        expect(response).toHaveProperty('message', 'All todos deleted successfully');
        expect(response).toHaveProperty('deletedCount', 3);

        // Verify all todos are deleted
        const todos = await api.getTodos();
        expect(todos).toHaveLength(0);
    });

    test('should handle health check endpoint', async () => {
        const response = await fetch('http://localhost:3001/health');
        const data = await response.json();

        expect(response.status).toBe(200);
        expect(data).toHaveProperty('status', 'OK');
        expect(data).toHaveProperty('timestamp');
        expect(data).toHaveProperty('todoCount');
    });

    test('API should handle invalid todo creation', async () => {
        // Try to create todo with empty title
        const response = await fetch('http://localhost:3001/items', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer fake-jwt-token',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ title: '', completed: false })
        });

        expect(response.status).toBe(400);
        const error = await response.json();
        expect(error).toHaveProperty('error');
    });

    test('API should handle unauthorized access', async () => {
        // Try to access protected endpoint without token
        const response = await fetch('http://localhost:3001/items');

        expect(response.status).toBe(401);
        const error = await response.json();
        expect(error).toHaveProperty('error', 'Access token required');
    });

    test('API should handle invalid token', async () => {
        // Try to access protected endpoint with invalid token
        const response = await fetch('http://localhost:3001/items', {
            headers: {
                'Authorization': 'Bearer invalid-token'
            }
        });

        expect(response.status).toBe(403);
        const error = await response.json();
        expect(error).toHaveProperty('error', 'Invalid token');
    });

    test('API should handle non-existent todo deletion', async () => {
        // Try to delete a todo that doesn't exist
        const response = await fetch('http://localhost:3001/items/999', {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer fake-jwt-token'
            }
        });

        expect(response.status).toBe(404);
        const error = await response.json();
        expect(error).toHaveProperty('error', 'Todo not found');
    });

    test('API should handle todo toggle endpoint', async () => {
        // Create a todo
        const createdTodo = await api.createTodo('Toggle Test Todo', false);

        // Toggle the todo
        const response = await fetch(`http://localhost:3001/items/${createdTodo.id}/toggle`, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer fake-jwt-token'
            }
        });

        expect(response.status).toBe(200);
        const updatedTodo = await response.json();
        expect(updatedTodo.completed).toBe(true);

        // Toggle again
        const response2 = await fetch(`http://localhost:3001/items/${createdTodo.id}/toggle`, {
            method: 'PATCH',
            headers: {
                'Authorization': 'Bearer fake-jwt-token'
            }
        });

        expect(response2.status).toBe(200);
        const updatedTodo2 = await response2.json();
        expect(updatedTodo2.completed).toBe(false);
    });

    test('API should handle todo update endpoint', async () => {
        // Create a todo
        const createdTodo = await api.createTodo('Update Test Todo', false);

        // Update the todo
        const response = await fetch(`http://localhost:3001/items/${createdTodo.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': 'Bearer fake-jwt-token',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: 'Updated Todo Title',
                completed: true
            })
        });

        expect(response.status).toBe(200);
        const updatedTodo = await response.json();
        expect(updatedTodo.title).toBe('Updated Todo Title');
        expect(updatedTodo.completed).toBe(true);
    });
}); 