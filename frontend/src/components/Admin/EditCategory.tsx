// EditCategory.tsx
import React, { useState } from "react";

interface EditCategoryProps {
  toggleModal: () => void;
  categoryName?: string;
}

const EditCategory: React.FC<EditCategoryProps> = ({ toggleModal, categoryName }) => {
  const [name, setName] = useState<string>(categoryName || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name });
    handleClose();
  };

  const handleClose = () => {
    setName("");
    toggleModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-4">
      <div className="relative p-6 w-full max-w-sm bg-white rounded-lg shadow-xl">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 8.586L4.707 3.293A1 1 0 103.293 4.707L8.586 10l-5.293 5.293a1 1 0 101.414 1.414L10 11.414l5.293-5.293a1 1 0 00-1.414-1.414L10 8.586z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Edit Category</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-800"
              placeholder="Enter category"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-lg "
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCategory;
