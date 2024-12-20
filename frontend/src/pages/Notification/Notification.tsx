import React from 'react';
import HeaderMain from '@/components/ui/HeaderMain';
import Footer from '@/components/ui/Footer';

interface Order {
  id: string;
  productName: string;
  status: string;
}

interface NotificationProps {
  orders: Order[];
}

const Notification: React.FC<NotificationProps> = ({ orders }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <HeaderMain />

      {/* Main Content */}
      <div className="flex-grow bg-gray-50 py-8">
        <div className="bg-white shadow-md rounded-lg p-4 max-w-sm w-full mx-auto">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Order Notifications</h2>
          {orders && orders.length > 0 ? (
            <ul className="space-y-3">
              {orders.map((order, index) => (
                <li
                  key={index}
                  className="p-3 rounded-lg border border-gray-200 flex justify-between items-center hover:bg-gray-100"
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{order.productName}</p>
                    <p className="text-xs text-gray-600">Order ID: {order.id}</p>
                  </div>
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded-lg ${
                      order.status === 'Delivered'
                        ? 'bg-green-100 text-green-800'
                        : order.status === 'Processing'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {order.status}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-gray-600 text-center">No notifications available.</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Notification;
