"use client";

import { Bar, BarChart, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { useEffect, useState } from "react";
import dataFetch from "@/services/data-services";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

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

  // Custom Tooltip with Product Image
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, totalSold, price, image } = payload[0].payload;
      return (
        <div className="custom-tooltip p-2 bg-white border rounded shadow-lg">
          <h4 className="font-bold">{name}</h4>
          <img
            src={image}
            alt={name}
            className="w-20 h-20 object-cover my-2"
          />
          <p>Sold: {totalSold}</p>
          <p>Price: ₱{price}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-blue-50 min-h-screen sm:p-20">
      <div className="max-w-5xl">
        <Card>
          <CardHeader>
            <CardTitle>Best Seller Products</CardTitle>
            <CardDescription>Top selling products based on sales</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart
                  data={chartData}
                  layout="vertical"
                  margin={{
                    left: 20,
                  }}
                >
                  <XAxis type="number" hide />
                  <YAxis
                    dataKey="name"
                    type="category"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Bar dataKey="totalSold" fill="var(--color-desktop)" radius={5} />
                </BarChart>
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
