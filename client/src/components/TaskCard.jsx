import clsx from "clsx";
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

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const PRIORITY_CLASSES = {
  high: "text-red-500",
  medium: "text-yellow-500",
  low: "text-green-500",
};

const TaskCard = ({ task }) => {
  const { user } = useSelector((state) => state.auth);
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className='task-card'>
        <div className='task-card-header'>
          <div className={clsx("priority", PRIORITY_CLASSES[task?.priority])}>
            <span className='priority-icon'>{ICONS[task?.priority]}</span>
            <span className='priority-label'>{task?.priority} Priority</span>
          </div>
        </div>

        <div className='task-main'>
          <div className='task-title'>
            <div className={clsx("stage-indicator", TASK_TYPE[task.stage])} />
            <h4>{task?.title}</h4>
          </div>
          <span className='task-date'>{formatDate(new Date(task?.date))}</span>
        </div>

        <div className='task-info-divider' />

        <div className='task-info-row'>
          <div className='task-icons'>
            <div className='icon-text'>
              <BiMessageAltDetail />
              <span>{task?.activities?.length}</span>
            </div>
            <div className='icon-text'>
              <MdAttachFile />
              <span>{task?.assets?.length}</span>
            </div>
            <div className='icon-text'>
              <FaList />
              <span>0/{task?.subTasks?.length}</span>
            </div>
          </div>

          <div className='task-users'>
            {task?.team?.map((m, index) => (
              <div
                key={index}
                className={clsx(
                  "user-avatar",
                  BGS[index % BGS.length] // Rotating user colors like dashboard
                )}
              >
                <UserInfo user={m} />
              </div>
            ))}
          </div>
        </div>

        <div className='subtask-section'>
          {task?.subTasks?.length > 0 ? (
            <>
              <h5>{task?.subTasks[0].title}</h5>
              <div className='subtask-meta'>
                <span>{formatDate(new Date(task?.subTasks[0]?.date))}</span>
                <span className='subtask-tag'>{task?.subTasks[0].tag}</span>
              </div>
            </>
          ) : (
            <span className='no-subtask'>No Sub Task</span>
          )}
        </div>

        <div className='add-subtask-button-wrapper'>
          <button
            onClick={() => setOpen(true)}
            disabled={!user?.isAdmin}
            className='add-subtask-button'
          >
            <IoMdAdd className='icon-md' />
            <span>ADD SUBTASK</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default TaskCard;
