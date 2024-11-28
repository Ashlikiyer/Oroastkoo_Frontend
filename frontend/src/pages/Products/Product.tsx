import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Popup from "@/components/Dashboard/Popup";
import Footer from "@/components/ui/Footer";
import HeaderMain from "@/components/ui/HeaderMain";
import dataFetch from "@/services/data-services";
<<<<<<< HEAD
=======
interface Category {
  _id: string;
  categoryName: string;
}
>>>>>>> b4367993c4761113962d25e84ec3269f7b8befbb

interface Product {
  _id: string;
  name: string;
  price: number;
<<<<<<< HEAD
  stock_quantity: number;
  image_url?: string; // Optional image URL field
=======
  image_url?: string; // Optional image URL field
  category: Category
>>>>>>> b4367993c4761113962d25e84ec3269f7b8befbb
}

const Product = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const token = localStorage.getItem("adminToken");

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const fetchProducts = async () => {
    try {
      const endpoint = "/admin/products/products";
      if (!token) throw new Error("Token not found");

      const method = "GET";
      const response = await dataFetch(endpoint, method, {}, token);

      if (response && typeof response === "object" && "data" in response) {
        setProducts(response.data as Product[]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []); // Empty dependency array to run once on mount

  return (
    <div className="product-container">
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
                  src={product.image_url || "https://via.placeholder.com/150"}
                  alt={product.name}
                />
              </div>
              <div className="pt-4">
                <h2 className="text-lg font-semibold leading-tight text-gray-900 dark:text-white">
                  {product.name}
                </h2>
<<<<<<< HEAD
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  {`Stock: ${product.stock_quantity}`}
                </p>
=======
>>>>>>> b4367993c4761113962d25e84ec3269f7b8befbb
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xl font-bold text-gray-900 dark:text-white">
                    ${product.price.toFixed(2)}
                  </p>
                  <button
                    type="button"
                    className="rounded-full bg-red-600 px-3 py-1 text-xs font-medium text-white transition hover:bg-red-700"
                    onClick={togglePopup}
                  >
                    Add to Tray
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      <Footer />

      {isPopupVisible && (
        <div>
          <Popup />
        </div>
      )}

    </div>
  );
};

export default Product;