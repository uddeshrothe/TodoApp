import React, { useState } from 'react';
import { login } from '../services/authService';
import { Link } from 'react-router-dom';
import '../styles/login.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(email, password);
            window.location.href = '/tasks'; // Redirect after login
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='container'>

            <form onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className='input_box'>
                    <input
                        type="email"
                        className='input-field'
                        placeholder='Email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className='input_box'>
                    <input
                        type="password"
                        className='input-field'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    );
};

export default Login;
