import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Homepage/main-dashboard";
import { Button } from "./components/ui/layout/button";
import Product from "./pages/Products/Product";
import ShoppingCart from "./pages/Cart/ShoppingCart";
import ProductAdmin from "./pages/Admin/ProductAdmin";
import Category from "./pages/Admin/Category";
import Orders from "./pages/Admin/Orders";
import ProfileAdmin from "./pages/Admin/ProfileAdmin";
import Checkout from "./pages/Payment/Checkout";
import ProfileUser from "./pages/Profile/ProfileUser";
import OrderHistory from "./pages/Payment/OrderHistory";
import AdminLogin from "./pages/Admin/AdminLogin";
import AdminRegister from "./pages/Admin/AdminRegister";
import UserLogin from "./pages/Login/UserLogin";
import UserRegister from "./pages/Register/UserRegister";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="Product" element={<Product />} />
        <Route path="Cart" element={<ShoppingCart />} />
        <Route
          path="button"
          element={<Button>Click me</Button>} // Add text inside the button here
        />
        <Route path="Login" element={<UserLogin />} />
        <Route path="Register" element={<UserRegister />} />
        <Route path="ProductAdmin" element={<ProductAdmin />} />
        <Route path="Category" element={<Category />} />
        <Route path="Orders" element={<Orders />} />
        <Route path="ProfileAdmin" element={<ProfileAdmin />} />
        <Route path="ProfileUser" element={<ProfileUser />} />
        <Route path="Checkout" element={<Checkout/>} />
        <Route path="OrderHistory" element={<OrderHistory/>} />
        <Route path="ProfileUser" element={<ProfileUser/>} />
        <Route path="AdminLogin" element={<AdminLogin/>} />
        <Route path="AdminRegister" element={<AdminRegister/>} />

      </Routes>
    </BrowserRouter>
  );
};

export default App;
