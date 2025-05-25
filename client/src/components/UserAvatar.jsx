import React, { Fragment, useState } from "react"; // Import Fragment here
import { Menu, Transition } from "@headlessui/react";
import { FaUser, FaUserLock } from "react-icons/fa";
import { IoLogOutOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const UserAvatar = () => {
  const { user } = useSelector((state) => state.auth); // Get the user from the Redux state
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout()); // Dispatch logout to clear user data in Redux
    navigate("/log-in"); // Redirect to the login page
  };

  // Manually create the initials if user is available
  const getInitials = (name) => {
    if (!name) return '';
    const nameArray = name.split(' ');
    const initials = nameArray.map(word => word[0].toUpperCase()).join('');
    return initials;
  };

  return (
    <div className="user-avatar-container">
      <Menu as="div" className="menu-container">
        <div>
          <Menu.Button className="avatar-button">
            <span className="avatar-text">
              {user ? getInitials(user.name) : "U"}
            </span>
          </Menu.Button>
        </div>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="menu-items">
            <div className="menu-content">
              <Menu.Item>
                {({ active }) => (
                  <button onClick={() => navigate("/profile")} className="menu-item">
                    <FaUser className="menu-icon" aria-hidden="true" />
                    Profile
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button onClick={() => navigate("/change-password")} className="menu-item">
                    <FaUserLock className="menu-icon" aria-hidden="true" />
                    Change Password
                  </button>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <button onClick={logoutHandler} className="logout-button">
                    <IoLogOutOutline className="menu-icon" aria-hidden="true" />
                    Logout
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default UserAvatar;
