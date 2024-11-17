import { useState } from "react";
import { Link } from "react-router-dom";
import Popup from "@/components/Dashboard/Popup";
import Footer from "@/components/ui/Footer";
import HeaderMain from "@/components/ui/HeaderMain";

const Product = () => {
  const [isPopupVisible, setPopupVisible] = useState(false); // State to manage popup visibility

  // Toggle popup visibility
  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  return (
    <div className="product-container">
      <HeaderMain />
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-5">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          {/* Breadcrumb */}
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link
                  to="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M19.707 9.293l-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <Link
                    to="/Product"
                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    Products
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/*Product list*/}
        <div className="mb-4 flex flex-wrap justify-center mt-7 gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
          {/* Product 1 */}
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg transform transition duration-500 hover:scale-105 dark:border-gray-700 dark:bg-gray-800">
            <div className="relative h-40 w-72 rounded-lg overflow-hidden bg-gray-100">
              <a href="#">
                <img
                  className="mx-auto h-full transition-transform duration-300 ease-in-out hover:scale-110 dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
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
                  onClick={togglePopup}
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

          {/* Repeat structure for Product 2 */}
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg transform transition duration-500 hover:scale-105 dark:border-gray-700 dark:bg-gray-800">
            <div className="relative h-40 w-72 rounded-lg overflow-hidden bg-gray-100">
              <a href="#">
                <img
                  className="mx-auto h-full transition-transform duration-300 ease-in-out hover:scale-110 dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                  alt="Product Image"
                />
              </a>
            </div>
            <div className="pt-4">
              <a
                href="#"
                className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
              >
                Another Product
              </a>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Description of another product.
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
                  $1,299
                </p>
                <button
                  type="button"
                  className="flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-medium text-white transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
                  onClick={togglePopup}
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

          {/* Repeat structure for Product 3 */}
          <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg transform transition duration-500 hover:scale-105 dark:border-gray-700 dark:bg-gray-800">
            <div className="relative h-40 w-72 rounded-lg overflow-hidden bg-gray-100">
              <a href="#">
                <img
                  className="mx-auto h-full transition-transform duration-300 ease-in-out hover:scale-110 dark:hidden"
                  src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                  alt="Product Image"
                />
              </a>
            </div>
            <div className="pt-4">
              <a
                href="#"
                className="text-lg font-semibold leading-tight text-gray-900 hover:underline dark:text-white"
              >
                Third Product
              </a>
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Description of the third product.
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
                  $999
                </p>
                <button
                  type="button"
                  className="flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-medium text-white transition-colors duration-200 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
                  onClick={togglePopup}
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

export default Product;
