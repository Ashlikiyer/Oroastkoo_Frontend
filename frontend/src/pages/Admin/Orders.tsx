import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/Header";
import { useState } from "react";
import DeleteProduct from "@/components/Admin/DeleteProduct";

const Orders = () => {    
  const [isDeleteOrderModalOpen, setIsDeleteOrderModalOpen] = useState(false);

  const toggleDeleteOrderModal = () => {
    setIsDeleteOrderModalOpen(!isDeleteOrderModalOpen);
  };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Header />
        <div className="bg-blue-50 min-h-screen p-5 sm:p-20">
          <div className="max-w-5xl ml-40 mt-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-700">Orders</h1>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-yellow-500 text-white rounded-lg p-4 shadow-lg">
                <h2 className="text-xl font-semibold">Total Orders</h2>
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

            {/* Orders Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">#</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Product Name</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Price</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Purchased Date</th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Customer's Name</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50 transition duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">1</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Product name</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">P280.00</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">29/02/2009</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">Customer's name</td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <button
                        onClick={toggleDeleteOrderModal}
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

      {/* Delete Modal */}
      {isDeleteOrderModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-black bg-opacity-50 absolute inset-0" onClick={toggleDeleteOrderModal}></div>
          <div className="relative z-10">
            <DeleteProduct
              onCancel={toggleDeleteOrderModal}
              onConfirm={() => {
                console.log("Order deleted!"); // Add your delete logic here
                toggleDeleteOrderModal();
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
