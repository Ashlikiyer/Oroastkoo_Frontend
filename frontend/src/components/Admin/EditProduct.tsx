import React, { useState, useEffect } from "react";
import dataFetch from "@/services/data-services"; // Assuming this is your fetch service

interface Category {
  _id: string;
  categoryName: string;
}


interface EditProductProps {
  toggleModal: () => void;
  productData: {
    _id: string;
    name: string;
    category: Category;
    price: number;
    image?: File | null;
  };
  onSave: (updatedProduct: {
    _id: string;
    name: string;
    category: Category;
    price: number;
    image: File | null;
  }) => void;
}

const EditProduct: React.FC<EditProductProps> = ({
  toggleModal,
  productData,
  onSave,
}) => {
  const [productName, setProductName] = useState(productData.name);
  const [category, setCategory] = useState(productData.category._id);
  const [price, setPrice] = useState(productData.price);
  const [image, setImage] = useState<File | null>(productData.image || null);
  const [categories, setCategories] = useState<any[]>([]); // For fetched categories

  useEffect(() => {
    setProductName(productData.name);
    setCategory(productData.category._id);
    setPrice(productData.price);
    setImage(productData.image || null);
  }, [productData]);

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
        console.error("Failed to fetch categories:", response);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  
    const selectedCategory = categories.find(cat => cat._id === category);
    if (!selectedCategory) {
      console.error("Category not found");
      return;
    }
  
    const updatedProduct = {
      _id: productData._id,
      name: productName,
      category: selectedCategory._id, // Pass the entire Category object
      price,
      image,
    };

    console.log(updatedProduct)
  
    onSave(updatedProduct);
  };
  
  

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50 p-4">
      <div className="relative p-8 w-full max-w-3xl bg-white rounded-2xl shadow-xl dark:bg-gray-800">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          onClick={toggleModal}
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
          Edit Product
        </h3>

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
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
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
                  onChange={(e) => setCategory(e.target.value)} // Store category ID
                  required
                >
                  <option value="">Choose a category</option>
                  {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                      {cat.categoryName}
                    </option>
                  ))}
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
            </div>

            <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 bg-gray-100 rounded-lg h-48 cursor-pointer hover:bg-gray-200 dark:bg-gray-700 dark:border-gray-600 dark:hover:bg-gray-600 relative">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Product Preview"
                  className="object-cover w-full h-full rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center text-gray-500">
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-200">
                    <img
                      src="src/images/add-plus-circle-svgrepo-com.svg"
                      alt="Add"
                    />
                  </div>
                  <span className="text-lg font-medium mt-1">Add Image</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              className="px-5 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300"
              onClick={toggleModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-white bg-black rounded-lg"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;