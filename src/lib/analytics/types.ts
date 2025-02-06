export interface AnalyticsEvent {
  name: string;
  properties: Record<string, any>;
  timestamp: string;
}

export interface Analytics {
  track: (eventName: string, properties: Record<string, any>) => void;
  on: (eventName: string, callback: (data: any) => void) => void;
}

// Temporary implementation for development
export const Analytics: Analytics = {
  track: (eventName: string, properties: Record<string, any>) => {
    console.log('Analytics Event:', eventName, properties);
  },
  on: (eventName: string, callback: (data: any) => void) => {
    // In production, implement real event listeners
    console.log('Analytics Listener Added:', eventName);
  }
}; 