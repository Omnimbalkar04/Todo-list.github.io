/* eslint-disable no-undef */
// const express = require("express");
// const TodoControllers = require("../Controllers/todoControllers");

// const router = express.Router();
// router.get('/todos', TodoControllers.getTodos);
// router.post('/todos', TodoControllers.createTodo);
// router.put('/todos/:id', TodoControllers.updateTodo);
// router.delete('/todos/:id', TodoControllers.deleteTodo);


// module.exports = router;

const express = require('express');
const Todo = require('../models/Todo');

const router = express.Router();

// Create a new Todo
router.post('/todos', async (req, res) => {
    try {
        const { name, dueDate } = req.body;

         // Optional: Validate the input
    if (!name || !dueDate) {
        return res.status(400).send('Name and dueDate are required');
      }
  

        const newTodo = new Todo({
            name,
            dueDate: new Date(dueDate),
        });


        await newTodo.save();
        res.status(201).json(newTodo);
    } catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ error: 'Failed to create todo' });
    }
});

// Get all Todos
router.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch todos' });
    }
});

// Update a Todo
router.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTodo = await Todo.findByIdAndUpdate(id, req.body, { new: true });
        res.status(200).json(updatedTodo);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update todo' });
    }
});

// Delete a Todo
router.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await Todo.findByIdAndDelete(id);
        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete todo' });
    }
});

module.exports = router;
