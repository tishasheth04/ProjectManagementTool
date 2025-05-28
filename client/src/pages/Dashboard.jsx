import React from 'react';
import {
  MdAdminPanelSettings,
  MdEdit
} from "react-icons/md";
import { FaNewspaper } from "react-icons/fa";
import { FaArrowsToDot } from "react-icons/fa6";
import { summary } from "../assets/data"; // Ensure this file and export exist
import { Chart } from "../components/Chart";

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
        <Chart/>
      </div>
    </div>
  );
};

export default Dashboard;
