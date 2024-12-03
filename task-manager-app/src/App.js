import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskList from './components/TaskList';
import Home from './components/HomePage';

const Navbar = () => (
    <nav>
        <Link to="/">Home Page</Link> | <Link to="/tasks">To Do App</Link>
    </nav>
);

const App = () => (
    <Router>
        <Navbar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/tasks" element={<TaskList />} />
        </Routes>
    </Router>
);

export default App;