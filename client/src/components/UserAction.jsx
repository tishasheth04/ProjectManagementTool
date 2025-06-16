// components/UserAction.jsx
import React from "react";

const UserAction = ({ open, setOpen, onClick }) => {
  if (!open) return null;

  return (
    <div className="user-action-modal">
      <div className="user-action-content">
        <p>User action goes here.</p>
        <button onClick={onClick}>Confirm</button>
        <button onClick={() => setOpen(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default UserAction;
