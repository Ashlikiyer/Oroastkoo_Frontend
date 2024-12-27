"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { useState, useEffect } from "react";
import dataFetch from "@/services/data-services";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export function RevenueAnalytics() {
  const [revenue, setRevenue] = useState<any>({});

  const fetchRevenue = async () => {
    try {
      const revenue = await dataFetch("/admin/analytics", "GET", {});
      setRevenue(revenue);
      console.log("Analytics data:", revenue);
    } catch (error) {
      console.error("Error fetching analytics data:", error);
    }
  };

  // Fetch analytics on mount
  useEffect(() => {
    fetchRevenue();
  }, []);

  // Ensure all months are included in the chart data
  const chartData = months.map((month, index) => {
    const dataForMonth = revenue?.monthlyEarnings?.find(
      (item: any) => item.month === index + 1
    );
    return {
      month,
      earnings: dataForMonth ? dataForMonth.earnings : 0,
    };
  });

  const chartConfig = {
    earnings: {
      label: "Earnings",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <div className="bg-blue-50 min-h-screen ml-28 sm:p-20">
      <div className="max-w-2xl mx-auto">
        {/* Statistics Section */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <Card>
            <CardContent>
              <h3 className="text-sm mt-4 -mb-2 font-medium text-gray-500">Total Revenue</h3>
              <p className="mt-1 text-xl font-semibold text-gray-900">
              ₱{Number(revenue?.totalEarnings || 0)}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <h3 className="text-sm mt-4 -mb-2 font-medium text-gray-500">Sales</h3>
              <p className="mt-1 text-xl font-semibold text-gray-900">
                {Number(revenue?.totalOrders || 0)}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Area Chart Section */}
        <Card >
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>
              Total monthly earnings for the current year
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={chartData} margin={{ left: 12, right: 12 }}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                  />
                  <YAxis
                    tickFormatter={(value) => `₱${value}`}
                    tickLine={false}
                    axisLine={false}
                  />
                  <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="dot" hideLabel />}
                  />
                  <Area
                    dataKey="earnings"
                    type="linear"
                    fill="hsl(var(--chart-1))"
                    fillOpacity={0.4}
                    stroke="hsl(var(--chart-1))"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
          <CardFooter>
            <div className="flex w-full items-start gap-2 text-sm">
              <div className="grid gap-2">
                <div className="flex items-center gap-2 leading-none text-muted-foreground">
                  Monthly Analysis
                </div>
              </div>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default RevenueAnalytics;