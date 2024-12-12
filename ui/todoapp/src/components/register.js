import React, { useState } from 'react';
import { register } from '../services/authService';
import { Link } from 'react-router-dom';
import '../styles/register.css'

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(username, email, password);
            window.location.href = '/tasks'; // Redirect after registration
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className='container'>

            <form onSubmit={handleSubmit}>
                <h1>Task It</h1>
                <h2>Register</h2>
                <div className='input_box'>
                    <input
                        type="text"
                        className='input-field'
                        placeholder='Full name'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
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
                <button type="submit">Register</button>
            </form>
            <p>Already have an account? <Link to="/login">Login here</Link></p>
        </div>
    );
};

export default Register;
