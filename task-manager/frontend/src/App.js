import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Welcome to Task Manager',
      description: 'This is your first task. You can edit or delete it!',
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 'low'
    },
    {
      id: 2,
      title: 'Create New Tasks',
      description: 'Use the form above to create new tasks with title, description and priority',
      completed: false,
      createdAt: new Date().toISOString(),
      priority: 'low'
    },
    {
      id: 3,
      title: 'Mark Tasks Complete',
      description: 'Click the checkbox to mark tasks as completed',
      completed: true,
      createdAt: new Date().toISOString(),
      priority: 'low'
    }
  ]);
  const [filter, setFilter] = useState('all');

  // Add new task
  const handleAddTask = (taskData) => {
    const newTask = {
      id: Date.now(),
      title: taskData.title,
      description: taskData.description,
      priority: taskData.priority,
      completed: false,
      createdAt: new Date().toISOString()
    };
    setTasks([...tasks, newTask]);
  };

  // Toggle task completion
  const handleToggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  // Delete task
  const handleDeleteTask = (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  // Edit task
  const handleEditTask = (id, updatedData) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, ...updatedData } : task
    ));
  };

  // Filter tasks
  const getFilteredTasks = () => {
    switch (filter) {
      case 'active':
        return tasks.filter(task => !task.completed);
      case 'completed':
        return tasks.filter(task => task.completed);
      default:
        return tasks;
    }
  };

  // Calculate task counts
  const taskCounts = {
    all: tasks.length,
    active: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="App">
      <header className="App-header">
        <h1>📝 Task Manager</h1>
        <p className="subtitle">Organize your tasks with an endless carousel</p>
      </header>

      <main className="App-main">
        <TaskForm onAddTask={handleAddTask} />
        
        <TaskFilter
          filter={filter}
          onFilterChange={setFilter}
          taskCounts={taskCounts}
        />

        <TaskList
          tasks={filteredTasks}
          onToggle={handleToggleTask}
          onDelete={handleDeleteTask}
          onEdit={handleEditTask}
        />
      </main>

      <footer className="App-footer">
        <p>Built with React • Endless Carousel View</p>
      </footer>
    </div>
  );
}

export default App;

