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

interface LogMetadata {
  component?: string;
  action?: string;
  metadata?: Record<string, any>;
}

class AppLogger {
  info(message: string, meta?: LogMetadata) {
    if (process.env.NODE_ENV === "development") {
      console.info(`[INFO] ${message}`, meta);
    }
  }

  warn(message: string, meta?: LogMetadata) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[WARN] ${message}`, meta);
    }
  }

  error(message: string, meta?: LogMetadata) {
    console.error(`[ERROR] ${message}`, meta);

    // In production, you might want to send this to a logging service
    if (process.env.NODE_ENV === "production") {
      // Send to logging service like Sentry, LogRocket, etc.
    }
  }

  debug(message: string, meta?: LogMetadata) {
    if (process.env.NODE_ENV === "development") {
      console.debug(`[DEBUG] ${message}`, meta);
    }
  }
}

export const appLogger = new AppLogger();
