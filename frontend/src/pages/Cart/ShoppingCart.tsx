import Footer from "@/components/ui/Footer";
import HeaderMain from "@/components/ui/HeaderMain";
import dataFetch from "@/services/data-services";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import productPic from "../../images/462537363_1012187420677657_6941706802130613222_n (1).png";

interface Category {
  _id: string;
  categoryName: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  image: string | null;
  category: string;
  createdAt: string;
  updatedAt: string;
}

interface CartItem {
  product: Product;
  quantity: number;
  _id: string;
  createdAt: string;
  updatedAt: string;
}

interface ApiResponse {
  success: boolean;
  data: {
    _id: string;
    user: string;
    items: CartItem[];
    createdAt: string;
    updatedAt: string;
  };
}

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [selectedItems, setSelectedItems] = useState<string[]>([]); // Track selected items
  const navigate = useNavigate();
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response: ApiResponse = await dataFetch("/user/cart/mycart", "GET", {}, token!);
      if (response.success) {
        console.log("Cart items:", response.data.items);
        setCartItems(response.data.items);
      }
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setCartItems([]);
    }
  };

  const updateCartItems = async (productId: string, newQuantity: number) => {
    try {
      const payload = { productId, newQuantity };
      const response = await dataFetch(`/user/cart/updatecart`, "PUT", payload, token!) as { success: boolean };
      if (response.success) fetchCartItems();
      console.log("Product ID:", productId);
    } catch (error) {
      console.error("Error updating cart item:", error);
      console.log("Product ID:", productId);
      console.log("New Quantity:", newQuantity);
    }
  };

  const deleteItem = async (productId: string) => {
    try {
      const payload = { productId };
      const response = await dataFetch(`/user/cart/deletecart`, "DELETE", payload, token!) as { success: boolean };
      if (response.success) fetchCartItems();
    } catch (error) {
      console.error("Error deleting cart item:", error);
      console.log("Product ID:", productId);
    }
  };

  const checkout = async () => {
    try {
      const payload = { selectedItems }; // Only pass selected items
      const response = await dataFetch("user/order/placeOrder", "POST", payload, token!) as { success: boolean };
      if (response.success) {
        fetchCartItems();
        alert("Checkout successful!");
        navigate("/Checkout"); // Redirect to the homepage after checkout
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Checkout failed. Please try again.");
    }
  }

  const onIncrease = (item: CartItem) => {
    const newQuantity = item.quantity + 1;
    updateCartItems(item.product._id, newQuantity);
  };

  const onDecrease = (item: CartItem) => {
    if (item.quantity > 1) {
      const newQuantity = item.quantity - 1;
      updateCartItems(item.product._id, newQuantity);
    } else {
      deleteItem(item.product._id);
    }
  };

  const toggleSelectItem = (productId: string) => {
    setSelectedItems((prevSelectedItems) => {
      if (prevSelectedItems.includes(productId)) {
        return prevSelectedItems.filter(id => id !== productId);
      } else {
        return [...prevSelectedItems, productId];
      }
    });
  };

  const calculateTotal = () =>
    cartItems
      .filter((item) => selectedItems.includes(item.product._id)) // Calculate total for selected items only
      .reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  return (
    <div className="cart-container ">
      <HeaderMain />
      <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-16 h-[70vh]">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white sm:text-2xl">
            Shopping Cart
          </h2>

          <div className="mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8">
            <div className="mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl">
              <div className="space-y-6">
                {cartItems.length > 0 ? (
                  cartItems.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center rounded-lg border p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6"
                    >
                      <input
                        type="checkbox"
                        className="mr-4"
                        checked={selectedItems.includes(item.product._id)} // Checkbox is checked if item is selected
                        onChange={() => toggleSelectItem(item.product._id)} // Toggle selection
                      />
                      <Link to={`/product/${item.product._id}`} className="shrink-0 md:order-1">
                        <img
                          className="h-20 w-20"
                          src={item.product.image || productPic}
                          alt={item.product.name}
                        />
                      </Link>
                      <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
                        <Link
                          to={`/product/${item.product._id}`}
                          className="text-base font-medium ml-2 text-gray-900 hover:underline dark:text-white"
                        >
                          {item.product.name}
                        </Link>
                      </div>
                      <div className="flex items-center justify-between md:order-3 md:justify-end">
                        <div className="flex items-center">
                          <button
                            onClick={() => onDecrease(item)}
                            className="rounded-sm border border-black px-3 py-1 text-xs font-medium text-black transition hover:border-gray-700"
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="w-10 text-center"
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            onClick={() => onIncrease(item)}
                            className="rounded-sm border border-black px-3 py-1 text-xs font-medium text-black transition hover:border-gray-700"
                          >
                            +
                          </button>
                        </div>
                        <div className="flex items-center gap-4 ml-4">
                          <button
                            type="button"
                            onClick={() => deleteItem(item.product._id)}
                            className="inline-flex text-sm font-medium text-red-600 hover:underline dark:text-red-500"
                          >
                            Remove
                          </button>
                        </div>
                        <div className="text-end md:order-4 md:w-32">
                          <p className="text-base font-bold text-gray-900 dark:text-white">
                            ₱{item.product.price}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-gray-500">Your cart is empty.</p>
                )}
              </div>
            </div>

            <div className="mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full">
              <div className="space-y-4 rounded-lg border p-4 dark:border-gray-700 dark:bg-gray-800">
                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                  Order Summary
                </p>
                <div className="space-y-2">
                  {cartItems
                    .filter((item) => selectedItems.includes(item.product._id))
                    .map((item) => (
                      <div
                        key={item.product._id}
                        className="flex justify-between text-gray-900 dark:text-white"
                      >
                        <span>{item.product.name}</span>
                        <span>
                          {item.quantity} x ₱{item.product.price}
                        </span>
                      </div>
                    ))}
                </div>
                <dl className="flex items-center justify-between gap-4 border-t pt-2 dark:border-gray-700">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    ₱{calculateTotal()}
                  </dd>
                </dl>
                {selectedItems.length > 0 ? (
                  <button
                    onClick={checkout}
                    className="flex w-full items-center justify-center bg-red-600 text-white hover:bg-red-700"
                  >
                    Proceed to Checkout
                  </button>
                ) : (
                  <p className="text-center text-gray-500">Select items to proceed.</p>
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

export default ShoppingCart;
