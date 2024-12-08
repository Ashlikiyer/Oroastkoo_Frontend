import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Footer from "@/components/ui/Footer";
import HeaderMain from "@/components/ui/HeaderMain";
import dataFetch from "@/services/data-services";
import productPic from "../../images/462537363_1012187420677657_6941706802130613222_n (1).png";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

interface Category {
  _id: string;
  categoryName: string;
}

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
  category: Category;
}

const Product = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add loading state
  const token = localStorage.getItem("userToken");

  const fetchProducts = async () => {
    try {
      const endpoint = "/user/products/products";
      if (!token) throw new Error("Token not found");

      const method = "GET";
      const response = await dataFetch(endpoint, method, {}, token);

      if (response && typeof response === "object" && "data" in response) {
        setProducts(response.data as Product[]);
      } else {
        console.log("Token:", token); // Debugging log
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading to false when fetching is done
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    try {
      const endpoint = "/user/cart/addtoCart";
      const method = "POST";
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("Unauthorized");

      const response = await dataFetch(endpoint, method, { productId, quantity }, token);
      if (response && typeof response === "object" && "success" in response) {
        console.log("Cart item added:", response);
        toast.success("Item added to cart successfully!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      } else {
        console.log("Token:", token); // Debugging log
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast.error("Failed to add item to cart. Please try again.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  const handleQuantityChange = (productId: string, type: "increase" | "decrease") => {
    setQuantities((prevQuantities) => {
      const currentQuantity = prevQuantities[productId] || 1;
      let newQuantity = currentQuantity;

      if (type === "increase") {
        newQuantity += 1;
      } else if (type === "decrease" && currentQuantity > 1) {
        newQuantity -= 1;
      }

      return { ...prevQuantities, [productId]: newQuantity };
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="product-container">
      <ToastContainer /> {/* Add ToastContainer */}
      <HeaderMain />
      <section className="bg-gray-50 py-8 antialiased dark:bg-gray-900 md:py-5">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link
                  to="/"
                  className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <Link
                    to="/Product"
                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                  >
                    Products
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
        </div>

        {/* Product list */}
        <div className="mb-4 flex flex-wrap justify-center mt-7 gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="rounded-lg border border-gray-200 bg-white p-4 shadow-lg transform transition duration-500 hover:scale-105 dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="relative h-40 w-72 rounded-lg overflow-hidden bg-gray-100">
                <img
                  className="mx-auto h-full transition-transform duration-300 ease-in-out hover:scale-110"
                src={(product?.image) || productPic}
                  alt={product.name}
                />
              </div>
              <div className="pt-4 ">
                <h2 className="text-lg font-semibold leading-tight text-gray-900 dark:text-white">
                  {product.name}
                </h2>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </p>
                  <div className="flex items-center">
                    {/* Decrease button */}
                    <button
                      onClick={() => handleQuantityChange(product._id, "decrease")}
                      className="rounded-sm border border-black px-3 py-1 text-xs font-medium text-black transition hover:border-gray-700"
                    >
                      -
                    </button>
                    {/* Display quantity */}
                    <span className="mx-3 text-lg text-gray-800">{quantities[product._id] || 1}</span>
                    {/* Increase button */}
                    <button
                      onClick={() => handleQuantityChange(product._id, "increase")}
                      className="rounded-sm border border-black px-3 py-1 text-xs font-medium text-black transition hover:border-gray-700"
                    >
                      +
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => addToCart(product._id, quantities[product._id] || 1)}
                  className="ml-[30%] mt-4 rounded-sm bg-black px-3 py-1 text-xs font-medium text-white transition hover:bg-black"
                >
                  Add to Tray
                </button>
                <p className="mt-2 text-sm text-gray-600">Quantity: {quantities[product._id] || 1}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Render Footer only after products have been fetched */}
      {!isLoading && <Footer />}
    </div>
  );
};

export default Product;
