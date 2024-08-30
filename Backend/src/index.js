/* eslint-disable no-undef */
// const express = require("express");
// const todoRoutes = require("./routes/todoRoutes");


// const app = express();

// //Middlewere
// app.use(express.json());



// app.get('/', (req, res) => {
//   res.send('Welcome to the Todo API');
// });

// // todo routes

// app.use("/api" , todoRoutes);


// // Start the server
// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });

const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes'); // Import the routes
const cors = require('cors');

require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 5000;

const allowedOrigins = ['http://localhost:5173/Todo-list.github.io/', 'https://omnimbalkar04.github.io/Todo-list.github.io/'];
app.use(cors({
    origin: function (origin, callback) {
        if (allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));

app.use(express.json()); // Middleware to parse JSON request bodies

// Use the Todo routes
app.use('/api', todoRoutes);



app.get('/', (req, res) => {
  res.send('Welcome to the Todo API');
});

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch(err => console.log(err));
