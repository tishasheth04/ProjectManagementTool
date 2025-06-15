import React, { useState } from "react";
import { BiMessageAltDetail } from "react-icons/bi";
import {
  MdAttachFile,
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
} from "react-icons/md";
import { FaList } from "react-icons/fa";
import { BGS, PRIOTITYSTYELS, TASK_TYPE, formatDate } from "../../utils";
import UserInfo from "../UserInfo";
import Button from "../Button";
import ConfirmatioDialog from "../ConfirmationDialog";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const Table = ({ tasks }) => {
  const [openDialog, setOpenDialog] = useState(false);
  const [selected, setSelected] = useState(null);

  const deleteClicks = (id) => {
    setSelected(id);
    setOpenDialog(true);
  };

  const deleteHandler = () => {};

  return (
    <>
      <div className="task-list-container">
        {tasks.map((task, index) => (
          <div key={index} className="task-list-item">
            <div className="task-list-left">
              <div className={`stage-indicator ${TASK_TYPE[task?.stage]}`} />
              <span className="task-title-text">{task?.title}</span>
              <span className={`priority-icon ${PRIOTITYSTYELS[task?.priority]}`}>{ICONS[task?.priority]}</span>
              <span className="priority-label">{task?.priority}</span>
              <span className="task-date">{formatDate(new Date(task?.date))}</span>
              <div className="task-icons">
                <div className="icon-text">
                  <BiMessageAltDetail /> <span>{task?.activities?.length}</span>
                </div>
                <div className="icon-text">
                  <MdAttachFile /> <span>{task?.assets?.length}</span>
                </div>
                <div className="icon-text">
                  <FaList /> <span>0/{task?.subTasks?.length}</span>
                </div>
              </div>
              <div className="task-users">
                {task?.team?.map((member, index) => (
                  <div
                    key={member._id}
                    className={`user-avatar ${BGS[index % BGS.length]}`}
                  >
                    <UserInfo user={member} />
                  </div>
                ))}
              </div>
            </div>
            <div className="task-list-right">
              <Button
                className="btn_edit"
                label="Edit"
                type="button"
              />
              <Button
                className="btn_delete"
                label="Delete"
                type="button"
                onClick={() => deleteClicks(task._id)}
              />
            </div>
          </div>
        ))}
      </div>

      <ConfirmatioDialog open={openDialog} setOpen={setOpenDialog} onClick={deleteHandler} />
    </>
  );
};

export default Table;
