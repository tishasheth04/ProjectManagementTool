import moment from "moment";
import React, { useState } from "react";
import { toast } from "sonner";
import { tasks } from "../assets/data";
import Tabs from "../components/Tabs";
import "../index.css";

import {
  FaBug,
  FaSpinner,
  FaTasks,
  FaThumbsUp,
  FaUser,
} from "react-icons/fa";
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

const ICONS = {
  high: <MdKeyboardDoubleArrowUp />,
  medium: <MdKeyboardArrowUp />,
  low: <MdKeyboardArrowDown />,
};

const TABS = [
  { title: "Task Detail", icon: <FaTasks /> },
  { title: "Activities/Timeline", icon: <RxActivityLog /> },
];

const TASKTYPEICON = {
  commented: <div className="activity-icon commented"><MdOutlineMessage /></div>,
  started: <div className="activity-icon started"><FaThumbsUp size={20} /></div>,
  assigned: <div className="activity-icon assigned"><FaUser size={14} /></div>,
  bug: <div className="text-red-600"><FaBug size={24} /></div>,
  completed: <div className="activity-icon completed"><MdOutlineDoneAll size={24} /></div>,
  "in progress": <div className="activity-icon in-progress"><GrInProgress size={16} /></div>,
};

const Activities = ({ activity, id, refetch }) => {
  const [selected, setSelected] = useState("Started");
  const [text, setText] = useState("");
  const handleSubmit = () => toast.success("Activity submitted (mock)");

  const Card = ({ item }) => (
    <div className="activity-card">
      <div className="flex flex-col items-center">
        <div className="w-10 h-10 flex items-center justify-center">{TASKTYPEICON[item?.type]}</div>
        <div className="activity-line"></div>
      </div>
      <div>
        <p className="font-semibold">{item?.by?.name || item?.by}</p>
        <div className="text-gray-500">
          <span className="capitalize">{item?.type}</span>
          <span className="text-sm"> {moment(item?.date).fromNow()}</span>
        </div>
        <div className="text-gray-700">{item?.activity}</div>
      </div>
    </div>
  );

  return (
    <div className="tabs-container">
      <div>
        <h4>Activities</h4>
        {activity?.map((item, index) => (
          <Card key={item._id || index} item={item} />
        ))}
      </div>

      <div>
        <h4>Add Activity</h4>
        <div>
          {["Started", "Completed", "In Progress", "Commented", "Bug", "Assigned"].map((item) => (
            <label key={item}>
              <input
                type="checkbox"
                checked={selected === item}
                onChange={() => setSelected(item)}
              />
              {item}
            </label>
          ))}
          <textarea
            rows={5}
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="activity-input-box"
            placeholder="Type ..."
          ></textarea>
          <button type="button" onClick={handleSubmit} className="button-submit">Submit</button>
        </div>
      </div>
    </div>
  );
};

const TaskDetail = () => {
  const [selected, setSelected] = useState(0);
  const task = tasks.find(t => t._id === "65c5f12ab5204a81bde866a9"); // TEMPORARY HARDCODED TASK ID

  return (
    <div className="tabs-container">
      <h1>{task?.title}</h1>
      <Tabs tabs={TABS} setSelected={setSelected}>
        {selected === 0 ? (
          <div className="task-detail-box">
            <div className="task-detail-section">
              <div className={`priority-${task?.priority}`}>
                <span>{ICONS[task?.priority]}</span>
                <span>{task?.priority} Priority</span>
              </div>
              <div className="task-stage">
                <span>{task?.stage}</span>
              </div>
              <p>Created At: {new Date(task?.date).toDateString()}</p>
              <div>
                <span>Sub-Tasks: {task?.subTasks?.length}</span>
              </div>
              <div>
                <p><strong>TASK TEAM</strong></p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  {task?.team?.map((m, i) => (
                    <div key={i}>
                      <div className="avatar">{m?.name?.charAt(0)}</div>
                      <div>
                        <p>{m?.name}</p>
                        <span>{m?.title}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="task-detail-section">
              {task?.description && (
                <div>
                  <p><strong>TASK DESCRIPTION</strong></p>
                  <div>{task?.description}</div>
                </div>
              )}
              <div>
                <p><strong>SUB-TASKS</strong></p>
                {task?.subTasks?.map((el, i) => (
                  <div key={i}>
                    <MdTaskAlt />
                    <span>{new Date(el?.date).toDateString()}</span>
                    <span>{el?.tag}</span>
                    <p>{el?.title}</p>
                  </div>
                ))}
              </div>
              {task?.links?.length > 0 && (
                <div>
                  <p><strong>SUPPORT LINKS</strong></p>
                  {task?.links?.map((el, i) => (
                    <a key={i} href={el} target="_blank" rel="noreferrer">{el}</a>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          <Activities activity={task?.activities} refetch={() => {}} id={task?._id} />
        )}
      </Tabs>
    </div>
  );
};

export default TaskDetail;
