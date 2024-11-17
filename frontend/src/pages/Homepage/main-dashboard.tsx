import { useState } from "react";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import Popup from "@/components/Dashboard/Popup"; // Import the Popup component
import Footer from "@/components/ui/Footer";
import HeaderMain from "@/components/ui/HeaderMain";

const Home = () => {
  const [isPopupVisible, setPopupVisible] = useState(false); // State to manage popup visibility
  // Toggle popup visibility
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div className="home-container">
      <HeaderMain />
      <section className="bg-white-50 py-8 antialiased dark:bg-gray-900 md:py-5">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <BreadCrumbs />
        </div>
      </section>

      {/* Top Selling Section */}
      <section className="top-selling">
        <div className="promo-banner dark:text-white font-bold font-poppins mb-7 mt-9">
          <h3 className="ml-20">Top Selling</h3>

          <div className="flex justify-center">
            <img
              className="w-auto max-w-lg h-auto object-cover rounded-lg"
              src="src/images/topselling.png"
              alt="Top Selling Image"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="category-section">
          <h2 className="section-title dark:text-white font-bold font-poppins mb-7 mt-9 ml-20">
            Category
          </h2>
          <div className="category-buttons flex justify-center space-x-20 font-poppins">
            <button className="text-white bg-[#E61525] focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-outline">
              All Time Favourites
            </button>
            <button className="text-white bg-[#E61525] focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-9 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-outline">
              Meal
            </button>
            <button className="text-white bg-[#E61525] focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-outline">
              Combo Meal
            </button>
            <button className="text-white bg-[#E61525] focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-outline">
              Add-Ons
            </button>
            <button className="text-white bg-[#E61525] focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-outline">
              Drinks
            </button>
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="product-section">
        <h2 className="section-title dark:text-white font-bold font-poppins mb-7 mt-9 ml-20">
          Products
        </h2>
        <div className="product-grid">
          {/* Add product cards here */}
          <div className="category-buttons flex ml-32 space-x-20 font-poppins">
            <button className="text-white bg-[#E61525] focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-outline">
              All Time Favourites
            </button>
          </div>
          <div className="flex justify-center">
            <div className="mb-4 grid mt-7 gap-14 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-3">
              {/* Product 1 */}
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg transform transition duration-500 hover:scale-105 dark:border-gray-700 dark:bg-gray-800">
                <div className="relative h-40 w-full rounded-lg overflow-hidden ">
                  <a href="#">
                    <img
                      className="mx-auto h-full  dark:hidden"
                      src="src/images/462537363_1012187420677657_6941706802130613222_n (1).png"
                      alt="Product Image"
                    />
                    <img
                      className="mx-auto hidden h-full transition-transform duration-300 ease-in-out hover:scale-110 dark:block"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                      alt="Product Image Dark"
                    />
                  </a>
                </div>
                <div className="pt-4">
                  <a
                    href="#"
                    className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                  >
                    Premium Product Name
                  </a>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Short product description.
                  </p>
                  <ul className="mt-3 flex items-center gap-2">
                    <li className="flex items-center gap-1">
                      <svg
                        className="h-4 w-4 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Fast Delivery
                      </p>
                    </li>
                    <li className="flex items-center gap-1">
                      <svg
                        className="h-4 w-4 text-yellow-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.17 5.82 22l1.18-7.86-5-4.87 6.91-1.01L12 2z" />
                      </svg>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Best Quality
                      </p>
                    </li>
                  </ul>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      $1,499
                    </p>
                    <button
                      type="button"
                      className="flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-medium text-white transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
                      onClick={togglePopup} // Toggle popup visibility on click
                    >
                      <svg
                        className="mr-1 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M3 3h18M16 8l-4 4-4-4m4 12V8" />
                      </svg>
                      Add to Tray
                    </button>
                  </div>
                </div>
              </div>
              {/* Product 2 */}
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg transform transition duration-500 hover:scale-105 dark:border-gray-700 dark:bg-gray-800">
                <div className="relative h-40 w-full rounded-lg overflow-hidden bg-gray-100">
                  <a href="#">
                    <img
                      className="mx-auto h-full  dark:hidden"
                      src="src/images/462537363_1012187420677657_6941706802130613222_n (1).png"
                      alt="Product Image"
                    />
                  
                  </a>
                </div>
                <div className="pt-4">
                  <a
                    href="#"
                    className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                  >
                    Premium Product Name
                  </a>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Short product description.
                  </p>
                  <ul className="mt-3 flex items-center gap-2">
                    <li className="flex items-center gap-1">
                      <svg
                        className="h-4 w-4 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Fast Delivery
                      </p>
                    </li>
                    <li className="flex items-center gap-1">
                      <svg
                        className="h-4 w-4 text-yellow-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.17 5.82 22l1.18-7.86-5-4.87 6.91-1.01L12 2z" />
                      </svg>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Best Quality
                      </p>
                    </li>
                  </ul>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      $1,499
                    </p>
                    <button
                      type="button"
                      className="flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-medium text-white transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
                      onClick={togglePopup} // Toggle popup visibility on click
                    >
                      <svg
                        className="mr-1 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M3 3h18M16 8l-4 4-4-4m4 12V8" />
                      </svg>
                      Add to Tray
                    </button>
                  </div>
                </div>
              </div>
              {/* Product 3 */}
              <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg transform transition duration-500 hover:scale-105 dark:border-gray-700 dark:bg-gray-800">
                <div className="relative h-40 w-full rounded-lg overflow-hidden bg-gray-100">
                  <a href="#">
                    <img
                      className="mx-auto h-full  dark:hidden"
                      src="src/images/462537363_1012187420677657_6941706802130613222_n (1).png"
                      alt="Product Image"
                    />
                    <img
                      className="mx-auto hidden h-full transition-transform duration-300 ease-in-out hover:scale-110 dark:block"
                      src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                      alt="Product Image Dark"
                    />
                  </a>
                </div>
                <div className="pt-4">
                  <a
                    href="#"
                    className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
                  >
                    Premium Product Name
                  </a>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Short product description.
                  </p>
                  <ul className="mt-3 flex items-center gap-2">
                    <li className="flex items-center gap-1">
                      <svg
                        className="h-4 w-4 text-green-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Fast Delivery
                      </p>
                    </li>
                    <li className="flex items-center gap-1">
                      <svg
                        className="h-4 w-4 text-yellow-500"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.17 5.82 22l1.18-7.86-5-4.87 6.91-1.01L12 2z" />
                      </svg>
                      <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                        Best Quality
                      </p>
                    </li>
                  </ul>
                  <div className="mt-3 flex items-center justify-between">
                    <p className="text-xl font-bold text-gray-900 dark:text-white">
                      $1,499
                    </p>
                    <button
                      type="button"
                      className="flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-medium text-white transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
                      onClick={togglePopup} // Toggle popup visibility on click
                    >
                      <svg
                        className="mr-1 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                        aria-hidden="true"
                      >
                        <path d="M3 3h18M16 8l-4 4-4-4m4 12V8" />
                      </svg>
                      Add to Tray
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          

          {/* Render Popup if isPopupVisible is true */}
          {isPopupVisible && (
            <div>
              <Popup />
            </div>
          )}
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
