import { Popover, Transition } from "@headlessui/react";
import React, { Fragment } from "react";
import { getInitials } from "../utils";

// Helper function to assign color
const avatarColors = ["blue", "yellow", "pink", "green"];

const UserInfo = ({ user, index = 0 }) => {
  const color = avatarColors[index % avatarColors.length];

  return (
    <div className="user-info-wrapper">
      <Popover className="user-info-popover">
        <>
          <Popover.Button className={`user-info-button user-avatar-mini ${color}`}>
            {getInitials(user?.name)}
          </Popover.Button>

          <Transition
            as={Fragment}
            enter="fade-in"
            enterFrom="fade-start"
            enterTo="fade-end"
            leave="fade-out"
            leaveFrom="fade-end"
            leaveTo="fade-start"
          >
            <Popover.Panel className="user-info-panel">
              <div className="user-info-card">
                <div className={`user-avatar-large ${color}`}>
                  {getInitials(user?.name)}
                </div>
                <div className="user-details">
                  <p className="user-name">{user?.name}</p>
                  <span className="user-title">{user?.title || "Team Member"}</span>
                  <span className="user-email">{user?.email || "email@example.com"}</span>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      </Popover>
    </div>
  );
};

export default UserInfo;
