const express = require('express')
const router = express.Router()
const { getTask, addTask, deleteTask, updateTask } = require('../controllers/task.controller.js')
const { protect } = require('../middleware/authMiddleware.js');

//Routes
router.get('/', protect, getTask)
router.post('/add', protect, addTask)
router.delete('/:id', protect, deleteTask)
router.put('/:id', protect, updateTask)

module.exports = router