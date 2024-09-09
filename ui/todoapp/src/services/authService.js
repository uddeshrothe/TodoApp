const API_URL = 'http://localhost:4000/api/auth';
// const API_URL = "https://todo-app-ecru-one-76.vercel.app/api/auth";

export const login = async (email, password) => {
    try {
        const response = await fetch(API_URL + '/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });
        if (!response.ok) {
            throw new Error('Login failed');
        }
        const data = await response.json();
        localStorage.setItem('token', data.token); // Store token
        return data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const register = async (username, email, password) => {
    try {
        const response = await fetch(API_URL + '/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
        });
        if (!response.ok) {
            throw new Error('Registration failed');
        }
        const data = await response.json();
        localStorage.setItem('token', data.token); // Store token
        return data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};

export const logout = () => {
    localStorage.removeItem('token');
};
