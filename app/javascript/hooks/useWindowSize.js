import { useEffect, useState } from  'react';

/**
 * Hook that returns state with window size and window type
 * @returns 
 */
export default function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: 1024,
    height: 1280,
    contentWidth: 700
  });

  useEffect(() => {
    function changeWindowSize() {
      setWindowSize({ 
        width: window.outerWidth, 
        height: window.outerHeight, 
        contentWidth: window.outerWidth >= 700 ? 700 : window.outerWidth});
    }
    window.addEventListener('resize', changeWindowSize);
    changeWindowSize();
    return () => {
      window.removeEventListener('resize', changeWindowSize);
    };
  }, []);
  return {...windowSize, 
    isMobile: windowSize.width === windowSize.contentWidth,
    isTablet: windowSize.width - windowSize.contentWidth <= 340 * 2
  };
}
