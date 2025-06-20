// === Updated TaskCard.jsx ===
import React, { useState } from "react";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../utils";
import { BiMessageAltDetail } from "react-icons/bi";
import { FaList } from "react-icons/fa";
import UserInfo from "./UserInfo";
import { IoMdAdd } from "react-icons/io";
import AddSubTask from "./task/AddSubTask";
import TaskDialog from "./task/TaskDialog";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TaskCard = ({ task, onAddSubTask, setTaskList, onDeleteTask }) => {
  const { user } = useSelector((state) => state.auth);
  const [openSubTask, setOpenSubTask] = useState(false);

  const handleAddSubTask = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setOpenSubTask(true);
  };

  return (
    <div className="task-card" style={{ position: "relative" }}>
      {/* Three Dots Dropdown */}
      <div
        className="task-card-menu-wrapper"
        style={{ position: "absolute", top: "0.75rem", right: "0.75rem", zIndex: 10 }}
      >
        <TaskDialog
          task={task}
          setTaskList={setTaskList}
          onAddSubTask={onAddSubTask}
          onDeleteTask={onDeleteTask}
        />
      </div>

      <div className="task-card-header">
        <div className={`priority priority-${task?.priority}`}>
          <span className="priority-icon">{ICONS[task?.priority]}</span>
          <span className="priority-label">{task?.priority} Priority</span>
        </div>
      </div>

      <div className="task-main">
        <div className="task-title">
          <div className={`stage-indicator stage-${task.stage}`} />
          <h4>{task?.title}</h4>
        </div>
        <span className="task-date">{formatDate(new Date(task?.date))}</span>
      </div>

      <div className="task-info-divider" />

      <div className="task-info-row">
        <div className="task-icons">
          <div className="icon-text">
            <BiMessageAltDetail />
            <span>{task?.activities?.length}</span>
          </div>
          <div className="icon-text">
            <MdAttachFile />
            <span>{task?.assets?.length}</span>
          </div>
          <div className="icon-text">
            <FaList />
            <span>0/{task?.subTasks?.length}</span>
          </div>
        </div>

        <div className="task-users">
          {task?.team?.map((m, index) => (
            <div key={index} className={`user-avatar user-avatar-${index % BGS.length}`}>
              <UserInfo user={m} />
            </div>
          ))}
        </div>
      </div>

      {/* Subtask Section */}
      <div className="subtask-section">
        {task?.subTasks?.length > 0 ? (
          <>
            <h5>{task?.subTasks[0].title}</h5>
            <div className="subtask-meta">
              <span>{formatDate(new Date(task?.subTasks[0]?.date))}</span>
              <span className="subtask-tag">{task?.subTasks[0].tag}</span>
            </div>
          </>
        ) : (
          <span className="no-subtask">No Sub Task</span>
        )}
      </div>

      {/* Add Subtask Button */}
      <div className="add-subtask-button-wrapper">
        <button onClick={handleAddSubTask} className="add-subtask-button">
          <IoMdAdd className="icon-md" />
          <span>ADD SUBTASK</span>
        </button>
      </div>

      {/* Modal for Add Subtask */}
      <AddSubTask
        open={openSubTask}
        setOpen={setOpenSubTask}
        id={task._id}
        onAdd={onAddSubTask}
      />
    </div>
  );
};

export default TaskCard;