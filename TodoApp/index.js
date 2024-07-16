const express = require('express')
const Task = require('./models/taskmodel.js')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = express()
app.use(express.json())

// Define CORS options
const corsOptions = {
    origin: '*', // Change this to your frontend URL in production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  };

// Middleware
app.use(cors(corsOptions));

// MongoDB connection
mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


// Get all tasks
app.get('/api/tasklist', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

// Add task
app.post('/api/addtask', async (req, res) => {
    
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// Update task
app.put('/api/updatetask/:id', async (req, res) => {
    
    try {
        const {id} = req.params
        const task = await Task.findByIdAndUpdate(id, req.body)
        if (!task) {
            res.status(404).json({message: "Task not found"})
        }
        res.status(200).json({ message: "Task updated successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// Delete task
app.delete('/api/deletetask/:id', async (req, res) => {
    try {
        const {id} = req.params
        const task = await Task.findByIdAndDelete(id)
        if (!task) {
            res.status(404).json({message: "Task not found"})
        }
        res.status(200).json({ message: "Task completed successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

// Connection to local server 
app.listen(4000, ()=>{ console.log("Server is running!");})