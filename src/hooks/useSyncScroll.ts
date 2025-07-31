import { useEffect, useRef, useCallback } from 'react';

interface UseSyncScrollProps {
  sourceRef: React.RefObject<HTMLElement>;
  targetRef: React.RefObject<HTMLElement>;
  enabled?: boolean;
}

export const useSyncScroll = ({ sourceRef, targetRef, enabled = true }: UseSyncScrollProps) => {
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout>();

  const syncScroll = useCallback(() => {
    if (!enabled || !sourceRef.current || !targetRef.current || isScrollingRef.current) {
      return;
    }

    const source = sourceRef.current;
    const target = targetRef.current;

    const sourceScrollRatio = source.scrollTop / (source.scrollHeight - source.clientHeight);
    const targetScrollTop = sourceScrollRatio * (target.scrollHeight - target.clientHeight);

    isScrollingRef.current = true;
    
    // Use smooth scrolling for better visual experience
    target.scrollTo({
      top: targetScrollTop,
      behavior: 'auto' // Use 'auto' for immediate sync, 'smooth' causes lag
    });

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 100);
  }, [enabled, sourceRef, targetRef]);

  useEffect(() => {
    const source = sourceRef.current;
    if (!source || !enabled) return;

    source.addEventListener('scroll', syncScroll);

    return () => {
      source.removeEventListener('scroll', syncScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [syncScroll, sourceRef, enabled]);

  return { syncScroll };
};