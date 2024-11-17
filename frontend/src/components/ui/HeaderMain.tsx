import { Link } from "react-router-dom";

const HeaderMain = () => {
  return (
    <nav className="bg-[rgb(189,26,26)] p-4">
      <div className="flex items-center justify-between max-w-screen-xl mx-auto">
        
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src="src/images/Oroastko.svg" alt="Oroastko Logo" className="h-10 mr-4" />
        </Link>
        
        {/* Navigation Links */}
        <div className="flex-grow flex space-x-6">
          <Link to="/" className="text-white font-bold font-poppins">Home</Link>
          <Link to="/Product" className="text-white font-bold font-poppins">Products</Link>
        </div>

        {/* Tray Icon and Sign In */}
        <div className="flex items-center space-x-4">
          {/* Tray Icon */}
          <Link to="/Cart" className="flex items-center">
            <img src="src/images/tray-svgrepo-com 1.png" alt="Tray" className="h-10 w-10" />
          </Link>

          {/* Sign In */}
          <Link to="/Login" className="flex items-center text-white font-bold font-poppins">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-3.33 0-10 1.67-10 5v1h20v-1c0-3.33-6.67-5-10-5z" />
            </svg>
            Sign In
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default HeaderMain;
