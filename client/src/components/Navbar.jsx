import React from "react";
import { MdOutlineSearch } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setOpenSidebar } from "../redux/slices/authSlice";
import UserAvatar from "./UserAvatar";
import NotificationPanel from "./NotificationPanel";

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="navbar-container">
      <div className="navbar">
        <div className="navbar-left">
          {/* Hamburger Menu - visible only on mobile */}
          <button
            onClick={() => dispatch(setOpenSidebar(true))}
            className="hamburger-menu"
          >
            ☰
          </button>

          <div className="search-bar">
            <MdOutlineSearch className="search-icon" />
            <input
              type="text"
              placeholder="Search...."
              className="search-input"
            />
          </div>
        </div>

        <div className="navbar-right">
          <NotificationPanel />
          <UserAvatar />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
