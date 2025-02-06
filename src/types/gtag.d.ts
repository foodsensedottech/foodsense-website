interface GtagEvent {
  action: string;
  category: string;
  label: string;
  value: number;
}

interface WindowWithGtag extends Window {
  gtag: (
    command: 'config' | 'event' | 'js',
    targetId: string,
    config?: {
      page_path?: string;
      send_to?: string;
      event_category?: string;
      event_label?: string;
      value?: number;
    }
  ) => void;
  dataLayer: unknown[];
}

declare let window: WindowWithGtag; 