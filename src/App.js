import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TaskForm from "./components/list/TaskForm";
import TaskList from "./components/list";
import TaskModal from "./components/TaskModal";
import './App.css'

const App = () => {
  const [tasks, setTasks] = useState();
  const [callApi, setCallApi] = useState(false)
  const [taskData, setTaskData] = useState()
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Fetch tasks from the server on component mount
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:3000/tasks');
        setTasks(response?.data?.tasks)
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, [callApi]);

  // Function to add a new task to the list
  const handleCreateTask = (newTask) => {
    setCallApi(!callApi)
    setIsModalOpen(false);
  };

  // Function to update the status of a task
  const handleUpdateTask = (taskId) => {
    const taskToUpdate = tasks.find(task => task.id === taskId);
    setTaskData(taskToUpdate);
    setIsModalOpen(true);
  };

  // To close the modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTaskData(null);
  };

  // Function to delete a task
  const handleDeleteTask = async (taskId) => {
    try {
      await axios.delete(`http://localhost:3000/tasks/${taskId}`);
      setCallApi(!callApi)
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Function to handle task updates from TaskModal
  const handleTaskUpdate = (updatedTask) => {
    const updatedTasks = tasks.map(task =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
  };

  const UpdateTask = () => {
    setCallApi(!callApi);
  }

  const onSubmit= (data)=>{
    console.log("data", data);
    // setCallApi(!callApi)
  }

  return (
    <div>
      <h1>Task Management</h1>
      <TaskForm onCreateTask={handleCreateTask} onSubmit={onSubmit} />
      {<TaskList tasks={tasks} onUpdateTask={handleUpdateTask} onDeleteTask={handleDeleteTask} />}
      {isModalOpen && <TaskModal taskData={taskData} UpdateTask={UpdateTask} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
