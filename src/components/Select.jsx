import React from 'react';
import { forwardRef, useId } from "react";

const Select = forwardRef(({ label, options, classNames, ...props }, ref) => {
  const id = useId();
  return (
    <div className="w-full">
      {label ? (
        <div>
          <label htmlFor={id} className="inline-block mb-3 pl-1 text-sm font-medium text-gray-600">
            {label}
          </label>
        </div>
      ) : null}

      <select
        {...props}
        ref={ref}
        className={`px-3 py-2 rounded-lg outline-none duration-200 bg-transparent text-white ${classNames}`}
        id={id}
      >
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-gray-800 text-white">{opt}</option>
        ))}
      </select>
    </div>
  );
});

export default Select;