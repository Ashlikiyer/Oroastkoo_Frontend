
import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/Header";
import CreateProduct from "@/components/Admin/CreateProduct";
import EditProduct from "@/components/Admin/EditProduct";
import DeleteProduct from "@/components/Admin/DeleteProduct";
import { useEffect, useState } from "react";
import dataFetch from "@/services/data-services";
import Category from "./Category";

interface Category {
  _id: string;
  categoryName: string;
}

interface ProductData {
  _id: string;
  name: string;
  price: number;
  image_url?: string; // Optional image URL field
  category: Category
}

const ProductAdmin = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [editProductData, setEditProductData] = useState<ProductData | null>(
    null
  );
  const [products, setProducts] = useState<ProductData[]>([]);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [uniqueCategories, setUniqueCategories] = useState<Set<string>>(new Set());


  // Toggle modals
  const toggleModal = () => setIsModalOpen(!isModalOpen);
  const toggleEditModal = (product: ProductData | null = null) => {
    setEditProductData(product);
    setIsEditModalOpen(!isEditModalOpen);
  };
  const toggleDeleteModal = (productId: string | null = null) => {
    setDeleteProductId(productId);
    setIsDeleteModalOpen(!isDeleteModalOpen);
  };

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await dataFetch("/admin/products/products", "GET", {}, getToken());
      const productsData = (response as { data: ProductData[] }).data;
      setProducts(productsData);
  
      // Extract unique categories from products
      const categorySet = new Set(productsData.map(product => product.category?.categoryName).filter(Boolean));
      setUniqueCategories(categorySet);
  
      console.log(response);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };
  

  // Get token for API requests
  const getToken = () => {
    const token = localStorage.getItem("adminToken");
    if (!token) throw new Error("Unauthorized");
    return token;
  };

  // Edit a product
  const editProduct = async (updatedProduct: ProductData) => {
    try {
      const response = await dataFetch(
        `/admin/products/editproduct/${updatedProduct._id}`,
        "PUT",
        updatedProduct,
        getToken()
      );
      const responseData = response as { success: boolean; data: ProductData };
      if (responseData.success) {
        setProducts((prevProducts) =>
          prevProducts.map((product) =>
            product._id === updatedProduct._id ? (response as { data: ProductData }).data : product
          )
        );
        fetchProducts();
      } else {
        console.error("Failed to update product:", response);
      }
    } catch (error) {
      console.error("Error editing product:", error);
    } finally {
      setIsEditModalOpen(false);
    }
  };

  // Delete a product
  const handleDelete = async () => {
    if (!deleteProductId) return;
    try {
      await dataFetch(`/admin/products/deleteproduct/${deleteProductId}`, "DELETE", {}, getToken());
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== deleteProductId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    } finally {
      toggleDeleteModal(null);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-grow">
        <Header />
        <div className="bg-blue-50 min-h-screen p-5 sm:p-20">
          <div className="max-w-5xl ml-40 mt-8">
            {/* Header Section */}
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-700">Product Inventory</h1>
              <button
                className="bg-black text-white px-4 py-2 rounded-lg transition duration-300"
                onClick={toggleModal}
              >
                + Add Product
              </button>
            </div>

            {/* Statistics */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <div className="bg-yellow-500 text-white rounded-lg p-4 shadow-lg">
                <h2 className="text-xl font-semibold">Total Products</h2>
                <p className="text-2xl font-bold">{products.length}</p>
              </div>
              <div className="bg-yellow-500 text-white rounded-lg p-4 shadow-lg">
                <h2 className="text-xl font-semibold">Categories</h2>
                <p className="text-2xl font-bold">{uniqueCategories.size}</p>
              </div>
            </div>


            {/* Product Table */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              {loading ? (
                <p className="text-center py-4">Loading...</p>
              ) : (
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-3 text-left">#</th>
                      <th className="px-6 py-3 text-left">Product Name</th>
                      <th className="px-6 py-3 text-left">Category</th>
                      <th className="px-6 py-3 text-left">Price</th>
                      <th className="px-6 py-3 text-center">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.length > 0 ? (
                      products.map((product, index) => (
                        <tr key={product._id} className="hover:bg-gray-50 transition">
                          <td className="px-6 py-4">{index + 1}</td>
                          <td className="px-6 py-4">{product.name}</td>
                          <td className="px-6 py-4">{product.category?.categoryName || "Category"}</td>
                          <td className="px-6 py-4">₱{product.price.toFixed(2)}</td>
                          <td className="px-6 py-4 text-center">
                            <button onClick={() => toggleEditModal(product)} className="text-green-500">Edit</button>
                            <button onClick={() => toggleDeleteModal(product._id)} className="text-red-500 ml-2">Delete</button>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan={7} className="text-center py-4">No products found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Modals */}
      {isModalOpen && <CreateProduct toggleModal={toggleModal} callback={fetchProducts} />}
      {isEditModalOpen && editProductData && (
        <EditProduct
          productData={editProductData}
          toggleModal={() => toggleEditModal(null)}
          onSave={editProduct}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteProduct onCancel={() => toggleDeleteModal(null)} onConfirm={handleDelete} />
      )}
    </div>
  );
};

export default ProductAdmin;
