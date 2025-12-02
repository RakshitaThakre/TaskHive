import React from 'react';
import { CheckCircle, Circle, Trash2 } from 'lucide-react';
import './TaskItem.css';

function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      {}
      <button
        className="check-button"
        onClick={() => onToggle(task.id)}
        aria-label={task.completed ? 'Mark as incomplete' : 'Mark as complete'}
      >
        {task.completed ? (
          <CheckCircle size={22} className="check-icon checked" />
        ) : (
          <Circle size={22} className="check-icon" />
        )}
      </button>

      {}
      <span className={`task-text ${task.completed ? 'task-completed' : ''}`}>
        {task.title}
      </span>

      {}
      <button
        className="delete-button"
        onClick={() => onDelete(task.id)}
        aria-label="Delete task"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}

export default TaskItem;