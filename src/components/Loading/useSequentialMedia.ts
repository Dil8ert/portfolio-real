import { useCallback, useEffect, useRef, useState } from 'react';

export function useSequentialMedia(count: number, concurrency = 1, gapMs = 140) {
  const [loaded, setLoaded] = useState(() => Array.from({ length: count }, () => false));
  const [revealed, setRevealed] = useState(0);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    setLoaded(Array.from({ length: count }, () => false));
    setRevealed(0);
  }, [count]);

  useEffect(() => {
    let next = 0;
    while (next < count && loaded[next]) {
      next += 1;
    }
    setRevealed((current) => (current === next ? current : next));
  }, [loaded, count]);

  useEffect(
    () => () => {
      timersRef.current.forEach((id) => window.clearTimeout(id));
    },
    []
  );

  const canLoad = useCallback(
    (index: number) => index < revealed + concurrency,
    [revealed, concurrency]
  );

  const markLoaded = useCallback(
    (index: number) => {
      const id = window.setTimeout(() => {
        setLoaded((prev) => {
          if (prev[index]) {
            return prev;
          }
          const next = [...prev];
          next[index] = true;
          return next;
        });
      }, gapMs);
      timersRef.current.push(id);
    },
    [gapMs]
  );

  return { canLoad, markLoaded };
}
