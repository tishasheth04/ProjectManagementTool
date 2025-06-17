import React from 'react';

const Textbox = React.forwardRef(({
  type, placeholder, label, className, register, name, error
}, ref) => {
  return (
    <div className={`textbox-wrapper ${className || ''}`}>
      {label && (
        <label htmlFor={name} className="textbox-label">
          {label}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        ref={ref}
        {...register}
        aria-invalid={error ? "true" : "false"}
        className="textbox-input"
      />
      {error && <p className="textbox-error">{error}</p>}
    </div>
  );
});

export default Textbox;
