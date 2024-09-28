const express = require('express');
const router = express.Router();
const { registerUser, authUser } = require('../controllers/auth.controller.js');

// Routes
router.post('/signup', registerUser);
router.post('/signin', authUser);

module.exports = router;
