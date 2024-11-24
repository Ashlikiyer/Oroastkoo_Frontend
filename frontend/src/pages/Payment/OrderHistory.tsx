import Footer from "@/components/ui/Footer";
import HeaderMain from "@/components/ui/HeaderMain";
import { useState } from "react";

const OrderHistory = () => {
  const [orders, setOrders] = useState([
    {
      id: 1,
      productName: "Cheeseburger Deluxe",
      pickupTime: "1:00 PM",
      items: 2,
      paymentStatus: "Paid",
    },
    {
      id: 2,
      productName: "Chicken Bucket",
      pickupTime: "3:00 PM",
      items: 1,
      paymentStatus: "Unpaid",
    },
    {
      id: 3,
      productName: "Veggie Wrap",
      pickupTime: "4:00 PM",
      items: 3,
      paymentStatus: "Cancelled",
    },
    {
      id: 4,
      productName: "BBQ Ribs",
      pickupTime: "5:00 PM",
      items: 1,
      paymentStatus: "Paid",
    },
  ]);

  const [filter, setFilter] = useState("all");

  const cancelOrder = (id: number) => {
    setOrders((prevOrders) =>
      prevOrders.map((order) =>
        order.id === id ? { ...order, paymentStatus: "Cancelled" } : order
      )
    );
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.paymentStatus.toLowerCase() === filter;
  });

  return (
    <div className="flex-grow">
      {/* Header */}
      <HeaderMain />
    <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          {/* Header with Filters */}
          <div className="gap-4 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
              Pickup Order History
            </h2>

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
                  <option value="paid">Paid</option>
                  <option value="unpaid">Unpaid</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          {/* Order List */}
          <div className="mt-6 flow-root sm:mt-8">
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex flex-wrap items-center gap-y-4 py-6"
                  >
                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Product:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                        {order.productName}
                      </dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Pickup Time:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                        {order.pickupTime}
                      </dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Items:
                      </dt>
                      <dd className="mt-1.5 text-base font-semibold text-gray-900 dark:text-white">
                        {order.items}
                      </dd>
                    </dl>

                    <dl className="w-1/2 sm:w-1/4 lg:w-auto lg:flex-1">
                      <dt className="text-base font-medium text-gray-500 dark:text-gray-400">
                        Payment Status:
                      </dt>
                      <dd
                        className={`mt-1.5 inline-flex items-center rounded px-2.5 py-0.5 text-xs font-medium ${
                          order.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-800"
                            : order.paymentStatus === "Unpaid"
                            ? "bg-red-100 text-red-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {order.paymentStatus}
                      </dd>
                    </dl>

                    {order.paymentStatus !== "Cancelled" && (
                      <button
                        onClick={() => cancelOrder(order.id)}
                        className="ml-auto mt-4 rounded bg-red-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-800"
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
    </section>
    <Footer />
    </div>
  );
};

export default OrderHistory;
