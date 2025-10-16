import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import '../styles/TaskList.css';

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  // Reset currentIndex if it's out of bounds
  useEffect(() => {
    if (tasks.length > 0 && currentIndex >= tasks.length) {
      setCurrentIndex(0);
    }
  }, [tasks.length, currentIndex]);

  // Auto-scroll carousel every 3 seconds (pause when editing)
  useEffect(() => {
    if (tasks.length === 0 || editingTaskId !== null) return;

    const interval = setInterval(() => {
      setIsAnimating(true);
      setCurrentIndex((prev) => (prev + 1) % tasks.length);
      setTimeout(() => setIsAnimating(false), 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [tasks.length, editingTaskId]);

  const nextTask = () => {
    if (isAnimating || tasks.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev + 1) % tasks.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const prevTask = () => {
    if (isAnimating || tasks.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex((prev) => (prev - 1 + tasks.length) % tasks.length);
    setTimeout(() => setIsAnimating(false), 300);
  };

  const goToTask = (index) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 300);
  };

  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>No tasks to display. Create one to get started!</p>
      </div>
    );
  }

  // Create endless carousel effect by showing 3 tasks (prev, current, next)
  const getVisibleTasks = () => {
    if (!tasks || tasks.length === 0) return [];
    
    const prevIndex = (currentIndex - 1 + tasks.length) % tasks.length;
    const nextIndex = (currentIndex + 1) % tasks.length;
    
    return [
      { task: tasks[prevIndex], position: 'prev', index: prevIndex },
      { task: tasks[currentIndex], position: 'current', index: currentIndex },
      { task: tasks[nextIndex], position: 'next', index: nextIndex }
    ].filter(item => item.task); // Filter out any undefined tasks
  };

  return (
    <div className="task-list-container">
      <button className="carousel-btn prev-btn" onClick={prevTask}>
        ‹
      </button>

      <div className="carousel-wrapper">
        <div className={`carousel-track ${isAnimating ? 'animating' : ''}`}>
          {getVisibleTasks().map(({ task, position, index }) => (
            task && (
              <div key={`${task.id}-${position}`} className={`carousel-item ${position}`}>
                <TaskItem
                  task={task}
                  onToggle={onToggle}
                  onDelete={onDelete}
                  onEdit={onEdit}
                  isActive={position === 'current'}
                  isEditing={editingTaskId === task.id}
                  onEditingChange={(isEditing) => setEditingTaskId(isEditing ? task.id : null)}
                />
              </div>
            )
          ))}
        </div>
      </div>

      <button className="carousel-btn next-btn" onClick={nextTask}>
        ›
      </button>

      {/* Carousel indicators */}
      <div className="carousel-indicators">
        {tasks.map((_, index) => (
          <button
            key={index}
            className={`indicator ${index === currentIndex ? 'active' : ''}`}
            onClick={() => goToTask(index)}
            aria-label={`Go to task ${index + 1}`}
          />
        ))}
      </div>

      <div className="carousel-counter">
        {currentIndex + 1} / {tasks.length}
        {editingTaskId && <span className="carousel-paused"> • Paused</span>}
      </div>
    </div>
  );
}

export default TaskList;
