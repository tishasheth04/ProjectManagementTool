import React from "react";
import "../../index.css";


const TaskColor = ({ className }) => {
  const combinedClass = `task-color ${className || ""}`.trim();
  return <div className={combinedClass} />;
};

export default TaskColor;
