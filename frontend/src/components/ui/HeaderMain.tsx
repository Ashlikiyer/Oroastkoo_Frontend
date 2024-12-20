import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const HeaderMain = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // New state to track admin login
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Check if user or admin is logged in
    const userToken = localStorage.getItem("userToken");
    const adminToken = localStorage.getItem("adminToken");
    setIsLoggedIn(!!userToken || !!adminToken); // Set logged-in state
    setIsAdmin(!!adminToken); // Set admin state
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("adminToken");
    setIsLoggedIn(false);
    setIsAdmin(false);
    window.location.href = "/Login"; // Redirect to Login
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState); // Toggle dropdown state
  };

  return (
    <nav className="bg-[rgb(189,26,26)] p-4">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img
            src="src/images/Oroastko.svg"
            alt="Oroastko Logo"
            className="h-10 mr-4"
          />
        </Link>

        {/* Navigation Links */}
        <div className="flex-grow flex space-x-6">
          <Link to="/" className="text-white font-bold font-poppins">
            Home
          </Link>
          <Link to="/Product" className="text-white font-bold font-poppins">
            Products
          </Link>
        </div>

        {/* Tray Icon and Sign In/Profile */}
        <div className="flex items-center space-x-4">
          <Link to="/Notification" className="flex items-center -mb-1">
            <img
              src="src/images/icons8-notification (1).svg"
              alt="Notification"
              className="h-12 w-12"
            />
          </Link>
          <Link to="/Cart" className="flex items-center">
            <img
              src="src/images/tray-svgrepo-com 1.png"
              alt="Cart"
              className="h-10 w-10"
            />
          </Link>

          {isLoggedIn ? (
            <div className="relative flex items-center space-x-2">
              {/* Profile or Admin Button */}
              {isAdmin ? (
                <Link
                  to="/ProductAdmin"
                  className="text-white font-bold font-poppins"
                >
                  Admin
                </Link>
              ) : (
                <div
                  className="relative w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600 cursor-pointer"
                  onClick={toggleDropdown}
                >
                  <svg
                    className="absolute w-12 h-12 text-gray-400 -left-1"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}

              {/* Dropdown Menu */}
              {!isAdmin && isDropdownOpen && (
                <div
                  id="dropdown"
                  className="z-10 absolute right-0 mt-2 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                  style={{ top: "100%" }}
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                  >
                    <li>
                      <Link
                        to="/Orders"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Order Summary
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/ProfileUser"
                        className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Profile
                      </Link>
                    </li>
                    <li>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <Link
              to="/Login"
              className="flex items-center text-white font-bold font-poppins"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-6 h-6 mr-1"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.33 0-10 1.67-10 5v1h20v-1c0-3.33-6.67-5-10-5z"
                />
              </svg>
              Sign In
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default HeaderMain;
