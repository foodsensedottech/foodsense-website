// Clarity Configuration Types
export interface ClarityTagConfig {
  selector: string;
  event: "click" | "focus" | "visibility" | "scroll" | "submit" | "view";
  attributes?: string[];
  breakpoints?: number[];
}

export interface ClarityTags {
  [key: string]: {
    [key: string]: ClarityTagConfig;
  };
}

export interface ClarityHeatmapConfig {
  click_tracking: {
    enabled: boolean;
    elements: string[];
  };
  scroll_tracking: {
    enabled: boolean;
    breakpoints: number[];
  };
}

export interface ClarityPrivacySettings {
  mask_all_numbers: boolean;
  mask_all_emails: boolean;
  block_class: string;
  ignore_class: string;
}

export interface ClaritySessionConfig {
  capture_rate: number;
  mask_text_content: boolean;
  record_canvas: boolean;
  record_network: boolean;
  record_scroll: boolean;
  record_rage_clicks: boolean;
  record_mutations: boolean;
}

export interface ClarityConfig {
  customTags: ClarityTags;
  heatmapConfig: ClarityHeatmapConfig;
  privacySettings: ClarityPrivacySettings;
  sessionConfig: ClaritySessionConfig;
}

export interface ClaritySetOptions {
  (method: "set", name: string, config: any): void;
  (method: "identify", userId: string, properties?: Record<string, any>): void;
}

declare global {
  interface Window {
    clarity: ClaritySetOptions;
  }
}
