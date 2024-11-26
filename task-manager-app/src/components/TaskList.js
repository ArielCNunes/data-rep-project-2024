import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TaskForm from './TaskForm';

const TaskList = () => {
    const [tasks, setTasks] = useState([]);

    const fetchTasks = () => {
        axios.get('http://localhost:4000/tasks')
            .then((response) => {
                setTasks(response.data);
            })
            .catch((error) => {
                console.error('Error fetching tasks:', error);
            });
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    return (
        <div>
            <h2>Task List</h2>
            <TaskForm fetchTasks={fetchTasks} />
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <strong>{task.title}</strong>: {task.description}
                        {task.completed ? ' (Completed)' : ' (Pending)'}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TaskList;