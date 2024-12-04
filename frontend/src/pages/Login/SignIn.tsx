import { Button } from "@/components/ui/layout/button";
import { Link, useNavigate } from "react-router-dom";
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

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const loginUser = async () => {
    const data = { email, password }; // Payload structure matches the backend
    console.log("Payload sent to backend:", data); // Debugging log

    const endpoint = "user/login";
    const method = "POST";

    try {
      const response = await dataFetch<{
        success: boolean;
        message: string;
        token: string;
      }>(endpoint, method, data);
      console.log("Server response:", response); // Debugging log
      const userToken = response.token;
      console.log("userToken token:", userToken); // Debugging log
      localStorage.setItem("userToken", userToken);

      if (response.success) {
        alert(response.message); // Notify admin
        navigate("/"); // Redirect to the ProductAdmin page
      }
    } catch (error) {
      console.error("Error during admin login:", error);
      console.log(data)
      alert("Login failed. Please check your credentials and try again.");
    }
  };

  return (
    <Card className="mx-auto mt-20 mb-32 max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
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
              placeholder="m@example.com"
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
          <Button onClick={loginUser} type="submit" className="w-full">
            Login
          </Button>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link
              to="/Register"
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

export default SignIn;
