import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import AISuggestions from './components/AISuggestions';
import StatsCard from './components/StatsCard';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

 
  const API_URL = 'http://localhost:5000/api';
  useEffect(() => {
    loadTasks();
  }, []);


  const loadTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error('Error loading tasks:', error);
      
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };


  const handleAddTask = async (taskTitle) => {
    const newTask = {
      title: taskTitle,
      completed: false
    };

    try {
      const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
      });
      const addedTask = await response.json();
      setTasks([...tasks, addedTask]);
    } catch (error) {
      console.error('Error adding task:', error);
      
      const localTask = {
        ...newTask,
        id: Date.now()
      };
      setTasks([...tasks, localTask]);
    }
  };


  const handleToggleTask = async (taskId) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    const updatedTask = {
      ...task,
      completed: !task.completed
    };

    try {
      await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed: updatedTask.completed }),
      });
      

      setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
    } catch (error) {
      console.error('Error toggling task:', error);
 
      setTasks(tasks.map(t => t.id === taskId ? updatedTask : t));
    }
  };


  const handleDeleteTask = async (taskId) => {
    try {
      await fetch(`${API_URL}/tasks/${taskId}`, {
        method: 'DELETE',
      });
      
      setTasks(tasks.filter(t => t.id !== taskId));
    } catch (error) {
      console.error('Error deleting task:', error);
      
      setTasks(tasks.filter(t => t.id !== taskId));
    }
  };


  const completedCount = tasks.filter(task => task.completed).length;
  const totalCount = tasks.length;

  return (
    <div className="app-container">
      <div className="background-gradient"></div>
      
      <div className="main-card">
        {}
        <header className="app-header">
          <h1 className="app-title">AI Task Manager</h1>
          <p className="app-subtitle">Boost your productivity with smart task management</p>
        </header>

        {}
        <StatsCard completed={completedCount} total={totalCount} />

        {}
        <AddTaskForm onAddTask={handleAddTask} />

        {}
        <AISuggestions apiUrl={API_URL} />

        {}
        {loading ? (
          <div className="loading-state">
            <p>Loading tasks...</p>
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onToggleTask={handleToggleTask}
            onDeleteTask={handleDeleteTask}
          />
        )}
      </div>
    </div>
  );
}

export default App;