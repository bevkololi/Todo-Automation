import React, { useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todos, currentView, onAddTodo, onUpdateTodo, onToggleTodo, onDeleteTodo, onClearAll, loading }) => {
    const [newTodoTitle, setNewTodoTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (newTodoTitle.trim()) {
            onAddTodo(newTodoTitle.trim());
            setNewTodoTitle('');
        }
    };

    const getViewTitle = () => {
        switch (currentView) {
            case 'completed':
                return 'Completed Tasks';
            case 'pending':
                return 'Pending Tasks';
            default:
                return 'My Todo List';
        }
    };

    const getViewDescription = () => {
        switch (currentView) {
            case 'completed':
                return 'Tasks you have completed';
            case 'pending':
                return 'Tasks that need your attention';
            default:
                return 'Manage your tasks and stay organized';
        }
    };

    const shouldShowAddForm = currentView === 'todos' || currentView === 'pending';

    if (loading) {
        return (
            <div className="main-content">
                <div className="loading">Loading todos...</div>
            </div>
        );
    }

    return (
        <div className="main-content">
            <div className="content-header">
                <h2>{getViewTitle()}</h2>
                <p>{getViewDescription()}</p>
            </div>

            <div className="todo-container">
                <div className="todo-header">
                    <h3>{getViewTitle()} ({todos.length})</h3>
                    {todos.length > 0 && currentView === 'todos' && (
                        <button className="clear-all-btn" onClick={onClearAll}>
                            Clear All
                        </button>
                    )}
                </div>

                {shouldShowAddForm && (
                    <form className="add-todo-form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            className="add-todo-input"
                            placeholder="Add a new task..."
                            value={newTodoTitle}
                            onChange={(e) => setNewTodoTitle(e.target.value)}
                            disabled={loading}
                        />
                    </form>
                )}

                <div className="todo-list">
                    {todos.length === 0 ? (
                        <div style={{ padding: '40px 20px', textAlign: 'center', color: '#6c757d' }}>
                            <div style={{ fontSize: '48px', marginBottom: '10px' }}>
                                {currentView === 'completed' ? '🎉' : currentView === 'pending' ? '📝' : '📝'}
                            </div>
                            <h3>
                                {currentView === 'completed'
                                    ? 'No completed tasks yet'
                                    : currentView === 'pending'
                                        ? 'No pending tasks'
                                        : 'No todos yet'
                                }
                            </h3>
                            <p>
                                {currentView === 'completed'
                                    ? 'Complete some tasks to see them here!'
                                    : currentView === 'pending'
                                        ? 'All caught up! No pending tasks.'
                                        : 'Add your first task to get started!'
                                }
                            </p>
                        </div>
                    ) : (
                        todos.map(todo => (
                            <TodoItem
                                key={todo.id}
                                todo={todo}
                                onUpdate={onUpdateTodo}
                                onToggle={onToggleTodo}
                                onDelete={onDeleteTodo}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default TodoList; 