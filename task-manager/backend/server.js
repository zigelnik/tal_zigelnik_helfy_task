const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 4000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Task Manager API',
    endpoints: {
      'GET /api/tasks': 'Get all tasks',
      'POST /api/tasks': 'Create a new task',
      'PUT /api/tasks/:id': 'Update a task',
      'DELETE /api/tasks/:id': 'Delete a task',
      'PATCH /api/tasks/:id/toggle': 'Toggle task completion'
    }
  });
});

app.use('/api/tasks', require('./routes/tasks'));

// 404 and error handlers
app.use(require('./middleware/notFound'));
app.use(require('./middleware/errorHandler'));

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;

