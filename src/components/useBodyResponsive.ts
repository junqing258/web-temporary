import { useEffect } from 'react';
import { useMobile } from './responsive';

export const useBodyResponsive: () => void = () => {
  const isMobile = useMobile();
  useEffect(() => {
    const container = document.getElementById('root') || document.body;
    if (isMobile) {
      container.classList.add('mobile-wrap');
      container.classList.remove('desktop-wrap');
    } else {
      container.classList.add('desktop-wrap');
      container.classList.remove('mobile-wrap');
    }
  }, [isMobile]);
};
