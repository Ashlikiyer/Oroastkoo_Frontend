import { Button } from "@/components/ui/layout/button";
import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/layout/card";
import { Input } from "@/components/ui/layout/input";
import { Label } from "@/components/ui/layout/label";
import dataFetch from "@/services/data-services";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const loginAdmin = async () => {
    const data = { email, password }; // Admin login payload
    console.log("Payload sent to backend:", data); // Debugging log

    const endpoint = "admin/login"; // Admin-specific endpoint
    const method = "POST";

    try {
      const response = await dataFetch<{
        success: boolean;
        message: string;
        token: string;
      }>(endpoint, method, data);
      console.log("Server response:", response); // Debugging log
      const adminToken = response.token;
      console.log("AdminToken token:", adminToken); // Debugging log
      localStorage.setItem("adminToken", adminToken);

      if (response.success) {
        alert(response.message); // Notify admin
        // localStorage.setItem("admin", JSON.stringify(data)); // Save admin data in local storage
        navigate("/ProductAdmin"); // Redirect to the ProductAdmin page
      }
    } catch (error) {
      console.error("Error during admin login:", error);
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <Card className="mx-auto mt-20 mb-32 max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Admin Login</CardTitle>
        <CardDescription>
          Enter your email and password to access the admin dashboard.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="admin@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              required
            />
          </div>
          <Button onClick={loginAdmin} type="submit" className="w-full">
            Login
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an admin account?{" "}
            <Link
              to="/AdminRegister"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Register
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminLogin;
