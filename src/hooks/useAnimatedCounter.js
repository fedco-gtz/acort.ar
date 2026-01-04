import { useEffect, useState } from "react";

export function useAnimatedCounter(target, duration = 600) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (target === null) return;

    const startValue = value;
    const startTime = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - startTime) / duration, 1);
      const current = Math.floor(
        startValue + (target - startValue) * progress
      );
      setValue(current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [target]);

  return value;
}
