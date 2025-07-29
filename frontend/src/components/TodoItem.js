import React, { useState } from 'react';

const TodoItem = ({ todo, onUpdate, onToggle, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(todo.title);

    const handleEdit = () => {
        if (editTitle.trim() && editTitle !== todo.title) {
            onUpdate(todo.id, { title: editTitle.trim() });
        }
        setIsEditing(false);
    };

    const handleCancelEdit = () => {
        setEditTitle(todo.title);
        setIsEditing(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleEdit();
        } else if (e.key === 'Escape') {
            handleCancelEdit();
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    return (
        <div className="todo-item" data-testid="todo-item">
            <input
                type="checkbox"
                className="todo-checkbox"
                data-testid="todo-checkbox"
                checked={todo.completed}
                onChange={() => onToggle(todo.id)}
            />

            <div className="todo-content">
                {isEditing ? (
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        onBlur={handleEdit}
                        onKeyDown={handleKeyPress}
                        autoFocus
                        data-testid="edit-todo-input"
                        style={{
                            flex: 1,
                            padding: '8px 12px',
                            border: '2px solid #28a745',
                            borderRadius: '4px',
                            fontSize: '16px'
                        }}
                    />
                ) : (
                    <div style={{ flex: 1 }}>
                        <div className={`todo-title ${todo.completed ? 'completed' : ''}`} data-testid="todo-title">
                            {todo.title}
                        </div>
                        <div className="todo-date">
                            Created: {formatDate(todo.createdAt)}
                            {todo.updatedAt !== todo.createdAt && (
                                <span> • Updated: {formatDate(todo.updatedAt)}</span>
                            )}
                        </div>
                    </div>
                )}
            </div>

            <div className="todo-actions">
                {!isEditing ? (
                    <>
                        <button
                            className="todo-btn edit-btn"
                            data-testid="edit-btn"
                            onClick={() => setIsEditing(true)}
                            title="Edit todo"
                        >
                            ✏️
                        </button>
                        <button
                            className="todo-btn delete-btn"
                            data-testid="delete-btn"
                            onClick={() => onDelete(todo)}
                            title="Delete todo"
                        >
                            🗑️
                        </button>
                    </>
                ) : (
                    <>
                        <button
                            className="todo-btn edit-btn"
                            data-testid="edit-btn"
                            onClick={handleEdit}
                            title="Save changes"
                        >
                            💾
                        </button>
                        <button
                            className="todo-btn delete-btn"
                            data-testid="delete-btn"
                            onClick={handleCancelEdit}
                            title="Cancel edit"
                        >
                            ❌
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default TodoItem; 