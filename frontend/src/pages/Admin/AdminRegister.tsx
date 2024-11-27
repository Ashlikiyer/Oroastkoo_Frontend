import { Button } from "@/components/ui/layout/button";
import { Link } from "react-router-dom";
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

const AdminRegister = () => {
  const [name, setUsername] = useState(""); // Admin username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const registerAdmin = async () => {
    const data = { name, email, password }; // Admin registration payload
    console.log("Payload sent to backend:", data); // Debugging log

    const endpoint = "admin/register"; // Admin-specific endpoint
    const method = "POST";

    try {
      const response = await dataFetch<{ success: boolean; message: string }>(
        endpoint,
        method,
        data
      );
      console.log("Server response:", response); // Debugging log

      if (response.success) {
        alert(response.message); // Notify admin
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please check your details and try again.");
    }
  };

  return (
    <Card className="mx-auto mt-20 mb-20 max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Admin Register</CardTitle>
        <CardDescription>
          Enter your information to create an admin account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              value={name}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              placeholder="AdminName"
              required
            />
          </div>
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
            <Label htmlFor="password">Password</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password"
              type="password"
              placeholder="********"
              required
            />
          </div>
          <Button onClick={registerAdmin} type="button" className="w-full">
            Register
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an admin account?{" "}
            <Link
              to="/AdminLogin"
              className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Login
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AdminRegister;
