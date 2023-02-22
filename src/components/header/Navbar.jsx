import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };
  let activeStyle = {
    textDecoration: "underline",
  };

  let activeClassName = "underline";

  return (
    <nav className="bg-blue-500 ">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={toggle}
            >
              {isOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
          <div className="flex-1 flex items-center justify-center sm:items-center sm:justify-between">
            <div className="flex-shrink-0">
              <Link
                to="/"
                className="text-white font-bold text-xl hover:text-gray-300"
              >
                Titus Ltd
              </Link>
            </div>
            <div className="hidden sm:block sm:ml-6">
              <div className="flex space-x-4">
                <NavLink
                  to="/"
                  className="text-white hover:bg-[#7da4e3] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Expenses
                </NavLink>
                <NavLink
                  to="/stats"
                  className="text-white hover:bg-[#7da4e3] hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Stats
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`${isOpen ? "block" : "hidden"} sm:hidden`}
        id="mobile-menu"
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <NavLink
            to="/"
            activeclassname="bg-gray-900 text-white"
            className="text-white hover:bg-[#7da4e3] hover:text-white block px-3 py-2 rounded-md  font-medium text-sm"
          >
            Expenses
          </NavLink>
          <NavLink
            to="/stats"
            activeclassname="bg-gray-900 text-white"
            className="text-white hover:bg-[#7da4e3] hover:text-white block px-3 py-2 rounded-md font-medium text-sm"
          >
            Stats
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;