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

const UserRegister = () => {
  const [username, setUsername] = useState(""); // Changed name to username
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const RegisteredUser = async () => {
    const data = { username, email, password }; // Payload structure matches the backend
    console.log("Payload sent to backend:", data); // Debugging log

    const endpoint = "user/register";
    const method = "POST";

    try {
      const response = await dataFetch<{ success: boolean; message: string }>(
        endpoint,
        method,
        data
      );
      console.log("Server response:", response); // Debugging log

      if (response.success) {
        alert(response.message); // Notify the user
      }
    } catch (error) {
      console.error("Error during registration:", error);
      alert("Registration failed. Please check your details and try again.");
    }
  };

  return (
    <Card className="mx-auto mt-20 mb-20 max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Register</CardTitle>
        <CardDescription>
          Enter your information to create an account
        </CardDescription>
      </CardHeader>

      <CardContent>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              id="username"
              placeholder="Kier"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="contactNumber">Contact Number</Label>
            <Input
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value.replace(/[^0-9]/g, ''))} 
              type="tel" 
              id="contactNumber"
              placeholder="09xxxxxxxxx"
              required
              maxLength={11}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              id="email"
              type="email"
              placeholder="m@example.com"
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
          <Button onClick={RegisteredUser} type="button" className="w-full">
            Register
          </Button>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link
              to="/Login"
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

export default UserRegister;
