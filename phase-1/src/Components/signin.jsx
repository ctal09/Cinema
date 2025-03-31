import React, { useState } from 'react';
import './signin.css';
import Modal from './modal';
import { useNavigate } from "react-router-dom";

const Signin = ({ isOpen, onClose, onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost/project/auth.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: username, password }),
            });

            const data = await response.json();

            if (data.success) {
                console.log('Login successful');
                onLoginSuccess(data.role); // Pass role to Navbar
                localStorage.setItem("userRole", data.role); // Store in localStorage
                onClose();
                if (data.redirect) {
                    navigate(data.redirect);
                }
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('An error occurred while trying to sign in');
            console.error('Sign in error:', err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="signin-card">
                <h2>Sign In</h2>
                {error && <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            type="text"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            disabled={isLoading}
                        />
                    </div>
                    <button
                        type="submit"
                        className="signin-btn"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </Modal>
    );
};

export default Signin;
