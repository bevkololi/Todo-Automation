import React, { useState, useEffect } from 'react';
import './App.css';
import SideMenu from './components/SideMenu';
import TodoList from './components/TodoList';
import Login from './components/Login';
import Banner from './components/Banner';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentView, setCurrentView] = useState('todos');
  const [banner, setBanner] = useState(null);
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState(null);

  const API_BASE_URL = 'http://localhost:3001';

  // Show banner message
  const showBanner = (message, type = 'success') => {
    setBanner({ message, type });
    setTimeout(() => setBanner(null), 3000);
  };

  // API helper function
  const apiCall = async (endpoint, options = {}) => {
    const token = localStorage.getItem('token');
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
      },
      ...options
    };

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Something went wrong');
      }

      return data;
    } catch (error) {
      throw error;
    }
  };

  // Login function
  const handleLogin = async (username, password) => {
    setLoading(true);
    try {
      const data = await apiCall('/login', {
        method: 'POST',
        body: JSON.stringify({ username, password })
      });

      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      showBanner('Login successful!', 'success');
      fetchTodos();
    } catch (error) {
      showBanner(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setTodos([]);
    showBanner('Logged out successfully', 'success');
  };

  // Fetch todos
  const fetchTodos = async () => {
    try {
      const data = await apiCall('/items');
      setTodos(data);
    } catch (error) {
      showBanner('Failed to fetch todos', 'error');
    }
  };

  // Add todo
  const addTodo = async (title) => {
    try {
      await apiCall('/items', {
        method: 'POST',
        body: JSON.stringify({ title, completed: false })
      });
      await fetchTodos();
      showBanner('Todo added successfully!', 'success');
    } catch (error) {
      showBanner(error.message, 'error');
    }
  };

  // Update todo
  const updateTodo = async (id, updates) => {
    try {
      await apiCall(`/items/${id}`, {
        method: 'PUT',
        body: JSON.stringify(updates)
      });
      await fetchTodos();
      showBanner('Todo updated successfully!', 'success');
    } catch (error) {
      showBanner(error.message, 'error');
    }
  };

  // Toggle todo completion
  const toggleTodo = async (id) => {
    try {
      await apiCall(`/items/${id}/toggle`, {
        method: 'PATCH'
      });
      await fetchTodos();
      showBanner('Todo status updated!', 'success');
    } catch (error) {
      showBanner(error.message, 'error');
    }
  };

  // Show delete confirmation
  const showDeleteConfirmation = (todo) => {
    setDeleteConfirmation({
      todo,
      message: `Are you sure you want to delete "${todo.title}"?`
    });
  };

  // Confirm deletion
  const confirmDelete = async () => {
    if (deleteConfirmation) {
      try {
        await apiCall(`/items/${deleteConfirmation.todo.id}`, {
          method: 'DELETE'
        });
        await fetchTodos();
        showBanner('Todo deleted successfully!', 'success');
      } catch (error) {
        showBanner(error.message, 'error');
      }
      setDeleteConfirmation(null);
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setDeleteConfirmation(null);
  };

  // Delete todo (now shows confirmation first)
  const deleteTodo = (todo) => {
    showDeleteConfirmation(todo);
  };

  // Clear all todos
  const clearAllTodos = async () => {
    try {
      await apiCall('/items', {
        method: 'DELETE'
      });
      setTodos([]);
      showBanner('All todos cleared!', 'success');
    } catch (error) {
      showBanner(error.message, 'error');
    }
  };

  // Filter todos based on current view
  const getFilteredTodos = () => {
    switch (currentView) {
      case 'completed':
        return todos.filter(todo => todo.completed);
      case 'pending':
        return todos.filter(todo => !todo.completed);
      default:
        return todos;
    }
  };

  // Check authentication on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
      fetchTodos();
    }
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="app">
        <Login onLogin={handleLogin} loading={loading} />
        {banner && <Banner {...banner} onClose={() => setBanner(null)} />}
      </div>
    );
  }

  return (
    <div className="app">
      <SideMenu
        currentView={currentView}
        onViewChange={setCurrentView}
        onLogout={handleLogout}
        todoCount={todos.length}
      />
      <main className="main-content">
        <TodoList
          todos={getFilteredTodos()}
          currentView={currentView}
          onAddTodo={addTodo}
          onUpdateTodo={updateTodo}
          onToggleTodo={toggleTodo}
          onDeleteTodo={deleteTodo}
          onClearAll={clearAllTodos}
          loading={loading}
        />
      </main>
      {banner && <Banner {...banner} onClose={() => setBanner(null)} />}

      {/* Delete Confirmation Modal */}
      {deleteConfirmation && (
        <div className="modal-overlay" data-testid="modal-overlay">
          <div className="modal" data-testid="modal">
            <div className="modal-header">
              <h3>Confirm Deletion</h3>
            </div>
            <div className="modal-body">
              <p>{deleteConfirmation.message}</p>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" data-testid="modal-cancel-btn" onClick={cancelDelete}>
                Cancel
              </button>
              <button className="btn-delete" data-testid="modal-confirm-btn" onClick={confirmDelete}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
