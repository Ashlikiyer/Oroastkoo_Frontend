import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/Header";
import CreateProduct from "@/components/Admin/CreateProduct";
import EditProduct from "@/components/Admin/EditProduct";
import DeleteProduct from "@/components/Admin/DeleteProduct";
import { useState } from "react";

interface ProductData {
  name: string;
  category: string;
  price: number;
  quantity: number;
  dateAdded: string;
}

const ProductAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editProductData, setEditProductData] = useState<ProductData | null>(
    null
  );

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  const toggleEditModal = (product: ProductData | null = null) => {
    setEditProductData(product);
    setIsEditModalOpen(!isEditModalOpen);
  };
  const toggleDeleteModal = () => {
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  const handleDelete = () => {
    // Logic for deleting the product
    setIsDeleteModalOpen(false); // Close modal after deletion
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Header />
        <div className="bg-blue-50 min-h-screen p-5 sm:p-20">
          <div className="max-w-5xl ml-40 mt-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-700">
                Product Inventory
              </h1>
              <button
                className="bg-black text-white px-4 py-2 rounded-lg transition duration-300"
                onClick={toggleModal}
              >
                + Add Product
              </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-yellow-500 text-white rounded-lg p-4 shadow-lg">
                <h2 className="text-xl font-semibold">Total Products</h2>
                <p className="text-2xl font-bold">1</p>
              </div>
              <div className="bg-yellow-500 text-white rounded-lg p-4 shadow-lg">
                <h2 className="text-xl font-semibold">Out of Stock</h2>
                <p className="text-2xl font-bold">0</p>
              </div>
              <div className="bg-yellow-500 text-white rounded-lg p-4 shadow-lg">
                <h2 className="text-xl font-semibold">Categories</h2>
                <p className="text-2xl font-bold">1</p>
              </div>
            </div>

            {/* Filters */}
            <div className="flex justify-end items-center space-x-4 mb-4">
              <div className="flex items-center space-x-2">
                <label className="text-gray-600 font-medium">Category:</label>
                <select className="border-gray-300 rounded-lg px-3 py-1.5 shadow focus:ring focus:ring-blue-300">
                  <option>All</option>
                  <option>Breakfast</option>
                  <option>Lunch</option>
                  <option>Dinner</option>
                </select>
              </div>
              <div className="flex items-center space-x-2">
                <label className="text-gray-600 font-medium">Sort by:</label>
                <select className="border-gray-300 rounded-lg px-3 py-1.5 shadow focus:ring focus:ring-blue-300">
                  <option>All</option>
                  <option>Price</option>
                  <option>Quantity</option>
                  <option>Date added</option>
                </select>
              </div>
            </div>

            {/* Product Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      #
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Product Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Date Added
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      1
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      Hotdog
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      Breakfast
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      ₱299.99
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      29
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      29/02/2009
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <button
                        onClick={() =>
                          toggleEditModal({
                            name: "Hotdog",
                            category: "Breakfast",
                            price: 299.99,
                            quantity: 29,
                            dateAdded: "29/02/2009",
                          })
                        }
                        className="text-black-500 hover:text-green-700"
                      >
                        <img src="src/images/icons8-edit.svg" alt="Edit" />
                      </button>
                      <button
                        onClick={toggleDeleteModal}
                        className="ml-2 text-red-500 hover:text-red-700"
                      >
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

      {/* Add Product Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-black bg-opacity-50 absolute inset-0"
            onClick={toggleModal}
          ></div>
          <div className="relative z-10">
            <CreateProduct toggleModal={toggleModal} />
            <button
              className="absolute top-2 right-2 bg-gray-200 rounded-full p-1 text-gray-700 hover:bg-gray-300"
              onClick={toggleModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-black bg-opacity-50 absolute inset-0"
            onClick={() => toggleEditModal(null)}
          ></div>
          <div className="relative z-10">
            <EditProduct
              productData={
                editProductData || {
                  name: "",
                  category: "",
                  price: 0,
                  quantity: 0,
                  dateAdded: "",
                }
              }
              toggleModal={() => toggleEditModal(null)}
            />
            <button
              className="absolute top-2 right-2 bg-gray-200 rounded-full p-1 text-gray-700 hover:bg-gray-300"
              onClick={() => toggleEditModal(null)}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Delete Product Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="bg-black bg-opacity-50 absolute inset-0"
            onClick={toggleDeleteModal}
          ></div>
          <div className="relative z-10">
            <DeleteProduct
              onCancel={toggleDeleteModal}
              onConfirm={handleDelete}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductAdmin;
