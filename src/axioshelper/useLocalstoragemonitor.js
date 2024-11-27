import { useEffect } from 'react';

const useLocalStorageMonitor = (key, callback) => {
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event.key === key && event.storageArea === localStorage) {
        callback();
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [key, callback]);
};

export default useLocalStorageMonitor;
