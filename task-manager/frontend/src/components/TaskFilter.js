import React from 'react';
import './TaskFilter.css';

function TaskFilter({ filter, onFilterChange, taskCounts }) {
  const filters = [
    { value: 'all', label: 'All Tasks', icon: '📋' },
    { value: 'active', label: 'Active', icon: '⚡' },
    { value: 'completed', label: 'Completed', icon: '✓' }
  ];

  return (
    <div className="task-filter-container">
      <div className="filter-header">
        <h3>Filter Tasks</h3>
      </div>
      
      <div className="filter-buttons">
        {filters.map(({ value, label, icon }) => (
          <button
            key={value}
            onClick={() => onFilterChange(value)}
            className={`filter-btn ${filter === value ? 'active' : ''}`}
          >
            <span className="filter-icon">{icon}</span>
            <span className="filter-label">{label}</span>
            <span className="filter-count">
              {value === 'all' && taskCounts.all}
              {value === 'active' && taskCounts.active}
              {value === 'completed' && taskCounts.completed}
            </span>
          </button>
        ))}
      </div>

      <div className="filter-stats">
        <div className="stat-item">
          <span className="stat-label">Total:</span>
          <span className="stat-value">{taskCounts.all}</span>
        </div>
        <div className="stat-divider">|</div>
        <div className="stat-item">
          <span className="stat-label">Active:</span>
          <span className="stat-value active">{taskCounts.active}</span>
        </div>
        <div className="stat-divider">|</div>
        <div className="stat-item">
          <span className="stat-label">Done:</span>
          <span className="stat-value completed">{taskCounts.completed}</span>
        </div>
      </div>
    </div>
  );
}

export default TaskFilter;

