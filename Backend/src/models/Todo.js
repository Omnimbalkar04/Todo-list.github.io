/* eslint-disable no-undef */
// const mongoose = require("mongoose");

// const todoSchema = new mongoose.Schema({
//   task: {
//    type: String,
//    required: true,
//   },

//   dueDate: {
//     type: Date,
//     required: true,
//   },

//   completed: {
//     type: Boolean,
//     default: false,
//   },
// });


// const Todo = mongoose.model("Todo", todoSchema);

// module.exports = Todo;


const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    dueDate: {
        type: Date,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false,
    }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;
