import { useState } from "react";

interface Order {
  id: number;
  status: string;
}

interface EditOrderProps {
  order: Order;
  onClose: () => void;
}

const EditOrder = ({ order, onClose }: EditOrderProps) => {
  const [status, setStatus] = useState(order.status);

  const updateOrderStatus = () => {
    console.log(`Order ID: ${order.id}, New Status: ${status}`);
    onClose(); // Close modal after saving
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-50 absolute inset-0" onClick={onClose}></div>
      <div className="bg-white p-6 rounded-lg shadow-lg relative z-10 w-96">
        <h2 className="text-xl font-bold mb-4">Edit Order Status</h2>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">Order Status</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 w-full"
          >
            <option value="Pending">Pending</option>
            <option value="Order Confirmed">Order Confirmed</option>
            <option value="Preparing">Preparing</option>
            <option value="Received">Received</option>
          </select>
        </div>
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={updateOrderStatus}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;
