const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Connect to MongoDB database
mongoose
    .connect('mongodb+srv://admin:admin@taskmanagerproject.kbvd9.mongodb.net/taskmanager?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Allow frontend communication & parse incoming JSON payloads in requests
app.use(cors());
app.use(express.json());

// Mongoose schema - each task is going to have to follow this format
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
});

const Task = mongoose.model('Task', taskSchema);

// API ROUTES
// Create a new task
app.post('/tasks', async (req, res) => {
    try {
        // Create a new task using request body and then save it
        const task = new Task(req.body);
        await task.save();
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get all tasks
app.get('/tasks', async (req, res) => {
    try {
        // Get tasks from the database & display them
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a task
app.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return object after update
            runValidators: true, // Updates need to follow the schema
        });
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    try {
        // Find task and delete it, if it exists
        const task = await Task.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Start the server on the specified port
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});