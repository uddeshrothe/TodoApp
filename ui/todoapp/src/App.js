import React from 'react';
import TaskList from './components/TaskList';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';

function App() {
  const isAuthenticated = () => {
    const token = localStorage.getItem('token');
    return !!token; // Returns true if a token exists, otherwise false
  };

  return (
    <Router>
      <Routes>
        {/* Default route redirects to /tasks if authenticated, otherwise to /login */}
        <Route
          path="/"
          element={<Navigate to={isAuthenticated() ? "/tasks" : "/login"} />}
        />

        {/* Tasks route: Restricted to authenticated users */}
        <Route
          path="/tasks"
          element={isAuthenticated() ? <TaskList /> : <Navigate to="/login" />}
        />

        {/* Login route */}
        <Route
          path="/login"
          element={isAuthenticated() ? <Navigate to="/tasks" /> : <Login />}
        />

        {/* Register route */}
        <Route
          path="/register"
          element={isAuthenticated() ? <Navigate to="/tasks" /> : <Register />}
        />

        {/* Catch-all route */}
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
