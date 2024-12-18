const mongoose = require('mongoose')

// Task Schema
const taskSchema = new mongoose.Schema({
    taskName: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});
  
const Task = mongoose.model("Task", taskSchema)

module.exports = Task;