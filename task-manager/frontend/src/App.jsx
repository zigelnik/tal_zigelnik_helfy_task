import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskFilter from './components/TaskFilter';
import TaskList from './components/TaskList';
import { getTasks, createTask, updateTask, deleteTask } from './services/taskService';
import './styles/App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
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
      // Ensure data is an array
      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      setError('Failed to load tasks. Please check if the backend server is running.');
      console.error('Error fetching tasks:', err);
      setTasks([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  // Add new task
  const handleAddTask = async (taskData) => {
    try {
      setError(null);
      const newTask = await createTask(taskData);
      if (newTask && newTask.id) {
        setTasks([...tasks, newTask]);
      }
    } catch (err) {
      setError('Failed to create task. Please try again.');
      console.error('Error creating task:', err);
    }
  };

  // Toggle task completion
  const handleToggleTask = async (id) => {
    try {
      setError(null);
      const task = tasks.find(t => t && t.id === id);
      if (!task) return;
      
      const updatedTask = await updateTask(id, {
        ...task,
        completed: !task.completed
      });
      
      if (updatedTask) {
        setTasks(tasks.map(t => t.id === id ? updatedTask : t));
      }
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
      const task = tasks.find(t => t && t.id === id);
      if (!task) return;
      
      const updatedTask = await updateTask(id, {
        ...task,
        ...updatedData
      });
      
      if (updatedTask) {
        setTasks(tasks.map(t => t.id === id ? updatedTask : t));
      }
    } catch (err) {
      setError('Failed to update task. Please try again.');
      console.error('Error updating task:', err);
    }
  };

  // Filter tasks
  const getFilteredTasks = () => {
    if (!Array.isArray(tasks)) return [];
    let filtered = tasks.filter(task => task); // filter out undefined/null
    switch (filter) {
      case 'pending':
        filtered = filtered.filter(task => !task.completed); break;
      case 'completed':
        filtered = filtered.filter(task => task.completed); break;
      default:
        break;
    }
    // Search
    if (searchQuery.trim() !== '') {
      const q = searchQuery.trim().toLowerCase();
      filtered = filtered.filter(task =>
        (task.title && task.title.toLowerCase().includes(q)) ||
        (task.description && task.description.toLowerCase().includes(q))
      );
    }
    return filtered;
  };

  // Calculate task counts
  const taskCounts = {
    all: Array.isArray(tasks) ? tasks.filter(t => t).length : 0,
    pending: Array.isArray(tasks) ? tasks.filter(task => task && !task.completed).length : 0,
    completed: Array.isArray(tasks) ? tasks.filter(task => task && task.completed).length : 0
  };

  const filteredTasks = getFilteredTasks();

  return (
    <div className="App">
      <header className="App-header">
        <h1>📝 Task Manager</h1>
        <p className="subtitle">Organize, prioritize, and complete your tasks with ease.</p>
      </header>

      {error && (
        <div className="error-banner">
          <span className="error-icon">⚠️</span>
          <span>{error}</span>
          <button onClick={() => setError(null)} className="error-close">×</button>
        </div>
      )}

      <main className="App-main">
        <div className="main-layout">
          <div className="left-panel">
            <TaskFilter
              filter={filter}
              onFilterChange={setFilter}
              taskCounts={taskCounts}
            />
            <div className="task-search-bar">
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                aria-label="Search tasks"
              />
            </div>
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
                currentFilter={filter}
              />
            )}
          </div>

          <div className="right-panel">
            <TaskForm onAddTask={handleAddTask} />
          </div>
        </div>
      </main>


    </div>
  );
}

export default App;
