// Analytics Dashboard Configuration

// Custom Reports Configuration
export const customReports = {
  // User Engagement Overview
  engagement_overview: {
    title: "User Engagement Overview",
    metrics: [
      {
        name: "Average Session Duration",
        event: "user_engagement",
        parameter: "session_duration_seconds",
        aggregation: "avg",
      },
      {
        name: "Bounce Rate",
        event: "bounce",
        calculation: "percentage",
        timeframe: "daily",
      },
      {
        name: "Average Scroll Depth",
        event: "scroll_depth",
        parameter: "scroll_depth_percentage",
        aggregation: "avg",
      },
    ],
    visualization: "summary_cards",
  },

  // Conversion Funnel
  conversion_funnel: {
    title: "Conversion Funnel Analysis",
    steps: [
      {
        name: "Page View",
        event: "page_view",
      },
      {
        name: "Service View",
        event: "service_view",
      },
      {
        name: "Form Start",
        event: "form_start",
      },
      {
        name: "Form Complete",
        event: "form_complete",
        condition: { success: true },
      },
    ],
    visualization: "funnel",
    timeframe: "last_30_days",
  },

  // Service Performance
  service_performance: {
    title: "Service Performance Metrics",
    dimensions: ["service_name"],
    metrics: [
      {
        name: "Views",
        event: "service_view",
        aggregation: "count",
      },
      {
        name: "Click Rate",
        event: "service_view",
        parameter: "interaction_type",
        condition: { interaction_type: "click" },
        calculation: "percentage",
      },
    ],
    visualization: "bar_chart",
    timeframe: "monthly",
  },

  // User Journey Analysis
  user_journey: {
    title: "User Journey Analysis",
    path_analysis: {
      start_events: ["page_view"],
      intermediate_events: [
        "service_view",
        "scroll_to_contact",
        "menu_interaction",
      ],
      conversion_events: ["form_complete"],
      max_steps: 5,
    },
    visualization: "sankey_diagram",
    timeframe: "quarterly",
  },

  // CTA Performance
  cta_performance: {
    title: "CTA Performance Analysis",
    dimensions: ["cta_text", "cta_location"],
    metrics: [
      {
        name: "Click Count",
        event: "cta_click",
        aggregation: "count",
      },
      {
        name: "Click Rate",
        event: "cta_click",
        calculation: "percentage",
        denominator: "page_view",
      },
    ],
    visualization: "data_table",
    timeframe: "weekly",
  },
};

// Dashboard Layout Configuration
export const dashboardLayout = {
  sections: [
    {
      title: "Overview",
      widgets: ["engagement_overview"],
      layout: "full_width",
    },
    {
      title: "Conversion Analysis",
      widgets: ["conversion_funnel", "user_journey"],
      layout: "split",
    },
    {
      title: "Content Performance",
      widgets: ["service_performance", "cta_performance"],
      layout: "split",
    },
  ],
  refresh_rate: 300, // seconds
  default_timeframe: "last_30_days",
};

// Alert Configuration
export const alertConfig = {
  bounce_rate: {
    metric: "bounce",
    threshold: 70, // percentage
    condition: "above",
    timeframe: "daily",
  },
  conversion_drop: {
    metric: "form_complete",
    threshold: -20, // percentage change
    condition: "change_below",
    timeframe: "weekly",
  },
  engagement_drop: {
    metric: "user_engagement",
    threshold: -30, // percentage change
    condition: "change_below",
    timeframe: "daily",
  },
};
