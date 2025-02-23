type SectionName = "services" | "hero" | "about" | "contact";

interface LogMetadata {
  section: SectionName;
  timestamp: string;
  [key: string]: unknown;
}

export function logSectionError(message: string, metadata: LogMetadata) {
  console.error(message, {
    ...metadata,
    environment: process.env.NODE_ENV,
  });
}
