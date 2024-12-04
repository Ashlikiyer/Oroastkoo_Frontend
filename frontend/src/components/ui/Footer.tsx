const Footer = () => {
    return (
      <footer className="bg-[rgb(189,26,26)] mx-auto shadow dark:bg-gray-900 bottom-0 w-full z-50">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="flex items-center justify-start sm:space-x-8">
            <a
              href="https://flowbite.com/"
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img
                src="src/images/Oroastko.svg"
                className="h-10"
                alt="Oroastko Logo"
              />
            </a>
            <ul className="flex flex-wrap items-center  text-sm font-medium text-white dark:text-gray-400 font-poppins">
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline me-4 md:me-6">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-white sm:text-center dark:text-gray-400 font-poppins">
            © 2024 Oroastko. All Rights Reserved
          </span>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  