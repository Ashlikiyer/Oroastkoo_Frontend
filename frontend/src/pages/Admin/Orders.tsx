import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/Header";
import EditOrder from "@/components/Admin/EditOrder";
import { useEffect, useState } from "react";
import dataFetch from "@/services/data-services";
import DeleteOrder from "@/components/Admin/DeleteOrder";
import imagePlaceHoler from "../../images/462537363_1012187420677657_6941706802130613222_n (1).png"

interface OrderData {
  id: string;
  _id: string;
  status: string;
  user: {
    _id: string;
    username: string; // Customer name
  };
  items: {
    product: {
      _id: string;
      name: string; // Product name
      price: number;
      image?: string | null; // Product image
    };
    quantity: number; // Product quantity
  }[];
  totalAmount: number; // Total amount of the order
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

      if (response && typeof response === "object" && "data" in response) {
        const orders = response.data as OrderData[];

        const sortedOrders = orders.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setOrderData(sortedOrders);
        console.log("Orders fetched successfully", sortedOrders);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteOrderConfirm = async () => {
    try {
      if (!selectedOrder) throw new Error("No order selected");

      const endpoint = `/admin/orders/deleteOrder/${selectedOrder._id}`;
      const token = localStorage.getItem("adminToken");
      if (!token) throw new Error("Token not found");

      const response = await dataFetch(endpoint, "DELETE", {}, token);

      if (response) {
        console.log("Order deleted successfully");
        setOrderData((prev) =>
          prev.filter((order) => order._id !== selectedOrder._id)
        );
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
            <h1 className="text-3xl font-bold text-gray-700 mb-6">Orders</h1>

            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {orderData.map((order, orderIndex) => (
                <div key={order._id} className="border-b border-gray-200">
                  <div className="bg-gray-100 px-6 py-4 flex justify-between items-center">
                    <div>
                      <h2 className="text-xl font-semibold">Order #{orderIndex + 1}</h2>
                      <p className="text-sm text-gray-500">
                        Placed on: {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-500">
                        Customer: {order.user?.username || "Unknown"}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Status: {order.orderStatus}</p>
                      <p className="text-sm font-medium">Total: ₱{order.totalAmount}</p>
                    </div>
                  </div>

                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                          Product
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                          Price
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase">
                          Quantity
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {order.items.map((item, itemIndex) => (
                        <tr key={itemIndex} className="hover:bg-gray-50 transition duration-200">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                            <img
                              src={(item.product?.image) || imagePlaceHoler}
                              alt={item.product?.name || "Unknown Product"}
                              className="w-10 h-10 rounded-full object-cover mr-2"
                            />
                            {item.product?.name || "Unknown Product"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            ₱{item.product?.price?.toFixed(2) || "0.00"}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                            {item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  {/* Action buttons outside the table */}
                  <div className="px-6 py-4 flex justify-end space-x-4">
                    <button
                      onClick={() => toggleEditOrderModal(order)}
                      className="text-blue-500 hover:text-blue-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => {
                        setSelectedOrder(order);
                        toggleDeleteOrderModal();
                      }}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isDeleteOrderModalOpen && (
        <DeleteOrder onCancel={toggleDeleteOrderModal} onConfirm={handleDeleteOrderConfirm} />
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
