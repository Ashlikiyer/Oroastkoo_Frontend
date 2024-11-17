import { Button } from "@/components/ui/layout/button";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/layout/card";

import { Input } from "@/components/ui/layout/input";
import { Label } from "@/components/ui/layout/label";

const SignUp = () => {
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
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="Kier" required />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
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
          </div>

          <Input id="password" type="password" required />
          <Button type="submit" className="w-full">
            Login
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

export default SignUp;
