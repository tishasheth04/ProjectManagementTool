import React from "react";
import TaskCard from "./TaskCard";
import TaskTitle from "./TaskTitle";

const STAGES = [
  { key: "todo", label: "To Do", className: "todo" },
  { key: "in progress", label: "In Progress", className: "in-progress" },
  { key: "completed", label: "Completed", className: "completed" },
];

const BoardView = ({ tasks }) => {
  return (
    <div className="board-columns">
      {STAGES.map((stage) => (
        <div key={stage.key} className="board-column">
          <TaskTitle label={stage.label} className={stage.className} />
          {tasks
            .filter((task) => task.stage === stage.key)
            .map((task, index) => (
              <TaskCard key={index} task={task} />
            ))}
        </div>
      ))}
    </div>
  );
};

export default BoardView;
