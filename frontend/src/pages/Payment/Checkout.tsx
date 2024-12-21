
import { useEffect, useState } from "react";
import HeaderMain from "@/components/ui/HeaderMain";
import { Link } from "react-router-dom";
import Footer from "@/components/ui/Footer";
import dataFetch from "@/services/data-services";
import imagePlaceHoler from "../../images/462537363_1012187420677657_6941706802130613222_n (1).png";

const Checkout = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [orderTotals, setOrderTotals] = useState<number[]>([]); 
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
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

  const deleteOrder = async (orderId: string) => {
    try {
      const endpoint = `/user/order/deleteOrder/${orderId}`;
      const response = await dataFetch(endpoint, "DELETE", {}, token!);

      if (response && typeof response === "object" && "success" in response) {
        fetchOrders();
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
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
      case 'Pending':
        return 'text-red-500'; // red for Pending
      case 'Order Confirmed':
        return 'text-orange-500'; // yellow for Completed
      case 'Preparing':
        return 'text-yellow-500'; // yellow for Preparing':
      case 'Received':
        return 'text-green-500'; // green for Received':
      default:
        return 'text-gray-600'; // Default gray for unknown status
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <HeaderMain />

      <main className="flex-grow container mx-auto p-8 relative">
        <div className="absolute top-8 right-8">
          <Link
            to="/Cart"
            role="button"
            className="flex items-center bg-black text-white hover:bg-gray-800 text-sm font-semibold py-2 px-4 rounded-md transition"
          >
            Back to Cart
          </Link>
        </div>

        <div className="grid lg:grid-cols-1 gap-12">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">Order Summary</h2>
            <ul>
              {orders.map((order, index) => (
                <div key={order._id} className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">
                    Order ID: {order._id}
                  </h3>
                  <p className="text-sm text-gray-600">
                    Created At: {new Date(order.createdAt).toLocaleString()}
                  </p>
                  <p className={`text-sm ${getStatusClass(order.userStatus)}`}>
                    Status: {order.userStatus}
                  </p>
                  <div>
                    {order.items.map((item: any, itemIndex: number) => (
                      <li
                        key={itemIndex}
                        className="flex justify-between items-center py-4 border-b border-gray-200"
                      >
                        <div className="flex items-center space-x-4">
                          {/* Product Image */}
                          <img 
                            src={(item.product?.image) || imagePlaceHoler} 
                            alt={(item.product?.name) || "unknown product"} 
                            className="w-16 h-16 object-cover rounded"
                          />
                          {/* Product Name */}
                          <span className="text-gray-700">{(item.product?.name) || "unknown product"}</span>
                          {/* Product Quantity */}
                          <span className="text-sm text-gray-500">x{item.quantity}</span>
                        </div>
                        {/* Estimate time */}
                        <p className="text-gray-500 dark:text-gray-400">
                          Estimate Time: {item.product?.time}
                        </p>
                        {/* Product Price */}
                        <span className="text-gray-800 font-semibold">
                        ₱{(item.price * item.quantity).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </div>
                  <li className="flex justify-between items-center py-4">
                    <strong className="text-lg text-gray-800">Order Total</strong>
                    <strong className="text-lg text-gray-900">
                    ₱{orderTotals[index]?.toFixed(2)}
                    </strong>
                  </li>
                  <div className="text-right">
                    <button
                      onClick={() => deleteOrder(order._id)}
                      className="bg-red-700 text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-red-900 transition"
                    >
                      Delete Order
                    </button>
                  </div>
                </div>
              ))}
            </ul>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Checkout;
