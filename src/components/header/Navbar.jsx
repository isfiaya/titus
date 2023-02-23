import { Link, NavLink } from "react-router-dom";
import { useState } from "react";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-blue-500 ">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <button
              type="button"
              className="p-1 rounded-full bg-white  hover:text-white border"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <img
                  src="src/assets/icons/close.svg"
                  alt="close-btn"
                  className="w-4"
                />
              ) : (
                <img
                  src="src/assets/icons/menu.svg"
                  alt="menu-open-btn"
                  className="w-4"
                />
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
                <NavLink to="/" className="nav-link">
                  Expenses
                </NavLink>
                <NavLink to="/stats" className="nav-link">
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
            className="nav-link"
          >
            Expenses
          </NavLink>
          <NavLink
            to="/stats"
            activeclassname="bg-gray-900 text-white"
            className="nav-link"
          >
            Stats
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
