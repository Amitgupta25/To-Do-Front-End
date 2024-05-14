import React from 'react';
import TaskForm from './list/TaskForm';


const TaskModal = ({ taskData, UpdateTask, onClose }) => {
  const handleSubmit = () => {
    // UpdateTask();
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <TaskForm taskData={taskData} UpdateTask={UpdateTask} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default TaskModal;
