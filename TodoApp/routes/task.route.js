const express = require('express')
const router = express.Router()
const { getTask, addTask, deleteTask, updateTask } = require('../controllers/task.controller.js')

//Routes
router.get('/', getTask)
router.post('/add', addTask)
router.delete('/:id', deleteTask)
router.put('/:id', updateTask)

module.exports = router