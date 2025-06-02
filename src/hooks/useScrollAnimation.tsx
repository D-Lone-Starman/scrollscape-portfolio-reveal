
import { useEffect, useState } from 'react';

interface UseScrollAnimationProps {
  threshold?: number;
  rootMargin?: string;
}

export const useScrollAnimation = ({ threshold = 0.1, rootMargin = '0px' }: UseScrollAnimationProps = {}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [element, setElement] = useState<Element | null>(null);

  useEffect(() => {
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [element, threshold, rootMargin]);

  return { isVisible, setElement };
};
