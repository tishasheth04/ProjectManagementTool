// === Fixed TaskDetail.jsx ===
import moment from "moment";
import React, { useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { toast } from "sonner";
import { FaBug, FaSpinner, FaTasks, FaThumbsUp, FaUser } from "react-icons/fa";
import { GrInProgress } from "react-icons/gr";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowUp,
  MdKeyboardDoubleArrowUp,
  MdOutlineDoneAll,
  MdOutlineMessage,
  MdTaskAlt,
} from "react-icons/md";
import { RxActivityLog } from "react-icons/rx";

import Button from "../components/Button";
import Loader from "../components/Loader";
import Tabs from "../components/Tabs";
import TaskColor from "../components/task/TaskColor";
import {
  useChangeSubTaskStatusMutation,
  usePostTaskActivityMutation,
} from "../redux/slices/api/taskApiSlice";
import {
  PRIOTITYSTYELS,
  TASK_TYPE,
  getCompletedSubTasks,
  getInitials,
} from "../utils";
import "../index.css";

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />, medium: <MdKeyboardArrowUp />, low: <MdKeyboardArrowDown />,
};

const TASKTYPEICON = {
  commented: <div className="activity-icon commented"><MdOutlineMessage /></div>,
  started: <div className="activity-icon started"><FaThumbsUp size={20} /></div>,
  assigned: <div className="activity-icon assigned"><FaUser size={14} /></div>,
  bug: <div className="activity-icon bug"><FaBug size={24} /></div>,
  completed: <div className="activity-icon completed"><MdOutlineDoneAll size={24} /></div>,
  "in progress": <div className="activity-icon in-progress"><GrInProgress size={16} /></div>,
};

const TABS = [
  { title: "Task Detail", icon: <FaTasks /> },
  { title: "Activities/Timeline", icon: <RxActivityLog /> },
];

const Activities = ({ activity, id, refetch }) => {
  const [selected, setSelected] = useState("Started");
  const [text, setText] = useState("");
  const [postActivity, { isLoading }] = usePostTaskActivityMutation();

  const handleSubmit = async () => {
    try {
      const res = await postActivity({
        data: { type: selected.toLowerCase(), activity: text },
        id,
      }).unwrap();
      toast.success(res?.message);
      setText("");
      refetch();
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="tabs-container">
      <div>
        <h4>Activities</h4>
        {activity?.map((item, index) => (
          <div className="activity-card" key={index}>
            <div className="activity-card-icon">{TASKTYPEICON[item?.type]}</div>
            <div>
              <p className="font-semibold">{item?.by?.name}</p>
              <p className="text-gray">{item?.type} — {moment(item?.date).fromNow()}</p>
              <p>{item?.activity}</p>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h4>Add Activity</h4>
        <div className="activity-form">
          {["Started", "Completed", "In Progress", "Commented", "Bug", "Assigned"].map((type) => (
            <label key={type}>
              <input type="radio" name="act-type" checked={selected === type} onChange={() => setSelected(type)} /> {type}
            </label>
          ))}
          <textarea
            rows="4"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type..."
            className="activity-input-box"
          ></textarea>
          {isLoading ? <Loader /> : <Button onClick={handleSubmit} label="Submit" className="button-submit" />}
        </div>
      </div>
    </div>
  );
};

const TaskDetail = () => {
  const { id } = useParams();
  const location = useLocation();

  const [task, setTask] = useState(() => {
    return (
      location.state?.task ||
      JSON.parse(localStorage.getItem("tasks") || "[]").find((t) => t._id === id)
    );
  });

  const [subTaskAction, { isLoading: isSubmitting }] = useChangeSubTaskStatusMutation();
  const [selected, setSelected] = useState(0);

  if (!task) return <Loader />;

  const handleSubmitAction = async ({ id, subId, status }) => {
    try {
      const res = await subTaskAction({ id, subId, status: !status }).unwrap();
      toast.success(res?.message);

      const storedTasks = JSON.parse(localStorage.getItem("tasks") || "[]");
      const updatedTasks = storedTasks.map((t) =>
        t._id === id
          ? {
              ...t,
              subTasks: t.subTasks.map((st) =>
                st._id === subId ? { ...st, isCompleted: !status } : st
              ),
            }
          : t
      );

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      const refreshedTask = updatedTasks.find((t) => t._id === id);
      setTask(refreshedTask);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const percentage = task?.subTasks?.length ? (getCompletedSubTasks(task.subTasks) / task.subTasks.length) * 100 : 0;

  return (
    <div className="tabs-container">
      <h1>{task?.title}</h1>
      <Tabs tabs={TABS} setSelected={setSelected}>
        {selected === 0 ? (
          <div className="task-detail-box">
            <div className="task-detail-section">
              <div className={`priority-box priority-${task?.priority}`}>{ICONS[task?.priority]} {task?.priority} Priority</div>
              <div className="task-stage"><TaskColor className={TASK_TYPE[task?.stage]} /> {task?.stage}</div>
              <p>Created: {new Date(task?.date).toDateString()}</p>
              <p>Sub-Tasks: {task?.subTasks?.length}</p>
              <div className="task-team">
                {task?.team?.map((m, i) => (
                  <div key={i} className="task-member">
                    <div className="avatar">{getInitials(m?.name)}</div>
                    <div>
                      <p>{m?.name}</p>
                      <p className="text-gray">{m?.title}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="task-detail-section">
              {task?.description && <><p><strong>Description</strong></p><p>{task.description}</p></>}
              {task?.subTasks?.length > 0 && (
                <div>
                  <p><strong>Sub-Tasks ({percentage.toFixed(2)}%)</strong></p>
                  {task.subTasks.map((el, i) => (
                    <div key={i} className="subtask">
                      <MdTaskAlt />
                      <div>
                        <p>{el?.title}</p>
                        <small>{new Date(el?.date).toDateString()}</small>
                        <span className={el?.isCompleted ? "done" : "inprogress"}>{el?.isCompleted ? "Done" : "In Progress"}</span>
                        <button
                          className="subtask-btn"
                          onClick={() => handleSubmitAction({ id: task?._id, subId: el?._id, status: el?.isCompleted })}
                          disabled={isSubmitting}
                        >
                          {isSubmitting ? <FaSpinner className="spin" /> : el?.isCompleted ? "Mark as Undone" : "Mark as Done"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
              {task?.assets?.length > 0 && (
                <div className="assets-section">
                  <p><strong>Assets</strong></p>
                  <div className="asset-grid">
                    {task.assets.map((el, i) => <img key={i} src={el} alt={i} className="asset-img" />)}
                  </div>
                </div>
              )}
              {task?.links?.length > 0 && (
                <div className="link-section">
                  <p><strong>Links</strong></p>
                  {task.links.map((el, i) => <a key={i} href={el} target="_blank" rel="noreferrer">{el}</a>)}
                </div>
              )}
            </div>
          </div>
        ) : (
          <Activities activity={task.activities} refetch={() => {}} id={id} />
        )}
      </Tabs>
    </div>
  );
};

export default TaskDetail;
