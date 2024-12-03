import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import HomePage from './components/HomePage';

const Navbar = () => (
    <nav>
        <Link to="/">Home</Link> | <Link to="/tasks">Tasks</Link> | <Link to="/create">Create Task</Link>
    </nav>
);

const App = () => (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/tasks" element={<TaskList />} />
            <Route path="/create" element={<TaskForm />} />
        </Routes>
    </Router>
);

export default App;