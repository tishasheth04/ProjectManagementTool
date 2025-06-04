import React from "react";

const Title = ({ title, className }) => {
  return (
    <h2 className={`title ${className || ""}`}>
      {title}
    </h2>
  );
};

export default Title;
