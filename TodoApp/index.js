const express = require('express')
const Task = require('./models/taskmodel.js')
const mongoose = require('mongoose')
require('dotenv').config()
const app = express()
app.use(express.json())


// MongoDB connection
mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));


// Route to get all tasks
app.get('/api/tasklist', async (req, res) => {
    try {
      const tasks = await Task.find();
      res.status(200).json(tasks);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

app.post('/api/addtask', async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task)
    } catch (error) {
        res.status(500).json({ message: err.message });
    }
})
  
app.listen(3000, ()=>{ console.log("Server is running!");})