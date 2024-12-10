"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/Header";
import { useEffect, useState } from "react";

type MonthlyEarnings = {
  month: number;
  earnings: number;
};

type AnalyticsData = {
  totalEarnings: number;
  totalOrders: number;
  monthlyEarnings: MonthlyEarnings[];
};

export function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalEarnings: 0,
    totalOrders: 0,
    monthlyEarnings: [],
  });

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch("http://localhost:5000/oroastko/admin/analytics", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setAnalytics(data);
      } catch (error) {
        console.error("Error fetching analytics data:", error);
      }
    };

    fetchAnalytics();
  }, []);

  const chartData = analytics.monthlyEarnings.map((entry) => ({
    name: new Date(0, entry.month - 1).toLocaleString("default", { month: "short" }),
    total: entry.earnings,
  }));

  return (
    <div className="flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow">
        {/* Header */}
        <Header />

        {/* Analytics Content */}
        <div className="bg-blue-50 min-h-screen p-5 sm:p-20">
          <div className="max-w-5xl ml-40 mt-15">
            {/* Analytics Title */}
            <div className="mb-3">
              <h1 className="text-3xl font-bold text-gray-700">Analytics</h1>
            </div>

            {/* Statistics Section */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  ${analytics.totalEarnings.toFixed(2)}
                </p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow">
                <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
                <p className="mt-1 text-xl font-semibold text-gray-900">
                  {analytics.totalOrders}
                </p>
              </div>
            </div>

            {/* Bar Chart Section */}
            <div className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-sm font-medium text-gray-500">Monthly Earnings</h3>
              <ResponsiveContainer width="100%" height={350}>
                <BarChart data={chartData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `$${value}`}
                  />
                  {/* Tooltip for Hover Effect */}
                  <Tooltip formatter={(value) => `$${value}`} />
                  <Bar
                    dataKey="total"
                    fill="currentColor"
                    radius={[4, 4, 0, 0]}
                    className="fill-primary"
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
