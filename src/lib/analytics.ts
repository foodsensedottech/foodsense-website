import { useEffect, useState, useCallback, useRef } from 'react';

type EventNames = 
  | 'contact_form_submit'
  | 'platform_selected'
  | 'service_viewed'
  | 'cta_clicked'
  | 'testimonial_viewed'
  | 'scroll_milestone'
  | 'section_visible'
  | 'user_timing'
  | 'dark_mode_toggle'
  | 'navigation_used'
  | 'page_exit'
  | 'external_link_click'
  | 'file_download'
  | 'video_interaction'
  | 'search_performed'
  | 'filter_used'
  | 'sort_applied';

interface AnalyticsEvent {
  action: EventNames;
  category: string;
  label?: string;
  value?: number;
}

// Type declaration for gtag
declare global {
  interface Window {
    gtag: (
      command: 'event' | 'config' | 'set',
      eventName: string,
      eventParams?: Record<string, unknown>
    ) => void;
  }
}

// Use GtagParams interface
interface GtagParams extends Record<string, unknown> {
  event_category?: string;
  event_label?: string;
  value?: number;
}

// Use GtagParams in trackEvent
export const trackEvent = ({ action, category, label, value }: AnalyticsEvent) => {
  if (typeof window.gtag !== 'undefined') {
    const params: GtagParams = {
      event_category: category,
      event_label: label,
      value: value
    };
    window.gtag('event', action, params);
  }
};

// Conversion tracking
export const trackConversion = (conversionId: string, label: string) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'conversion', {
      send_to: `${process.env.NEXT_PUBLIC_GA_ID}/${conversionId}`,
      event_callback: () => {
        console.log('Conversion tracked:', label);
      }
    });
  }
};

// Common events
export const analyticsEvents = {
  trackFormSubmission: (formType: string) => 
    trackEvent({
      action: 'contact_form_submit',
      category: 'Forms',
      label: formType
    }),

  trackPlatformSelection: (platform: string) =>
    trackEvent({
      action: 'platform_selected',
      category: 'Engagement',
      label: platform
    }),

  trackServiceView: (service: string) =>
    trackEvent({
      action: 'service_viewed',
      category: 'Services',
      label: service
    }),

  trackCTAClick: (ctaText: string, location: string) =>
    trackEvent({
      action: 'cta_clicked',
      category: 'CTA',
      label: `${ctaText} - ${location}`
    }),

  trackSectionView: (sectionId: string, timeToView: number) => {
    trackEvent({
      action: 'section_visible',
      category: 'Section Visibility',
      label: sectionId
    });
    trackTiming('Section Load', sectionId, timeToView);
  },

  trackDarkModeToggle: (isDark: boolean) =>
    trackEvent({
      action: 'dark_mode_toggle',
      category: 'User Preference',
      label: isDark ? 'Dark' : 'Light'
    }),

  trackNavigation: (linkText: string, linkHref: string) =>
    trackEvent({
      action: 'navigation_used',
      category: 'Navigation',
      label: `${linkText} - ${linkHref}`
    }),

  trackFormInteraction: (fieldName: string, interactionType: 'focus' | 'blur' | 'input') =>
    trackEvent({
      action: 'form_interaction',
      category: 'Form Usage',
      label: `${fieldName} - ${interactionType}`
    }),

  trackUserPath: (fromSection: string, toSection: string) =>
    trackEvent({
      action: 'navigation_flow',
      category: 'User Journey',
      label: `${fromSection} -> ${toSection}`
    }),

  trackExitIntent: (cursorPosition: { x: number, y: number }) =>
    trackEvent({
      action: 'page_exit',
      category: 'User Behavior',
      label: `Exit at (${cursorPosition.x}, ${cursorPosition.y})`
    }),

  trackEngagementTime: (sectionId: string, timeSpentMs: number) =>
    trackEvent({
      action: 'engagement_time',
      category: 'User Engagement',
      label: sectionId,
      value: Math.round(timeSpentMs / 1000)
    }),

  trackFeatureInteraction: (featureId: string, interactionType: string) =>
    trackEvent({
      action: 'feature_interaction',
      category: 'Feature Usage',
      label: `${featureId} - ${interactionType}`
    }),

  trackSearch: (query: string, resultCount: number) =>
    trackEvent({
      action: 'search_performed',
      category: 'Search',
      label: query,
      value: resultCount
    }),

  trackFilter: (category: string, value: string) =>
    trackEvent({
      action: 'filter_used',
      category: 'Filter',
      label: `${category}: ${value}`
    }),

  trackSort: (field: string, direction: 'asc' | 'desc') =>
    trackEvent({
      action: 'sort_applied',
      category: 'Sort',
      label: `${field} - ${direction}`
    })
};

// Add scroll tracking utility
export const initScrollTracking = () => {
  let milestones = [25, 50, 75, 90];
  let maxScrollDepth = 0;

  const calculateScrollDepth = () => {
    const winHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight - winHeight;
    const scrollTop = window.scrollY;
    return Math.round((scrollTop / docHeight) * 100);
  };

  window.addEventListener('scroll', () => {
    const scrollDepth = calculateScrollDepth();
    if (scrollDepth > maxScrollDepth) {
      maxScrollDepth = scrollDepth;
      milestones = milestones.filter(milestone => {
        if (scrollDepth >= milestone) {
          trackEvent({
            action: 'scroll_milestone',
            category: 'Scroll Depth',
            label: `${milestone}%`,
            value: milestone
          });
          return false;
        }
        return true;
      });
    }
  });
};

// Add user timing tracking
export const trackTiming = (category: string, variable: string, value: number) => {
  if (typeof window.gtag !== 'undefined') {
    window.gtag('event', 'timing_complete', {
      name: variable,
      value,
      event_category: category
    });
  }
};

// Add section visibility tracking hook
export const useSectionVisibility = (sectionId: string) => {
  useEffect(() => {
    const startTime = performance.now();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const timeToView = Math.round(performance.now() - startTime);
            analyticsEvents.trackSectionView(sectionId, timeToView);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById(sectionId);
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [sectionId]);
};

export const errorTracking = {
  trackApiError: (endpoint: string, errorCode: number, message: string) =>
    trackEvent({
      action: 'api_error',
      category: 'Error',
      label: `${endpoint} - ${errorCode}: ${message}`
    }),

  trackFormError: (formId: string, fieldName: string, errorType: string) =>
    trackEvent({
      action: 'form_error',
      category: 'Error',
      label: `${formId} - ${fieldName}: ${errorType}`
    }),

  trackJsError: (error: Error, componentName: string) =>
    trackEvent({
      action: 'js_error',
      category: 'Error',
      label: `${componentName}: ${error.message}`
    })
};

export const performanceTracking = {
  trackPageLoad: () => {
    if (typeof window !== 'undefined' && window.performance) {
      const timing = window.performance.timing;
      const loadTime = timing.loadEventEnd - timing.navigationStart;
      
      trackTiming('Page Load', 'Total', loadTime);
    }
  },

  trackComponentRender: (componentName: string, renderTime: number) =>
    trackTiming('Component Render', componentName, renderTime),

  trackApiCall: (endpoint: string, responseTime: number) =>
    trackTiming('API Response', endpoint, responseTime)
};

// Add new types for user journey tracking
type UserPersona = 
  | 'restaurant_owner'
  | 'restaurant_manager'
  | 'franchise_owner'
  | 'ghost_kitchen_operator'
  | 'bar_owner'
  | 'cafe_owner';

type UserIntent = 
  | 'delivery_optimization'
  | 'pos_integration'
  | 'customer_loyalty'
  | 'operations_management'
  | 'cost_reduction'
  | 'revenue_growth';

type JourneyStage = 
  | 'awareness'
  | 'consideration'
  | 'evaluation'
  | 'decision'
  | 'onboarding';

// Add to existing analyticsEvents
export const userJourneyTracking = {
  trackPersonaIdentification: (
    persona: UserPersona, 
    identifiers: string[]
  ) => trackEvent({
    action: 'persona_identified',
    category: 'User Persona',
    label: `${persona}: ${identifiers.join(', ')}`
  }),

  trackUserIntent: (
    intent: UserIntent,
    source: string
  ) => trackEvent({
    action: 'intent_captured',
    category: 'User Intent',
    label: `${intent} from ${source}`
  }),

  trackJourneyStage: (
    stage: JourneyStage,
    previousStage: JourneyStage | null
  ) => trackEvent({
    action: 'journey_progression',
    category: 'User Journey',
    label: previousStage ? `${previousStage} -> ${stage}` : stage
  }),

  trackInterestSignal: (
    signal: string,
    strength: number,
    context: string
  ) => trackEvent({
    action: 'interest_signal',
    category: 'User Interest',
    label: `${signal} in ${context}`,
    value: strength
  }),

  trackFeatureAffinity: (
    feature: string,
    interactionCount: number,
    timeSpent: number
  ) => trackEvent({
    action: 'feature_affinity',
    category: 'User Preference',
    label: feature,
    value: Math.round((interactionCount * timeSpent) / 1000) // Affinity score
  }),

  // Track complete user session
  trackUserSession: (sessionData: {
    persona: UserPersona;
    intents: UserIntent[];
    journey: JourneyStage[];
    features: string[];
    timeSpent: number;
  }) => {
    trackEvent({
      action: 'session_summary',
      category: 'User Journey',
      label: `${sessionData.persona} - ${sessionData.journey.join(' -> ')}`,
      value: sessionData.timeSpent
    });

    // Track detailed session data
    if (typeof window.gtag !== 'undefined') {
      window.gtag('event', 'user_profile', {
        persona: sessionData.persona,
        primary_intent: sessionData.intents[0],
        journey_length: sessionData.journey.length,
        feature_count: sessionData.features.length,
        engagement_score: Math.round(sessionData.timeSpent / sessionData.features.length)
      });
    }
  }
};

// Fix exhaustive deps warning
export const useUserBehaviorTracking = (initialPersona?: UserPersona) => {
  const [persona, setPersona] = useState<UserPersona | null>(initialPersona ?? null);
  const [journeyStages, setJourneyStages] = useState<JourneyStage[]>([]);
  const [intents, setIntents] = useState<UserIntent[]>([]);
  const sessionStartTime = useRef(Date.now());

  const identifyPersona = useCallback((
    newPersona: UserPersona,
    identifiers: string[]
  ) => {
    setPersona(newPersona);
    userJourneyTracking.trackPersonaIdentification(newPersona, identifiers);
  }, []);

  const addJourneyStage = useCallback((stage: JourneyStage) => {
    setJourneyStages(prev => {
      const previousStage = prev[prev.length - 1] ?? null;
      userJourneyTracking.trackJourneyStage(stage, previousStage);
      return [...prev, stage];
    });
  }, []);

  useEffect(() => {
    const startTime = sessionStartTime.current; // Copy ref value
    return () => {
      if (persona) {
        userJourneyTracking.trackUserSession({
          persona,
          intents,
          journey: journeyStages,
          features: [],
          timeSpent: Date.now() - startTime // Use copied value
        });
      }
    };
  }, [persona, intents, journeyStages]);

  return {
    identifyPersona,
    addJourneyStage,
    addIntent: (intent: UserIntent) => setIntents(prev => [...prev, intent])
  };
}; 