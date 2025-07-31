const express = require('express');
const router = express.Router();

const {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  getTodoStats
} = require('../controllers/todoController');

const auth = require('../middleware/auth');
const { todoValidation, handleValidationErrors } = require('../utils/validation');

// Apply auth middleware to all todo routes
router.use(auth);

// @route   GET /api/todos/stats
router.get('/stats', getTodoStats);

// @route   POST /api/todos
router.post('/', todoValidation, handleValidationErrors, createTodo);

// @route   GET /api/todos
router.get('/', getTodos);

// @route   GET /api/todos/:id
router.get('/:id', getTodoById);

// @route   PUT /api/todos/:id
router.put('/:id', todoValidation, handleValidationErrors, updateTodo);

// @route   DELETE /api/todos/:id
router.delete('/:id', deleteTodo);

module.exports = router;