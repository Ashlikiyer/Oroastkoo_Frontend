"use client";
import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/Header";
import RevenueAnalytics from "@/components/Admin/RevenueAnalytics";
import { BestSellerAnalytics } from "@/components/Admin/BestSellerAnalytics";

export function Analytics() {
  return (
    <div className="flex bg-blue-50">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow">
        {/* Header */}
        <Header />

        {/* Analytics Content */}
        <div className="flex flex-wrap gap-4 px-4">
          <div className="flex-1">
            <RevenueAnalytics />
          </div>
          <div className="flex-1">
            <BestSellerAnalytics />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;
