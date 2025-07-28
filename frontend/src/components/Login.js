import React, { useState } from 'react';

const Login = ({ onLogin, loading }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.username && formData.password) {
            onLogin(formData.username, formData.password);
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-header">
                    <h1>Welcome Back</h1>
                    <p>Sign in to manage your todos</p>
                </div>

                <form className="login-form" data-testid="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            data-testid="username-input"
                            value={formData.username}
                            onChange={handleChange}
                            placeholder="Enter your username"
                            required
                            disabled={loading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            data-testid="password-input"
                            value={formData.password}
                            onChange={handleChange}
                            placeholder="Enter your password"
                            required
                            disabled={loading}
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-btn"
                        data-testid="login-button"
                        disabled={loading || !formData.username || !formData.password}
                    >
                        {loading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>

                <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px', color: '#6c757d' }}>
                    <p><strong>Demo Credentials:</strong></p>
                    <p>Username: admin</p>
                    <p>Password: admin</p>
                </div>
            </div>
        </div>
    );
};

export default Login; 