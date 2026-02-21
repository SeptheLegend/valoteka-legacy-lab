import React, { createContext, useContext, useState, useEffect } from 'react';

interface ConsentContextType {
  analyticsConsent: boolean;
  setAnalyticsConsent: (consent: boolean) => void;
  hasConsentCookie: boolean;
}

const ConsentContext = createContext<ConsentContextType | undefined>(undefined);

const CONSENT_STORAGE_KEY = 'valoteka_consent';
const CONSENT_EXPIRY_DAYS = 365;

export const ConsentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [analyticsConsent, setAnalyticsConsent] = useState(false);
  const [hasConsentCookie, setHasConsentCookie] = useState(false);

  // Load consent from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    if (stored) {
      try {
        const { consent, timestamp } = JSON.parse(stored);
        const expiryTime = timestamp + CONSENT_EXPIRY_DAYS * 24 * 60 * 60 * 1000;
        
        if (Date.now() < expiryTime) {
          setAnalyticsConsent(consent);
          setHasConsentCookie(true);
        } else {
          localStorage.removeItem(CONSENT_STORAGE_KEY);
        }
      } catch (error) {
        console.error('Failed to parse consent cookie:', error);
        localStorage.removeItem(CONSENT_STORAGE_KEY);
      }
    }
  }, []);

  // Save consent to localStorage
  const handleConsentChange = (consent: boolean) => {
    setAnalyticsConsent(consent);
    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({
        consent,
        timestamp: Date.now(),
      })
    );
    setHasConsentCookie(true);

    // Load analytics script if consent given
    if (consent) {
      loadGoogleAnalytics();
    }
  };

  return (
    <ConsentContext.Provider
      value={{
        analyticsConsent,
        setAnalyticsConsent: handleConsentChange,
        hasConsentCookie,
      }}
    >
      {children}
    </ConsentContext.Provider>
  );
};

export const useConsent = (): ConsentContextType => {
  const context = useContext(ConsentContext);
  if (!context) {
    throw new Error('useConsent must be used within ConsentProvider');
  }
  return context;
};

const loadGoogleAnalytics = () => {
  // This will be implemented when GA ID is available
  // For now, just a hook for future analytics integration
  if (typeof window !== 'undefined' && !(window as any).gtag) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX`;
    document.head.appendChild(script);

    (window as any).dataLayer = (window as any).dataLayer || [];
    function gtag(...args: any[]) {
      (window as any).dataLayer.push(args);
    }
    (window as any).gtag = gtag;
    gtag('js', new Date());
  }
};
