import { Server } from "socket.io";
import { formAnalytics } from "@/lib/analytics/form-tracking";

export function setupWebSocket(server: any) {
  const io = new Server(server, {
    cors: {
      origin: process.env.NEXT_PUBLIC_BASE_URL,
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("Client connected");

    // Listen for form analytics events
    formAnalytics.on("form_interaction", (data) => {
      socket.emit("form_interaction", {
        type: "Form Interaction",
        data,
        timestamp: new Date().toISOString(),
      });
    });

    formAnalytics.on("form_submission", (data) => {
      socket.emit("form_submission", {
        type: "Form Submission",
        data,
        timestamp: new Date().toISOString(),
      });
    });

    socket.on("disconnect", () => {
      console.log("Client disconnected");
    });
  });

  return io;
} 