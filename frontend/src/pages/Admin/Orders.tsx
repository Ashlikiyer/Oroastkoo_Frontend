import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/Header";
import EditOrder from "@/components/Admin/EditOrder";
import { useEffect, useState } from "react";
import dataFetch from "@/services/data-services";
import DeleteOrder from "@/components/Admin/DeleteOrder";


interface OrderData {
  id: string;
  _id: string;
  status: string;
  user: {
    _id: string;
    fullName: string; //customer name
  };
  items: {
    product: { 
      _id: string;
      name: string; //product name
      price: number;
    };
  }[];
  totalAmount: number; //total amount of the order
  orderStatus: string;
  createdAt: string;
  updatedAt: string;
}


const Orders = () => {
  const [isDeleteOrderModalOpen, setIsDeleteOrderModalOpen] = useState(false);
  const [isEditOrderModalOpen, setIsEditOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<OrderData | null>(null);
  const [orderData, setOrderData] = useState<OrderData[]>([]);

  const toggleDeleteOrderModal = (clearOrder = false) => {
    if (clearOrder && isDeleteOrderModalOpen) {
      setSelectedOrder(null);
    }
    setIsDeleteOrderModalOpen(!isDeleteOrderModalOpen);
  };

  const toggleEditOrderModal = (order: OrderData) => {
    setSelectedOrder({
      ...order,
      id: order._id,
    });
    setIsEditOrderModalOpen(!isEditOrderModalOpen);
  };
  

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const endpoint = "/admin/orders/customersOrders";
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Token not found");
      const method = "GET";
      const response = await dataFetch(endpoint, method, {}, token);
      console.log('this is the orders', response);
      
      if (response && typeof response === "object" && "data" in response) {
        setOrderData(response.data as OrderData[]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error(error);
    }
  }
  
  const handleDeleteOrderConfirm = async () => {
    try {
        if (!selectedOrder) throw new Error("No order selected");

        const endpoint = `/admin/orders/deleteOrder/${selectedOrder._id}`;
        const token = localStorage.getItem("adminToken");
        if (!token) throw new Error("Token not found");

        const response = await dataFetch(endpoint, "DELETE", {}, token);

        if (response) {
            console.log("Order deleted successfully");
            // Update orderData
            setOrderData((prev) => prev.filter((order) => order._id !== selectedOrder._id));
            toggleDeleteOrderModal();
        } else {
            throw new Error("Failed to delete order");
        }
    } catch (error) {
        console.error("Error deleting order:", error);
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
              <h1 className="text-3xl font-bold text-gray-700">Orders</h1>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-yellow-500 text-white rounded-lg p-4 shadow-lg">
                <h2 className="text-xl font-semibold">Total Orders</h2>
                <p className="text-2xl font-bold">{orderData.length}</p>
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
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold text-gray-500 uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                {orderData.map((order, index) => (
                  <tr key={order._id} className="hover:bg-gray-50 transition duration-200">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{index + 1}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {order.items.map(item => item.product?.name) || "No orders found"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    ₱{order.totalAmount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {order.user?.fullName || "Unknown"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                      {order.orderStatus || "Unknown"}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                      <div className="flex items-center justify-center space-x-2">
                        <button
                          onClick={() => {
                            setSelectedOrder(order);
                            setTimeout(() => toggleDeleteOrderModal(), 0);
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          <img src="src/images/icons8-delete.svg" alt="Delete" />
                        </button>
                        <button
                          onClick={() => toggleEditOrderModal(order)}
                          className="text-blue-500 hover:text-blue-700"
                        >
                          Edit Status
                        </button>
                      </div>
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
      {isDeleteOrderModalOpen && (
        <DeleteOrder 
        onCancel={toggleDeleteOrderModal} 
        onConfirm={handleDeleteOrderConfirm} 
        />
      )}

      {isEditOrderModalOpen && selectedOrder && (
        <EditOrder
          order={selectedOrder as OrderData}
          onClose={() => {
            setIsEditOrderModalOpen(false);
            fetchOrders();
          }}
        />
      )}
    </div>
  );
};

export default Orders;
