"use client"

import { TrendingUp } from "lucide-react"
import { Area, AreaChart, CartesianGrid, XAxis, Tooltip, ResponsiveContainer } from "recharts"
import { useEffect, useState } from "react"
import dataFetch from "@/services/data-services"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function BestSellerAnalytics() {
  const [bestSeller, setBestSeller] = useState<any>([]);

  const fetchBestSeller = async () => {
    try {
      const response = await dataFetch("/admin/bestsellers", "GET", {}) as { bestSellers: any[] };
      if (Array.isArray(response.bestSellers)) {
        setBestSeller(response.bestSellers);
      } else {
        console.error("Unexpected response format:", response);
      }
      console.log("Best Seller data:", response);
    } catch (error) {
      console.error("Error fetching best seller data:", error);
    }
  };

  useEffect(() => {
    fetchBestSeller();
  }, []);

  // Sort the products based on totalSold, descending order
  const sortedBestSellers = [...bestSeller].sort((a: any, b: any) => b.totalSold - a.totalSold);

  // Map the data into the format expected by Recharts
  const chartData = sortedBestSellers.map((item: any) => ({
    name: item.product?.name || "Unknown",
    totalSold: item.totalSold || 0,
    price: item.product?.price || 0,
    image: item.product?.image || "/default-image.jpg", // Fallback image URL
  }));

  console.log(chartData); // Log the chart data

  // Custom Tooltip Content
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, totalSold, price, image } = payload[0].payload;
      return (
        <div className="custom-tooltip p-2 bg-white border rounded shadow-lg">
          <h4>{name}</h4>
          <img src={image} alt={name} className="w-20 h-20 object-cover mb-2" />
          <p>Sold: {totalSold}</p>
          <p>Price: ₱{price}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-blue-50 min-h-screen p-2 sm:p-20">
      <div className="max-w-5xl mt-14">
        <Card>
          <CardHeader>
            <CardTitle>Best Seller Products</CardTitle>
            <CardDescription>Top selling products based on sales</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis dataKey="name" tickLine={false} tickMargin={10} axisLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area
                    dataKey="totalSold"
                    type="natural"
                    fill="var(--color-desktop)"
                    fillOpacity={0.4}
                    stroke="var(--color-desktop)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
          <CardFooter className="flex-col items-start gap-2 text-sm">
            <div className="leading-none text-muted-foreground">
              Showing best-selling products
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
