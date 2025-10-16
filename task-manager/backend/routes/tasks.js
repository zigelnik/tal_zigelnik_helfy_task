const express = require('express');

const router = express.Router();

// In-memory storage
const tasks = [];
let nextId = 1;

// Helpers
function isValidPriority(priority) {
  return ['low', 'medium', 'high'].includes(priority);
}

function findTaskById(idParam) {
  const id = Number.parseInt(idParam, 10);
  if (Number.isNaN(id)) {
    return { error: 'Invalid task id', status: 400 };
  }
  const task = tasks.find(t => t.id === id);
  if (!task) {
    return { error: 'Task not found', status: 404 };
  }
  return { task };
}

// GET /api/tasks - Get all tasks
router.get('/', (req, res) => {
  res.status(200).json({ success: true, count: tasks.length, data: tasks });
});

// POST /api/tasks - Create a new task
router.post('/', (req, res) => {
  const { title, description, priority } = req.body || {};

  if (!title || typeof title !== 'string' || title.trim() === '') {
    return res.status(400).json({ success: false, error: 'Title is required' });
  }
  if (!description || typeof description !== 'string' || description.trim() === '') {
    return res.status(400).json({ success: false, error: 'Description is required' });
  }
  if (!priority || !isValidPriority(priority)) {
    return res
      .status(400)
      .json({ success: false, error: 'Priority must be one of: low, medium, high' });
  }

  const newTask = {
    id: nextId++,
    title: title.trim(),
    description: description.trim(),
    completed: false,
    createdAt: new Date(),
    priority
  };

  tasks.push(newTask);
  res.status(201).json({ success: true, data: newTask });
});

// PUT /api/tasks/:id - Update a task
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description, completed, priority } = req.body || {};

  const result = findTaskById(id);
  if (result.error) {
    return res.status(result.status).json({ success: false, error: result.error });
  }

  const task = result.task;

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ success: false, error: 'Title must be a non-empty string' });
    }
    task.title = title.trim();
  }

  if (description !== undefined) {
    if (typeof description !== 'string' || description.trim() === '') {
      return res
        .status(400)
        .json({ success: false, error: 'Description must be a non-empty string' });
    }
    task.description = description.trim();
  }

  if (completed !== undefined) {
    if (typeof completed !== 'boolean') {
      return res.status(400).json({ success: false, error: 'Completed must be a boolean' });
    }
    task.completed = completed;
  }

  if (priority !== undefined) {
    if (!isValidPriority(priority)) {
      return res
        .status(400)
        .json({ success: false, error: 'Priority must be one of: low, medium, high' });
    }
    task.priority = priority;
  }

  res.status(200).json({ success: true, data: task });
});

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const idNum = Number.parseInt(id, 10);
  if (Number.isNaN(idNum)) {
    return res.status(400).json({ success: false, error: 'Invalid task id' });
  }
  const index = tasks.findIndex(t => t.id === idNum);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Task not found' });
  }
  const [deleted] = tasks.splice(index, 1);
  res.status(200).json({ success: true, message: 'Task deleted successfully', data: deleted });
});

// PATCH /api/tasks/:id/toggle - Toggle task completion status
router.patch('/:id/toggle', (req, res) => {
  const { id } = req.params;

  const result = findTaskById(id);
  if (result.error) {
    return res.status(result.status).json({ success: false, error: result.error });
  }

  const task = result.task;
  task.completed = !task.completed;
  res.status(200).json({ success: true, data: task });
});

module.exports = router;


