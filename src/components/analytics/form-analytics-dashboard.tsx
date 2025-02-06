"use client";

import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface FormAnalyticsDashboardProps {
  className?: string;
  data: {
    fieldInteractions: Array<{
      fieldName: string;
      focusCount: number;
      errorCount: number;
      timeSpent: number;
    }>;
    submissions: {
      total: number;
      success: number;
      error: number;
    };
    completionRate: number;
    averageTimeToComplete: number;
  };
}

export function FormAnalyticsDashboard({ className, data }: FormAnalyticsDashboardProps) {
  return (
    <div className={cn("p-6 bg-white dark:bg-gray-900 rounded-lg shadow-lg", className)}>
      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <StatCard
          title="Form Submissions"
          value={data.submissions.total}
          subValue={`${data.submissions.success} successful`}
        />
        <StatCard
          title="Completion Rate"
          value={`${data.completionRate}%`}
          trend={data.completionRate > 50 ? "up" : "down"}
        />
        <StatCard
          title="Avg. Time to Complete"
          value={`${Math.round(data.averageTimeToComplete)}s`}
        />
        <StatCard
          title="Error Rate"
          value={`${Math.round((data.submissions.error / data.submissions.total) * 100)}%`}
          trend="down"
          trendColor="text-red-500"
        />
      </div>

      {/* Field Performance Chart */}
      <div className="h-80 mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.fieldInteractions}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="fieldName" />
            <YAxis />
            <Tooltip />
            <Line 
              type="monotone" 
              dataKey="focusCount" 
              stroke="#22c55e" 
              name="Focus Count" 
            />
            <Line 
              type="monotone" 
              dataKey="errorCount" 
              stroke="#ef4444" 
              name="Error Count" 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

// Helper component for stats
function StatCard({ title, value, subValue, trend, trendColor }: {
  title: string;
  value: string | number;
  subValue?: string;
  trend?: "up" | "down";
  trendColor?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg"
    >
      <h3 className="text-sm text-gray-500 dark:text-gray-400">{title}</h3>
      <div className="flex items-end gap-2">
        <p className="text-2xl font-bold text-gray-900 dark:text-white">
          {value}
        </p>
        {trend && (
          <span className={cn("text-sm", trendColor || "text-green-500")}>
            {trend === "up" ? "↑" : "↓"}
          </span>
        )}
      </div>
      {subValue && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{subValue}</p>
      )}
    </motion.div>
  );
} 