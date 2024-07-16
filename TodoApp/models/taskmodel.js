const mongoose = require('mongoose')

// Task Schema
const taskSchema = new mongoose.Schema({
    id: { type: Number, unique:true },
    description: { type: String, required: true },
});

taskSchema.statics.getNextTaskId = async function() {
    const lastTask = await this.findOne().sort({ id: -1 });
    return lastTask ? lastTask.id + 1 : 1;
  };
  
  taskSchema.pre('save', async function (next) {
    if (this.isNew) {
      this.id = await mongoose.model('Task').getNextTaskId();
    }
    next();
  });
  
const Task = mongoose.model("Task", taskSchema)

module.exports = Task;