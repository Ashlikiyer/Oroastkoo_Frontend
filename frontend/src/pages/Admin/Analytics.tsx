"use client";
import Sidebar from "@/components/ui/Sidebar";
import Header from "@/components/Header";
import RevenueAnalytics from "@/components/Admin/RevenueAnalytics";
import { BestSellerAnalytics } from "@/components/Admin/BestSellerAnalytics";

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
