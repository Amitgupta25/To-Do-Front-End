import React, { useState, useEffect } from 'react';
import axios from 'axios';

const taskStatus = [
  { label: "To Do", value: 0 },
  { label: "In Progress", value: 1 },
  { label: "Done", value: 2 }
]

const TaskForm = ({ taskData, onSubmit, UpdateTask }) => {
  const [title, setTitle] = useState(taskData?.title || '');
  const [description, setDescription] = useState(taskData?.description || '');
  const [status, setStatus] = useState(taskData?.status || 0);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (taskData) {
      setTitle(taskData?.title || '');
      setDescription(taskData?.description || '');
      setStatus(taskData?.status || 0);
    }
  }, [taskData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let response
      if (taskData) {
        try {
          response = await axios.put(`http://localhost:3000/tasks/${taskData?.id}`, {
            title,
            description,
            status
          });
          UpdateTask(response?.data)
        } catch (error) {
          console.log("error", error);
        }
      } else {
        // Create task
        try {
          response = await axios.post('http://localhost:3000/tasks', {
            title,
            description,
            status
          });
          // Pass the new task to the parent component
        } catch (error) {
          console.log("error", error);
        }
      }
      onSubmit(response?.data);

      // Reset form fields
      setTitle('');
      setDescription('');
      setStatus(0);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(error);
    }
  };

  return (<div className='main-container'>
    <h2>{taskData ? 'Edit Task' : 'Create New Task'}</h2>
    {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
    <form className='form-container' onSubmit={handleSubmit}>
      <div className='fields'>
        <label className='d-block'>Title:</label>
        <input placeholder="Title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div className='fields'>
        <label className='d-block'>Description:</label>
        <textarea placeholder="Enter Description" value={description} onChange={(e) => setDescription(e.target.value)} required />
      </div>
      <div className='fields'>
        <label className='d-block'>Status:</label>
        <select className='select_block' value={status} onChange={(e) => setStatus(e.target.value)} required>
          {taskStatus?.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
        </select>
      </div>
      <button className='select_block' type="submit">{taskData ? 'Update Task' : 'Create Task'}</button>
    </form>
  </div>)
};


export default TaskForm;
