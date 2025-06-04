import React from "react";

const Button = ({ icon, className, label, type, onClick = () => {} }) => {
  return (
    <button
      type={type || "button"}
      className={`${className || ""} button`}
      onClick={onClick}
    >
      {icon && <span className="button-icon">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default Button;
