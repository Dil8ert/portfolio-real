import { useEffect, useState, type CSSProperties, type ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 1, 0.36, 1] as const;

export function SequentialItem({
  index,
  children,
  stagger = 0.14,
  className,
  style,
}: {
  index: number;
  children: ReactNode;
  stagger?: number;
  className?: string;
  style?: CSSProperties;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      style={style}
      initial={reduceMotion ? false : { opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: reduceMotion ? 0 : index * stagger,
        duration: 0.45,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealFromSkeleton({
  delay = 0,
  skeleton,
  children,
}: {
  delay?: number;
  skeleton: ReactNode;
  children: ReactNode;
}) {
  const reduceMotion = useReducedMotion();
  const [ready, setReady] = useState(delay === 0);

  useEffect(() => {
    if (delay === 0) {
      setReady(true);
      return undefined;
    }
    const wait = reduceMotion ? 0 : delay;
    const timer = window.setTimeout(() => setReady(true), wait);
    return () => window.clearTimeout(timer);
  }, [delay, reduceMotion]);

  if (!ready) {
    return <>{skeleton}</>;
  }

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
