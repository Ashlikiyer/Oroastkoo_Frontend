import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Homepage/main-dashboard";
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
import { Analytics } from "./pages/Admin/Analytics";
import Notification from "./pages/Notification/Notification";
import { ReactNode } from "react";

const PrivateRoute = ({ children, admin }: { children: ReactNode; admin?: boolean }) => {
  const token = admin ? localStorage.getItem("adminToken") : localStorage.getItem("userToken");
  return token ? children : <Navigate to={admin ? "/AdminLogin" : "/Login"} />;
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/Login" element={<UserLogin />} />
        <Route path="/Register" element={<UserRegister />} />
        <Route path="/AdminLogin" element={<AdminLogin />} />
        <Route path="/AdminRegister" element={<AdminRegister />} />

        {/* Private Routes for Users */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Home />
            </PrivateRoute>
          }
        />
        <Route
          path="/Product"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />
        <Route
          path="/Cart"
          element={
            <PrivateRoute>
              <ShoppingCart />
            </PrivateRoute>
          }
        />
        <Route
          path="/Notification"
          element={
            <PrivateRoute>
              <Notification orders={[]} />
            </PrivateRoute>
          }
        />
        <Route
          path="/ProfileUser"
          element={
            <PrivateRoute>
              <ProfileUser />
            </PrivateRoute>
          }
        />
        <Route
          path="/Orders"
          element={
            <PrivateRoute>
              <Checkout />
            </PrivateRoute>
          }
        />
        <Route
          path="/OrderHistory"
          element={
            <PrivateRoute>
              <OrderHistory />
            </PrivateRoute>
          }
        />

        {/* Private Routes for Admins */}
        <Route
          path="/ProductAdmin"
          element={
            <PrivateRoute admin>
              <ProductAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/Category"
          element={
            <PrivateRoute admin>
              <Category />
            </PrivateRoute>
          }
        />
        <Route
          path="/Orders"
          element={
            <PrivateRoute admin>
              <Orders />
            </PrivateRoute>
          }
        />
        <Route
          path="/ProfileAdmin"
          element={
            <PrivateRoute admin>
              <ProfileAdmin />
            </PrivateRoute>
          }
        />
        <Route
          path="/Analytics"
          element={
            <PrivateRoute admin>
              <Analytics />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
