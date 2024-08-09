const Task = require('../models/taskmodel.js')

// FETCH TASKS
const getTask = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

// ADD TASK
const addTask = async (req, res) => {
    try {
        const task = await Task.create(req.body)
        res.status(200).json(task)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// DELETE TASK
const deleteTask = async (req, res) => {
    try {
        const { id } = req.params
        const task = await Task.findByIdAndDelete(id)
        if (!task) {
            res.status(404).json({ message: "Task not found" })
        }
        res.status(200).json({ message: "Task completed successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// UPDATE TASK
const updateTask = async (req, res) => {
    
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
}

module.exports = {getTask, addTask, deleteTask, updateTask}