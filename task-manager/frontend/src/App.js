import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      text: 'Welcome to Task Manager! This is your first task.',
      completed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      text: 'Try creating a new task using the form above',
      completed: false,
      createdAt: new Date().toISOString()
    },
    {
      id: 3,
      text: 'Mark tasks as completed by clicking the checkbox',
      completed: true,
      createdAt: new Date().toISOString()
    }
  ]);
  const [filter, setFilter] = useState('all');

  // Add new task
  const handleAddTask = (text) => {
    const newTask = {
      id: Date.now(),
      text,
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
    setTasks(tasks.filter(task => task.id !== id));
  };

  // Edit task
  const handleEditTask = (id, newText) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, text: newText } : task
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

