import React, { useState, useEffect } from 'react';

function useLocalStorage<T,>(key: string, initialValue: T): [T, React.Dispatch<React.SetStateAction<T>>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  // This effect hook is the key to the fix. It synchronizes the component's state
  // with localStorage. It runs after the render, ensuring that side effects
  // do not block the UI and follow React's intended lifecycle.
  useEffect(() => {
    try {
      // Whenever storedValue changes, this effect runs and updates localStorage.
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`Could not save state to localStorage for key "${key}"`, error);
    }
  }, [key, storedValue]);

  // The hook returns the state value and the setter function, just like useState.
  return [storedValue, setStoredValue];
}

export default useLocalStorage;