import { useEffect, useRef } from 'react';

export function useScrollReveal(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('revealed');
          observer.disconnect();
        }
      },
      { threshold: options.threshold ?? 0.1 }
    );
    observer.observe(el);
    const fallback = setTimeout(() => el.classList.add('revealed'), 6000);
    return () => { observer.disconnect(); clearTimeout(fallback); };
  }, []);
  return ref;
}
