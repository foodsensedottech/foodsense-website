import type { LogLevel, Logger } from "./types";

const isDevelopment = process.env.NODE_ENV === "development";

function formatMessage(
  level: LogLevel,
  message: string,
  data?: unknown
): string {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] [${level.toUpperCase()}] ${message}${
    data ? `\n${JSON.stringify(data, null, 2)}` : ""
  }`;
}

function logToConsole(level: LogLevel, message: string, data?: unknown) {
  if (!isDevelopment) return;

  const formattedMessage = formatMessage(level, message, data);

  switch (level) {
    case "debug":
      console.debug(formattedMessage);
      break;
    case "info":
      console.info(formattedMessage);
      break;
    case "warn":
      console.warn(formattedMessage);
      break;
    case "error":
      console.error(formattedMessage);
      break;
  }
}

export const logger: Logger = {
  debug(message: string, data?: unknown) {
    logToConsole("debug", message, data);
  },

  info(message: string, data?: unknown) {
    logToConsole("info", message, data);
  },

  warn(message: string, data?: unknown) {
    logToConsole("warn", message, data);
  },

  error(message: string, error?: unknown) {
    logToConsole("error", message, error);

    // In production, you might want to send this to an error tracking service
    if (!isDevelopment && error instanceof Error) {
      // Example: Sentry.captureException(error);
    }
  },
};
