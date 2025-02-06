import { Analytics } from './types';

export const formAnalytics = {
  trackFieldInteraction: (
    fieldName: string,
    action: 'focus' | 'blur' | 'input' | 'error',
    value?: string
  ) => {
    // Track field-level interactions
    Analytics.track('form_field_interaction', {
      fieldName,
      action,
      value,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId(),
      formName: 'contact_form'
    });
  },

  trackFormSubmission: (
    formName: string,
    status: 'success' | 'error',
    data?: Record<string, any>
  ) => {
    // Track form submissions
    Analytics.track('form_submission', {
      formName,
      status,
      data,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId(),
      timeToComplete: getFormTimeSpent(formName)
    });
  },

  trackFormProgress: (
    formName: string,
    percentComplete: number
  ) => {
    // Track form completion progress
    Analytics.track('form_progress', {
      formName,
      percentComplete,
      timestamp: new Date().toISOString(),
      sessionId: getSessionId()
    });
  }
};

// Helper functions
function getSessionId(): string {
  // Implement session ID logic
  return 'session_id';
}

function getFormTimeSpent(formName: string): number {
  // Implement time tracking logic
  return 0;
}

export async function getFormAnalytics() {
  // In a real app, fetch this from your analytics service
  return {
    fieldInteractions: [
      { fieldName: 'name', focusCount: 150, errorCount: 5, timeSpent: 8 },
      { fieldName: 'email', focusCount: 145, errorCount: 12, timeSpent: 10 },
      { fieldName: 'phone', focusCount: 140, errorCount: 15, timeSpent: 12 },
      { fieldName: 'restaurant', focusCount: 135, errorCount: 3, timeSpent: 7 },
    ],
    submissions: {
      total: 100,
      success: 85,
      error: 15
    },
    completionRate: 75,
    averageTimeToComplete: 120
  };
} 