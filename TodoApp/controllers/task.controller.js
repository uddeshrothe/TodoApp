const Task = require('../models/taskmodel.js')



// FETCH TASKS
const getTask = async (req, res) => {
    try {
        const tasks = await Task.find({userId: req.user.id});
        res.status(200).json(tasks);
      } catch (err) {
        res.status(500).json({ message: err.message });
      }
}

// ADD TASK
const addTask = async (req, res) => {
    try {
        const task = new Task({
            taskName: req.body.taskName,
            userId: req.user.id
        })
        await task.save()
        res.status(200).json(task)
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

// DELETE TASK
const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({_id: req.params.id, userId:req.user.id})
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
        const task = await Task.findByIdAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            {new:true}
        )
        if (!task) {
            res.status(404).json({message: "Task not found"})
        }
        res.status(200).json({ message: "Task updated successfully" })
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

module.exports = {getTask, addTask, deleteTask, updateTask}