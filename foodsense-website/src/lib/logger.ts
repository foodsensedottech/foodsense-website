export interface LogDetails {
  [key: string]: unknown;
}

export interface Logger {
  info(message: string, details?: LogDetails): void;
  warn(message: string, details?: LogDetails): void;
  error(message: string, details?: LogDetails): void;
  critical(message: string, details?: LogDetails): void;
  log(level: string, message: string, details?: LogDetails): void;
}

export const logger: Logger = {
  info(message: string, details?: LogDetails) {
    this.log("info", message, details);
  },
  warn(message: string, details?: LogDetails) {
    this.log("warn", message, details);
  },
  error(message: string, details?: LogDetails) {
    this.log("error", message, details);
  },
  critical(message: string, details?: LogDetails) {
    this.log("critical", message, details);
  },
  log(level: string, message: string, details?: LogDetails) {
    console.log(`[${level.toUpperCase()}] ${message}`, details || "");
  },
}; 