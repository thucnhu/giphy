import { useState, useEffect } from 'react';

export default function useViewportWidth() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Add an event listener to update windowWidth when the window is resized
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return windowWidth;
}
