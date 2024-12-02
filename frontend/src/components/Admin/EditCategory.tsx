import React, { useState } from "react";

interface CategoryData {
  _id: string;
  categoryName: string;
}

interface EditCategoryProps {
  toggleModal: () => void;
  editCategory: (categoryId: string, updatedCategory: Partial<CategoryData>) => void;
  currentCategory: CategoryData;
}

const EditCategory: React.FC<EditCategoryProps> = ({
  toggleModal,
  editCategory,
  currentCategory,
}) => {
  const [name, setName] = useState<string>(currentCategory.categoryName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    editCategory(currentCategory._id, { categoryName: name });
    toggleModal();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-4">
      <div className="relative p-6 w-full max-w-sm bg-white rounded-lg shadow-xl">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={toggleModal}
        >
          &times;
        </button>
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Edit Category</h3>

        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Category Name</label>
            <input
              type="text"
              className="w-full p-3 border rounded-lg bg-gray-100 text-gray-800"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
              onClick={toggleModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-black text-white rounded-lg"
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
