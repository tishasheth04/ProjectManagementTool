import React from "react";
import { IoMdAdd } from "react-icons/io";

const TaskTitle = ({ label, className }) => {
  return (
    <div className="task-title-container">
      <div className="task-title-left">
        <div className={`task-title-dot ${className}`} />
        <p className="task-title-text">{label}</p>
      </div>

      <button className="task-title-button">
        <IoMdAdd className="text-lg text-black" />
      </button>
    </div>
  );
};

export default TaskTitle;
