import React from "react";
import {
  MdDashboard,
  MdOutlineAddTask,
  MdOutlinePendingActions,
  MdSettings,
  MdTaskAlt,
} from "react-icons/md";
import { FaTasks, FaTrashAlt, FaUsers } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { setOpenSidebar } from "../redux/slices/authSlice";

const linkData = [
  { label: "Dashboard", link: "dashboard", icon: <MdDashboard /> },
  { label: "Tasks", link: "tasks", icon: <FaTasks /> },
  { label: "Completed", link: "completed/completed", icon: <MdTaskAlt /> },
  { label: "In Progress", link: "in-progress/in progress", icon: <MdOutlinePendingActions /> },
  { label: "To Do", link: "todo/todo", icon: <MdOutlinePendingActions /> },
  { label: "Team", link: "team", icon: <FaUsers /> },
  { label: "Trash", link: "trashed", icon: <FaTrashAlt /> },
];

const Sidebar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const sidebarLinks = linkData; // Show all links regardless of admin

  const closeSidebar = () => dispatch(setOpenSidebar(false));

  const NavLink = ({ el }) => (
    <Link
      to={el.link}
      onClick={closeSidebar}
      className={`sidebar-link ${path === el.link.split("/")[0] ? "active" : ""}`}
    >
      <span className="sidebar-icon-small">{el.icon}</span>
      <span className="sidebar-label">{el.label}</span>
    </Link>
  );

  return (
    <div className="sidebar-wrapper">
      <h1 className="sidebar-header">
        <span className="sidebar-logo">
          <MdOutlineAddTask className="sidebar-logo-icon" />
        </span>
        <span className="sidebar-logo-text">TaskMe</span>
      </h1>

      <div className="sidebar-links-container">
        {sidebarLinks.map((link) => (
          <NavLink el={link} key={link.label} />
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
