import React, { useState } from "react";
import {
  MdDelete,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineRestore,
} from "react-icons/md";
import { tasks } from "../assets/data";
import Title from "../components/Title";
import Button from "../components/Button";
import AddUser from "../components/AddUser"; // Adjust the path if needed
import ConfirmationDialog from "../components/ConfirmationDialog"; // Adjust the path if needed

import { useSelector } from "react-redux"; // ✅ This line must be at the top

import { PRIOTITYSTYELS, TASK_TYPE } from "../utils";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Trash = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const [open, setOpen] = useState(false);
  const [msg, setMsg] = useState(null);
  const [type, setType] = useState("delete");
  const [selected, setSelected] = useState("");

  const deleteAllClick = () => {
    setType("deleteAll");
    setMsg("Do you want to permanently delete all items?");
    setOpenDialog(true);
  };

  const restoreAllClick = () => {
    setType("restoreAll");
    setMsg("Do you want to restore all items in the trash?");
    setOpenDialog(true);
  };

  const deleteClick = (id) => {
    setType("delete");
    setSelected(id);
    setOpenDialog(true);
  };

  const restoreClick = (id) => {
    setSelected(id);
    setType("restore");
    setMsg("Do you want to restore the selected item?");
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
          icon={<MdOutlineRestore className="icon-restore" />}
          onClick={() => restoreClick(item._id)}
        />
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
            label="Restore All"
            icon={<MdOutlineRestore className="icon_lg" />}
            className="btn-restore-all"
            onClick={() => restoreAllClick()}
          />
          <Button
            label="Delete All"
            icon={<MdDelete className="icon_lg" />}
            className="btn-delete-all"
            onClick={() => deleteAllClick()}
          />
        </div>
      </div>

      <div className="trash-table-wrapper">
        <div className="trash-table-scroll">
          <table className="trash-table">
            <TableHeader />
            <tbody>
              {tasks?.map((tk, id) => (
                <TableRow key={id} item={tk} />
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AddUser open={open} setOpen={setOpen} />

      <ConfirmationDialog open={openDialog} setOpen={setOpenDialog} msg={msg} setMsg={setMsg} type={type} setType={setType} onClick={() => deleteRestoreHandler()} />
    </div>
  );
};

export default Trash;
