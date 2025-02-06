import PerformanceMetrics from "@/components/admin/performance-metrics";

export default async function PerformancePage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Performance Metrics
      </h1>
      
      <PerformanceMetrics />
    </div>
  );
} 