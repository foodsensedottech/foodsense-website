"use client";

import { useWebSocket } from "@/components/providers/websocket-provider";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface RealTimeEvent {
  type: string;
  data: any;
  timestamp: string;
}

export function RealTimeAnalytics() {
  const { socket, isConnected } = useWebSocket();
  const [events, setEvents] = useState<RealTimeEvent[]>([]);

  useEffect(() => {
    if (!socket) return;

    socket.on("form_interaction", (data: RealTimeEvent) => {
      setEvents(prev => [data, ...prev].slice(0, 10));
    });

    socket.on("form_submission", (data: RealTimeEvent) => {
      setEvents(prev => [data, ...prev].slice(0, 10));
    });

    return () => {
      socket.off("form_interaction");
      socket.off("form_submission");
    };
  }, [socket]);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Real-Time Activity
        </h3>
        <div className="flex items-center gap-2">
          <Activity className="w-4 h-4" />
          <span className={cn(
            "inline-block w-2 h-2 rounded-full",
            isConnected ? "bg-green-500" : "bg-red-500"
          )} />
        </div>
      </div>

      <div className="space-y-4">
        <AnimatePresence>
          {events.map((event, index) => (
            <motion.div
              key={event.timestamp}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className={cn(
                "p-4 rounded-lg",
                "border border-gray-200 dark:border-gray-700",
                "bg-gray-50 dark:bg-gray-900/50"
              )}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">
                    {event.type}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {JSON.stringify(event.data)}
                  </p>
                </div>
                <time className="text-xs text-gray-500">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </time>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
} 