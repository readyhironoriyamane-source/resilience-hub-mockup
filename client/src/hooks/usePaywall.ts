import { useState, useEffect } from 'react';

// Global state to persist across component unmounts/remounts
let globalIsTrialExpired = false;
const listeners = new Set<(value: boolean) => void>();

export function usePaywall() {
  const [isTrialExpired, setIsTrialExpiredState] = useState(globalIsTrialExpired);

  useEffect(() => {
    const listener = (value: boolean) => {
      setIsTrialExpiredState(value);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const setIsTrialExpired = (value: boolean) => {
    globalIsTrialExpired = value;
    listeners.forEach(listener => listener(value));
  };

  return { isTrialExpired, setIsTrialExpired };
}
