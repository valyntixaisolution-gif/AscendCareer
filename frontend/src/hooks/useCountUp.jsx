// src/hooks/useCountUp.js
import { useEffect, useState } from 'react';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export const useCountUp = (end, duration = 2000, start = 0) => {
  const [count, setCount] = useState(start);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true }); // Animation triggers once when scrolled into view

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    let animationFrameId;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);

      // Easing function for a smoother animation
      const easeOutQuart = 1 - Math.pow(1 - percentage, 4);
      setCount(Math.floor(easeOutQuart * (end - start) + start));

      if (progress < duration) {
        animationFrameId = requestAnimationFrame(updateCount);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrameId);
  }, [end, duration, start, isInView]);

  return { count, ref };
};

// A ready-to-use component
export const AnimatedCounter = ({ end, duration = 2000, prefix = '', suffix = '', className = '' }) => {
  const { count, ref } = useCountUp(end, duration);

  return (
    <span ref={ref} className={className}>
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  );
};