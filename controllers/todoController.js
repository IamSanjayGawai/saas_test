const Todo = require('../models/Todo');

// @desc    Create a new todo
// @route   POST /api/todos
// @access  Private
const createTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    
    const todo = await Todo.create({
      title,
      description,
      completed: completed || false,
      user: req.user._id
    });
    
    res.status(201).json({
      success: true,
      message: 'Todo created successfully',
      data: { todo }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while creating todo',
      error: error.message
    });
  }
};

// @desc    Get all todos for logged-in user
// @route   GET /api/todos
// @access  Private
const getTodos = async (req, res) => {
  try {
    const { page = 1, limit = 10, completed, sortBy = 'createdAt', sortOrder = 'desc' } = req.query;
    
    // Build filter
    const filter = { user: req.user._id };
    if (completed !== undefined) {
      filter.completed = completed === 'true';
    }
    
    // Build sort
    const sort = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;
    
    const todos = await Todo.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    const total = await Todo.countDocuments(filter);
    
    res.json({
      success: true,
      message: 'Todos retrieved successfully',
      data: {
        todos,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(total / limit),
          totalItems: total,
          itemsPerPage: parseInt(limit)
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching todos',
      error: error.message
    });
  }
};

// @desc    Get single todo by ID
// @route   GET /api/todos/:id
// @access  Private
const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Todo retrieved successfully',
      data: { todo }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching todo',
      error: error.message
    });
  }
};

// @desc    Update todo by ID
// @route   PUT /api/todos/:id
// @access  Private
const updateTodo = async (req, res) => {
  try {
    const { title, description, completed } = req.body;
    
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description, completed },
      { new: true, runValidators: true }
    );
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Todo updated successfully',
      data: { todo }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while updating todo',
      error: error.message
    });
  }
};

// @desc    Delete todo by ID
// @route   DELETE /api/todos/:id
// @access  Private
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });
    
    if (!todo) {
      return res.status(404).json({
        success: false,
        message: 'Todo not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Todo deleted successfully',
      data: { todo }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while deleting todo',
      error: error.message
    });
  }
};

// @desc    Get todo statistics
// @route   GET /api/todos/stats
// @access  Private
const getTodoStats = async (req, res) => {
  try {
    const stats = await Todo.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          completed: { $sum: { $cond: ['$completed', 1, 0] } },
          pending: { $sum: { $cond: ['$completed', 0, 1] } }
        }
      }
    ]);
    
    const result = stats[0] || { total: 0, completed: 0, pending: 0 };
    delete result._id;
    
    res.json({
      success: true,
      message: 'Todo statistics retrieved successfully',
      data: { stats: result }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error while fetching todo statistics',
      error: error.message
    });
  }
};

module.exports = {
  createTodo,
  getTodos,
  getTodoById,
  updateTodo,
  deleteTodo,
  getTodoStats
};