import { useContext } from 'react';
import { useConsent as useConsentFromContext } from '@/context/consent';

// Re-export the hook from context
export const useConsent = useConsentFromContext;
