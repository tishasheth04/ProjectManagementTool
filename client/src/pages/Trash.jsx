import React, { useState } from "react";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineRestore,
} from "react-icons/md";
import Title from "../components/Title";
import Button from "../components/Button";
import AddUser from "../components/AddUser";
import ConfirmationDialog from "../components/ConfirmationDialog";
import { PRIOTITYSTYELS, TASK_TYPE } from "../utils";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Trash = () => {
  const [trashedTasks, setTrashedTasks] = useState(() => {
    const stored = localStorage.getItem("trashedTasks");
    return stored ? JSON.parse(stored) : [];
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState("");

  const syncToStorage = (updated) => {
    localStorage.setItem("trashedTasks", JSON.stringify(updated));
    setTrashedTasks(updated);
  };

  const deleteRestoreHandler = () => {
    let updated;
    if (type === "delete") {
      updated = trashedTasks.filter((task) => task._id !== selected);
    } else if (type === "deleteAll") {
      updated = [];
    }

    syncToStorage(updated);
    setOpenDialog(false);
    setMsg(null);
    setSelected(null);
    setType("delete");
  };

  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("Do you want to permanently delete all items?");
    setOpenDialog(true);
  };

  

  const deleteClick = (id) => {
    setType("delete");
    setSelected(id);
    setOpenDialog(true);
  };

  

  const TableHeader = () => (
    <thead className="table-header">
      <tr>
        <th>Task Title</th>
        <th>Priority</th>
        <th>Stage</th>
        <th>Modified On</th>
        <th></th>
      </tr>
    </thead>
  );

  const TableRow = ({ item }) => (
    <tr className="table-row">
      <td>
        <div className="task-title-cell">
          <div className={`stage-indicator ${TASK_TYPE[item.stage]}`} />
          <p className="task-title-text">{item?.title}</p>
        </div>
      </td>

      <td className="capitalize">
        <div className="priority-cell">
          <span className={`priority-icon ${PRIOTITYSTYELS[item?.priority]}`}>
            {ICONS[item?.priority]}
          </span>
          <span>{item?.priority}</span>
        </div>
      </td>

      <td className="capitalize text-center">{item?.stage}</td>
      <td className="date-text">{new Date(item?.date).toDateString()}</td>

      <td className="action-buttons">
        
        <Button
          icon={<MdDelete className="icon-delete" />}
          onClick={() => deleteClick(item._id)}
        />
      </td>
    </tr>
  );

  return (
    <div className="trash-container">
      <div className="trash-header">
        <Title title="Trashed Tasks" />

        <div className="trash-header-buttons">
          
          <Button
            label="Delete All"
            icon={<MdDelete className="icon_lg" />}
            className="btn-delete-all"
            onClick={deleteAllClick}
          />
        </div>
      </div>

      <div className="trash-table-wrapper">
        <div className="trash-table-scroll">
          <table className="trash-table">
            <TableHeader />
            <tbody>
              {trashedTasks?.map((tk, id) => (
                <TableRow key={id} item={tk} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddUser open={open} setOpen={setOpen} />

      <ConfirmationDialog
        open={openDialog}
        setOpen={setOpenDialog}
        msg={msg}
        setMsg={setMsg}
        type={type}
        setType={setType}
        onClick={deleteRestoreHandler}
      />
    </div>
  );
};

export default Trash;
