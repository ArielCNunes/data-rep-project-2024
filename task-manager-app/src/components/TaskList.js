import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = () => {
        axios.get('http://localhost:4000/tasks')
            .then((response) => setTasks(response.data))
            .catch((error) => console.error('Error fetching tasks:', error));
    };

    const toggleCompletion = (taskId, completed) => {
        axios.put(`http://localhost:4000/tasks/${taskId}`, { completed: !completed })
            .then(fetchTasks)
            .catch((error) => console.error('Error updating task:', error));
    };

    const deleteTask = (taskId) => {
        axios.delete(`http://localhost:4000/tasks/${taskId}`)
            .then(fetchTasks)
            .catch((error) => console.error('Error deleting task:', error));
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <strong>{task.title}</strong>: {task.description}
                        {task.completed ? ' (Completed)' : ' (Pending)'}
                        <button onClick={() => toggleCompletion(task._id, task.completed)}>
                            {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
                        </button>
                        <button onClick={() => deleteTask(task._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;