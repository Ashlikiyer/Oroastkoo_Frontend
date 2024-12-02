import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/Header";
import CreateCategory from "@/components/Admin/CreateCategory";
import EditCategory from "@/components/Admin/EditCategory";
import { useEffect, useState } from "react";
import dataFetch from "@/services/data-services";
import DeleteCategory from "@/components/Admin/DeleteCategory";

interface CategoryData {
  _id: string;
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}

const Category = () => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [isEditCategoryModalOpen, setIsEditCategoryModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [categoryData, setCategoryData] = useState<CategoryData[]>([]);
  const [currentCategory, setCurrentCategory] = useState<CategoryData | null>(
    null
  );

  const toggleCategoryModal = () => {
    setIsCategoryModalOpen(!isCategoryModalOpen);
  };

  const toggleEditCategoryModal = () => {
    setIsEditCategoryModalOpen(!isEditCategoryModalOpen);
  };

  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const endpoint = "/admin/category/viewCategories";
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Token not found");
      const method = "GET";
      const response = await dataFetch(endpoint, method, {}, token);

      if (response && typeof response === "object" && "data" in response) {
        setCategoryData(response.data as CategoryData[]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const editCategory = async (
    categoryId: string,
    updatedCategory: Partial<CategoryData>
  ) => {
    try {
      const endpoint = `/admin/category/updateCategory/${categoryId}`;
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Token not found");
      const method = "PUT";
      const response = await dataFetch(
        endpoint,
        method,
        updatedCategory,
        token
      );

      if (response && typeof response === "object" && "data" in response) {
        console.log("Category updated successfully:", response.data);
        fetchCategories(); // Refetch categories after successful update
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const openEditModal = (category: CategoryData) => {
    setCurrentCategory(category);
    toggleEditCategoryModal();
  };

  const handleDelete = async () => {
    try {
      if (!currentCategory) throw new Error("Category not found");
      const endpoint = `/admin/category/deleteCategory/${currentCategory._id}`;
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Token not found");
      const method = "DELETE";

      const response = await dataFetch(endpoint, method, {}, token);

      // Check if the response format is valid
      if (
        response &&
        typeof response === "object" &&
        "success" in response &&
        response.success
      ) {
        console.log("Category deleted successfully:", response);

        // Optimistically remove the deleted category from the state
        setCategoryData((prevCategories) =>
          prevCategories.filter(
            (category) => category._id !== currentCategory._id
          )
        );

        toggleDeleteModal(); // Close the delete modal
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
    }
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
                <p className="text-2xl font-bold">{categoryData.length}</p>
              </div>
            </div>

            {/* Category Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Category Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                      Date Added
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {categoryData.map((category, index) => (
                    <tr
                      key={category._id}
                      className="hover:bg-gray-50 transition duration-200"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {index + 1}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {category.categoryName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                        {new Date(category.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                        <button
                          onClick={() => openEditModal(category)}
                          className="text-black-500 hover:text-green-700 mx-2"
                        >
                          <img src="src/images/icons8-edit.svg" alt="Edit" />
                        </button>
                        <button
                          onClick={() => {
                            setCurrentCategory(category);
                            toggleDeleteModal();
                          }}
                          className="ml-2 text-red-500 hover:text-red-700"
                        >
                          <img
                            src="src/images/icons8-delete.svg"
                            alt="Delete"
                          />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isCategoryModalOpen && (
        <CreateCategory
          callback={fetchCategories}
          toggleModal={toggleCategoryModal}
        />
      )}
      {isEditCategoryModalOpen && currentCategory && (
        <EditCategory
          toggleModal={toggleEditCategoryModal}
          editCategory={editCategory}
          currentCategory={currentCategory}
        />
      )}
      {isDeleteModalOpen && currentCategory && (
        <DeleteCategory onCancel={toggleDeleteModal} onConfirm={handleDelete} />
      )}
    </div>
  );
};

export default Category;
