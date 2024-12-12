"use client";

import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/Header";
import RevenueAnalytics from "@/components/Admin/RevenueAnalytics";
import { BestSellerAnalytics } from "@/components/Admin/BestSellerAnalytics";

export function Analytics() {
  return (
    <div className="flex bg-blue-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow">
        {/* Header */}
        <Header />

        {/* Analytics Content */}
        <div className=" grid grid-cols-1 lg:grid-cols-2 -mr-11 p-6">
          {/* Revenue Analytics */}
          <div>
            <RevenueAnalytics />
          </div>

          {/* Best Seller Analytics */}
          <div className="-ml-8">
            <BestSellerAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
