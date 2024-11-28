import { useEffect, useState } from "react";
import BreadCrumbs from "@/components/ui/BreadCrumbs";
import Popup from "@/components/Dashboard/Popup";
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

interface Product {
  _id: string;
  name: string;
  price: number;
  stock_quantity: number;
}

const Home = () => {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    fetchProducts();
  } , []);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible);
  };

  const fetchProducts = async () => {
    try {
      const endpoint = "/admin/products/products";
      if(!token) {
        throw new Error("Token not found");
      }

      const method = "GET";

      const response = await dataFetch(endpoint, method, {}, token);
      if (response && typeof response === "object" && "data" in response) {
        setProducts(response.data as Product[]);
      } else {
        throw new Error("Invalid response format");
      }

      console.log(response);
      
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="home-container">
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
        <div className="category-buttons flex justify-center space-x-20 font-poppins">
          <button className="text-white bg-[#E61525] focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            All Time Favourites
          </button>
          <button className="text-white bg-[#E61525] focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-9 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Meal
          </button>
          <button className="text-white bg-[#E61525] focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Combo Meal
          </button>
          <button className="text-white bg-[#E61525] focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Add-Ons
          </button>
          <button className="text-white bg-[#E61525] focus:ring-4 focus:ring-red-300 font-bold rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
            Drinks
          </button>
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
            {products.map((product) => (
                <CarouselItem key={product._id} className="md:basis-1/2 lg:basis-1/3">
                  <div className="p-4">
                    <Card className="shadow-lg transform transition duration-500 hover:scale-105">
                      <div className="relative h-48 w-full rounded-t-lg overflow-hidden bg-gray-100">
                        <img
                          src={`src/images/default-product.png`} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {product.name}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                          Price: ${product.price}
                        </p>
                        <p className="text-gray-500 dark:text-gray-400">
                          Stock: {product.stock_quantity}
                        </p>
                        <div className="mt-4 flex items-center justify-between">
                          <p className="text-xl font-bold text-gray-900 dark:text-white">
                            ${product.price}
                          </p>
                          <button
                            type="button"
                            className="flex items-center rounded-full bg-red-600 px-3 py-1 text-xs font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-300"
                            onClick={togglePopup}
                          >
                            Add to Tray
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </CarouselItem>
              ))}

            </CarouselContent>
          </Carousel>
        </div>
      </section>

      {isPopupVisible && (
        <div>
          <Popup />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Home;