import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:4000/tasks', { title, description, completed: false })
            .then(() => {
                setTitle('');
                setDescription('');
                alert('Task added successfully!');
            })
            .catch((error) => console.error('Error creating task:', error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Create a New Task</h2>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
            </div>
            <div>
                <label>Description:</label>
                <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                />
            </div>
            <button type="submit">Add Task</button>
        </form>
    );
};

export default TaskForm;