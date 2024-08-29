// /* eslint-disable no-undef */
// const Todo = require("../models/Todo");

// // Get all todos
// exports.getTodos = async (req, res) => {
//   try {
//     const todos = await Todo.find({});  // Fetch all todos from the database
//     res.status(200).json(todos);
//   } catch (err) {
//     console.error(err); 
//     res.status(500).json({ error: 'Failed to get todos' });
//   }
// };

// // Create a new todo
// exports.createTodo = async (req, res) => {
//   try {
//     const newTodo = new Todo(req.body);  // Create a new todo from request body
//     await newTodo.save();  // Save the new todo to the database
//     res.status(201).json(newTodo);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to create todo' });
//   }
// };

// // Update an existing todo
// exports.updateTodo = async (req, res) => {
//   try {
//     const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
//       new: true,
//       runValidators: true,
//     });
//     if (!updatedTodo) {
//       return res.status(404).json({ error: 'Todo not found' });
//     }
//     res.status(200).json(updatedTodo);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to update todo' });
//   }
// };

// // Delete a todo
// exports.deleteTodo = async (req, res) => {
//   try {
//     const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
//     if (!deletedTodo) {
//       return res.status(404).json({ error: 'Todo not found' });
//     }
//     res.status(200).json({ message: 'Todo deleted successfully' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to delete todo' });
//   }
// };

// const TodoControlls = mongoose.model("todoControllers", TodoControlls);

// module.exports = TodoControlls;