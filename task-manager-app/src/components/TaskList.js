import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    // Fetch tasks from the backend
    const fetchTasks = () => {
        axios.get('http://localhost:4000/tasks')
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    };

    // Toggle task completion
    const toggleCompletion = (taskId, completed) => {
        axios.put(`http://localhost:4000/tasks/${taskId}`, { completed: !completed })
            .then(() => {
                fetchTasks(); // Refresh the task list after updating
            })
            .catch((error) => {
                console.error('Error updating task:', error);
            });
    };

    // Delete a task
    const deleteTask = (taskId) => {
        axios.delete(`http://localhost:4000/tasks/${taskId}`)
            .then(() => {
                fetchTasks(); // Refresh the task list after deleting
            })
            .catch((error) => {
                console.error('Error deleting task:', error);
            });
    };

    // Fetch tasks on component load
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
            <TaskForm fetchTasks={fetchTasks} />
        </div>
    );
};

export default TaskList;