export class HubSpotError extends Error {
  constructor(message: string, public code?: string, public status?: number) {
    super(message);
    this.name = "HubSpotError";
  }
}

export class HubSpotRateLimitError extends HubSpotError {
  constructor(message: string) {
    super(message, "RATE_LIMIT", 429);
    this.name = "HubSpotRateLimitError";
  }
}

export class HubSpotAuthenticationError extends HubSpotError {
  constructor(message: string) {
    super(message, "AUTHENTICATION_ERROR", 401);
    this.name = "HubSpotAuthenticationError";
  }
}
