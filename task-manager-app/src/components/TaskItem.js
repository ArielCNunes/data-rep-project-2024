import React from 'react';

// Render each task
const TaskItem = ({ task, toggleCompletion, deleteTask }) => {
    return (
        <li>
            <strong>{task.title}</strong>: {task.description}

            {/* Show task status as 'Completed' or 'Pending' */}
            {task.completed ? ' (Completed)' : ' (Pending)'}

            <button onClick={() => toggleCompletion(task._id, task.completed)}>
                {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
            </button>

            <button onClick={() => deleteTask(task._id)}>Delete</button>
        </li>
    );
};

export default TaskItem;