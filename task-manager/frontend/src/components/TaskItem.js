import React, { useState } from 'react';
import './TaskItem.css';

function TaskItem({ task, onToggle, onDelete, onEdit, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleEdit = () => {
    if (isEditing && editText.trim()) {
      onEdit(task.id, editText);
    }
    setIsEditing(!isEditing);
  };

  const handleCancel = () => {
    setEditText(task.text);
    setIsEditing(false);
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
      </div>

      <div className="task-item-body">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="task-edit-input"
            autoFocus
            onKeyPress={(e) => {
              if (e.key === 'Enter') handleEdit();
              if (e.key === 'Escape') handleCancel();
            }}
          />
        ) : (
          <p className="task-text">{task.text}</p>
        )}
      </div>

      <div className="task-item-footer">
        {isEditing ? (
          <div className="task-edit-actions">
            <button onClick={handleEdit} className="task-btn save-btn">
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
        {new Date(task.createdAt).toLocaleDateString()}
      </div>
    </div>
  );
}

export default TaskItem;

