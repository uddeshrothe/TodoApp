const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()
const app = express()
const taskRoute = require('./routes/task.route.js')
const authRoute = require('./routes/auth.route.js')

// Define CORS options
const corsOptions = {
  //origin: ["https://todo-app-front-five.vercel.app"],
  origin:"*",
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

// Middleware
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Allow all OPTIONS requests with the same CORS options
app.use(express.json())

//App routes
app.use("/api/task", taskRoute)
app.use("/api/auth", authRoute)

// MongoDB connection
mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

// Connection to local server 
app.listen(4000, () => { console.log("Server is running!"); })