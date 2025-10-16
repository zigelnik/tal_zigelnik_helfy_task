import React, { useState } from 'react';
import './TaskForm.css';

function TaskForm({ onAddTask }) {
  const [taskText, setTaskText] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!taskText.trim()) {
      setError('Please enter a task');
      return;
    }

    if (taskText.trim().length < 3) {
      setError('Task must be at least 3 characters');
      return;
    }

    onAddTask(taskText.trim());
    setTaskText('');
    setError('');
  };

  const handleChange = (e) => {
    setTaskText(e.target.value);
    if (error) setError('');
  };

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-header">
          <h2>Create New Task</h2>
        </div>
        
        <div className="form-group">
          <textarea
            value={taskText}
            onChange={handleChange}
            placeholder="What needs to be done?"
            className={`task-textarea ${error ? 'error' : ''}`}
            rows="3"
            maxLength="200"
          />
          <div className="form-info">
            <span className={`char-count ${taskText.length > 180 ? 'warning' : ''}`}>
              {taskText.length}/200
            </span>
          </div>
        </div>

        {error && (
          <div className="form-error">
            {error}
          </div>
        )}

        <button type="submit" className="submit-btn">
          <span className="btn-icon">+</span>
          <span>Add Task</span>
        </button>
      </form>
    </div>
  );
}

export default TaskForm;

