const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage for tasks
let tasks = [
  { id: 1, title: "Learn React", completed: false },
  { id: 2, title: "Build Node.js API", completed: true },
  { id: 3, title: "Complete internship project", completed: false }
];

let nextId = 4;

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API is running!' });
});

// GET all tasks
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

// POST new task
app.post('/api/tasks', (req, res) => {
  const newTask = {
    id: nextId++,
    title: req.body.title,
    completed: req.body.completed || false
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update task (mark as completed/incomplete)
app.put('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const taskIndex = tasks.findIndex(t => t.id === taskId);
  
  if (taskIndex === -1) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  // Update only the fields provided in request body
  tasks[taskIndex] = { 
    ...tasks[taskIndex], 
    ...req.body 
  };
  
  res.json(tasks[taskIndex]);
});

// DELETE task
app.delete('/api/tasks/:id', (req, res) => {
  const taskId = parseInt(req.params.id);
  const initialLength = tasks.length;
  tasks = tasks.filter(t => t.id !== taskId);
  
  if (tasks.length === initialLength) {
    return res.status(404).json({ message: 'Task not found' });
  }
  
  res.json({ message: 'Task deleted successfully', id: taskId });
});

// GET AI suggestions
app.get('/api/ai/suggestions', (req, res) => {
  const suggestions = [
    "Organize your project folder structure",
    "Write documentation for your current project",
    "Learn one new React hook today",
    "Review and refactor your code",
    "Add error handling to your API",
    "Create unit tests for your components"
  ];
  
  // Return 3 random suggestions
  const randomSuggestions = suggestions
    .sort(() => 0.5 - Math.random())
    .slice(0, 3);
  
  res.json({ suggestions: randomSuggestions });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
  console.log(`📡 API endpoints available at http://localhost:${PORT}/api`);
});