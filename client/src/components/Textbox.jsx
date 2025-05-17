import React from 'react';
import clsx from "clsx";

const Textbox = React.forwardRef(({
  type, placeholder, label, classNames, register, name, error
}, ref) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">
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
        className={clsx(
          "w-full outline-none text-sm text-gray-800 placeholder-gray-400 focus:ring-1 transition-all duration-200 font-noto",
          classNames
        )}
      />
      {error && <p className="text-red-400 text-xs mt-1 pl-2 font-noto">{error}</p>}
    </div>
  );
});

export default Textbox;