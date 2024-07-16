const mongoose = require('mongoose')

// Task Schema
const taskSchema = new mongoose.Schema({
    id: { type: String, required: true },
    description: { type: String, required: true },
});
  
const Task = mongoose.model("Task", taskSchema)

module.exports = Task;