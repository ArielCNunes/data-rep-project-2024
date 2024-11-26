const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Mongoose db
mongoose
    .connect('mongodb+srv://admin:admin@taskmanagerproject.kbvd9.mongodb.net/taskmanager?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON request bodies

// Set up the server to listen on port 4000
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});