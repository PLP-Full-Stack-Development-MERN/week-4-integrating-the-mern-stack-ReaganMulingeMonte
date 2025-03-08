import React, { useState, useEffect } from 'react';

const TaskForm = ({ onAdd, onUpdate, editingTask, setEditingTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pending');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setStatus(editingTask.status);
      setDueDate(editingTask.dueDate ? editingTask.dueDate.substring(0, 10) : '');
    } else {
      setTitle('');
      setDescription('');
      setStatus('pending');
      setDueDate('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const task = { title, description, status, dueDate };
    if (editingTask) {
      onUpdate({ ...task, _id: editingTask._id });
      setEditingTask(null);
    } else {
      onAdd(task);
    }
    setTitle('');
    setDescription('');
    setStatus('pending');
    setDueDate('');
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label className="block text-sm font-semibold mb-1">Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-semibold mb-1">Description:</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <div className="mb-2">
        <label className="block text-sm font-semibold mb-1">Status:</label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border p-2 w-full"
        >
          <option value="pending">Pending</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="block text-sm font-semibold mb-1">Due Date:</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="border p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        {editingTask ? 'Update Task' : 'Add Task'}
      </button>
      {editingTask && (
        <button
          type="button"
          onClick={() => setEditingTask(null)}
          className="bg-gray-300 text-gray-700 p-2 rounded ml-2"
        >
          Cancel
        </button>
      )}
    </form>
  );
};

export default TaskForm;