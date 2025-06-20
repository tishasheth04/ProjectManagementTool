// === Updated Table.jsx ===
import React, { useState } from "react";
import Button from "../Button";
import ConfirmatioDialog from "../ConfirmationDialog";
import AddSubTask from "./AddSubTask";
import AddTask from "./AddTask";

const Table = ({ tasks, onAddSubTask, setTaskList, onDeleteTask }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);
  const [openSubTask, setOpenSubTask] = useState(false);
  const [subTaskId, setSubTaskId] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const deleteHandler = () => {
    onDeleteTask(selected);
    setOpenDialog(false);
  };

  const handleEdit = (task) => {
    setTaskToEdit(task);
    setOpenEdit(true);
  };

  return (
    <>
      <div className="task-list-container">
        {tasks.map((task, index) => (
          <div key={index} className="task-list-item">
            <div className="task-title-text">{task.title}</div>
            <div className="task-list-right">
              <Button className="btn_edit" label="Edit" type="button" onClick={() => handleEdit(task)} />
              <Button className="btn_delete" label="Delete" type="button" onClick={() => deleteClicks(task._id)} />
              <Button className="btn_subtask" label="Add Subtask" type="button" onClick={() => {
                setSubTaskId(task._id);
                setOpenSubTask(true);
              }} />
            </div>
          </div>
        ))}
      </div>

      <AddSubTask open={openSubTask} setOpen={setOpenSubTask} id={subTaskId} onAdd={onAddSubTask} />
      <ConfirmatioDialog open={openDialog} setOpen={setOpenDialog} onClick={deleteHandler} />
      <AddTask open={openEdit} setOpen={setOpenEdit} task={taskToEdit} setTaskList={setTaskList} />
    </>
  );
};

export default Table;
