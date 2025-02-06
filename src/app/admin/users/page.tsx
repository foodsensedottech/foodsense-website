import UserAnalytics from "@/components/admin/user-analytics";

export default async function UserTrackingPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        User Behavior Analytics
      </h1>
      
      <UserAnalytics />
    </div>
  );
} 