import React from 'react';
import TaskList from './components/TaskList';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Register from './components/register';

const App = () => {
  return (
      <Router>
          <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/tasks" element={<TaskList />} />
              <Route path="/" element={<Login />} /> {/* Default route */}
          </Routes>
      </Router>
  );
};

export default App;
