import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const res = await axios.get('/api/tasks');
    setTasks(res.data);
  };

  const addTask = async (task) => {
    await axios.post('/api/tasks', task);
    fetchTasks();
  };

  const updateTask = async (task) => {
    await axios.patch(`/api/tasks/${task._id}`, task);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`/api/tasks/${id}`);
    fetchTasks();
  };

  const handleUpdateClick = (task) => {
    setEditingTask(task);
  };

  return (
    <div className="p-4">
      <TaskForm onAdd={addTask} onUpdate={updateTask} editingTask={editingTask} setEditingTask={setEditingTask} />
      {tasks.map((task) => (
        <TaskItem key={task._id} task={task} onDelete={deleteTask} onUpdate={handleUpdateClick} />
      ))}
    </div>
  );
};

export default TaskList;