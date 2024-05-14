import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TaskList = ({ tasks, onUpdateTask, onDeleteTask }) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [filteredTasks, setFilteredTasks] = useState([]);

  // Filter tasks based on the selected status
  // useEffect(() => {
  //   if (statusFilter === 'All') {
  //     setFilteredTasks(tasks);
  //   } else {
  //     const filtered = tasks.filter(task => task.status === statusFilter);
  //     setFilteredTasks(filtered);
  //   }
  // }, [tasks, statusFilter]);

  // Handle status filter change
  const handleStatusFilterChange = (e) => {
    setStatusFilter(e.target.value);
  };

  // Fetch tasks based on the selected status
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/tasks/filter_by_status?statuses=${statusFilter}`);

        setFilteredTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [statusFilter]);

  return (
    <div className='tasks_list'>
      <h2>Task List</h2>
      <div>
        <label className='filter' htmlFor="status-filter">Filter by Status: </label>
        <select id="status-filter" value={statusFilter} onChange={handleStatusFilterChange}>
          <option value="All">All</option>
          <option value="0">To Do</option>
          <option value="1">In Progress</option>
          <option value="2">Done</option>
        </select>
      </div>
      <ul>
        {filteredTasks?.length !== 0 && filteredTasks?.map(task => {
          const status = {
            0: "To Do",
            1: "In Progress",
            2: "Done"
          }

          return <li key={task.id} className='task_list'>
            <div>
              <strong>{task.title}</strong>
              <p>{task.description}</p>
              <p>Status: {status[task.status]}</p>
            </div>
            <div className='task_button'>
              <button onClick={() => onUpdateTask(task.id)}>Edit</button>
              <button onClick={() => onDeleteTask(task.id)}>Delete</button>
            </div>
          </li>
        })}
      </ul>
    </div>
  );
};

export default TaskList;
