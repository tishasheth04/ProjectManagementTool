// === Updated TaskDialog.jsx ===
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiDotsVertical } from "react-icons/hi";
import AddSubTask from "./AddSubTask";
import AddTask from "./AddTask";
import { toast } from "sonner";

const TaskDialog = ({ task, onAddSubTask, setTaskList, onDeleteTask }) => {
  const [open, setOpen] = useState(false);
  const [openSubTask, setOpenSubTask] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const navigate = useNavigate();

  const handleDelete = () => {
    if (onDeleteTask) {
      onDeleteTask(task._id);
      toast.success("Task deleted successfully");
    } else {
      toast.error("Delete function not provided");
    }
    setOpen(false);
  };

  const handleDuplicate = () => {
    const newTask = {
      ...task,
      _id: Date.now().toString(),
      title: `${task.title} (Copy)`
    };
    if (setTaskList) {
      setTaskList((prev) => [newTask, ...prev]);
    }
    setOpen(false);
  };

  return (
    <div
      className="task-dialog-wrapper"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <HiDotsVertical className="task-dialog-icon" />
      {open && (
        <div className="task-dialog-dropdown">
          <p onClick={() => navigate(`/tasks/${task._id}`)}>Open Task</p>
          <p onClick={() => { setOpenEdit(true); setOpen(false); }}>Edit</p>
          <p onClick={() => { setOpenSubTask(true); setOpen(false); }}>Add Subtask</p>
          <p onClick={handleDuplicate}>Duplicate</p>
          <p onClick={handleDelete}>Delete</p>
        </div>
      )}

      <AddSubTask
        open={openSubTask}
        setOpen={setOpenSubTask}
        id={task._id}
        onAdd={onAddSubTask}
      />

      <AddTask
        open={openEdit}
        setOpen={setOpenEdit}
        task={task}
        setTaskList={setTaskList}
      />
    </div>
  );
};

export default TaskDialog;