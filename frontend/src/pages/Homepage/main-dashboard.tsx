import { useEffect, useState } from "react";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import Footer from "@/components/ui/Footer";
import HeaderMain from "@/components/ui/HeaderMain";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import dataFetch from "@/services/data-services";
import productPic from "../../images/462537363_1012187420677657_6941706802130613222_n (1).png";
import { ToastContainer, toast } from "react-toastify"; // Import Toastify
import "react-toastify/dist/ReactToastify.css"; // Import Toastify styles

interface Product {
  _id: string;
  name: string;
  price: number;
  image?: string;
  category: Category;
  time: string;
  quantity: number;
}

interface Category {
  _id: string;
  categoryName: string;
}

const Home = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});
  const [isLoading, setIsLoading] = useState<boolean>(true); // Add loading state
  const token = localStorage.getItem("userToken");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const endpoint = "/user/products/products";
      if (!token) {
        throw new Error("Token not found");
      }

      const method = "GET";

      const response = await dataFetch(endpoint, method, {}, token);
      if (response && typeof response === "object" && "data" in response) {
        setProducts(response.data as Product[]);
        console.log(response);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false); // Set loading to false when fetching is done
    }
  };

  const fetchCategories = async () => {
    try {
      const endpoint = "/user/category/viewCategories";
      if (!token) {
        throw new Error("Token not found");
      }

      const method = "GET";

      const response = await dataFetch(endpoint, method, {}, token);
      if (response && typeof response === "object" && "data" in response) {
        setCategories(response.data as Category[]);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addToCart = async (productId: string, quantity: number) => {
    try {
      const endpoint = "/user/cart/addtoCart";
      const method = "POST";
      const token = localStorage.getItem("userToken");
      if (!token) throw new Error("Unauthorized");

      const response = await dataFetch(
        endpoint,
        method,
        { productId, quantity },
        token
      );
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

  const handleQuantityChange = (
    productId: string,
    type: "increase" | "decrease"
  ) => {
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

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category._id === selectedCategory)
    : products;

  return (
    <div className="home-container">
      <ToastContainer /> {/* Add ToastContainer */}
      <HeaderMain />
      <section className="bg-white-50 py-8 antialiased dark:bg-gray-900 md:py-5">
        <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
          <BreadCrumbs />
        </div>
      </section>
      {/* Top Selling Section */}
      <section className="top-selling">
        <div className="promo-banner dark:text-white font-bold font-poppins mb-7 mt-9">
          <h3 className="ml-20">Top Selling</h3>
          <div className="flex justify-center">
            <img
              className="w-auto max-w-lg h-auto object-cover rounded-lg"
              src="src/images/topselling.png"
              alt="Top Selling Image"
            />
          </div>
        </div>
      </section>
      {/* Categories */}
      <section className="category-section">
        <h2 className="section-title dark:text-white font-bold font-poppins mb-7 mt-9 ml-20">
          Category
        </h2>
        <div className="category-buttons flex flex-wrap justify-center space-x-4 font-poppins">
          {/* "All" button to reset the category filter */}
          <button
            onClick={() => setSelectedCategory(null)}
            className={`text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
              selectedCategory === null ? "opacity-75" : ""
            }`}
          >
            All
          </button>
          {/* Dynamically render buttons based on product categories */}
          {Array.from(
            new Set(products.map((product) => product.category._id)) // Extract unique category IDs
          ).map((categoryId) => {
            // Find the corresponding category name
            const category = products.find(
              (product) => product.category._id === categoryId
            )?.category;

            return (
              <button
                key={categoryId}
                onClick={() => setSelectedCategory(categoryId)}
                className={`text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 ${
                  selectedCategory === categoryId ? "opacity-75" : ""
                }`}
              >
                {category?.categoryName || "Unknown Category"}
              </button>
            );
          })}
        </div>
      </section>
      {/* Products */}
      <section className="product-section">
        <h2 className="section-title dark:text-white font-bold font-poppins mb-7 mt-9 ml-20">
          Products
        </h2>
        <div className="flex justify-center">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full max-w-screen-xl relative"
          >
            <CarouselPrevious className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 z-10" />
            <CarouselNext className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 z-10" />
            <CarouselContent>
              {filteredProducts.map((product) => (
                <CarouselItem
                  key={product._id}
                  className="md:basis-1/2 lg:basis-1/3"
                >
                  <div className="p-4">
                    <Card className="shadow-lg transform transition duration-500 hover:scale-105">
                      <div className="relative h-56 w-full rounded-t-lg overflow-hidden bg-gray-100">
                        <img
                          src={product?.image || productPic}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          Estimate Time: {product.time}
                        </p>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex flex-col">
                          <p className="text-xl font-bold text-gray-900 dark:text-white">
                            ₱{product.price.toFixed(2)}
                          </p>
                          <p className="text-md font-bold text-gray-500    dark:text-white">
                            Stock: {product.quantity}
                          </p>
                          
                          </div>
                          <div className="flex items-center">
                            {/* Decrease button */}
                            <button
                              onClick={() =>
                                handleQuantityChange(product._id, "decrease")
                              }
                              className="rounded-sm border border-black px-3 py-1 text-xs font-medium text-black transition hover:border-gray-700"
                            >
                              -
                            </button>
                            {/* Display quantity */}
                            <span className="mx-3 text-lg text-gray-800">
                              {quantities[product._id] || 1}
                            </span>
                            {/* Increase button */}
                            <button
                              onClick={() =>
                                handleQuantityChange(product._id, "increase")
                              }
                              className="rounded-sm border border-black px-3 py-1 text-xs font-medium text-black transition hover:border-gray-700"
                            >
                              +
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => addToCart(product._id, quantities[product._id] || 1)}
                          disabled={
                            !product.quantity || (quantities[product._id] || 1) > product.quantity
                          }
                          className={`mt-4 rounded-sm px-3 py-1 text-xs font-medium text-white transition ${
                            !product.quantity || (quantities[product._id] || 1) > product.quantity
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-black hover:bg-black"
                          }`}
                        >
                          {!product.quantity ? "Out of Stock" : "Add to Tray"}
                        </button>
                        {/* Out of Stock Image */}
                        {product.quantity === 0 && (
                          <div className="mt-4 flex justify-center">
                            <img
                              src="/path-to-out-of-stock-image.png"
                              alt="Out of Stock"
                              className="h-16 w-16"
                            />
                          </div>
                        )}

                        {/* Displaying Quantity at the Bottom */}
                        <p className="mt-2 text-sm text-gray-600">
                          Quantity: {quantities[product._id] || 1}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </section>
      {!isLoading && <Footer />}
    </div>
  );
};

export default Home;
