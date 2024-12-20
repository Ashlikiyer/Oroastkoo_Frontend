import dataFetch from "@/services/data-services";
import React, { useState } from "react";

interface CreateCategoryProps {
  toggleModal: () => void;
  callback: () => void;
  checkCategoryExists: (categoryName: string) => boolean; // Function passed as prop to check for duplicate
}

const CreateCategory: React.FC<CreateCategoryProps> = ({ toggleModal, callback, checkCategoryExists }) => {
  const [categoryName, setCategoryName] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");

  const CreateCategory = async (event: React.FormEvent) => {
    event.preventDefault();

    // Check if the category name already exists
    if (checkCategoryExists(categoryName)) {
      setErrorMessage("Category name already exists. Please choose a different name.");
      return; // Do not submit the form if category exists
    }

    try {
      const endpoint = "/admin/category/addCategory";
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Token not found");
      const method = "POST";
      const response = await dataFetch(endpoint, method, { categoryName: categoryName }, token);
      console.log(response);
      handleCallback();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };

  const handleCallback = () => {
    callback();
  };

  const handleClose = () => {
    setCategoryName("");
    toggleModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-4">
      <div className="relative p-6 w-full max-w-sm bg-white rounded-lg shadow-xl">
        <button className="absolute top-4 right-4 text-gray-500 hover:text-gray-700" onClick={handleClose}>
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 8.586L4.707 3.293A1 1 0 103.293 4.707L8.586 10l-5.293 5.293a1 1 0 101.414 1.414L10 11.414l5.293 5.293a1 1 0 001.414-1.414L11.414 10l5.293-5.293a1 1 0 00-1.414-1.414L10 8.586z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Add new category</h3>

        <form onSubmit={CreateCategory}>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Category name</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-800"
              placeholder="Enter category"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              required
            />
          </div>

          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-black text-white rounded-lg">
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateCategory;
