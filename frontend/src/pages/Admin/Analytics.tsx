"use client";

import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/Header";
import RevenueAnalytics from "@/components/Admin/RevenueAnalytics";
import { BestSellerAnalytics } from "@/components/Admin/BestSellerAnalytics";
import { Download } from "lucide-react";
import dataFetch from "@/services/data-services";
import { Button } from "@/components/ui/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Analytics() {
  const exportAnalytics = async () => {
    try {
      const endpoint = "/admin/export-report";
      const method = "GET";
      const response = await dataFetch(endpoint, method) as { success: boolean; filePath?: string };

      console.log("Server response:", response);

      if (response.success && response.filePath) {
        // Display the file path in a toast notification
        toast.success(`Export successful! The file is located at: ${response.filePath}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        console.error("Unexpected response format:", response);
        toast.error("Failed to export analytics data.", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error exporting analytics:", error);
      toast.error("An error occurred while exporting analytics data.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  // const exportAnalytics = async () => {
  //   try {
  //     const endpoint = "/admin/export-report";
  //     const response = await fetch(endpoint, { method: "GET" });
  
  //     if (response.ok) {
  //       const blob = await response.blob();
  //       const url = window.URL.createObjectURL(blob);
  
  //       // Create a temporary anchor to trigger the download
  //       const anchor = document.createElement("a");
  //       anchor.href = url;
  //       anchor.download = "analytics-report.xlsx"; // Suggest a file name
  //       anchor.click();
  
  //       // Revoke the URL after download
  //       window.URL.revokeObjectURL(url);
  
  //       console.log("Analytics report downloaded successfully.");
  //     } else {
  //       const errorResponse = await response.json();
  //       console.error("Error exporting analytics:", errorResponse.message);
  //       alert(errorResponse.message);
  //     }
  //   } catch (error) {
  //     console.error("Error exporting analytics:", error);
  //   }
  // };

  return (
    <div className="flex bg-blue-50 min-h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex-grow">
        {/* Header */}
        <Header />

        {/* Export Button at the Top */}
        <div className="flex justify-end mt-20 mr-20">
          <Button
            onClick={exportAnalytics}
            className="flex items-center justify-center text-white rounded-lg px-4 py-2"
          >
            <Download className="mr-2" /> Export Analytics
          </Button>
        </div>

        {/* Analytics Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Revenue Analytics */}
          <div>
            <RevenueAnalytics />
          </div>

          {/* Best Seller Analytics */}
          <div>
            <BestSellerAnalytics />
          </div>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}

export default Analytics;
