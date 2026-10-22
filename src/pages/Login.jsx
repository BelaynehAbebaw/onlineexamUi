import { useState } from 'react';
import { loginUser } from '../services/Auth.js';

function Login({ onLogin }) {

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        if (error) {
            setError('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError('');

        if (!formData.username.trim()) {
            setError('Please enter your username.');
            return;
        }

        if (!formData.password) {
            setError('Please enter your password.');
            return;
        }

        try {

            setLoading(true);

            const response = await loginUser(formData);

            console.log('Login response:', response);

            /*
             * Expected response examples:
             *
             * {
             *     token: "...",
             *     user: {
             *         id: 1,
             *         name: "Administrator",
             *         username: "admin",
             *         email: "admin@example.com",
             *         role: "ADMIN"
             *     }
             * }
             */

            if (response.token) {
                localStorage.setItem('token', response.token);
            }

            if (response.user) {
                localStorage.setItem(
                    'user',
                    JSON.stringify(response.user)
                );

                if (response.user.role) {
                    localStorage.setItem(
                        'role',
                        response.user.role
                    );
                }
            }

            /*
             * If backend returns user fields directly
             * instead of { user: {...} }
             */
            else if (response.username || response.name) {

                const user = {
                    id: response.id,
                    name: response.name,
                    username: response.username,
                    email: response.email,
                    role: response.role
                };

                localStorage.setItem(
                    'user',
                    JSON.stringify(user)
                );

                if (response.role) {
                    localStorage.setItem(
                        'role',
                        response.role
                    );
                }
            }

            if (rememberMe) {
                localStorage.setItem(
                    'rememberMe',
                    'true'
                );
            } else {
                localStorage.removeItem('rememberMe');
            }

            // Go to Dashboard
            onLogin();

        } catch (err) {

            console.error('Login error:', err);

            setError(
                err.message || 'Invalid username or password.'
            );

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">

            <div className="login-container">

                {/* LEFT SIDE */}
                <div className="login-brand">

                    <div className="login-brand-content">

                        <div className="login-logo">
                            <i className="bi bi-mortarboard-fill"></i>
                        </div>

                        <h1>
                            Exam System
                        </h1>

                        <p>
                            Online Examination System
                        </p>

                        <div className="login-features">

                            <div>
                                <i className="bi bi-check-circle-fill"></i>
                                Manage examinations
                            </div>

                            <div>
                                <i className="bi bi-check-circle-fill"></i>
                                Manage questions
                            </div>

                            <div>
                                <i className="bi bi-check-circle-fill"></i>
                                Track examination results
                            </div>

                        </div>

                    </div>

                </div>

                {/* RIGHT SIDE */}
                <div className="login-form-section">

                    <div className="login-form-container">

                        <div className="login-header">

                            <h2>
                                Welcome Back
                            </h2>

                            <p>
                                Sign in to your account to continue
                            </p>

                        </div>

                        {error && (
                            <div className="login-error">
                                <i className="bi bi-exclamation-circle-fill"></i>

                                <span>
                                    {error}
                                </span>
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>

                            {/* USERNAME */}
                            <div className="login-form-group">

                                <label htmlFor="username">
                                    Username
                                </label>

                                <div className="login-input-wrapper">

                                    <i className="bi bi-person"></i>

                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleChange}
                                        placeholder="Enter your username"
                                        autoComplete="username"
                                        disabled={loading}
                                    />

                                </div>

                            </div>

                            {/* PASSWORD */}
                            <div className="login-form-group">

                                <label htmlFor="password">
                                    Password
                                </label>

                                <div className="login-input-wrapper">

                                    <i className="bi bi-lock"></i>

                                    <input
                                        type={
                                            showPassword
                                                ? 'text'
                                                : 'password'
                                        }
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        disabled={loading}
                                    />

                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        tabIndex="-1"
                                    >
                                        <i
                                            className={
                                                showPassword
                                                    ? 'bi bi-eye-slash'
                                                    : 'bi bi-eye'
                                            }
                                        ></i>
                                    </button>

                                </div>

                            </div>

                            {/* OPTIONS */}
                            <div className="login-options">

                                <label className="remember-me">

                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) =>
                                            setRememberMe(
                                                e.target.checked
                                            )
                                        }
                                        disabled={loading}
                                    />

                                    <span>
                                        Remember me
                                    </span>

                                </label>

                                <button
                                    type="button"
                                    className="forgot-password"
                                    onClick={() => {
                                        alert(
                                            'Please contact the system administrator to reset your password.'
                                        );
                                    }}
                                >
                                    Forgot password?
                                </button>

                            </div>

                            {/* LOGIN */}
                            <button
                                type="submit"
                                className="login-button"
                                disabled={loading}
                            >

                                {loading ? (
                                    <>
                                        <span className="login-spinner"></span>
                                        Signing in...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-box-arrow-in-right"></i>
                                        Sign In
                                    </>
                                )}

                            </button>

                        </form>

                        <div className="login-footer">
                            <span>
                                © {new Date().getFullYear()} Exam System
                            </span>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Login;