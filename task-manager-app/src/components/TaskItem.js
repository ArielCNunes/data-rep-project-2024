import React from 'react';

const TaskItem = ({ task, toggleCompletion, deleteTask }) => {
    return (
        <li>
            <strong>{task.title}</strong>: {task.description}
            {task.completed ? ' (Completed)' : ' (Pending)'}
            <button onClick={() => toggleCompletion(task._id, task.completed)}>
                {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
            </button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
        </li>
    );
};

export default TaskItem;