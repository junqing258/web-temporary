import { useMediaQuery } from 'react-responsive';

export const useDesktop: () => boolean = () => useMediaQuery({ minWidth: 992 });

export const useTablet: () => boolean = () => useMediaQuery({ minWidth: 768, maxWidth: 991 });

export const usePhone: () => boolean = () => useMediaQuery({ maxWidth: 767 });

export const useNotMobile: () => boolean = () => useMediaQuery({ minWidth: 768 });

export const useMobile: () => boolean = () => useMediaQuery({ maxWidth: 991 });
