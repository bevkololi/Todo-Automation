const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

// In-memory storage for todos
let todos = [];
let idCounter = 1;

// Helper function to validate todo data
const validateTodo = (todo) => {
    if (!todo.title || typeof todo.title !== 'string' || todo.title.trim().length === 0) {
        return { valid: false, error: 'Title is required and must be a non-empty string' };
    }
    if (todo.title.length > 255) {
        return { valid: false, error: 'Title must be less than 255 characters' };
    }
    return { valid: true };
};

// Authentication middleware (simple implementation for demo)
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ error: 'Access token required' });
    }

    // Simple token validation for demo purposes
    if (token === 'fake-jwt-token') {
        next();
    } else {
        res.status(403).json({ error: 'Invalid token' });
    }
};

// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required' });
    }

    if (username === 'admin' && password === 'admin') {
        res.status(200).json({
            token: 'fake-jwt-token',
            user: { username: 'admin', role: 'admin' }
        });
    } else {
        res.status(401).json({ error: 'Invalid credentials' });
    }
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'OK',
        timestamp: new Date().toISOString(),
        todoCount: todos.length
    });
});

// GET all todos
app.get('/items', authenticateToken, (req, res) => {
    try {
        res.json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// POST create new todo
app.post('/items', authenticateToken, (req, res) => {
    try {
        const validation = validateTodo(req.body);
        if (!validation.valid) {
            return res.status(400).json({ error: validation.error });
        }

        const newTodo = {
            id: idCounter++,
            title: req.body.title.trim(),
            completed: req.body.completed || false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };

        todos.push(newTodo);
        res.status(201).json(newTodo);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE all todos (useful for testing) - MUST come before /items/:id
app.delete('/items', authenticateToken, (req, res) => {
    try {
        const deletedCount = todos.length;
        todos = [];
        idCounter = 1;
        res.status(200).json({ message: 'All todos deleted successfully', deletedCount });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET single todo by ID
app.get('/items/:id', authenticateToken, (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const todo = todos.find(t => t.id === id);

        if (!todo) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        res.json(todo);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT update todo
app.put('/items/:id', authenticateToken, (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = todos.findIndex(t => t.id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        const validation = validateTodo(req.body);
        if (!validation.valid) {
            return res.status(400).json({ error: validation.error });
        }

        todos[index] = {
            ...todos[index],
            title: req.body.title.trim(),
            completed: req.body.completed !== undefined ? req.body.completed : todos[index].completed,
            updatedAt: new Date().toISOString()
        };

        res.json(todos[index]);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PATCH update todo completion status
app.patch('/items/:id/toggle', authenticateToken, (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = todos.findIndex(t => t.id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        todos[index].completed = !todos[index].completed;
        todos[index].updatedAt = new Date().toISOString();

        res.json(todos[index]);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// DELETE todo
app.delete('/items/:id', authenticateToken, (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const index = todos.findIndex(t => t.id === id);

        if (index === -1) {
            return res.status(404).json({ error: 'Todo not found' });
        }

        const deletedTodo = todos.splice(index, 1)[0];
        res.status(200).json({ message: 'Todo deleted successfully', deletedTodo });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// 404 handler
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

// Error handling middleware
app.use((error, req, res, next) => {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
    console.log(`🚀 Todo API server running at http://localhost:${port}`);
    console.log(`📝 Available endpoints:`);
    console.log(`   POST /login - Login with username/password`);
    console.log(`   GET /health - Health check`);
    console.log(`   GET /items - Get all todos`);
    console.log(`   POST /items - Create new todo`);
    console.log(`   DELETE /items - Delete all todos (testing)`);
    console.log(`   GET /items/:id - Get single todo`);
    console.log(`   PUT /items/:id - Update todo`);
    console.log(`   PATCH /items/:id/toggle - Toggle todo completion`);
    console.log(`   DELETE /items/:id - Delete single todo`);
}); 