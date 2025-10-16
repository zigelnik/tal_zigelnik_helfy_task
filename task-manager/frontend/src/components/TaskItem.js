import React, { useState } from 'react';
import './TaskItem.css';

function TaskItem({ task, onToggle, onDelete, onEdit, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    title: task.title,
    description: task.description,
    priority: task.priority
  });

  const handleSave = () => {
    if (editData.title.trim() && editData.description.trim()) {
      onEdit(task.id, editData);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      title: task.title,
      description: task.description,
      priority: task.priority
    });
    setIsEditing(false);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return '#f44336';
      case 'medium': return '#ff9800';
      case 'low': return '#4caf50';
      default: return '#666';
    }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''} ${isActive ? 'active' : ''}`}>
      <div className="task-item-header">
        <div className="task-checkbox-wrapper">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggle(task.id)}
            className="task-checkbox"
            id={`task-${task.id}`}
          />
          <label htmlFor={`task-${task.id}`} className="checkbox-label">
            {task.completed ? '✓' : ''}
          </label>
        </div>
        <span 
          className={`priority-indicator priority-${task.priority}`}
          style={{ background: getPriorityColor(task.priority) }}
        >
          {task.priority}
        </span>
      </div>

      <div className="task-item-body">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              value={editData.title}
              onChange={(e) => setEditData({ ...editData, title: e.target.value })}
              className="task-edit-input"
              placeholder="Title"
              maxLength="100"
            />
            <textarea
              value={editData.description}
              onChange={(e) => setEditData({ ...editData, description: e.target.value })}
              className="task-edit-textarea"
              placeholder="Description"
              rows="3"
              maxLength="500"
            />
            <div className="priority-edit">
              <label>Priority:</label>
              <select
                value={editData.priority}
                onChange={(e) => setEditData({ ...editData, priority: e.target.value })}
                className="priority-select"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
        ) : (
          <>
            <h3 className="task-title">{task.title}</h3>
            <p className="task-description">{task.description}</p>
          </>
        )}
      </div>

      <div className="task-item-footer">
        {isEditing ? (
          <div className="task-edit-actions">
            <button onClick={handleSave} className="task-btn save-btn">
              Save
            </button>
            <button onClick={handleCancel} className="task-btn cancel-btn">
              Cancel
            </button>
          </div>
        ) : (
          <div className="task-actions">
            <button
              onClick={() => setIsEditing(true)}
              className="task-btn edit-btn"
              title="Edit task"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(task.id)}
              className="task-btn delete-btn"
              title="Delete task"
            >
              🗑️
            </button>
          </div>
        )}
      </div>

      <div className="task-timestamp">
        Created: {new Date(task.createdAt).toLocaleDateString()} {new Date(task.createdAt).toLocaleTimeString()}
      </div>
    </div>
  );
}

export default TaskItem;

