import { useState, useEffect } from 'react';

const getResponsiveSize = (size: number) => {
  const width = window.innerWidth;
  if (width < 480) {
    return size * 0.7;
  } else if (width < 768) {
    return size * 0.85;
  }
  return size;
};

export const useResponsiveSize = (size: number) => {
  const [currentSize, setCurrentSize] = useState(getResponsiveSize(size));

  useEffect(() => {
    const handleResize = () => {
      setCurrentSize(getResponsiveSize(size));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [size]);

  return currentSize;
};
