import React, { useState } from 'react';
import axios from 'axios';

// Create new task
const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    // Handles form submission to add a new task
    const handleSubmit = (e) => {
        e.preventDefault();
        // Send POST request to backend
        axios.post('http://localhost:4000/tasks', { title, description, completed: false })
            .then(() => {
                setTitle('');
                setDescription('');
            })
            .catch((error) => console.error('Error creating task:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a New Task</h2>
            <div>
                {/* Input for task title */}
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} // Update title state on input change
                    required // Field is mandatory
                />
            </div>
            <div>
                {/* Input for task description */}
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)} // Update description state on input change
                    required
                />
            </div>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;