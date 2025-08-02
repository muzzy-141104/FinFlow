"use client";

import { useState, useEffect, Dispatch, SetStateAction, useCallback } from 'react';

// This hook is no longer used for critical event data, but can be kept for other non-essential client-side state.
type SetValue<T> = Dispatch<SetStateAction<T>>;

const stableJSONStringify = (value: any) => JSON.stringify(value);

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const valueToStore = stableJSONStringify(storedValue);
        window.localStorage.setItem(key, valueToStore);
      }
    } catch (error) {
      console.error(error);
    }
  }, [key, storedValue]);

  const setValue: SetValue<T> = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
    } catch (error) {
      console.error(error);
    }
  }, [storedValue]);


  return [storedValue, setValue];
}
