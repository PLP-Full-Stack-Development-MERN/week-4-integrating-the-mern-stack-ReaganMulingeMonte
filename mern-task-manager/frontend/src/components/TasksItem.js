import React from 'react';

const TaskItem = ({ task, onDelete, onUpdate }) => {
  return (
    <div className="border p-4 mb-2">
      <h3 className="text-lg font-semibold">{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <p>Due Date: {task.dueDate}</p>
      <button onClick={() => onDelete(task._id)} className="bg-red-500 text-white p-2 mt-2 mr-2">Delete</button>
      <button onClick={() => onUpdate(task)} className="bg-blue-500 text-white p-2 mt-2">Update</button>
    </div>
  );
};

export default TaskItem;