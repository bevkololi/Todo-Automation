import React from 'react';

const SideMenu = ({ currentView, onViewChange, onLogout, todoCount }) => {
    return (
        <nav className="side-menu" data-testid="side-menu">
            <div className="side-menu-header">
                <h1>Todo App</h1>
                <p>Manage your tasks efficiently</p>
            </div>

            <div className="side-menu-nav">
                <div
                    className={`nav-item ${currentView === 'todos' ? 'active' : ''}`}
                    data-testid="nav-item"
                    onClick={() => onViewChange('todos')}
                >
                    <i>📝</i>
                    <span>My Todos</span>
                    <span className="badge">{todoCount}</span>
                </div>

                <div
                    className={`nav-item ${currentView === 'completed' ? 'active' : ''}`}
                    data-testid="nav-item"
                    onClick={() => onViewChange('completed')}
                >
                    <i>✅</i>
                    <span>Completed</span>
                </div>

                <div
                    className={`nav-item ${currentView === 'pending' ? 'active' : ''}`}
                    data-testid="nav-item"
                    onClick={() => onViewChange('pending')}
                >
                    <i>⏳</i>
                    <span>Pending</span>
                </div>
            </div>

            <div className="side-menu-footer">
                <button className="logout-btn" data-testid="logout-btn" onClick={onLogout}>
                    <i>🚪</i> Logout
                </button>
            </div>
        </nav>
    );
};

export default SideMenu; 