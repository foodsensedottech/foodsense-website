import { FormAnalyticsDashboard } from "@/components/analytics/form-analytics-dashboard";
import { RealTimeAnalytics } from "@/components/admin/real-time-analytics";
import { getFormAnalytics } from "@/lib/analytics/form-tracking";

export default async function AdminDashboard() {
  // Fetch analytics data
  const analyticsData = await getFormAnalytics();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
      </div>

      <div className="grid gap-8">
        <FormAnalyticsDashboard data={analyticsData} />
        <RealTimeAnalytics />
      </div>
    </div>
  );
} 