import React, { useState, useEffect } from 'react';

import './App.css';
import TaskList from './components/TaskList';

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await fetch('http://localhost:8000/tasks');
    const data = await response.json();
    setTasks(data);
  };

  const addTask = async () => {
    if (!newTask.trim()) return;
    
    try {
      const response = await fetch('http://localhost:8000/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          title: newTask
        }),
        credentials: 'omit'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setNewTask('');
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const toggleTask = async (taskId) => {
    await fetch(`http://localhost:8000/tasks/${taskId}`, {
      method: 'PUT',
    });
    fetchTasks();
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <div className="add-task">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="New Task"
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <TaskList tasks={tasks} onToggle={toggleTask} />
    </div>
  );
}

export default App;