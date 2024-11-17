import React from "react";

interface DeleteProductProps {
  onCancel: () => void;
  onConfirm: () => void;
}

const DeleteProduct: React.FC<DeleteProductProps> = ({
  onCancel,
  onConfirm,
}) => {
  return (
    <div>
      <div
        id="deleteModal"
        tabIndex={-1}
        aria-hidden="true"
        className="fixed inset-0 z-50 flex justify-center items-center w-full h-screen bg-black bg-opacity-50"
      >
        <div className="relative p-4 w-full max-w-md h-full md:h-auto">
          <div className="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
            {/* Close Button (X) */}
            <button
              type="button"
              className="text-gray-400 absolute top-2 right-2 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm p-1.5"
              onClick={onCancel}
            >
              <span className="sr-only">Close modal</span>
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 4.293a1 1 0 011.414 0L10 6.586l2.293-2.293a1 1 0 111.414 1.414L11.414 8l2.293 2.293a1 1 0 01-1.414 1.414L10 9.414l-2.293 2.293a1 1 0 11-1.414-1.414L8.586 8 6.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {/* Delete Icon */}
            <img
              src="src/images/icons8-delete.svg" // Replace with the actual path to your image file
              alt="Delete Icon"
              className="w-10 h-10 mb-3.5 mx-auto text-red-600"
            />

            <p className="mb-4 text-gray-500 dark:text-gray-300">
              Are you sure you want to delete this item?
            </p>
            <div className="flex justify-center items-center space-x-4">
              {/* Cancel Button */}
              <button
                onClick={onCancel}
                className="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:bg-gray-600"
              >
                No, cancel
              </button>
              {/* Confirm Button */}
              <button
                onClick={onConfirm}
                className="py-2 px-3 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600"
              >
                Yes, I'm sure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteProduct;
