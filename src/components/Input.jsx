import React, { forwardRef, useId } from 'react';

const Input = forwardRef(({ label, classNames = "", type = "text", ...props }, ref) => {
  const id = useId();
  return (
    <div className='w-full'>
      {label ? (
        <div>
          <label htmlFor={id} className="inline-block text-sm font-medium  text-white mb-3 pl-1">
            {label}
          </label>
        </div>
      ) : null}
      <input
        type={type}
        className={`px-3 outline-none py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none rounded-lg duration-200 border border-gray-300 bg-gray-50 text-black w-full ${classNames}`}
        id={id}
        ref={ref}
        {...props}
      />
    </div>
  );
});

export default Input;