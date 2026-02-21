import type { EarlyAccessFormData, EarlyAccessResponse } from '@/types/early-access';

const API_URL = '/api/early-access';

export const submitEarlyAccessForm = async (
  data: EarlyAccessFormData
): Promise<EarlyAccessResponse> => {
  try {
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': typeof navigator !== 'undefined' ? navigator.userAgent : '',
      },
      body: JSON.stringify(data),
    });

    const result: EarlyAccessResponse = await response.json();

    if (!response.ok) {
      return {
        success: false,
        message: result.message || 'Failed to submit form. Please try again.',
        error: result.error,
      };
    }

    return {
      success: true,
      message: result.message || 'Successfully joined early access!',
      id: result.id,
    };
  } catch (error) {
    console.error('Early access submission error:', error);
    return {
      success: false,
      message: 'Network error. Please check your connection and try again.',
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
};

export const trackEarlyAccessEvent = (eventName: string, data?: Record<string, unknown>) => {
  // Hook for future analytics integration
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, data);
  }
};
