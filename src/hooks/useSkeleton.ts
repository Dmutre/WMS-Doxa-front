import { useEffect, useState } from 'react';

export const useSkeleton = (isLoading: boolean, delay: number = 300) => {
  const [showSkeleton, setShowSkeleton] = useState(true);

  useEffect(() => {
    if (!isLoading) {
      const timer = setTimeout(() => {
        setShowSkeleton(false);
      }, delay);
      return () => clearTimeout(timer);
    } else {
      setShowSkeleton(true);
    }
  }, [isLoading, delay]);

  return showSkeleton;
};
