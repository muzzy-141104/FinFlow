"use client";

import { useState, useEffect, Dispatch, SetStateAction, useCallback } from 'react';

type SetValue<T> = Dispatch<SetStateAction<T>>;

// A stable reference for the stringify function
const stableJSONStringify = (value: any) => JSON.stringify(value);

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  // Use a function for initial state to read from localStorage only once.
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      if (typeof window === 'undefined') {
        return initialValue;
      }
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.error(error);
      return initialValue;
    }
  });

  // useEffect to update local storage when storedValue changes
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
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.error(error);
    }
  }, [storedValue]);


  return [storedValue, setValue];
}
