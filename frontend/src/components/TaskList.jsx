import React from 'react';

function TaskList({ tasks, onToggle }) {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
          <span>{task.title}</span>
          <button onClick={() => onToggle(task.id)}>
            {task.completed ? 'Undo' : 'Complete'}
          </button>
        </div>
      ))}
    </div>
  );
}

export default TaskList;