import MessagesList from "@/components/admin/messages-list";

export default async function MessagesPage() {
  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Customer Messages
      </h1>
      
      <MessagesList />
    </div>
  );
} 