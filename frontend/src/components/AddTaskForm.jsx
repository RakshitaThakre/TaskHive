import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import './AddTaskForm.css';

function AddTaskForm({ onAddTask }) {
  const [taskInput, setTaskInput] = useState('');

  const handleSubmit = () => {
    if (taskInput.trim() === '') {
      return;
    }

    onAddTask(taskInput);
    

    setTaskInput('');
  };


  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="add-task-form">
      <div className="input-group">
        <input
          type="text"
          className="task-input"
          placeholder="What needs to be done?"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button 
          className="add-button"
          onClick={handleSubmit}
        >
          <Plus size={20} />
          Add Task
        </button>
      </div>
    </div>
  );
}

export default AddTaskForm;