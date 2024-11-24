import { useState } from "react";
import HeaderMain from "@/components/ui/HeaderMain";
import { Link } from "react-router-dom";
import Footer from "@/components/ui/Footer";

const Checkout = () => {
  // State for products and total
  const [products] = useState([
    { name: "Sample Product", price: 100 }, // Initial sample product
  ]);
  const [total] = useState(100); // Initial total for the sample product

  return (
    <div className="flex-grow">
      {/* Header */}
      <HeaderMain />

      {/* Main Content */}
      <main className="flex-grow container mx-auto p-8 relative">
        {/* Back to Cart Button */}
        <div className="absolute top-8 right-8">
          <Link
            to="/Cart"
            role="button"
            className="flex items-center bg-black text-white hover:bg-gray-800 text-sm font-semibold py-2 px-4 rounded-md transition"
          >
            <svg
              className="w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14"></path>
              <path d="M5 12l4-4"></path>
              <path d="M5 12l4 4"></path>
            </svg>
            Back to Cart
          </Link>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Order Summary
            </h2>
            <ul>
              {products.map((product, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-4 border-b border-gray-200"
                >
                  <span className="text-gray-700">{product.name}</span>
                  <span className="text-gray-800 font-semibold">
                    ₱{product.price.toFixed(2)}
                  </span>
                </li>
              ))}
              <li className="flex justify-between items-center py-4">
                <strong className="text-lg text-gray-800">Total</strong>
                <strong className="text-lg text-gray-900">
                  ₱{total.toFixed(2)}
                </strong>
              </li>
            </ul>
          </div>

          {/* Pickup Information */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Pickup Information
            </h2>
            <form className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-600"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full mt-1 p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Contact Number */}
              <div>
                <label
                  htmlFor="contact"
                  className="block text-sm font-medium text-gray-600"
                >
                  Contact Number
                </label>
                <input
                  type="text"
                  id="contact"
                  className="w-full mt-1 p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Pickup Date */}
              <div>
                <label
                  htmlFor="pickup-date"
                  className="block text-sm font-medium text-gray-600"
                >
                  Pickup Date
                </label>
                <input
                  type="date"
                  id="pickup-date"
                  className="w-full mt-1 p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Pickup Time */}
              <div>
                <label
                  htmlFor="pickup-time"
                  className="block text-sm font-medium text-gray-600"
                >
                  Pickup Time
                </label>
                <input
                  type="time"
                  id="pickup-time"
                  className="w-full mt-1 p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </form>
          </div>
        </div>
      </main>

      {/* Confirm Button */}
      <div className="p-6 bg-white shadow-md">
        <button className="w-full bg-black text-white text-lg font-semibold py-3 rounded-md hover:bg-black transition">
          Confirm Order for Pickup
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default Checkout;
