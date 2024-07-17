const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = express()
const taskRoute = require('./routes/task.route.js')

// Define CORS options
const corsOptions = {
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  };

// Middleware
app.use(cors(corsOptions));
app.use(express.json())

//App routes
app.use("/api/task", taskRoute)

// MongoDB connection
mongoose.connect(process.env.CONNECTION_STRING)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Connection to local server 
app.listen(4000, ()=>{ console.log("Server is running!");})