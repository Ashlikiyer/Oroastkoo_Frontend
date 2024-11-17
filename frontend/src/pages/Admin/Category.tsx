// Category.tsx
import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/Header";
import CreateCategory from "@/components/Admin/CreateCategory";
import EditCategory from "@/components/Admin/EditCategory"; // Using EditCategory as per your current setup
import DeleteProduct from "@/components/Admin/DeleteProduct";
import { useState } from "react";

const Category = () => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const toggleCategoryModal = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen);
  };
  const toggleEditCategoryModal = () => {
    setIsEditCategoryModalOpen(!isEditCategoryModalOpen);
  };
  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Header />
        <div className="bg-blue-50 min-h-screen p-5 sm:p-20">
          <div className="max-w-5xl ml-40 mt-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-700">Category</h1>
              <button
                className="bg-black text-white px-4 py-2 rounded-lg transition duration-300"
                onClick={toggleCategoryModal}
              >
                + Add Category
              </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-yellow-500 text-white rounded-lg p-4 shadow-lg">
                <h2 className="text-xl font-semibold">Total Categories</h2>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex justify-end items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <label className="text-gray-600 font-medium">Sort by:</label>
                <select className="border-gray-300 rounded-lg px-3 py-1.5 shadow focus:ring focus:ring-blue-300">
                  <option>All</option>
                </select>
              </div>
            </div>

            {/* Category Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">#</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Category Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Date Added</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Breakfast</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">29/02/2009</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <button onClick={toggleEditCategoryModal} className="text-black-500 hover:text-green-700 mx-2">
                        <img src="src/images/icons8-edit.svg" alt="Edit" />
                      </button>
                      <button onClick={toggleDeleteModal} className="ml-2 text-red-500 hover:text-red-700">
                        <img src="src/images/icons8-delete.svg" alt="Delete" />
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isCategoryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0" onClick={toggleCategoryModal}></div>
          <div className="relative z-10">
            <CreateCategory toggleModal={toggleCategoryModal} />
            <button
              className="absolute top-2 right-2 bg-gray-200 rounded-full p-1 text-gray-700 hover:bg-gray-300"
              onClick={toggleCategoryModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {isEditCategoryModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0" onClick={toggleEditCategoryModal}></div>
          <div className="relative z-10">
            <EditCategory toggleModal={toggleEditCategoryModal} />
            <button
              className="absolute top-2 right-2 bg-gray-200 rounded-full p-1 text-gray-700 hover:bg-gray-300"
              onClick={toggleEditCategoryModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0" onClick={toggleDeleteModal}></div>
          <div className="relative z-10">
            <DeleteProduct onCancel={toggleDeleteModal} onConfirm={() => {}} />
            <button
              className="absolute top-2 right-2 bg-gray-200 rounded-full p-1 text-gray-700 hover:bg-gray-300"
              onClick={toggleDeleteModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Category;
