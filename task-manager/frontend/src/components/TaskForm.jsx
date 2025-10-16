import React, { useState } from 'react';
import '../styles/TaskForm.css';

function TaskForm({ onAddTask }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'low'
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (formData.title.trim().length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (formData.description.trim().length < 5) {
      newErrors.description = 'Description must be at least 5 characters';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onAddTask({
      title: formData.title.trim(),
      description: formData.description.trim(),
      priority: formData.priority
    });
    
    setFormData({ title: '', description: '', priority: 'low' });
    setErrors({});
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="task-form-container">
      <form onSubmit={handleSubmit} className="task-form">
        <div className="form-header">
          <h2>Create New Task</h2>
        </div>
        
        <div className="form-group">
          <label htmlFor="title" className="form-label">Title *</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter task title..."
            className={`task-input ${errors.title ? 'error' : ''}`}
            maxLength="100"
          />
          {errors.title && (
            <div className="field-error">{errors.title}</div>
          )}
          <div className="form-info">
            <span className={`char-count ${formData.title.length > 90 ? 'warning' : ''}`}>
              {formData.title.length}/100
            </span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="description" className="form-label">Description *</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Describe your task..."
            className={`task-textarea ${errors.description ? 'error' : ''}`}
            rows="4"
            maxLength="500"
          />
          {errors.description && (
            <div className="field-error">{errors.description}</div>
          )}
          <div className="form-info">
            <span className={`char-count ${formData.description.length > 450 ? 'warning' : ''}`}>
              {formData.description.length}/500
            </span>
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="priority" className="form-label">Priority</label>
          <div className="priority-selector">
            <label className={`priority-option ${formData.priority === 'low' ? 'active' : ''}`}>
              <input
                type="radio"
                name="priority"
                value="low"
                checked={formData.priority === 'low'}
                onChange={handleChange}
              />
              <span className="priority-badge low">Low</span>
            </label>
            <label className={`priority-option ${formData.priority === 'medium' ? 'active' : ''}`}>
              <input
                type="radio"
                name="priority"
                value="medium"
                checked={formData.priority === 'medium'}
                onChange={handleChange}
              />
              <span className="priority-badge medium">Medium</span>
            </label>
            <label className={`priority-option ${formData.priority === 'high' ? 'active' : ''}`}>
              <input
                type="radio"
                name="priority"
                value="high"
                checked={formData.priority === 'high'}
                onChange={handleChange}
              />
              <span className="priority-badge high">High</span>
            </label>
          </div>
        </div>

        <button type="submit" className="submit-btn">
          <span className="btn-icon">+</span>
          <span>Add Task</span>
        </button>
      </form>
    </div>
  );
}

export default TaskForm;
