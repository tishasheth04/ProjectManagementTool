import React from "react";

const TaskTitle = ({ label, className }) => {
  return (
    <div className="task-title-container">
      <div className="task-title-left">
        <div className={`task-title-dot ${className}`} />
        <p className="task-title-text">{label}</p>
      </div>
    </div>
  );
};

export default TaskTitle;
