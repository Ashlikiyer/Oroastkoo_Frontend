import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import ImageManager from "../ui/imageManager";  // Import ImageManager
import dataFetch from "@/services/data-services";

interface CreateProductProps {
  toggleModal: () => void;
  callback: () => void;
}

const CreateProduct: React.FC<CreateProductProps> = ({ toggleModal, callback }) => {
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string | null>("");  // Image state for the selected image
  const [category, setCategory] = useState<string>("");
  const [time, setTime] = useState<string>(""); // State for cooking time
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);

  const [isImageManagerOpen, setIsImageManagerOpen] = useState<boolean>(false); // Dialog state for ImageManager

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const endPoint = "/admin/category/viewCategories";
      const method = "GET";
      const token = localStorage.getItem("adminToken");
      if (!token) {
        throw new Error("Unauthorized");
      }

      const response: { success: boolean; data: any[] } = await dataFetch(
        endPoint,
        method,
        {},
        token
      );

      if (response && response.success) {
        setCategories(response.data);
      } else {
        console.error("Unexpected response format:", response);
        setCategories([]);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategories([]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const selectedCategory = categories.find(
        (cat: { _id: string }) => cat._id === category
      );

      if (!selectedCategory) {
        throw new Error("Invalid category selected");
      }

      const payload = {
        name,
        price,
        time, // Add cooking time to payload
        stock_quantity: 505, // Set this dynamically if needed
        image, // Passing the image URL directly
        category: {
          _id: selectedCategory._id,
          categoryName: selectedCategory.categoryName,
        },
      };

      console.log("Payload:", payload);

      const endPoint = "/admin/products/addproducts/";
      const method = "POST";
      const token = localStorage.getItem("adminToken");

      if (!token) {
        throw new Error("Unauthorized");
      }

      const response = await dataFetch(endPoint, method, payload, token);
      setSuccessMessage("Product successfully created!");

      setTimeout(() => {
        setSuccessMessage(null);
      }, 2000);

      toggleCallback();
      handleClose();
    } catch (error) {
      console.error("Error creating product:", error);
      setSuccessMessage("Error creating product. Please try again.");
    }
  };

  const toggleCallback = () => {
    callback();
  };

  const handleClose = () => {
    setName("");
    setCategory("");
    setPrice(0);
    setTime(""); // Reset cooking time
    setImage("");  // Reset the image URL
    toggleModal();
  };

  const closeImageManager = () => {
    setIsImageManagerOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-4">
      <div className="relative p-8 w-full max-w-3xl bg-white rounded-2xl shadow-xl dark:bg-gray-800">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={handleClose}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M10 8.586L4.707 3.293A1 1 0 103.293 4.707L8.586 10l-5.293 5.293a1 1 0 101.414 1.414L10 11.414l5.293 5.293a1 1 0 001.414-1.414L11.414 10l5.293-5.293a1 1 0 00-1.414-1.414L10 8.586z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
          Add Product
        </h3>

        {successMessage && (
          <div className="mb-4 p-4 bg-green-100 text-green-800 rounded-lg">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Product Name
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Product name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Category
                </label>
                <select
                  className="w-full p-3 border rounded-lg bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                >
                  <option value="">Choose a category</option>
                  {categories.map(
                    (cat: { _id: string; categoryName: string }) => (
                      <option key={cat._id} value={cat._id}>
                        {cat.categoryName}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Price
                </label>
                <input
                  type="number"
                  className="w-full p-3 border rounded-lg bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="₱0.00"
                  value={price}
                  onChange={(e) => setPrice(Number(e.target.value))}
                  required
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                  Cooking Time (e.g., 15 minutes)
                </label>
                <input
                  type="text"
                  className="w-full p-3 border rounded-lg bg-gray-50 text-gray-800 dark:bg-gray-700 dark:text-gray-100"
                  placeholder="Cooking time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  required
                />
              </div>
            </div>

            <div
              className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-100 rounded-lg h-48 cursor-pointer hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 relative"
              onClick={() => setIsImageManagerOpen(true)} // Open ImageManager dialog on image click
            >
              {image ? (
                <img
                  src={image}
                  alt="Product Preview"
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
                    <img
                      src="src/images/add-plus-circle-svgrepo-com.svg"
                      alt="Add Icon"
                    />
                  </div>
                  <span className="text-lg font-medium mt-1">Add Image</span>
                </div>
              )}
            </div>
          </div>

          <Dialog open={isImageManagerOpen} onOpenChange={setIsImageManagerOpen}>
            <DialogContent>
              <ImageManager setImage={setImage} onclose={closeImageManager} />
            </DialogContent>
          </Dialog>

          <div className="mt-6">
            <Button type="submit" className="w-full bg-blue-600 text-white">
              Add Product
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProduct;
