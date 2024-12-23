import React, { useEffect } from 'react';
import HeaderMain from '@/components/ui/HeaderMain';
import Footer from '@/components/ui/Footer';
import dataFetch from '@/services/data-services';
import { Button } from '@/components/ui/button';
import { DeleteIcon, Trash } from 'lucide-react';

interface Order {
  notifId: string;
products: {
  name: string; image: string;
}[];
  status: string;
  username?: string;
  totalAmount?: number;
  orderId: string;
}

interface NotificationProps {
  orders: Order[];
}

const Notification: React.FC<NotificationProps> = ({ orders }) => {
  const [notifications, setNotifications] = React.useState<Order[]>([]);
  const token = localStorage.getItem('userToken');

  const fetchNotifications = async () => {
    try {
      const endRoute = '/user/notification/getNotifs';
      const method = 'GET';
      const response = await dataFetch(endRoute, method, {}, token!) as { data: Order[] };
      const data = response.data;
      console.log('Notifications:', data);
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }
  };

  const deleteNotification = async (id: string) => {
    console.log('Deleting notification:', id);
    try {
      const endRoute = `/user/notification/deleteNotif/${id}`;
      const method = 'DELETE';
      const response = await dataFetch(endRoute, method, { id }, token!) as { success: boolean };
      if (response.success) {
        setNotifications(notifications.filter(notif => notif.notifId !== id));
      }
    } catch (error) {
      console.error('Error deleting notification:', error);
    }
  }

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <HeaderMain />

      {/* Main Content */}
      <div className="flex-grow bg-gray-50 py-8">
        <div className="bg-white shadow-md rounded-lg p-4 max-w-lg w-full mx-auto">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Order Notifications</h2>
          {notifications && notifications.length > 0 ? (
            <ul className="space-y-4">
              {notifications.map((notif, index) => (
                <li
                  key={index}
                  className="p-4 rounded-lg border border-gray-200 flex justify-between items-center hover:bg-gray-100"
                >
                  <div className="flex items-center">
                    {notif.products && notif.products.length > 0 && (
                      <div className="flex items-center flex-col space-y-3">
                        {notif.products.map((product: { name: string; image: string }, productIndex: number) => (
                          <div key={productIndex} className="flex items-center space-x-2">
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-10 h-10 rounded-full"
                            />
                            <p className="text-sm font-semibold text-gray-800">{product.name}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    <div className="ml-10 flex flex-col space-y-2">
                      <p className="text-xs text-gray-600">Username: {notif.username}</p>
                      {notif.totalAmount && (
                        <p className="text-xs text-gray-600">Total: ${notif.totalAmount.toFixed(2)}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-y-3 flex-col">
                    <span
                      className={`text-sm font-medium px-2 py-1 rounded-lg ${
                        notif.status === 'Delivered'
                          ? 'bg-green-100 text-green-800'
                          : notif.status === 'Processing'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {notif.status}
                    </span>
                    <Button
                      onClick={() => deleteNotification(notif.notifId)}
                      className="bg-transparent text-black mt-3 hover:bg-red-500 hover:text-white"
                    >
                      <Trash />
                    </Button>
                  </div>
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
