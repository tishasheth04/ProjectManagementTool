import React from 'react';
import {
  MdAdminPanelSettings,
  MdEdit,
  MdKeyboardDoubleArrowUp,
  MdKeyboardArrowUp,
  MdKeyboardArrowDown
} from "react-icons/md";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import { summary } from "../assets/data";
import { Chart } from "../components/Chart";

// Static background styles for team badges
const BGS = ["bg1", "bg2", "bg3", "bg4"];

const TaskTable = ({ tasks }) => {
  const ICONS = {
    high: <MdKeyboardDoubleArrowUp />,
    medium: <MdKeyboardArrowUp />,
    low: <MdKeyboardArrowDown />,
  };

  const TableHeader = () => (
    <thead>
      <tr className="table-header-row">
        <th>Task Title</th>
        <th>Priority</th>
        <th>Team</th>
        <th>Created At</th>
      </tr>
    </thead>
  );

  const TableRow = ({ task }) => (
    <tr className="table-row">
      <td>
        <div className="table-title-cell">
          <div className={`task-dot ${task.stage.replace(' ', '-')}`} />
          <p>{task.title}</p>
        </div>
      </td>

      <td>
        <div className="priority-cell">
          <span className={`priority-icon ${task.priority}`}>{ICONS[task.priority]}</span>
          <span className="priority-label">{task.priority}</span>
        </div>
      </td>

      <td>
        <div className="team-cell">
          {task.team.map((m, index) => (
            <div key={index} className={`team-badge ${BGS[index % BGS.length]}`}>
              {m[0]}
            </div>
          ))}
        </div>
      </td>

      <td>
        <p>{task.createdAt}</p>
      </td>
    </tr>
  );

  return (
    <div className="task-table-container">
      <table className="task-table">
        <TableHeader />
        <tbody>
          {tasks?.map((task, id) => (
            <TableRow key={id} task={task} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

const Dashboard = () => {
  const totals = summary.tasks;

  const stats = [
    {
      _id: "1",
      label: "TOTAL TASK",
      total: summary?.totalTasks || 0,
      icon: <FaNewspaper />,
      bgClass: "bg-blue",
    },
    {
      _id: "2",
      label: "COMPLETED TASK",
      total: totals["completed"] || 0,
      icon: <MdAdminPanelSettings />,
      bgClass: "bg-green",
    },
    {
      _id: "3",
      label: "TASK IN PROGRESS",
      total: totals["in progress"] || 0,
      icon: <MdEdit />,
      bgClass: "bg-yellow",
    },
    {
      _id: "4",
      label: "TODOS",
      total: totals["todo"],
      icon: <FaArrowsToDot />,
      bgClass: "bg-pink",
    },
  ];

  const Card = ({ label, count, icon, bgClass }) => {
    return (
      <div className={`dashboard-card ${bgClass}`}>
        <div className="dashboard-card-icon">{icon}</div>
        <div className="dashboard-card-info">
          <p className="dashboard-card-label">{label}</p>
          <p className="dashboard-card-count">{count}</p>
          <p className="dashboard-card-subtext">110 last month</p>
        </div>
      </div>
    );
  };

  return (
    <div className="dashboard-wrapper">
      <div className="dashboard-grid">
        {stats.map(({ icon, bgClass, label, total }, index) => (
          <Card key={index} icon={icon} bgClass={bgClass} label={label} count={total} />
        ))}
      </div>

      <div className="chart-container">
        <h4 className="chart-title">Chart By Priority</h4>
        <Chart />
      </div>

      <div className="task-table-section">
        <TaskTable tasks={summary.last10Task} />
      </div>
    </div>
  );
};

export default Dashboard;
