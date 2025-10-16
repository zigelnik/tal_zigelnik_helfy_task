import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import { getTasks, createTask, updateTask, deleteTask } from './services/taskService';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Fetch all tasks from API
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getTasks();
      setTasks(data);
    } catch (err) {
      setError('Failed to load tasks. Please check if the backend server is running.');
      console.error('Error fetching tasks:', err);
    } finally {
      setLoading(false);
    }
  };

  // Add new task
  const handleAddTask = async (taskData) => {
    try {
      setError(null);
      const newTask = await createTask(taskData);
      setTasks([...tasks, newTask]);
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Error creating task:', err);
    }
  };

  // Toggle task completion
  const handleToggleTask = async (id) => {
    try {
      setError(null);
      const task = tasks.find(t => t.id === id);
      const updatedTask = await updateTask(id, {
        ...task,
        completed: !task.completed
      });
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error toggling task:', err);
    }
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');
    if (confirmed) {
      try {
        setError(null);
        await deleteTask(id);
        setTasks(tasks.filter(task => task.id !== id));
      } catch (err) {
        setError('Failed to delete task. Please try again.');
        console.error('Error deleting task:', err);
      }
    }
  };

  // Edit task
  const handleEditTask = async (id, updatedData) => {
    try {
      setError(null);
      const task = tasks.find(t => t.id === id);
      const updatedTask = await updateTask(id, {
        ...task,
        ...updatedData
      });
      setTasks(tasks.map(t => t.id === id ? updatedTask : t));
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  // Filter tasks
  const getFilteredTasks = () => {
    switch (filter) {
      case 'pending':
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
    pending: tasks.filter(task => !task.completed).length,
    completed: tasks.filter(task => task.completed).length
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="App">
      <header className="App-header">
        <h1>📝 Task Manager</h1>
        <p className="subtitle">Organize your tasks with an endless carousel</p>
      </header>

      {error && (
        <div className="error-banner">
          <span className="error-icon">⚠️</span>
          <span>{error}</span>
          <button onClick={() => setError(null)} className="error-close">×</button>
        </div>
      )}

      <main className="App-main">
        <TaskForm onAddTask={handleAddTask} />
        
        <TaskFilter
          filter={filter}
          onFilterChange={setFilter}
          taskCounts={taskCounts}
        />

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading tasks...</p>
          </div>
        ) : (
          <TaskList
            tasks={filteredTasks}
            onToggle={handleToggleTask}
            onDelete={handleDeleteTask}
            onEdit={handleEditTask}
          />
        )}
      </main>

      <footer className="App-footer">
        <p>Built with React • Endless Carousel View • API Integrated</p>
      </footer>
    </div>
  );
}

export default App;

