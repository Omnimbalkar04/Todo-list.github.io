/* eslint-disable no-undef */

const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/todoRoutes'); // Import the routes
const cors = require('cors');

require("dotenv").config();


const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors({
    origin: "*",
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
