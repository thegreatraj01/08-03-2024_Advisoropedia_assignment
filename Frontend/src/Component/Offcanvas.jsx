import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
// Initialization for ES Users
import {
  Offcanvas,
  Ripple,
  initTWE,
} from "tw-elements";

initTWE({ Offcanvas, Ripple });

function MyComponent() {
  const isLoggedIn = localStorage.getItem('token');

  useEffect(() => {
    initTWE({ Offcanvas, Ripple });
  }, []);

  return (
    <div className=" relative">
      <button
        className="bg-blue-600 p-2 m-2 rounded-md border-double text-white font-bold shadow-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50"
        type="button"
        data-twe-offcanvas-toggle
        data-twe-target="#offcanvasRight"
        aria-controls="offcanvasRight"
        data-twe-ripple-init
        data-twe-ripple-color="light">
        Menu
      </button>


      <div
        className="invisible absolute bottom-0 right-0 top-0 z-[1045] w-96 h-[100vh] max-w-full translate-x-full flex flex-col border-none bg-slate-200 bg-clip-padding text-neutral-700 shadow-sm outline-none transition duration-300 ease-in-out data-[twe-offcanvas-show]:transform-none dark:bg-body-dark dark: "
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
        data-twe-offcanvas-init
      >
        <div className="flex items-center justify-between p-4">
          <h5
            className="mb-0 font-semibold leading-normal"
            id="offcanvasRightLabel"
          >
            Right Menu
          </h5>
          <button
            type="button"
            className="box-content rounded-none border-none text-neutral-500 hover:text-neutral-800 hover:no-underline focus:text-neutral-800 focus:opacity-100 focus:shadow-none focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300"
            data-twe-offcanvas-dismiss
            aria-label="Close"
          >
            <span className="[&>svg]:h-6 [&>svg]:w-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </span>
          </button>
        </div>
        <div className="offcanvas-body flex-grow overflow-y-auto p-4">
          {/* Adjust the condition based on your application logic */}
          {isLoggedIn ? (
            <button onClick={() => localStorage.removeItem('token')} className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
              <Link to='/login'> Logout </Link>
            </button>
          ) : (
            <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
              <Link to='/login'> Login </Link>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyComponent;
