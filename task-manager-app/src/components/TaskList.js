import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';

// Component to manage and display tasks
const TaskList = () => {
    // State to store task
    const [tasks, setTasks] = useState([]);

    // Fetch tasks from backend
    const fetchTasks = () => {
        axios.get('http://localhost:4000/tasks')
            .then((response) => setTasks(response.data)) // Updates state with the fetched tasks
            .catch((error) => console.error('Error fetching tasks:', error));
    };

    // Mark as completed or pending
    const toggleCompletion = (taskId, completed) => {
        axios.put(`http://localhost:4000/tasks/${taskId}`, { completed: !completed })
            .then(fetchTasks)
            .catch((error) => console.error('Error updating task:', error));
    };

    // Deletes a task by its ID
    const deleteTask = (taskId) => {
        axios.delete(`http://localhost:4000/tasks/${taskId}`)
            .then(fetchTasks)
            .catch((error) => console.error('Error deleting task:', error));
    };

    // Fetches all tasks
    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h2>Task List</h2>
            <ul>
                {tasks.map((task) => (
                    // Renders tasks using TaskItem
                    <TaskItem
                        key={task._id}
                        // Pass the task and toggle & delete function as props
                        task={task}
                        toggleCompletion={toggleCompletion}
                        deleteTask={deleteTask}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;