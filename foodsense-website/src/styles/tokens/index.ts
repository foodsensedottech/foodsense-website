export const tokens = {
  colors: {
    brand: {
      primary: {
        DEFAULT: "#f1c100", // Main yellow
        light: "#f7d333",
        dark: "#d1a700",
      },
      secondary: {
        DEFAULT: "#253b59", // Main blue
        light: "#2f4a6d",
        dark: "#1b2c45",
      },
    },
    neutral: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
    },
    semantic: {
      success: {
        DEFAULT: "#10b981", // Green
        light: "#34d399",
        dark: "#059669",
      },
      error: {
        DEFAULT: "#ef4444", // Red
        light: "#f87171",
        dark: "#dc2626",
      },
      warning: {
        DEFAULT: "#f1c100", // Using main brand yellow
        light: "#f7d333",
        dark: "#d1a700",
      },
    },
  },
  typography: {
    fonts: {
      sans: "var(--font-inter)", // Only using Inter
    },
    sizes: {
      // Following typographic hierarchy
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "2rem", // 32px - This is what we want for Services/Testimonials
      "4xl": "2.5rem", // 40px - This is what we want for About
      "5xl": "3rem", // 48px
    },
    weights: {
      normal: "400", // Regular body text
      medium: "500", // Emphasized body text
      semibold: "600", // Subheadings
      bold: "700", // Headings
    },
    lineHeights: {
      tight: "1.2", // Headings
      normal: "1.5", // Body text
      relaxed: "1.75", // Large body text
    },
  },
};
