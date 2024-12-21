import { useEffect, useState } from "react";
import HeaderMain from "@/components/ui/HeaderMain";
import { Link } from "react-router-dom";
import Footer from "@/components/ui/Footer";
import dataFetch from "@/services/data-services";
import imagePlaceHolder from "../../images/462537363_1012187420677657_6941706802130613222_n (1).png";

const OrderHistory = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [orderTotals, setOrderTotals] = useState<number[]>([]);
  const token = localStorage.getItem("userToken");
  const [filter, setFilter] = useState("all");

  const fetchUserOrders = async () => {
    try {
      const endpoint = "/user/order/myOrders";
      const response = await dataFetch(endpoint, "GET", {}, token!);

      if (response && typeof response === "object" && "data" in response) {
        const sortedOrders = (response.data as any[]).sort((a: any, b: any) => {
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        });

        setOrders(sortedOrders);
        calculateTotal(sortedOrders);
        console.log("Orders fetched successfully", sortedOrders);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  const calculateTotal = (orders: any[]) => {
    const totals = orders.map((order) => {
      let totalAmount = 0;
      order.items.forEach((item: { price: number; quantity: number }) => {
        totalAmount += item.price * item.quantity;
      });
      return totalAmount;
    });

    setOrderTotals(totals);
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'Cancelled':
        return 'text-red-500';
      case 'Order Confirmed':
        return 'text-orange-500';
      case 'Preparing':
        return 'text-yellow-500';
      case 'Received':
        return 'text-green-500';
      case 'Ready for pick-up':
        return 'text-blue-500';
      default:
        return 'text-gray-600';
    }
  };

  const cancelOrder = async (id: string) => {
    try {
      const endpoint = `/user/order/cancelOrder/${id}`;
      const response = await dataFetch(endpoint, "PUT", {}, token!);

      if (response && typeof response === "object" && "success" in response) {
        fetchUserOrders();
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.userStatus.toLowerCase() === filter;
  });

  useEffect(() => {
    fetchUserOrders();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderMain />

      <main className="flex-grow container mx-auto p-8 relative">
        <div className="grid lg:grid-cols-1 gap-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order History</h2>

            {/* Filter Dropdown */}
            <div className="mt-6 gap-4 space-y-4 sm:mt-0 sm:flex sm:items-center sm:justify-end sm:space-y-0">
              <div>
                <label
                  htmlFor="order-status"
                  className="sr-only mb-2 block text-sm font-medium text-gray-900 dark:text-white"
                >
                  Select status
                </label>
                <select
                  id="order-status"
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="block w-full min-w-[8rem] rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-primary-500 dark:focus:ring-primary-500"
                >
                  <option value="all">All orders</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="order confirmed">Order Confirmed</option>
                  <option value="preparing">Preparing</option>
                  <option value="received">Received</option>
                  <option value="ready for pick-up">Ready for pick-up</option>
                </select>
              </div>
            </div>

            {/* Order List */}
            <div className="mt-6 flow-root sm:mt-8">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredOrders.length > 0 ? (
                  filteredOrders.map((order, index) => (
                    <div
                      key={order.id}
                      className="flex flex-col sm:flex-row items-center gap-y-4 py-6"
                    >
                      {/* Order Items */}
                      <div className="flex flex-col gap-y-4 sm:w-1/2">
                        {order.items.map((item: any, itemIndex: number) => (
                          <div key={itemIndex} className="mt-4 flex-row flex items-center gap-x-4">
                            <img
                              src={item.product?.image || imagePlaceHolder}
                              alt={item.product?.name || "unknown product"}
                              className="w-16 h-16 object-cover rounded mt-2"
                            />
                            <div className="flex flex-col">
                            <p className="text-sm text-gray-600">
                              {item.product?.name || "Unknown product"} (x{item.quantity}) - ₱{(item.price * item.quantity).toFixed(2)} 
                            </p>
                            <p className="text-sm text-gray-600">
                              Estimate Time: {item.product?.time}
                            </p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Order Status */}
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Order Status:
                        </dt>
                        <dd
                          className={`mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${getStatusClass(order.userStatus)}`}
                        >
                          {order.userStatus}
                        </dd>
                      </dl>

                      {/* Total Amount */}
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Total Amount:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          ₱{orderTotals[index]?.toFixed(2)}
                        </dd>
                      </dl>

                      {/* Created At */}
                      <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                        <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                          Created At:
                        </dt>
                        <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                          {new Date(order.createdAt).toLocaleString()}
                        </dd>
                      </dl>

                      {/* Cancel Button */}
                        {order.userStatus === "Order Confirmed" ? (
                          <button
                            onClick={() => cancelOrder(order._id)}
                            className="ml-auto mt-4 rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
                          >
                            Cancel Order
                          </button>
                        ) : (
                          <button
                            disabled
                            className="ml-auto mt-4 rounded bg-gray-400 px-3 py-1.5 text-sm font-medium text-white cursor-not-allowed"
                          >
                            Cancel Order
                          </button>
                        )}
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500 dark:text-gray-400">
                    No orders found.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default OrderHistory;
